import mongoose from 'mongoose';
import Subscriber from '../../models/Subscriber';
import dotenv from 'dotenv';

// 确保加载环境变量
dotenv.config();

// 导入邮件服务
const { sendWelcomeEmail } = require('../../utils/emailServiceUnified');

// MongoDB Atlas 连接字符串
const mongoURI = process.env.MONGODB_URI;

// 连接到 MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Failed to connect to MongoDB Atlas:', error));

// API 路由：处理订阅请求并保存订阅者信息
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, score, selectedPrograms, currentProgram } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        try {
            // 检查是否已存在相同的订阅者
            const existingSubscriber = await Subscriber.findOne({ email });
            if (existingSubscriber) {
                return res.status(409).json({ message: 'This email is already subscribed.' });
            }

            // 创建新的订阅者对象
            const newSubscriber = new Subscriber({
                name,
                email,
                score,
                selectedPrograms,
                currentProgram,
            });

            // 保存订阅者到数据库
            await newSubscriber.save();
            console.log('✅ New subscriber saved to database:', email);
            
            // 立即返回成功响应给用户
            res.status(200).json({ success: true, message: 'Subscribed successfully!' });
            
            // 异步发送欢迎邮件（不阻塞响应）
            setImmediate(async () => {
                try {
                    const result = await sendWelcomeEmail(newSubscriber);
                    if (result && result.success) {
                        // 标记为已发送欢迎邮件
                        await Subscriber.updateOne(
                            { _id: newSubscriber._id },
                            { welcomeEmailSent: true }
                        );
                        console.log('✅ Welcome email sent asynchronously to:', email);
                    } else {
                        console.log('⚠️ Welcome email failed:', result ? result.error : 'Unknown error');
                    }
                } catch (emailError) {
                    console.error('Failed to send welcome email:', emailError);
                }
            });
        } catch (error) {
            console.error('Error saving subscriber:', error);
            res.status(500).json({ success: false, message: 'Failed to save subscriber.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
