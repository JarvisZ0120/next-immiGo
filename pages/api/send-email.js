import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// 重要：先清理Shell环境变量，确保使用.env文件中的值
delete process.env.GMAIL_USER;
delete process.env.GMAIL_PASS;

// 加载环境变量
dotenv.config();

// 初始化Resend（如果配置了API key）
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// 创建Gmail transporter
const createGmailTransporter = () => {
    const isProduction = process.env.RAILWAY_ENVIRONMENT === 'production' || 
                        process.env.RAILWAY === 'true' ||
                        process.env.NODE_ENV === 'production';
    
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: (process.env.GMAIL_USER || '').trim(),
            pass: (process.env.GMAIL_PASS || '').trim(),
        },
        connectionTimeout: isProduction ? 90000 : 30000,
        greetingTimeout: isProduction ? 45000 : 15000,
        socketTimeout: isProduction ? 90000 : 30000,
        dnsTimeout: isProduction ? 45000 : 10000,
        tls: {
            rejectUnauthorized: !isProduction,
            minVersion: 'TLSv1.2'
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        requireTLS: true,
        debug: !isProduction,
        logger: !isProduction
    });
};

// 使用Resend发送邮件
const sendEmailViaResend = async (to, subject, html, fromName) => {
    if (!resend) {
        throw new Error('Resend API key not configured');
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.GMAIL_USER || 'noreply@immigoo.com';
    const { data, error: resendError } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [to],
        subject: subject,
        html: html,
    });

    if (resendError) {
        throw new Error(resendError.message || 'Resend API error');
    }

    return { data, id: data?.id };
};

// 使用Gmail发送邮件
const sendEmailViaGmail = async (to, subject, html, fromName, retries = 2) => {
    let transporter = createGmailTransporter();
    const mailOptions = {
        from: {
            name: fromName,
            address: process.env.GMAIL_USER
        },
        to: to,
        subject: subject,
        html: html,
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await transporter.sendMail(mailOptions);
            
            // 清理连接
            try {
                transporter.close();
            } catch (closeError) {
                // 忽略关闭错误
            }
            
            return { success: true, provider: 'gmail' };
        } catch (error) {
            if (attempt === retries) {
                // 清理连接
                try {
                    transporter.close();
                } catch (closeError) {
                    // 忽略关闭错误
                }
                throw error;
            }
            
            // 等待后重试
            const isTimeout = error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET';
            const baseWaitTime = isTimeout ? 3000 : 1000;
            const waitTime = Math.min(baseWaitTime * Math.pow(2, attempt - 1), 10000);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            
            // 重新创建transporter
            try {
                transporter.close();
            } catch (closeError) {
                // 忽略关闭错误
            }
            transporter = createGmailTransporter();
        }
    }
    
    // 清理连接
    try {
        transporter.close();
    } catch (closeError) {
        // 忽略关闭错误
    }
};

// HTTP API处理函数
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { to, subject, html, fromName = 'ImmiGo Immigration Updates' } = req.body;

    // 验证必需字段
    if (!to || !subject || !html) {
        return res.status(400).json({ 
            error: 'Missing required fields: to, subject, html' 
        });
    }

    try {
        // 优先使用Resend（如果配置了）
        if (resend) {
            try {
                const result = await sendEmailViaResend(to, subject, html, fromName);
                return res.status(200).json({ 
                    success: true, 
                    message: 'Email sent successfully via Resend',
                    provider: 'resend',
                    id: result.id
                });
            } catch (resendError) {
                console.error('Resend failed, trying Gmail:', resendError.message);
                // Resend失败，尝试Gmail
            }
        }

        // 使用Gmail发送
        const result = await sendEmailViaGmail(to, subject, html, fromName);
        return res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully via Gmail',
            provider: 'gmail'
        });
    } catch (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            code: error.code
        });
    }
}
