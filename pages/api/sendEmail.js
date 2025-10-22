"use client";
import nodemailer from 'nodemailer';

// 使用 Gmail 的 SMTP 配置 - 针对Railway优化
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // 使用STARTTLS
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
});

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
            await transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: email,
                subject: subject,
                html: message,
            });

            return res.status(200).json({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error); // 打印完整的错误信息
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

