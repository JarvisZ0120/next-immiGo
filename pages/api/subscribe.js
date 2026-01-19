import mongoose from 'mongoose';
import Subscriber from '../../models/Subscriber';
import dotenv from 'dotenv';

// 重要：先清理Shell环境变量，确保使用.env文件中的值
// 这样可以避免Shell环境变量覆盖.env文件
delete process.env.GMAIL_USER;
delete process.env.GMAIL_PASS;

// 然后加载.env文件
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
            
            // 异步发送欢迎邮件（在响应返回后，使用process.nextTick确保执行）
            // 这样可以避免Next.js在响应返回后立即终止进程
            process.nextTick(async () => {
                try {
                    console.log('📧 开始发送欢迎邮件到:', email);
                    const result = await sendWelcomeEmail(newSubscriber);
                    if (result && result.success) {
                        // 标记为已发送欢迎邮件
                        await Subscriber.updateOne(
                            { _id: newSubscriber._id },
                            { welcomeEmailSent: true }
                        );
                        console.log('✅ Welcome email sent successfully to:', email);
                    } else {
                        console.error('⚠️ Welcome email failed for:', email);
                        console.error('错误信息:', result ? result.error : 'Unknown error');
                        console.error('错误代码:', result ? result.code : 'N/A');
                        console.error('尝试次数:', result ? result.attempts : 'N/A');
                    }
                } catch (emailError) {
                    console.error('❌ Failed to send welcome email to:', email);
                    console.error('错误:', emailError.message);
                    console.error('堆栈:', emailError.stack);
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
