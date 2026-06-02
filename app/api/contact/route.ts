import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json()

    // 必填校验
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: 'Muzhuo Inspection <info@muzhuoinspection.com>',
      to: ['info@muzhuoinspection.com'],
      replyTo: email,
      subject: `New Contact Form: ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="border-bottom: 3px solid #2B7FD8; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #2B7FD8; font-size: 24px; margin: 0;">New Contact Form Submission</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 16px; font-weight: bold; color: #475569; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 8px 16px;">${name}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 8px 16px; font-weight: bold; color: #475569; vertical-align: top;">Email</td>
              <td style="padding: 8px 16px;"><a href="mailto:${email}" style="color: #2B7FD8;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 16px; font-weight: bold; color: #475569; vertical-align: top;">Company</td>
              <td style="padding: 8px 16px;">${company || 'N/A'}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            <h3 style="color: #2B7FD8; font-size: 16px; margin: 0 0 8px;">Message</h3>
            <p style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 32px; padding-top: 16px; border-top: 2px solid #F4D758; font-size: 12px; color: #94a3b8; text-align: center;">
            Sent via muzhuoinspection.com contact form
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to send message' },
      { status: 500 }
    )
  }
}
