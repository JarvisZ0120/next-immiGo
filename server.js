// server.js
// 重要：先清理Shell环境变量，确保使用.env文件中的值
// 这样可以避免Shell环境变量覆盖.env文件
delete process.env.GMAIL_USER;
delete process.env.GMAIL_PASS;

// 然后加载.env文件
require('dotenv').config(); // 加载环境变量

const https = require('https');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const cors = require('cors');
// const fetch = require('node-fetch'); // 使用 node-fetch 获取数据

const Subscriber = require('./models/Subscriber'); // 导入订阅者模型
const Draw = require('./models/Draw'); // 导入Draw模型
const { sendUpdateEmail, sendCongratsEmail, sendWelcomeEmail } = require('./utils/emailServiceUnified');

const app = express();

// 读取自签名证书和私钥
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.use(cors()); // 允许跨域请求
app.use(cors({
    origin: 'https://immigoo.com'
}));

app.use(express.json());

// MongoDB Atlas 连接字符串
const mongoURI = process.env.MONGODB_URI;

// 连接到 MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Failed to connect to MongoDB Atlas:', error));

// API 路由：处理订阅请求并保存订阅者信息
// app.post('/api/subscribe', async (req, res) => {
//     const { name, email, score, selectedPrograms, currentProgram } = req.body;

//     if (!name || !email ) {
//         return res.status(400).json({ error: 'Please provide all required fields.' });
//     }

//     try {
//         // 检查是否已存在相同的订阅者
//         const existingSubscriber = await Subscriber.findOne({ email });
//         if (existingSubscriber) {
//             return res.status(409).json({ message: 'This email is already subscribed.' });
//         }

//         // 创建新的订阅者对象
//         const newSubscriber = new Subscriber({
//             name,
//             email,
//             score,
//             selectedPrograms,
//             currentProgram,
//         });

//         // 保存订阅者到数据库
//         await newSubscriber.save();
//         res.status(200).json({ success: true, message: 'Subscribed successfully!' });
//     } catch (error) {
//         console.error('Error saving subscriber:', error);
//         res.status(500).json({ success: false, message: 'Failed to save subscriber.' });
//     }
// });



// 定时任务 - 每小时检查一次最新的 draws 更新
// cron.schedule('0 * * * *', async () => {
    
// 定时任务 - 每 12 分钟检查一次最新的 draws 更新
cron.schedule('*/12 * * * *', async () => {
    const now = new Date();
    console.log(`🔍 [${now.toISOString()}] 检查新的draws...`);
    try {
        const latestDraw = await fetchLatestDraw();
        if (!latestDraw) {
            console.log(`❌ [${new Date().toISOString()}] 无法获取最新draw数据`);
            return;
        }

        console.log(`📊 [${new Date().toISOString()}] 获取到draw: ${latestDraw.id}, 日期: ${latestDraw.date}, CRS: ${latestDraw.crsScore}, 详情: ${latestDraw.details}`);

        const existingDraw = await Draw.findOne({ id: latestDraw.id });

        if (!existingDraw) {
            console.log(`🆕 [${new Date().toISOString()}] 发现新draw! 开始保存并发送邮件...`);
            const newDraw = new Draw(latestDraw);
            await newDraw.save();
            await checkSubscribersAndSendEmails(newDraw); // 检查订阅者并发送相应邮件
            console.log(`✅ [${new Date().toISOString()}] 新draw已保存，邮件已发送`);
        } else {
            console.log(`ℹ️ [${new Date().toISOString()}] 没有新的draws`);
        }
    } catch (error) {
        console.error(`💥 [${new Date().toISOString()}] 定时任务出错:`, error);
    }
});

// 从官方数据源获取最新 draw 数据
async function fetchLatestDraw() {
    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch('https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const allRounds = await response.json();

        if (!allRounds || !allRounds.rounds || allRounds.rounds.length === 0) {
            throw new Error('No rounds data found in API response');
        }

        const data = allRounds.rounds[0];

        if (!data) {
            throw new Error('First round data is empty');
        }

        // 解析日期 - 尝试多个可能的字段名
        const drawDateStr = data.drawDateFull || data.drawDate || data.date;
        if (!drawDateStr) {
            throw new Error('No draw date field found in data');
        }
        
        const drawDate = new Date(drawDateStr);
        if (isNaN(drawDate.getTime())) {
            throw new Error(`Invalid draw date format: ${drawDateStr}`);
        }

        // 检查 drawName 是否存在并有效
        const drawName = (data.drawName || 'No Program Specified').replace(/\(Version \d+\)/g, '').trim();

        // 检查 CRS 分数，确保是有效整数
        const crsScoreStr = data.drawCRS || data.crsScore;
        if (!crsScoreStr) {
            throw new Error('No CRS score found in data');
        }
        
        const crsScore = parseInt(String(crsScoreStr).replace(/,/g, ''), 10);
        if (isNaN(crsScore)) {
            throw new Error(`Invalid CRS score format: ${crsScoreStr}`);
        }

        // 检查 drawNumber
        const drawNumber = data.drawNumber;
        if (!drawNumber) {
            throw new Error('No draw number found in data');
        }

        // 提取最新的 draw 数据
        const drawData = {
            id: `draw-${drawNumber}`, // 使用 drawNumber 作为唯一 ID
            date: drawDate, // 确保日期是有效的 Date 对象
            details: drawName, // drawName 描述
            crsScore, // CRS 分数，确保为整数
            invitations: String(data.drawSize || data.invitations || '0'),
        };

        console.log(`✅ 成功解析draw数据:`, JSON.stringify(drawData, null, 2));
        return drawData;
    } catch (error) {
        console.error('❌ Error fetching draw data:', error.message);
        console.error('错误堆栈:', error.stack);
        return null; // 返回 null 表示获取数据失败
    }
}


// 程序名称模糊匹配函数
// 例如: "French-Language proficiency 2026-Version 2" 应该匹配 "French language proficiency"
function programMatches(drawName, programName) {
    if (!drawName || !programName) return false;
    
    // 标准化字符串：转小写，移除特殊字符，只保留字母数字和空格
    const normalize = (str) => str.toLowerCase()
        .replace(/[-_]/g, ' ')  // 将连字符和下划线转为空格
        .replace(/\d{4}/g, '')  // 移除年份如 2026
        .replace(/version\s*\d+/gi, '')  // 移除 "Version 1" 等
        .replace(/[^a-z\s]/g, '')  // 只保留字母和空格
        .replace(/\s+/g, ' ')  // 多个空格合并为一个
        .trim();
    
    const normalizedDraw = normalize(drawName);
    const normalizedProgram = normalize(programName);
    
    // 检查是否包含
    if (normalizedDraw.includes(normalizedProgram)) {
        return true;
    }
    
    // 提取关键词进行匹配（至少80%的关键词匹配）
    const programWords = normalizedProgram.split(' ').filter(w => w.length > 2);
    const drawWords = normalizedDraw.split(' ');
    
    if (programWords.length === 0) return false;
    
    const matchedWords = programWords.filter(word => 
        drawWords.some(dw => dw.includes(word) || word.includes(dw))
    );
    
    const matchRatio = matchedWords.length / programWords.length;
    
    // 如果80%以上的关键词匹配，认为是同一个项目
    return matchRatio >= 0.8;
}

// 检查订阅者是否关注了某个项目（模糊匹配）
function subscriberInterestedIn(subscriber, drawDetails) {
    if (!subscriber.selectedPrograms || subscriber.selectedPrograms.length === 0) {
        return false;
    }
    
    return subscriber.selectedPrograms.some(program => programMatches(drawDetails, program));
}

// 检查每个用户是否符合发送邮件的条件
async function checkSubscribersAndSendEmails(draw) {
    try {
        const subscribers = await Subscriber.find({ isSubscribed: true });
        console.log(`📧 检查 ${subscribers.length} 个订阅者...`);
        console.log(`📋 当前抽签项目: "${draw.details}"`);

        let updateEmailsSent = 0;
        let congratsEmailsSent = 0;
        let emailsFailed = 0;

        for (const subscriber of subscribers) {
            // 使用模糊匹配检查 drawName 是否在用户的 selectedPrograms 中
            if (subscriberInterestedIn(subscriber, draw.details)) {
                console.log(`📤 发送更新邮件给: ${subscriber.email} (匹配项目: ${draw.details})`);
                const result = await sendUpdateEmail(subscriber, draw);
                if (result && result.success) {
                    updateEmailsSent++;
                } else {
                    emailsFailed++;
                }
            }

            // 使用模糊匹配检查 currentProgram 且用户 score 高于 drawCRS
            if (programMatches(draw.details, subscriber.currentProgram) && subscriber.score > draw.crsScore) {
                console.log(`🎉 发送祝贺邮件给: ${subscriber.email} (分数 ${subscriber.score} > ${draw.crsScore})`);
                const result = await sendCongratsEmail(subscriber, draw);
                if (result && result.success) {
                    congratsEmailsSent++;
                } else {
                    emailsFailed++;
                }
            }
        }
        
        console.log(`✅ 邮件发送完成: 更新邮件 ${updateEmailsSent} 封, 祝贺邮件 ${congratsEmailsSent} 封, 失败 ${emailsFailed} 封`);
    } catch (error) {
        console.error('Error checking subscribers and sending emails:', error);
    }
}

// 发送更新邮件给符合 selectedPrograms 的用户
// 使用统一的邮件服务

// 发送祝贺邮件给符合 currentProgram 的用户且 CRS 分数高于 drawCRS
// 使用统一的邮件服务


// 取消订阅 API 路由
// app.post('/api/unsubscribe', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: 'Email is required.' });
//     }

//     try {
//         // 查找订阅者并更新其订阅状态为 false
//         const subscriber = await Subscriber.findOneAndUpdate(
//             { email },
//             { isSubscribed: false },
//             { new: true }
//         );

//         if (!subscriber) {
//             return res.status(404).json({ message: 'Subscriber not found.' });
//         }

//         res.status(200).json({ success: true, message: 'You have successfully unsubscribed.' });
//     } catch (error) {
//         console.error('Error updating subscriber:', error);
//         res.status(500).json({ success: false, message: 'Failed to unsubscribe.' });
//     }
// });



// 启动服务器
// app.listen(3001, () => {
//     console.log('Server running on http://localhost:3001');
// });

https.createServer(credentials, app).listen(3001, () => {
    console.log('HTTPS Server running on https://immigoo.com:3001/ http://localhost:3001');
});