// Gmail邮件服务
const nodemailer = require('nodemailer');

// 注意：环境变量应该在server.js中已经加载，这里不需要重复加载

console.log('📧 使用Gmail邮件服务');
console.log('🔍 Gmail User:', process.env.GMAIL_USER ? 'Set: ' + process.env.GMAIL_USER : 'Not set');
console.log('🔍 Gmail Pass:', process.env.GMAIL_PASS ? 'Set (length: ' + process.env.GMAIL_PASS.length + ')' : 'Not set');
console.log('🔍 Gmail Pass 内容:', process.env.GMAIL_PASS);
console.log('🔍 Gmail Pass 十六进制:', Buffer.from(process.env.GMAIL_PASS || '', 'utf8').toString('hex'));

// 创建Gmail transporter
const createGmailTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });
};

// 发送邮件的通用函数
const sendEmail = async (to, subject, html, fromName = 'ImmiGo Immigration Updates') => {
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

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Gmail email sent successfully to ${to}`);
        return { success: true, message: 'Email sent successfully via Gmail' };
    } catch (error) {
        console.error(`❌ Gmail failed to send email to ${to}:`, error.message);
        return { success: false, error: error.message, code: error.code };
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
