// server.js
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
const { sendUpdateEmail, sendCongratsEmail } = require('./utils/emailServiceUnified');

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

        console.log(`📊 [${new Date().toISOString()}] 获取到draw: ${latestDraw.drawNumber}, 日期: ${latestDraw.drawDateFull}, CRS: ${latestDraw.drawCRS}`);

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
        const allRounds = await response.json();

        const data = allRounds.rounds[0];

        // 解析日期并检查是否有效
        const drawDate = new Date(data.drawDate);
        if (isNaN(drawDate.getTime())) {
            throw new Error('Invalid draw date format');
        }

        // 检查 drawName 是否存在并有效
        const drawName = (data.drawName || 'No Program Specified').replace(/\(Version 1\)/g, '').trim(); // 如果 drawName 为空，提供默认值

        // 检查 CRS 分数，确保是有效整数
        const crsScore = parseInt(data.drawCRS, 10);
        if (isNaN(crsScore)) {
            throw new Error('Invalid CRS score format');
        }

        // 提取最新的 draw 数据
        return {
            id: `draw-${data.drawNumber}`, // 使用 drawNumber 作为唯一 ID
            date: drawDate, // 确保日期是有效的 Date 对象
            details: drawName, // drawName 描述
            crsScore, // CRS 分数，确保为整数
            invitations: data.drawSize,
        };
    } catch (error) {
        console.error('Error fetching draw data:', error);
        return null; // 返回 null 表示获取数据失败
    }
}


// 检查每个用户是否符合发送邮件的条件
async function checkSubscribersAndSendEmails(draw) {
    try {
        const subscribers = await Subscriber.find({ isSubscribed: true });
        console.log(`📧 检查 ${subscribers.length} 个订阅者...`);

        let updateEmailsSent = 0;
        let congratsEmailsSent = 0;
        let emailsFailed = 0;

        for (const subscriber of subscribers) {
            // 检查 drawName 是否在用户的 selectedPrograms 中
            if (subscriber.selectedPrograms.includes(draw.details)) {
                console.log(`📤 发送更新邮件给: ${subscriber.email}`);
                const result = await sendUpdateEmail(subscriber, draw);
                if (result && result.success) {
                    updateEmailsSent++;
                } else {
                    emailsFailed++;
                }
            }

            // 检查 drawName 是否等于 currentProgram 且用户 score 高于 drawCRS
            if (subscriber.currentProgram === draw.details && subscriber.score > draw.crsScore) {
                console.log(`🎉 发送祝贺邮件给: ${subscriber.email}`);
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