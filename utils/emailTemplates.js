// 邮件 HTML — 与官网 ImmiGo 视觉一致（枫叶红 / boreal 青 / 浅冰蓝底）
// 表格 + 内联样式；Windows 版 Outlook（Word 引擎）常忽略 linear-gradient/box-shadow/部分圆角，
// 已对主要色块增加 HTML bgcolor + background-color 双写，渐变在 Gmail/Apple Mail 仍生效，Outlook 显示实色回退。

const BRAND = {
  ink: '#1a1523',
  muted: '#5c5666',
  subtle: '#86868b',
  maple: '#d80621',
  mapleDeep: '#b1051a',
  teal: '#0d9488',
  iceBg: '#eef6ff',
  cardBorder: '#e8e8ed',
  softRed: '#fecaca',
  softTeal: '#99f6e4',
  /** Windows Outlook：忽略 CSS 渐变时用实色 bgcolor */
  outlookHeaderBg: '#1a1523',
  outlookCtaBg: '#d80621',
  outlookCongratsBannerBg: '#f0fdfa',
};

const formatProgramLabel = (p) =>
  p === '__ALL_EXPRESS_ENTRY_STREAMS__' ? 'All Express Entry draws & streams' : p;

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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;
            background-color: ${BRAND.iceBg};
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
<body style="margin: 0; padding: 0; background-color: ${BRAND.iceBg};">
    <div style="display: none; font-size: 1px; color: ${BRAND.iceBg}; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        ${preheader}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: ${BRAND.iceBg};">
        <tr>
            <td align="center" style="padding: 24px 12px;">
                <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid ${BRAND.cardBorder}; box-shadow: 0 8px 30px rgba(0,0,0,0.06);">

                    <!-- Accent stripe（Outlook：bgcolor 作渐变回退） -->
                    <tr>
                        <td bgcolor="${BRAND.maple}" style="height: 4px; line-height: 4px; font-size: 4px; background-color: ${BRAND.maple}; background: linear-gradient(90deg, ${BRAND.maple} 0%, ${BRAND.teal} 50%, #2563eb 100%);">&nbsp;</td>
                    </tr>

                    <!-- Header -->
                    <tr>
                        <td align="center" bgcolor="${BRAND.outlookHeaderBg}" style="background-color: ${BRAND.outlookHeaderBg}; background: linear-gradient(135deg, #1a1523 0%, ${BRAND.mapleDeep} 42%, ${BRAND.teal} 100%); padding: 36px 24px;">
                            <h1 class="hero-title" style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">🇨🇦 ImmiGo</h1>
                            <p style="margin: 10px 0 0 0; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.88); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Express Entry · IRCC updates</p>
                        </td>
                    </tr>

                    ${content}

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #fafafa; padding: 0;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td bgcolor="${BRAND.teal}" style="height: 3px; background-color: ${BRAND.teal}; background: linear-gradient(90deg, ${BRAND.maple} 0%, ${BRAND.teal} 50%, #2563eb 100%);">&nbsp;</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="padding: 28px 24px;">
                                <tr>
                                    <td align="center">
                                        <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: ${BRAND.muted}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                            Proudly focused on Canada's Express Entry &amp; IRCC updates.
                                        </p>
                                        <p style="margin: 0 0 16px 0; font-size: 13px; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                            Vancouver, BC, Canada
                                        </p>
                                        <p style="margin: 0 0 16px 0; font-size: 14px; color: ${BRAND.muted}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                            <a href="https://immigoo.com" style="color: ${BRAND.teal}; font-weight: 600;">Website</a>
                                            <span style="color: #d2d2d7;"> &nbsp;·&nbsp; </span>
                                            <a href="https://immigoo.com/dashboard" style="color: ${BRAND.teal}; font-weight: 600;">Dashboard</a>
                                            <span style="color: #d2d2d7;"> &nbsp;·&nbsp; </span>
                                            <a href="https://immigoo.com/unsubscribe" style="color: ${BRAND.maple}; font-weight: 600;">Unsubscribe</a>
                                        </p>
                                        <p style="margin: 0; font-size: 11px; color: #9ca3af; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                            You're receiving this because you subscribed to ImmiGo.
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

/* 主按钮：与站点 CTA 一致的圆角渐变 */
const ctaButton = (href, label) => `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
    <tr>
        <td bgcolor="${BRAND.outlookCtaBg}" style="border-radius: 9999px; background-color: ${BRAND.outlookCtaBg}; background: linear-gradient(90deg, ${BRAND.maple} 0%, #ff4d6d 55%, #ff7a8a 100%); box-shadow: 0 4px 14px rgba(216, 6, 33, 0.28);">
            <a href="${href}" style="display: inline-block; padding: 14px 28px; font-size: 15px; font-weight: 700; color: #ffffff; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif; border-radius: 9999px;">${label}</a>
        </td>
    </tr>
</table>
`;

// 更新邮件模板 (新抽签通知)
const updateEmailTemplate = (subscriber, draw) => {
    const drawDate = new Date(draw.date);
    const formattedDate = drawDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });

    const content = `
        <tr>
            <td class="content-padding" style="padding: 40px 28px;">
                <h2 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">New Express Entry draw</h2>
                <p style="margin: 0 0 28px 0; font-size: 16px; color: ${BRAND.muted}; line-height: 1.65; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                    A new round matches your subscription. Here are the details from IRCC open data:
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="background-color: #ffffff; border: 2px solid ${BRAND.softTeal}; border-radius: 14px; overflow: hidden;">
                    <tr>
                        <td style="padding: 24px 22px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr class="info-row">
                                    <td style="padding: 14px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Program</td>
                                    <td align="right" style="padding: 14px 0; font-size: 16px; font-weight: 700; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${draw.details || '—'}</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr class="info-row">
                                    <td style="padding: 14px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Draw date</td>
                                    <td align="right" style="padding: 14px 0; font-size: 16px; font-weight: 700; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${formattedDate}</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr class="info-row">
                                    <td style="padding: 14px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Minimum CRS</td>
                                    <td align="right" style="padding: 14px 0; font-size: 16px; font-weight: 700; color: ${BRAND.maple}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${draw.crsScore}</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr class="info-row">
                                    <td style="padding: 14px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Invitations</td>
                                    <td align="right" style="padding: 14px 0; font-size: 16px; font-weight: 700; color: ${BRAND.teal}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${String(draw.invitations).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px;">
                    <tr>
                        <td align="center">
                            ${ctaButton('https://immigoo.com/dashboard', 'View dashboard & trends')}
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f8fafc" style="margin-top: 28px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <tr>
                        <td style="padding: 20px 22px;">
                            <p style="margin: 0; font-size: 14px; color: ${BRAND.muted}; line-height: 1.65; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                <strong style="color: ${BRAND.ink};">Tip:</strong> Compare past draws on the dashboard to spot CRS trends for your programs.
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
            <td class="content-padding" style="padding: 40px 28px; text-align: center;">
                <p style="margin: 0 0 16px 0; font-size: 40px; line-height: 1;">🎉</p>
                <h2 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: ${BRAND.teal}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Congratulations, ${subscriber.name}!</h2>
                <p style="margin: 0 0 28px 0; font-size: 16px; color: ${BRAND.muted}; line-height: 1.65; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                    Your CRS is at or above this draw's minimum for your program — great momentum.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="background-color: #ffffff; border: 2px solid ${BRAND.softRed}; border-radius: 14px; text-align: left;">
                    <tr>
                        <td style="padding: 24px 22px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Your CRS</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: 800; color: ${BRAND.teal}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${subscriber.score}</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Minimum CRS</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: 700; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${draw.crsScore}</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Advantage</td>
                                    <td align="right" style="padding: 12px 0; font-size: 18px; font-weight: 800; color: ${BRAND.maple}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">+${subscriber.score - draw.crsScore}</td>
                                </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Program</td>
                                    <td align="right" style="padding: 12px 0; font-size: 15px; font-weight: 700; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${draw.details || subscriber.currentProgram}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${BRAND.outlookCongratsBannerBg}" style="margin-top: 24px; background-color: ${BRAND.outlookCongratsBannerBg}; background: linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(216,6,33,0.08) 100%); border: 1px solid ${BRAND.softTeal}; border-radius: 12px;">
                    <tr>
                        <td style="padding: 22px; text-align: center;">
                            <p style="margin: 0; font-size: 15px; font-weight: 700; color: ${BRAND.ink}; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                Watch your inbox for an Invitation to Apply (ITA) and keep documents ready.
                            </p>
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px;">
                    <tr>
                        <td align="center">
                            ${ctaButton('https://immigoo.com/dashboard', 'Open dashboard')}
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f8fafc" style="margin-top: 28px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; text-align: left;">
                    <tr>
                        <td style="padding: 22px;">
                            <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 800; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Next steps</h3>
                            <ul style="margin: 0; padding-left: 18px; color: ${BRAND.muted}; line-height: 1.75; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                <li>Check your IRCC account regularly</li>
                                <li>Keep documents current</li>
                                <li>Review processing times on Canada.ca</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;

    const preheader = `Congratulations! Your score of ${subscriber.score} qualifies for the latest draw (CRS ${draw.crsScore})`;

    return baseTemplate(content, preheader);
};

// 欢迎邮件模板 (新用户订阅)
const welcomeEmailTemplate = (subscriber) => {
    let programsHtml = '';
    if (subscriber.selectedPrograms && subscriber.selectedPrograms.length > 0) {
        programsHtml = subscriber.selectedPrograms
            .map(
                (program) =>
                    `<span style="display: inline-block; background-color: #ffffff; border: 1px solid ${BRAND.softRed}; padding: 6px 12px; border-radius: 10px; font-size: 13px; font-weight: 600; color: ${BRAND.ink}; margin: 4px 4px 4px 0;">${formatProgramLabel(program)}</span>`
            )
            .join(' ');
    }

    const content = `
        <tr>
            <td class="content-padding" style="padding: 40px 28px;">
                <h2 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Welcome to ImmiGo</h2>
                <p style="margin: 0 0 28px 0; font-size: 16px; color: ${BRAND.muted}; line-height: 1.65; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                    You're subscribed to Express Entry draw updates powered by IRCC public data. We're glad you're here.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="background-color: #ffffff; border: 2px solid ${BRAND.softRed}; border-radius: 14px;">
                    <tr>
                        <td style="padding: 24px 22px;">
                            <h3 style="margin: 0 0 18px 0; font-size: 17px; font-weight: 800; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Your subscription</h3>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Name</td>
                                    <td align="right" style="padding: 12px 0; font-size: 16px; font-weight: 700; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${subscriber.name}</td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Email</td>
                                    <td align="right" style="padding: 12px 0; font-size: 15px; font-weight: 700; color: ${BRAND.ink}; word-break: break-all; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${subscriber.email}</td>
                                </tr>
                            </table>

                            ${subscriber.score ? `
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">CRS score</td>
                                    <td align="right" style="padding: 12px 0; font-size: 16px; font-weight: 700; color: ${BRAND.maple}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${subscriber.score}</td>
                                </tr>
                            </table>
                            ` : ''}

                            ${subscriber.currentProgram ? `
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-bottom: 1px solid #f1f5f9;">
                                <tr>
                                    <td style="padding: 12px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Current program</td>
                                    <td align="right" style="padding: 12px 0; font-size: 15px; font-weight: 700; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">${subscriber.currentProgram}</td>
                                </tr>
                            </table>
                            ` : ''}

                            ${subscriber.selectedPrograms && subscriber.selectedPrograms.length > 0 ? `
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 14px 0 0 0;">
                                        <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 600; color: ${BRAND.subtle}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">Programs you follow</p>
                                        <p style="margin: 0;">${programsHtml}</p>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 28px;">
                    <tr>
                        <td align="center">
                            ${ctaButton('https://immigoo.com/dashboard', 'Go to dashboard')}
                        </td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f8fafc" style="margin-top: 28px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <tr>
                        <td style="padding: 22px;">
                            <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 800; color: ${BRAND.ink}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">What you'll get</h3>
                            <ul style="margin: 0; padding-left: 18px; color: ${BRAND.muted}; line-height: 1.75; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, Helvetica, sans-serif;">
                                <li><strong style="color: ${BRAND.ink};">Draw alerts</strong> when new rounds are published</li>
                                <li><strong style="color: ${BRAND.ink};">Dashboard</strong> for CRS trends and history</li>
                                <li><strong style="color: ${BRAND.ink};">Your choices</strong> respected for program filters</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;

    const preheader = `Welcome to ImmiGo — Express Entry & IRCC updates.`;

    return baseTemplate(content, preheader);
};

module.exports = {
    updateEmailTemplate,
    congratsEmailTemplate,
    welcomeEmailTemplate
};
