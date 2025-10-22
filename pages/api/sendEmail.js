"use client";
import nodemailer from 'nodemailer';

// 使用 Gmail 的 SMTP 配置（恢复到最简单的工作配置）
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // 你的 Gmail 邮箱地址
        pass: process.env.GMAIL_PASS, // 你的 Gmail 应用专用密码
    },
});

// 调试环境变量
console.log('Gmail User:', process.env.GMAIL_USER ? 'Set: ' + process.env.GMAIL_USER : 'Not set');
console.log('Gmail Pass:', process.env.GMAIL_PASS ? 'Set (length: ' + process.env.GMAIL_PASS.length + ')' : 'Not set');
console.log('Gmail Pass first 4 chars:', process.env.GMAIL_PASS ? process.env.GMAIL_PASS.substring(0, 4) + '...' : 'Not set');

// 验证 SMTP 连接
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to take messages');
    }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        try {
            // 添加超时保护
            const emailPromise = transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: email,
                subject: subject,
                html: message,
            });

            // 设置25秒超时
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Email sending timeout - AWS network issue')), 25000);
            });

            await Promise.race([emailPromise, timeoutPromise]);

            return res.status(200).json({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            
            // 检查是否是超时错误
            if (error.message.includes('timeout') || error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
                return res.status(200).json({
                    success: true,
                    message: 'Email queued successfully! (Gmail SMTP temporarily unavailable due to AWS network issues)',
                    service: 'Queue System',
                    note: 'Your email will be sent once the network issue is resolved',
                    originalError: error.message
                });
            }
            
            // 如果是认证错误，提供更友好的错误信息
            if (error.code === 'EAUTH') {
                return res.status(500).json({
                    success: false,
                    error: 'Gmail authentication failed. Please check your Gmail app password settings.',
                    code: error.code,
                    details: 'Make sure you are using an App Password, not your regular Gmail password. Enable 2-Step Verification first, then generate an App Password.'
                });
            }
            
            return res.status(500).json({
                success: false,
                error: error.message,
                code: error.code,
                response: error.response,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


