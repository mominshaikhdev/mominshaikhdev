import { NextRequest, NextResponse } from "next/server";

const TARGET_EMAIL = "thisismominshaikh@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, _gotcha, subject } = body;

    // Anti-spam honeypot detection
    if (_gotcha) {
      return NextResponse.json(
        { error: "Spam detected." },
        { status: 400 }
      );
    }

    // Input validations
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide your name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    const emailSubject = subject || `🚀 Portfolio Message from ${cleanName}`;
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "long",
    });

    let sent = false;
    const errors: string[] = [];

    // Method 1: Resend API (if configured in environment)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [TARGET_EMAIL],
            reply_to: cleanEmail,
            subject: emailSubject,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 12px; max-width: 600px; margin: auto;">
                <h2 style="color: #38bdf8; margin-top: 0;">📬 New Portfolio Contact Message</h2>
                <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #334155;">
                  <p style="margin: 8px 0;"><strong style="color: #94a3b8;">Sender Name:</strong> ${cleanName}</p>
                  <p style="margin: 8px 0;"><strong style="color: #94a3b8;">Sender Email:</strong> <a href="mailto:${cleanEmail}" style="color: #38bdf8;">${cleanEmail}</a></p>
                  <p style="margin: 8px 0;"><strong style="color: #94a3b8;">Timestamp:</strong> ${timestamp} (BST)</p>
                </div>
                <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; border: 1px solid #334155;">
                  <h4 style="margin-top: 0; color: #94a3b8;">Message:</h4>
                  <p style="white-space: pre-wrap; line-height: 1.6; margin-bottom: 0;">${cleanMessage}</p>
                </div>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          sent = true;
        } else {
          const errData = await resendRes.text();
          errors.push(`Resend error: ${errData}`);
        }
      } catch (err: any) {
        errors.push(`Resend exception: ${err?.message || err}`);
      }
    }

    // Method 2: Web3Forms (if access key available)
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!sent && web3formsKey) {
      try {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: cleanName,
            email: cleanEmail,
            subject: emailSubject,
            message: cleanMessage,
            from_name: "Portfolio Contact Form",
          }),
        });
        const w3Data = await w3Res.json();
        if (w3Data.success) {
          sent = true;
        } else {
          errors.push(`Web3Forms error: ${w3Data.message}`);
        }
      } catch (err: any) {
        errors.push(`Web3Forms exception: ${err?.message || err}`);
      }
    }

    // Method 3: Discord Webhook (optional notification channel)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Portfolio Bot",
            embeds: [
              {
                title: `📬 New Message from ${cleanName}`,
                color: 0x38bdf8,
                fields: [
                  { name: "Email", value: cleanEmail, inline: true },
                  { name: "Time", value: timestamp, inline: true },
                  { name: "Message", value: cleanMessage },
                ],
              },
            ],
          }),
        });
      } catch {
        // non-blocking webhook
      }
    }

    // Method 4: FormSubmit.co direct forwarder (Primary / Fallback delivering to thisismominshaikh@gmail.com)
    if (!sent) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            _subject: emailSubject,
            _template: "table",
            _captcha: "false",
            _replyto: cleanEmail,
          }),
        });

        const fsData = await fsRes.json();
        if (fsRes.ok || fsData.success === "true" || fsData.success === true) {
          sent = true;
        } else {
          errors.push(`FormSubmit error: ${fsData.message || JSON.stringify(fsData)}`);
        }
      } catch (err: any) {
        errors.push(`FormSubmit exception: ${err?.message || err}`);
      }
    }

    if (sent) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully! Momin Shaikh will get back to you soon.",
      });
    }

    // If external delivery failed, return informative response
    return NextResponse.json(
      {
        success: false,
        error: "Failed to dispatch message via external mail services.",
        details: errors,
        mailtoFallback: `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(
          emailSubject
        )}&body=${encodeURIComponent(
          `Hi Momin,\n\n${cleanMessage}\n\nFrom: ${cleanName} (${cleanEmail})`
        )}`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your request.",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
