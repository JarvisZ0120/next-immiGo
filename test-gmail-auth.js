// 测试Gmail认证
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔍 检查环境变量...');
console.log('GMAIL_USER:', process.env.GMAIL_USER || '未设置');
console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? `已设置 (长度: ${process.env.GMAIL_PASS.length})` : '未设置');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    }
});

console.log('\n📧 测试SMTP连接...');
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP认证失败:', error.message);
        console.error('错误代码:', error.code);
        process.exit(1);
    } else {
        console.log('✅ SMTP服务器连接成功！Gmail认证正常！');
        process.exit(0);
    }
});

