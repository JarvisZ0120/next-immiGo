"use client";
// models/Draw.js
const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    details: { type: String, required: true },
    crsScore: { type: Number, required: true },
    invitations: { type: String, required: true }
});

module.exports = mongoose.model('Draw', drawSchema);
