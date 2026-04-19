const mongoose = require('mongoose');

/** 由 server.js 定时任务写入；Next /api/ircc-streams 优先读取，避免 Serverless 直连 IRCC 被拒 */
const irccStreamsCacheSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  streams: { type: [String], default: [] },
  updatedAt: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.IrccStreamsCache ||
  mongoose.model('IrccStreamsCache', irccStreamsCacheSchema);
