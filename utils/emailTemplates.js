// 专业的邮件HTML模板

// 基础邮件模板结构
const baseTemplate = (content, preheader = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>ImmiGo - Canada Immigration Updates</title>
    <!--[if mso]>
    <style>
        table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
        div, td {padding:0;}
        div {margin:0 !important;}
    </style>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f3f4f6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            font-size: 36px;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            letter-spacing: -0.5px;
            margin: 0;
        }
        .tagline {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            margin: 8px 0 0 0;
        }
        .content {
            padding: 40px 30px;
        }
        .hero-title {
            font-size: 28px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 16px 0;
            line-height: 1.3;
        }
        .hero-subtitle {
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 30px 0;
            line-height: 1.6;
        }
        .info-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .info-card-white {
            background: #f9fafb;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            font-weight: 500;
        }
        .info-value {
            color: #ffffff;
            font-size: 20px;
            font-weight: 700;
        }
        .info-label-dark {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
        }
        .info-value-dark {
            color: #1f2937;
            font-size: 20px;
            font-weight: 700;
        }
        .cta-button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            box-shadow: 0 4px 6px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            box-shadow: 0 6px 12px rgba(102, 126, 234, 0.5);
            transform: translateY(-2px);
        }
        .congrats-emoji {
            font-size: 48px;
            margin: 20px 0;
        }
        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
            margin: 8px 0;
        }
        .footer-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-link {
            display: inline-block;
            margin: 0 8px;
            color: #667eea;
            text-decoration: none;
        }
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #e5e7eb, transparent);
            margin: 30px 0;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px !important;
            }
            .hero-title {
                font-size: 24px !important;
            }
            .info-card, .info-card-white {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body>
    <!-- 预览文本 (在邮件客户端中显示，但在正文中隐藏) -->
    <div style="display: none; max-height: 0; overflow: hidden;">
        ${preheader}
    </div>
    
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6; padding: 20px 0;">
        <tr>
            <td align="center">
                <div class="email-container">
                    <!-- Header -->
                    <div class="header">
                        <h1 class="logo">🇨🇦 ImmiGo</h1>
                        <p class="tagline">Your Trusted Canadian Immigration Partner</p>
                    </div>
                    
                    <!-- Content -->
                    ${content}
                    
                    <!-- Footer -->
                    <div class="footer">
                        <p class="footer-text" style="font-weight: 600; color: #1f2937; margin-bottom: 12px;">
                            📍 ImmiGo Immigration Services
                        </p>
                        <p class="footer-text">
                            Vancouver, BC, Canada
                        </p>
                        <div class="divider"></div>
                        <p class="footer-text">
                            <a href="https://immigoo.com" class="footer-link">Visit Website</a> • 
                            <a href="https://immigoo.com/dashboard" class="footer-link">Dashboard</a> • 
                            <a href="https://immigoo.com/unsubscribe" class="footer-link">Unsubscribe</a>
                        </p>
                        <p class="footer-text" style="font-size: 12px; margin-top: 20px;">
                            You're receiving this email because you subscribed to ImmiGo immigration updates.
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// 更新邮件模板 (新抽签通知)
const updateEmailTemplate = (subscriber, draw) => {
    const drawDate = new Date(draw.date);
    const formattedDate = drawDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const content = `
        <div class="content">
            <h2 class="hero-title">🎯 New Express Entry Draw Announced!</h2>
            <p class="hero-subtitle">
                Great news! A new draw has been conducted for your selected program. Here are the details:
            </p>

            <div class="info-card">
                <div class="info-row">
                    <span class="info-label">📋 Program</span>
                    <span class="info-value">${draw.details || 'All Programs'}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📅 Draw Date</span>
                    <span class="info-value">${formattedDate}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">🎯 Minimum CRS Score</span>
                    <span class="info-value">${draw.crsScore}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">✉️ Invitations Issued</span>
                    <span class="info-value">${draw.invitations.toLocaleString()}</span>
                </div>
            </div>

            <div style="text-align: center;">
                <a href="https://immigoo.com/dashboard" class="cta-button">
                    📊 View Historical Data & Trends
                </a>
            </div>

            <div class="info-card-white">
                <p style="margin: 0; color: #4b5563; line-height: 1.6;">
                    <strong style="color: #1f2937;">💡 Pro Tip:</strong> Check out our dashboard to analyze historical draw patterns and improve your chances of success in future draws!
                </p>
            </div>
        </div>
    `;

    const preheader = `New Express Entry draw: ${draw.details} - CRS ${draw.crsScore} - ${draw.invitations} invitations`;

    return baseTemplate(content, preheader);
};

// 祝贺邮件模板 (用户分数超过最低分数)
const congratsEmailTemplate = (subscriber, draw) => {
    const content = `
        <div class="content">
            <div style="text-align: center;">
                <div class="congrats-emoji">🎉🎊🥳</div>
                <h2 class="hero-title" style="color: #10b981;">Congratulations, ${subscriber.name}!</h2>
                <p class="hero-subtitle">
                    Fantastic news! Your CRS score qualifies you for the latest Express Entry draw!
                </p>
            </div>

            <div class="info-card-white">
                <div class="info-row">
                    <span class="info-label-dark">✨ Your CRS Score</span>
                    <span class="info-value-dark" style="color: #10b981;">${subscriber.score}</span>
                </div>
                <div class="info-row">
                    <span class="info-label-dark">📊 Minimum Required</span>
                    <span class="info-value-dark">${draw.crsScore}</span>
                </div>
                <div class="info-row">
                    <span class="info-label-dark">🚀 Score Advantage</span>
                    <span class="info-value-dark" style="color: #10b981;">+${subscriber.score - draw.crsScore}</span>
                </div>
                <div class="info-row">
                    <span class="info-label-dark">📋 Program</span>
                    <span class="info-value-dark">${draw.details || subscriber.currentProgram}</span>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 25px; margin: 30px 0; color: white; text-align: center;">
                <p style="margin: 0; font-size: 18px; font-weight: 600; line-height: 1.6;">
                    🎯 You're in an excellent position!<br/>
                    Keep an eye on your email for your Invitation to Apply (ITA).
                </p>
            </div>

            <div style="text-align: center;">
                <a href="https://immigoo.com/dashboard" class="cta-button">
                    📈 Track Your Progress
                </a>
            </div>

            <div class="info-card-white" style="margin-top: 30px;">
                <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 18px;">📝 Next Steps:</h3>
                <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li>Monitor your Express Entry account regularly</li>
                    <li>Ensure all your documents are up-to-date</li>
                    <li>Prepare for potential ITA within the next few weeks</li>
                    <li>Review IRCC processing times and requirements</li>
                </ul>
            </div>
        </div>
    `;

    const preheader = `🎉 Congratulations! Your score of ${subscriber.score} qualifies for the latest draw (CRS ${draw.crsScore})`;

    return baseTemplate(content, preheader);
};

// 欢迎邮件模板 (新用户订阅)
const welcomeEmailTemplate = (subscriber) => {
    const content = `
        <div class="content">
            <h2 class="hero-title">Welcome to ImmiGo! 🎉</h2>
            <p class="hero-subtitle">
                Thank you for subscribing to our Express Entry updates. We're excited to help you on your Canadian immigration journey!
            </p>

            <div class="info-card">
                <h3 style="color: white; margin: 0 0 20px 0; font-size: 20px;">📋 Your Subscription Details</h3>
                <div class="info-row">
                    <span class="info-label">👤 Name</span>
                    <span class="info-value">${subscriber.name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">📧 Email</span>
                    <span class="info-value">${subscriber.email}</span>
                </div>
                ${subscriber.score ? `
                <div class="info-row">
                    <span class="info-label">🎯 Your CRS Score</span>
                    <span class="info-value">${subscriber.score}</span>
                </div>
                ` : ''}
                ${subscriber.currentProgram ? `
                <div class="info-row">
                    <span class="info-label">📋 Current Program</span>
                    <span class="info-value">${subscriber.currentProgram}</span>
                </div>
                ` : ''}
                ${subscriber.selectedPrograms && subscriber.selectedPrograms.length > 0 ? `
                <div class="info-row" style="flex-direction: column; align-items: flex-start;">
                    <span class="info-label" style="margin-bottom: 10px;">🎯 Programs You're Tracking</span>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${subscriber.selectedPrograms.map(program => `
                            <span style="background: rgba(255, 255, 255, 0.2); padding: 6px 12px; border-radius: 6px; font-size: 14px; color: white; display: inline-block;">
                                ${program}
                            </span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>

            <div style="text-align: center;">
                <a href="https://immigoo.com/dashboard" class="cta-button">
                    🚀 Explore Dashboard
                </a>
            </div>

            <div class="info-card-white">
                <h3 style="color: #1f2937; margin: 0 0 12px 0; font-size: 18px;">✨ What You'll Receive:</h3>
                <ul style="color: #4b5563; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li><strong>Instant Draw Notifications</strong> - Get notified immediately when new draws are announced</li>
                    <li><strong>Personalized Alerts</strong> - Receive tailored updates based on your selected programs</li>
                    <li><strong>Historical Analysis</strong> - Access comprehensive data and trends on our dashboard</li>
                    <li><strong>Success Tips</strong> - Helpful insights to improve your CRS score</li>
                </ul>
            </div>
        </div>
    `;

    const preheader = `Welcome to ImmiGo! Start tracking Express Entry draws and improve your chances.`;

    return baseTemplate(content, preheader);
};

// CommonJS 导出
module.exports = {
    updateEmailTemplate,
    congratsEmailTemplate,
    welcomeEmailTemplate
};
 
