import { sendEmail } from '../../utils/emailServiceES6.js';

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
