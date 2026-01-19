// Gmail邮件服务（带Resend备用方案）
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

// 注意：环境变量应该在server.js中已经加载，这里不需要重复加载

console.log('📧 使用Gmail邮件服务（带Resend备用）');
// Gmail配置已加载

// 初始化Resend（如果配置了API key）
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// 创建Gmail transporter (优化DNS和连接设置)
const createGmailTransporter = () => {
    // 检查是否在生产环境（Railway或其他云平台）
    // Railway会设置RAILWAY_ENVIRONMENT或RAILWAY变量
    const isProduction = process.env.RAILWAY_ENVIRONMENT === 'production' || 
                        process.env.RAILWAY === 'true' ||
                        process.env.NODE_ENV === 'production';
    
    // 在云环境中使用更长的超时时间
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // 使用 STARTTLS
        auth: {
            user: (process.env.GMAIL_USER || '').trim(),
            pass: (process.env.GMAIL_PASS || '').trim(),
        },
        // 增加超时和重试设置，特别针对云环境
        // Railway等云环境需要更长的超时时间
        connectionTimeout: isProduction ? 90000 : 30000, // 生产环境90秒，本地30秒
        greetingTimeout: isProduction ? 45000 : 15000,   // 生产环境45秒，本地15秒
        socketTimeout: isProduction ? 90000 : 30000,     // 生产环境90秒，本地30秒
        // DNS解析优先使用IPv4（云环境更稳定）
        dnsTimeout: isProduction ? 45000 : 10000,        // 生产环境45秒，本地10秒
        // TLS设置
        tls: {
            rejectUnauthorized: !isProduction, // 生产环境放宽TLS验证
            minVersion: 'TLSv1.2'
        },
        // 连接池设置
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        // 连接选项
        requireTLS: true,
        // 调试模式（仅在开发环境）
        debug: !isProduction,
        logger: !isProduction
    });
};

// 发送邮件的通用函数（带重试机制）
const sendEmail = async (to, subject, html, fromName = 'ImmiGo Immigration Updates', retries = 3) => {
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
            console.log(`📤 尝试发送邮件 (${attempt}/${retries}) to ${to}`);
            await transporter.sendMail(mailOptions);
            console.log(`✅ Gmail email sent successfully to ${to}`);
            return { success: true, message: 'Email sent successfully via Gmail' };
        } catch (error) {
            console.error(`❌ 发送失败 (尝试 ${attempt}/${retries}):`, error.message);
            console.error(`错误代码: ${error.code || 'N/A'}`);
            
            // 如果是最后一次尝试，尝试使用Resend备用方案
            if (attempt === retries) {
                console.error(`❌ Gmail failed to send email to ${to} after ${retries} attempts`);
                
                // 如果配置了Resend，尝试使用Resend作为备用
                if (resend) {
                    console.log(`⚠️ 切换到Resend备用方案...`);
                    try {
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

                        console.log(`✅ Resend email sent successfully to ${to}`);
                        return { 
                            success: true, 
                            message: 'Email sent successfully via Resend (fallback)', 
                            provider: 'resend',
                            fallback: true,
                            id: data?.id
                        };
                    } catch (resendError) {
                        console.error(`❌ Resend备用方案也失败:`, resendError.message);
                        return { 
                            success: false, 
                            error: `Both Gmail and Resend failed. Gmail: ${error.message}, Resend: ${resendError.message}`, 
                            code: error.code,
                            attempts: retries 
                        };
                    }
                } else {
                    // 没有配置Resend，直接返回失败
                    return { 
                        success: false, 
                        error: error.message, 
                        code: error.code,
                        attempts: retries 
                    };
                }
            }
            
            // 等待后重试（指数退避）
            // 对于连接超时，使用更长的等待时间
            const isTimeout = error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET';
            const baseWaitTime = isTimeout ? 3000 : 1000; // 超时错误等待3秒，其他错误1秒
            const waitTime = Math.min(baseWaitTime * Math.pow(2, attempt - 1), 15000);
            console.log(`⏳ 等待 ${waitTime}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            
            // 每次重试前重新创建transporter，避免使用旧的连接
            if (attempt < retries) {
                try {
                    transporter.close();
                } catch (closeError) {
                    // 忽略关闭错误
                }
                transporter = createGmailTransporter();
            }
        }
    }
    
    // 清理连接
    try {
        transporter.close();
    } catch (closeError) {
        // 忽略关闭错误
    }
};

// 发送更新邮件
const sendUpdateEmail = async (subscriber, draw) => {
    const { updateEmailTemplate } = require('./emailTemplates');
    
    return await sendEmail(
        subscriber.email,
        '🎯 New Express Entry Draw Announced!',
        updateEmailTemplate(subscriber, draw)
    );
};

// 发送祝贺邮件
const sendCongratsEmail = async (subscriber, draw) => {
    const { congratsEmailTemplate } = require('./emailTemplates');
    
    return await sendEmail(
        subscriber.email,
        '🎉 Congratulations! You Qualify for the Latest Draw!',
        congratsEmailTemplate(subscriber, draw)
    );
};

// 发送欢迎邮件
const sendWelcomeEmail = async (subscriber) => {
    const { welcomeEmailTemplate } = require('./emailTemplates');
    
    return await sendEmail(
        subscriber.email,
        '🎉 Welcome to ImmiGo - Your Immigration Journey Begins!',
        welcomeEmailTemplate(subscriber)
    );
};

module.exports = {
    sendEmail,
    sendUpdateEmail,
    sendCongratsEmail,
    sendWelcomeEmail
};
