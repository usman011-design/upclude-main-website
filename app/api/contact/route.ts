import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, countryCode, service, budget, message } = body;

        // Validation
        if (!name || !email || !phone || !service || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Change after domain verification
            to: [process.env.CONTACT_EMAIL!],             // Your email from .env.local
            replyTo: email,
            subject: `New Enquiry: ${service}`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>New Enquiry</title>
            </head>
            <body style="margin:0;padding:0;background:#f0f0f5;font-family:'Segoe UI',Arial,sans-serif;">

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f5;padding:48px 16px;">
                <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.12);">

                    <!-- ══ DARK HEADER ══ -->
                    <tr>
                        <td style="background:linear-gradient(145deg,#0f0020 0%,#1a0040 50%,#0a0015 100%);padding:0;">

                        <!-- Top accent line -->
                        <div style="height:4px;background:linear-gradient(90deg,#7B00FF,#c084fc,#7B00FF);"></div>

                        <table width="100%" cellpadding="0" cellspacing="0" style="padding:44px 44px 36px;">
                            <tr>
                            <td>
                                <!-- Logo row -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                                <tr>
                                    <td>
                                    <!-- Replace YOUR_DOMAIN with your actual domain e.g. https://yourcompany.com -->
                                    <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="Company Logo" width="120" height="40" style="display:block;height:40px;width:auto;object-fit:contain;" />
                                    </td>
                                    <td align="right">
                                    <span style="display:inline-block;background:rgba(168,85,247,0.15);border:1px solid rgba(168,85,247,0.35);border-radius:100px;padding:5px 14px;color:#c084fc;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New Lead</span>
                                    </td>
                                </tr>
                                </table>

                                <!-- Headline -->
                                <h1 style="margin:0 0 10px;color:#ffffff;font-size:30px;font-weight:700;line-height:1.2;letter-spacing:-0.5px;">
                                You've got a new lead 🚀
                                </h1>
                                <p style="margin:0;color:rgba(255,255,255,0.45);font-size:14px;line-height:1.6;">
                                A new enquiry was submitted through your website contact form.<br/>All details are below.
                                </p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>

                    <!-- ══ PURPLE SERVICE BAND ══ -->
                    <tr>
                        <td style="background:linear-gradient(90deg,#6d00e6,#9333ea,#6d00e6);padding:16px 44px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                            <td style="color:rgba(255,255,255,0.6);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;vertical-align:middle;">
                                Requested Service
                            </td>
                            <td align="right" style="vertical-align:middle;">
                                <span style="background:rgba(255,255,255,0.15);border-radius:8px;padding:5px 14px;color:#ffffff;font-size:13px;font-weight:700;">${service}</span>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>

                    <!-- ══ LIGHT BODY ══ -->
                    <tr>
                        <td style="background:#ffffff;padding:40px 44px;">

                        <!-- Section label -->
                        <p style="margin:0 0 24px;color:#9333ea;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;border-left:3px solid #9333ea;padding-left:10px;">Contact Details</p>

                        <!-- 2-col grid: Name + Email -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:0;">
                            <tr>
                            <td width="48%" style="vertical-align:top;padding-bottom:24px;">
                                <div style="background:#faf8ff;border:1px solid #ede9fe;border-radius:12px;padding:16px 18px;">
                                <p style="margin:0 0 5px;color:#9ca3af;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Full Name</p>
                                <p style="margin:0;color:#0f0020;font-size:15px;font-weight:700;">${name}</p>
                                </div>
                            </td>
                            <td width="4%"></td>
                            <td width="48%" style="vertical-align:top;padding-bottom:24px;">
                                <div style="background:#faf8ff;border:1px solid #ede9fe;border-radius:12px;padding:16px 18px;">
                                <p style="margin:0 0 5px;color:#9ca3af;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Email</p>
                                <a href="mailto:${email}" style="color:#7B00FF;font-size:14px;font-weight:700;text-decoration:none;word-break:break-all;">${email}</a>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td width="48%" style="vertical-align:top;padding-bottom:28px;">
                                <div style="background:#faf8ff;border:1px solid #ede9fe;border-radius:12px;padding:16px 18px;">
                                <p style="margin:0 0 5px;color:#9ca3af;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Phone</p>
                                <p style="margin:0;color:#0f0020;font-size:15px;font-weight:700;">${countryCode} ${phone}</p>
                                </div>
                            </td>
                            <td width="4%"></td>
                            <td width="48%" style="vertical-align:top;padding-bottom:28px;">
                                <div style="background:#faf8ff;border:1px solid #ede9fe;border-radius:12px;padding:16px 18px;">
                                <p style="margin:0 0 5px;color:#9ca3af;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Budget</p>
                                <span style="display:inline-block;background:linear-gradient(135deg,#7B00FF,#a855f7);border-radius:6px;padding:3px 12px;color:#ffffff;font-size:12px;font-weight:700;">${budget || 'Not specified'}</span>
                                </div>
                            </td>
                            </tr>
                        </table>

                        <!-- Divider -->
                        <div style="border-top:1px solid #f3f0ff;margin-bottom:28px;"></div>

                        <!-- Section label -->
                        <p style="margin:0 0 16px;color:#9333ea;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;border-left:3px solid #9333ea;padding-left:10px;">Project Description</p>

                        <!-- Message -->
                        <div style="background:#faf8ff;border:1px solid #ede9fe;border-left:4px solid #7B00FF;border-radius:0 12px 12px 0;padding:20px 22px;margin-bottom:36px;">
                            <p style="margin:0;color:#1f0040;font-size:14px;line-height:1.8;white-space:pre-wrap;">${message}</p>
                        </div>

                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                            <td align="center">
                                <a href="mailto:${email}?subject=Re: ${service} Enquiry"
                                style="display:inline-block;background:linear-gradient(135deg,#6d00e6,#9333ea);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:15px 40px;border-radius:100px;letter-spacing:0.3px;box-shadow:0 8px 24px rgba(109,0,230,0.35);">
                                Reply to ${name} &nbsp;→
                                </a>
                            </td>
                            </tr>
                        </table>

                        </td>
                    </tr>

                    <!-- ══ DARK FOOTER ══ -->
                    <tr>
                        <td style="background:#ffffff;border-top:1px solid #ede9fe;padding:28px 44px;text-align:center;">
                        <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;line-height:1.6;">
                            This message was sent automatically from your website contact form.
                        </p>
                        <p style="margin:0;color:#c4b5fd;font-size:11px;">
                            © ${new Date().getFullYear()} YourCompany &nbsp;·&nbsp; All rights reserved.
                        </p>
                        </td>
                    </tr>

                    <!-- Bottom accent line -->
                    <tr>
                        <td style="height:4px;background:linear-gradient(90deg,#7B00FF,#c084fc,#7B00FF);"></td>
                    </tr>

                    </table>
                </td>
                </tr>
            </table>

            </body>
            </html>`,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}