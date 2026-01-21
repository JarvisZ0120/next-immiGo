// 专业的邮件HTML模板 - Outlook 兼容版本

// 基础邮件模板结构 - 使用表格布局兼容 Outlook
const baseTemplate = (content, preheader = '') => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>ImmiGo - Canada Immigration Updates</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <style>
        table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
        div, td {padding:0;}
        div {margin:0 !important;}
        .info-row td {padding: 12px 0;}
    </style>
    <![endif]-->
    <style type="text/css">
        body {
            margin: 0 !important;
            padding: 0 !important;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f3f4f6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        a {
            text-decoration: none;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .content-padding {
                padding: 20px !important;
            }
            .hero-title {
                font-size: 22px !important;
            }
            .info-value {
                font-size: 18px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
    <!-- 预览文本 -->
    <div style="display: none; font-size: 1px; color: #f3f4f6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        ${preheader}
    </div>
    
    <!-- 主容器 -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                <!-- 邮件内容容器 -->
                <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="background-color: #667eea; padding: 40px 20px;">
                            <h1 style="margin: 0; font-size: 36px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">🇨🇦 ImmiGo</h1>
                            <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">Your Trusted Canadian Immigration Partner</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    ${content}
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">
                                            📍 ImmiGo Immigration Services
                                        </p>
                                        <p style="margin: 0 0 20px 0; font-size: 14px; color: #6b7280; font-family: Arial, Helvetica, sans-serif;">
                                            Vancouver, BC, Canada
                                        </p>
                                        <p style="margin: 0 0 20px 0; font-size: 14px; color: #6b7280; font-family: Arial, Helvetica, sans-serif;">
                                            <a href="https://immigoo.com" style="color: #667eea; text-decoration: none;">Visit Website</a> &nbsp;•&nbsp; 
                                            <a href="https://immigoo.com/dashboard" style="color: #667eea; text-decoration: none;">Dashboard</a> &nbsp;•&nbsp; 
                                            <a href="https://immigoo.com/unsubscribe" style="color: #667eea; text-decoration: none;">Unsubscribe</a>
                                        </p>
                                        <p style="margin: 0; font-size: 12px; color: #9ca3af; font-family: Arial, Helvetica, sans-serif;">
                                            You're receiving this email because you subscribed to ImmiGo immigration updates.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// 更新邮件模板 (新抽签通知)
const updateEmailTemplate = (subscriber, draw) => {
    const drawDate = new Date(draw.date);
    // 使用 UTC 时区避免日期偏移问题
    const formattedDate = drawDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
    });

    const content = `
        <tr>
            <td class="content-padding" style="padding: 40px 30px;">
                <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: bold; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">🎯 New Express Entry Draw Announced!</h2>
                <p style="margin: 0 0 30px 0; font-size: 16px; color: #6b7280; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                    Great news! A new draw has been conducted for your selected program. Here are the details:
                </p>

                <!-- Info Card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #667eea; border-radius: 12px;">
                    <tr>
                        <td style="padding: 30px;">
                            <!-- Program -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr class="info-row">
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">📋 Program</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${draw.details || 'All Programs'}</td>
                                </tr>
                            </table>
                            <!-- Draw Date -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr class="info-row">
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">📅 Draw Date</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${formattedDate}</td>
                                </tr>
                            </table>
                            <!-- CRS Score -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr class="info-row">
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">🎯 Minimum CRS Score</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${draw.crsScore}</td>
                                </tr>
                            </table>
                            <!-- Invitations -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr class="info-row">
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">✉️ Invitations Issued</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${String(draw.invitations).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- CTA Button -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background-color: #667eea; border-radius: 8px;">
                                        <a href="https://immigoo.com/dashboard" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; font-family: Arial, Helvetica, sans-serif;">📊 View Historical Data & Trends</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Pro Tip -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px;">
                    <tr>
                        <td style="padding: 25px;">
                            <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                                <strong style="color: #1f2937;">💡 Pro Tip:</strong> Check out our dashboard to analyze historical draw patterns and improve your chances of success in future draws!
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;

    const preheader = `New Express Entry draw: ${draw.details} - CRS ${draw.crsScore} - ${draw.invitations} invitations`;

    return baseTemplate(content, preheader);
};

// 祝贺邮件模板 (用户分数超过最低分数)
const congratsEmailTemplate = (subscriber, draw) => {
    const content = `
        <tr>
            <td class="content-padding" style="padding: 40px 30px; text-align: center;">
                <p style="margin: 0 0 20px 0; font-size: 48px;">🎉🎊🥳</p>
                <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: bold; color: #10b981; font-family: Arial, Helvetica, sans-serif;">Congratulations, ${subscriber.name}!</h2>
                <p style="margin: 0 0 30px 0; font-size: 16px; color: #6b7280; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                    Fantastic news! Your CRS score qualifies you for the latest Express Entry draw!
                </p>

                <!-- Score Card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px;">
                    <tr>
                        <td style="padding: 30px;">
                            <!-- Your Score -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: #6b7280; font-family: Arial, Helvetica, sans-serif;">✨ Your CRS Score</td>
                                    <td align="right" style="padding: 12px 0; font-size: 20px; font-weight: bold; color: #10b981; font-family: Arial, Helvetica, sans-serif;">${subscriber.score}</td>
                                </tr>
                            </table>
                            <!-- Minimum Required -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: #6b7280; font-family: Arial, Helvetica, sans-serif;">📊 Minimum Required</td>
                                    <td align="right" style="padding: 12px 0; font-size: 20px; font-weight: bold; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">${draw.crsScore}</td>
                                </tr>
                            </table>
                            <!-- Score Advantage -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #e5e7eb;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: #6b7280; font-family: Arial, Helvetica, sans-serif;">🚀 Score Advantage</td>
                                    <td align="right" style="padding: 12px 0; font-size: 20px; font-weight: bold; color: #10b981; font-family: Arial, Helvetica, sans-serif;">+${subscriber.score - draw.crsScore}</td>
                                </tr>
                            </table>
                            <!-- Program -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: #6b7280; font-family: Arial, Helvetica, sans-serif;">📋 Program</td>
                                    <td align="right" style="padding: 12px 0; font-size: 20px; font-weight: bold; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">${draw.details || subscriber.currentProgram}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Success Message -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px; background-color: #10b981; border-radius: 12px;">
                    <tr>
                        <td style="padding: 25px; text-align: center;">
                            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #ffffff; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                                🎯 You're in an excellent position!<br/>
                                Keep an eye on your email for your Invitation to Apply (ITA).
                            </p>
                        </td>
                    </tr>
                </table>

                <!-- CTA Button -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background-color: #667eea; border-radius: 8px;">
                                        <a href="https://immigoo.com/dashboard" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; font-family: Arial, Helvetica, sans-serif;">📈 Track Your Progress</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Next Steps -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; text-align: left;">
                    <tr>
                        <td style="padding: 25px;">
                            <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">📝 Next Steps:</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.8; font-family: Arial, Helvetica, sans-serif;">
                                <li>Monitor your Express Entry account regularly</li>
                                <li>Ensure all your documents are up-to-date</li>
                                <li>Prepare for potential ITA within the next few weeks</li>
                                <li>Review IRCC processing times and requirements</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;

    const preheader = `🎉 Congratulations! Your score of ${subscriber.score} qualifies for the latest draw (CRS ${draw.crsScore})`;

    return baseTemplate(content, preheader);
};

// 欢迎邮件模板 (新用户订阅)
const welcomeEmailTemplate = (subscriber) => {
    // 生成程序标签HTML
    let programsHtml = '';
    if (subscriber.selectedPrograms && subscriber.selectedPrograms.length > 0) {
        programsHtml = subscriber.selectedPrograms.map(program => 
            `<span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); padding: 6px 12px; border-radius: 6px; font-size: 14px; color: #ffffff; margin: 4px;">${program}</span>`
        ).join(' ');
    }

    const content = `
        <tr>
            <td class="content-padding" style="padding: 40px 30px;">
                <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: bold; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">Welcome to ImmiGo! 🎉</h2>
                <p style="margin: 0 0 30px 0; font-size: 16px; color: #6b7280; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                    Thank you for subscribing to our Express Entry updates. We're excited to help you on your Canadian immigration journey!
                </p>

                <!-- Subscription Details Card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #667eea; border-radius: 12px;">
                    <tr>
                        <td style="padding: 30px;">
                            <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">📋 Your Subscription Details</h3>
                            
                            <!-- Name -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">👤 Name</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${subscriber.name}</td>
                                </tr>
                            </table>
                            
                            <!-- Email -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">📧 Email</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${subscriber.email}</td>
                                </tr>
                            </table>
                            
                            ${subscriber.score ? `
                            <!-- CRS Score -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">🎯 Your CRS Score</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${subscriber.score}</td>
                                </tr>
                            </table>
                            ` : ''}
                            
                            ${subscriber.currentProgram ? `
                            <!-- Current Program -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid rgba(255,255,255,0.2);">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">📋 Current Program</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif;">${subscriber.currentProgram}</td>
                                </tr>
                            </table>
                            ` : ''}
                            
                            ${subscriber.selectedPrograms && subscriber.selectedPrograms.length > 0 ? `
                            <!-- Programs Tracking -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: rgba(255,255,255,0.9); font-family: Arial, Helvetica, sans-serif;">🎯 Programs You're Tracking</p>
                                        <p style="margin: 0;">${programsHtml}</p>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                        </td>
                    </tr>
                </table>

                <!-- CTA Button -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px;">
                    <tr>
                        <td align="center">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background-color: #667eea; border-radius: 8px;">
                                        <a href="https://immigoo.com/dashboard" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; font-family: Arial, Helvetica, sans-serif;">🚀 Explore Dashboard</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- What You'll Receive -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 30px; background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px;">
                    <tr>
                        <td style="padding: 25px;">
                            <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1f2937; font-family: Arial, Helvetica, sans-serif;">✨ What You'll Receive:</h3>
                            <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.8; font-family: Arial, Helvetica, sans-serif;">
                                <li><strong>Instant Draw Notifications</strong> - Get notified immediately when new draws are announced</li>
                                <li><strong>Personalized Alerts</strong> - Receive tailored updates based on your selected programs</li>
                                <li><strong>Historical Analysis</strong> - Access comprehensive data and trends on our dashboard</li>
                                <li><strong>Success Tips</strong> - Helpful insights to improve your CRS score</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
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
