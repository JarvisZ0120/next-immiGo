import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Subscriber from '../../models/Subscriber';
const { welcomeEmailTemplate } = require('../../utils/emailTemplates');

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
            
            // 发送欢迎邮件
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: {
                        name: 'ImmiGo Immigration Updates',
                        address: process.env.GMAIL_USER
                    },
                    to: email,
                    subject: '🎉 Welcome to ImmiGo - Your Immigration Journey Begins!',
                    html: welcomeEmailTemplate(newSubscriber),
                });
                
                console.log(`Welcome email sent to ${email}`);
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
                // 不影响订阅成功的响应
            }
            
            res.status(200).json({ success: true, message: 'Subscribed successfully!' });
        } catch (error) {
            console.error('Error saving subscriber:', error);
            res.status(500).json({ success: false, message: 'Failed to save subscriber.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
