import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: "Veylo <notifications@veyloskin.com>",
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
