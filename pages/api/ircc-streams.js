import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(mongoURI);
};

const {
  streamsPayloadFromIrccBody,
  mergeStreamLists,
  FALLBACK,
} = require('../../utils/irccStreamsPayload');

const IrccStreamsCache = require('../../models/IrccStreamsCache');

/** 直连 IRCC（Serverless 上可能失败；成功时写入 Mongo 供下次命中缓存） */
const IRCC_FETCH_INIT = {
  cache: 'no-store',
  headers: {
    Accept: 'application/json,text/plain,*/*',
    'Accept-Language': 'en-CA,en;q=0.9',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    Referer: 'https://www.canada.ca/',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.setHeader('Cache-Control', 'no-store, must-revalidate');

  try {
    await connectDB();
  } catch (e) {
    console.error('ircc-streams Mongo connect:', e.message);
  }

  /** 1) 优先 Mongo：由本机/VPS 上 server.js 定时任务写入，避免 prod Serverless 连不上 IRCC */
  try {
    const cached = await IrccStreamsCache.findById('singleton').lean();
    if (cached?.streams?.length) {
      return res.status(200).json({
        streams: cached.streams,
        source: 'mongo-cache',
        cachedAt: cached.updatedAt,
      });
    }
  } catch (e) {
    console.error('ircc-streams mongo read:', e.message);
  }

  /** 2) 无缓存时再直连 IRCC（本地开发常见） */
  try {
    const response = await fetch(
      'https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json',
      IRCC_FETCH_INIT
    );
    if (!response.ok) {
      throw new Error(`IRCC HTTP ${response.status}`);
    }
    const data = await response.json();
    const streams = streamsPayloadFromIrccBody(data);

    try {
      await connectDB();
      await IrccStreamsCache.findOneAndUpdate(
        { _id: 'singleton' },
        { streams, updatedAt: new Date() },
        { upsert: true }
      );
    } catch (persistErr) {
      console.error('ircc-streams persist:', persistErr.message);
    }

    return res.status(200).json({ streams, source: 'ircc' });
  } catch (e) {
    console.error('ircc-streams IRCC fetch:', e.message);
  }

  /** 3) IRCC 失败再读一次 Mongo（竞态或刚写入） */
  try {
    const cached = await IrccStreamsCache.findById('singleton').lean();
    if (cached?.streams?.length) {
      return res.status(200).json({
        streams: cached.streams,
        source: 'mongo-cache',
        cachedAt: cached.updatedAt,
      });
    }
  } catch (_) {
    /* noop */
  }

  /** 4) 静态兜底 */
  return res.status(200).json({
    streams: mergeStreamLists([], FALLBACK),
    source: 'fallback',
    error: 'No Mongo cache and IRCC fetch unavailable',
  });
}
