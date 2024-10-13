"use client";
require('dotenv').config(); // 加载环境变量

const https = require('https');
const fs = require('fs');

const express = require('express');
import mongoose from 'mongoose';
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const cors = require('cors');
// const fetch = require('node-fetch'); // 使用 node-fetch 获取数据
require('dotenv').config();

import Subscriber from '../../models/Subscriber';


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


// 连接到 MongoDB Atlas
const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        // 如果已经连接，则不需要重复连接
        return;
    }

    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.error('Failed to connect to MongoDB Atlas:', error));
};

export default async function handler(req, res) {
    // 只处理 POST 请求
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        try {
            // 连接数据库
            await connectDB();

            // 查找订阅者并更新其订阅状态为 false
            const subscriber = await Subscriber.findOneAndUpdate(
                { email },
                { isSubscribed: false }
            );

            if (!subscriber) {
                return res.status(404).json({ message: 'Subscriber not found.' });
            }

            res.status(200).json({ success: true, message: 'You have successfully unsubscribed.' });
        } catch (error) {
            console.error('Error updating subscriber:', error);
            res.status(500).json({ success: false, message: 'Failed to unsubscribe.' });
        }
    } else {
        // 只允许 POST 请求
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
