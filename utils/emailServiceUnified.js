// 邮件服务 - 通过HTTP API调用
// 使用Node.js内置的fetch（Node 18+）或动态导入node-fetch
let fetch;
if (typeof globalThis.fetch !== 'undefined') {
    // Node.js 18+ 内置fetch
    fetch = globalThis.fetch;
} else {
    // 动态导入node-fetch（ES模块）
    fetch = async (url, options) => {
        const { default: fetchModule } = await import('node-fetch');
        return fetchModule(url, options);
    };
}

console.log('📧 使用HTTP API邮件服务');

// 获取API基础URL
const getApiBaseUrl = () => {
    // 如果在生产环境（Railway），使用完整URL
    if (process.env.RAILWAY_ENVIRONMENT === 'production' || process.env.RAILWAY === 'true') {
        return process.env.NEXT_PUBLIC_SITE_URL || 'https://immigoo.com';
    }
    // 本地开发环境
    return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};

// 通过HTTP API发送邮件
const sendEmail = async (to, subject, html, fromName = 'ImmiGo Immigration Updates') => {
    const apiUrl = `${getApiBaseUrl()}/api/send-email`;
    
    try {
        console.log(`📤 [HTTP] 发送邮件到 ${to}`);
        
        // 使用AbortController实现超时
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒超时
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to,
                subject,
                html,
                fromName
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.success) {
            console.log(`✅ 邮件发送成功 via ${result.provider || 'HTTP API'}`);
            return {
                success: true,
                message: result.message || 'Email sent successfully',
                provider: result.provider,
                id: result.id
            };
        } else {
            throw new Error(result.error || 'Email sending failed');
        }
    } catch (error) {
        console.error(`❌ HTTP邮件发送失败:`, error.message);
        return {
            success: false,
            error: error.message,
            code: error.code
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
