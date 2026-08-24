import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json()) as { email?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Newsletter unavailable: RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Newsletter is temporarily unavailable" }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Veylo <notifications@veyloskin.com>",
      to: "hello@veyloskin.com",
      subject: `New subscriber: ${email}`,
      text: `New newsletter signup:\n\n${email}\n\nTime: ${new Date().toISOString()}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
