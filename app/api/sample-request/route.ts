import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY environment variable is not set')
  return new Resend(key)
}

const LABELS: Record<string, string> = {
  textiles: 'Textiles & apparel',
  electronics: 'Electronics & electrical',
  industrial: 'Industrial / machinery',
  factory: 'Factory assessment',
  hardline: 'Hardline / consumer goods',
  ceramic: 'Ceramic & kitchenware',
  loading: 'Container loading supervision',
}

export async function POST(req: Request) {
  try {
    const { email, company, category, country, note } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
    }
    if (!category || !LABELS[category]) {
      return NextResponse.json({ error: 'Please choose a product category' }, { status: 400 })
    }

    const resend = getResend()
    const label = LABELS[category]

    await resend.emails.send({
      from: 'Muzhuo Inspection <info@muzhuoinspection.com>',
      to: ['info@muzhuoinspection.com'],
      replyTo: email,
      subject: `Sample report request: ${company || email} — ${label}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h1 style="color:#2B7FD8;font-size:22px;margin:0 0 16px">Sample report request</h1>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#475569;width:110px">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#475569">Company</td><td style="padding:8px 0">${company || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#475569">Category</td><td style="padding:8px 0">${label}</td></tr>
            <tr><td style="padding:8px 0;color:#475569">Country</td><td style="padding:8px 0">${country || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0;color:#475569;vertical-align:top">Note</td><td style="padding:8px 0;white-space:pre-wrap">${note || 'N/A'}</td></tr>
          </table>
          <p style="margin-top:24px;color:#64748b;font-size:13px">Reply with the matching sample report attached.</p>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'Muzhuo Inspection <info@muzhuoinspection.com>',
      to: [email],
      subject: 'Your sample inspection report',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#2B7FD8">Thanks - we have your request</h2>
          <p style="color:#334155;line-height:1.6">You asked for a sample report for <strong>${label}</strong>. We will send the matching report to this address, normally within one business day.</p>
          <p style="color:#334155;line-height:1.6">If it is urgent, reply with the product and destination country and we will prioritise it.</p>
          <p style="margin-top:28px;color:#64748b;font-size:13px">Muzhuo Inspection - <a href="https://www.muzhuoinspection.com">muzhuoinspection.com</a></p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Sample request error:', err)
    return NextResponse.json({ error: err.message || 'Failed to send request' }, { status: 500 })
  }
}
