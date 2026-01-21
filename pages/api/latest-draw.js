import mongoose from 'mongoose';
import Draw from '../../models/Draw';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Atlas 连接字符串
const mongoURI = process.env.MONGODB_URI;

// 确保 MongoDB 连接
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(mongoURI);
};

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectDB();

        // 获取最新的 draw（按日期降序排列）
        const latestDraw = await Draw.findOne().sort({ date: -1 });

        if (!latestDraw) {
            return res.status(404).json({ 
                success: false, 
                error: 'No draws found in database' 
            });
        }

        // 返回格式化的数据
        return res.status(200).json({
            success: true,
            draw: {
                id: latestDraw.id,
                drawName: latestDraw.details,
                drawCRS: latestDraw.crsScore,
                drawSize: latestDraw.invitations,
                drawDate: latestDraw.date,
                drawDateFull: latestDraw.date.toISOString()
            }
        });
    } catch (error) {
        console.error('Error fetching latest draw:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}
