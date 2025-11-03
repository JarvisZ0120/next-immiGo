// models/Subscriber.js
"use client";
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    score: { type: Number, required: false },
    selectedPrograms: { type: [String], required: true },
    currentProgram: { type: String, required: false },
    subscribedAt: { type: Date, default: Date.now },
    isSubscribed: { type: Boolean, default: true }, // 默认设置为已订阅
    welcomeEmailSent: { type: Boolean, default: false }, // 标记是否已发送欢迎邮件
    createdAt: { type: Date, default: Date.now }, // 创建时间
});

module.exports = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
