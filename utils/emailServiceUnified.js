// Gmail邮件服务
const nodemailer = require('nodemailer');

// 注意：环境变量应该在server.js中已经加载，这里不需要重复加载

console.log('📧 使用Gmail邮件服务');
// Gmail配置已加载

// 创建Gmail transporter (优化DNS和连接设置)
const createGmailTransporter = () => {
    // 检查是否在生产环境（Railway）
    const isProduction = process.env.RAILWAY_ENVIRONMENT === 'production';
    
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
        connectionTimeout: isProduction ? 60000 : 30000, // 生产环境60秒，本地30秒
        greetingTimeout: isProduction ? 30000 : 15000,   // 生产环境30秒，本地15秒
        socketTimeout: isProduction ? 60000 : 30000,     // 生产环境60秒，本地30秒
        // DNS解析优先使用IPv4（云环境更稳定）
        dnsTimeout: isProduction ? 30000 : 10000,        // 生产环境30秒，本地10秒
        // TLS设置
        tls: {
            rejectUnauthorized: !isProduction, // 生产环境放宽TLS验证
            minVersion: 'TLSv1.2'
        },
        // 连接池设置
        pool: true,
        maxConnections: 5,
        maxMessages: 100,
        // 调试模式（仅在开发环境）
        debug: !isProduction,
        logger: !isProduction
    });
};

// 发送邮件的通用函数（带重试机制）
const sendEmail = async (to, subject, html, fromName = 'ImmiGo Immigration Updates', retries = 3) => {
    const transporter = createGmailTransporter();
    
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
            
            // 如果是最后一次尝试，返回失败
            if (attempt === retries) {
                console.error(`❌ Gmail failed to send email to ${to} after ${retries} attempts`);
                return { 
                    success: false, 
                    error: error.message, 
                    code: error.code,
                    attempts: retries 
                };
            }
            
            // 等待后重试（指数退避）
            const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
            console.log(`⏳ 等待 ${waitTime}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
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
