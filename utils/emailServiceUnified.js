// 邮件服务 - 直接使用 Gmail API (HTTP)
const { google } = require('googleapis');

console.log('📧 使用 Gmail API 邮件服务（直接调用）');

// Gmail API 配置
const getGmailConfig = () => ({
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    user: process.env.GMAIL_USER
});

// 创建 OAuth2 客户端
const createOAuth2Client = () => {
    const config = getGmailConfig();
    
    const oauth2Client = new google.auth.OAuth2(
        config.clientId,
        config.clientSecret,
        'https://developers.google.com/oauthplayground'
    );
    
    oauth2Client.setCredentials({
        refresh_token: config.refreshToken
    });
    
    return oauth2Client;
};

// 创建邮件内容（RFC 2822 格式）
const createEmailMessage = (to, subject, html, fromName) => {
    const config = getGmailConfig();
    const from = `${fromName} <${config.user}>`;
    
    const messageParts = [
        `From: ${from}`,
        `To: ${to}`,
        `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        '',
        html
    ];
    
    const message = messageParts.join('\r\n');
    
    // Base64url 编码
    const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    
    return encodedMessage;
};

// 发送邮件函数 - 直接调用 Gmail API
const sendEmail = async (to, subject, html, fromName = 'ImmiGo Immigration Updates') => {
    const config = getGmailConfig();
    
    // 检查配置
    if (!config.clientId || !config.clientSecret || !config.refreshToken || !config.user) {
        console.error('❌ Gmail API 配置不完整');
        console.error('需要: GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_USER');
        return {
            success: false,
            error: 'Gmail API not configured',
            code: 'NO_CONFIG'
        };
    }

    try {
        console.log(`📤 [Gmail API] 发送邮件到 ${to}`);
        
        const oauth2Client = createOAuth2Client();
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
        
        const encodedMessage = createEmailMessage(to, subject, html, fromName);
        
        const result = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage
            }
        });

        console.log(`✅ [Gmail API] 邮件发送成功 to ${to}, messageId: ${result.data.id}`);
        return {
            success: true,
            message: 'Email sent successfully via Gmail API',
            provider: 'gmail-api',
            id: result.data.id
        };
    } catch (error) {
        console.error(`❌ [Gmail API] 发送失败:`, error.message);
        return {
            success: false,
            error: error.message,
            code: error.code || 'GMAIL_API_ERROR'
        };
    }
};

// 发送更新邮件（新draw通知）
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

// 发送欢迎邮件（新关注）
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
