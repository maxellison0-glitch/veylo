import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY ?? process.env.resend_api_key;
    if (!apiKey) {
      console.error("Contact form unavailable: RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Contact form is temporarily unavailable" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Veylo <hello@veyloskin.com>",
      replyTo: email,
      to: "hello@veyloskin.com",
      subject: `[Contact] ${subject} — ${firstName} ${lastName}`,
      text: [
        `From: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        ``,
        message,
        ``,
        `---`,
        `Sent via veyloskin.com contact form at ${new Date().toISOString()}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
