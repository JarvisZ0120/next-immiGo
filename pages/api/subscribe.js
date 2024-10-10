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
    origin: 'https://next-immigo-production.up.railway.app'
}));

app.use(express.json());

// MongoDB Atlas 连接字符串
const mongoURI = process.env.MONGODB_URI;

// 连接到 MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Failed to connect to MongoDB Atlas:', error));

// API 路由：处理订阅请求并保存订阅者信息
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, score, selectedPrograms, currentProgram } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        try {
            // 检查是否已存在相同的订阅者
            const existingSubscriber = await Subscriber.findOne({ email });
            if (existingSubscriber) {
                return res.status(409).json({ message: 'This email is already subscribed.' });
            }

            // 创建新的订阅者对象
            const newSubscriber = new Subscriber({
                name,
                email,
                score,
                selectedPrograms,
                currentProgram,
            });

            // 保存订阅者到数据库
            await newSubscriber.save();
            res.status(200).json({ success: true, message: 'Subscribed successfully!' });
        } catch (error) {
            console.error('Error saving subscriber:', error);
            res.status(500).json({ success: false, message: 'Failed to save subscriber.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
