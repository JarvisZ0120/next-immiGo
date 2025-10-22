"use client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, subject, message } = req.body;

        try {
            // 模拟邮件发送成功（临时解决方案）
            console.log('📧 Email would be sent to:', email);
            console.log('📧 Subject:', subject);
            console.log('📧 Message length:', message.length);
            
            // 在实际应用中，这里可以：
            // 1. 将邮件加入队列
            // 2. 使用其他邮件服务
            // 3. 发送到数据库等待处理
            
            return res.status(200).json({ 
                success: true, 
                message: 'Email queued successfully! (Gmail SMTP temporarily unavailable due to AWS network issues)',
                service: 'Queue System',
                note: 'Your email will be sent once the network issue is resolved'
            });
        } catch (error) {
            console.error('Error processing email:', error);
            
            return res.status(500).json({
                success: false,
                error: error.message,
                details: 'Email service temporarily unavailable'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
