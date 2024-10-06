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
    isSubscribed: { type: Boolean, default: true }, // 新增字段，默认设置为已订阅
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
