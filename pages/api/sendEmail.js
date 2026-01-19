import { sendEmail } from '../../utils/emailServiceES6.js';
import dotenv from 'dotenv';

// 重要：先清理Shell环境变量，确保使用.env文件中的值
// 这样可以避免Shell环境变量覆盖.env文件
delete process.env.GMAIL_USER;
delete process.env.GMAIL_PASS;

// 然后加载.env文件
dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        try {
            const result = await sendEmail(email, subject, message);
            
            if (result.success) {
                return res.status(200).json({ success: true, message: 'Email sent successfully!' });
            } else {
                return res.status(500).json({
                    success: false,
                    error: result.error,
                    code: result.code,
                });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
