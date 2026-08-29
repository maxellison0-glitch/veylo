import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
type SignupSource = "welcome-popup" | "footer";

let cachedAudienceId: string | null = null;

async function getDefaultAudienceId(resend: Resend) {
  if (cachedAudienceId) return cachedAudienceId;
  const result = await resend.audiences.list();
  if (result.error) throw new Error(`Unable to resolve Resend audience: ${result.error.message}`);
  const audienceId = result.data.data[0]?.id;
  if (!audienceId) throw new Error("No default Resend audience is available");
  cachedAudienceId = audienceId;
  return audienceId;
}

function isDuplicateContact(error: { message: string; statusCode: number | null }) {
  return error.statusCode === 409 || /already|duplicate|exist/i.test(error.message);
}

const welcomeEmail = {
  subject: "Your 10% is waiting",
  text: `Welcome to Veylo.

Your first-order code is VEYLO10. Paste it into the promo field at checkout.

Begin with LuminaPro LED Face Mask: https://www.veyloskin.com/products/lumen-mask
The Relief Belt: https://www.veyloskin.com/products/relief-belt
The Veylo Wand: https://www.veyloskin.com/products/veylo-wand

Free UK delivery over Â£40. Dispatched within 48 hours, fully tracked.`,
  html: `<div style="margin:0 auto;max-width:560px;background:#faf7f4;color:#241f1d;padding:48px 32px;font-family:Arial,sans-serif;line-height:1.6">
    <p style="margin:0 0 18px;color:#9b5f50;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Welcome to Veylo</p>
    <h1 style="margin:0 0 22px;font-family:Georgia,serif;font-size:42px;font-weight:400;line-height:1">Your 10% is waiting.</h1>
    <p style="margin:0 0 8px">Use your first-order code at checkout:</p>
    <p style="border-top:1px solid #d7cbc5;border-bottom:1px solid #d7cbc5;margin:22px 0;padding:18px 0;font-family:Georgia,serif;font-size:34px;letter-spacing:.08em">VEYLO10</p>
    <p style="margin:0 0 28px">Three considered places to begin:</p>
    <p style="margin:0 0 10px"><a style="color:#241f1d" href="https://www.veyloskin.com/products/lumen-mask">LuminaPro LED Face Mask</a></p>
    <p style="margin:0 0 10px"><a style="color:#241f1d" href="https://www.veyloskin.com/products/relief-belt">The Relief Belt</a></p>
    <p style="margin:0 0 28px"><a style="color:#241f1d" href="https://www.veyloskin.com/products/veylo-wand">The Veylo Wand</a></p>
    <p style="margin:0;color:#6e625d;font-size:13px">Free UK delivery over Â£40. Dispatched within 48 hours, fully tracked.</p>
  </div>`,
};

export async function POST(request: NextRequest) {
  try {
    const { email, source } = (await request.json()) as { email?: string; source?: SignupSource };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (source !== "welcome-popup" && source !== "footer") {
      return NextResponse.json({ error: "Invalid signup source" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY ?? process.env.resend_api_key;
    if (!apiKey) {
      console.error("Newsletter unavailable: RESEND_API_KEY is not configured");
      return NextResponse.json({ error: "Newsletter is temporarily unavailable" }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const audienceId = await getDefaultAudienceId(resend);
    const contact = await resend.contacts.create({ audienceId, email });
    if (contact.error && !isDuplicateContact(contact.error)) {
      throw new Error(`Unable to store newsletter contact: ${contact.error.message}`);
    }

    const notification = await resend.emails.send({
      from: "Veylo <hello@veyloskin.com>",
      to: "hello@veyloskin.com",
      subject: `New subscriber: ${email}`,
      text: `New newsletter signup:\n\n${email}\n\nSource: ${source}\nTime: ${new Date().toISOString()}`,
    });
    if (notification.error) console.error("Newsletter notification email error:", notification.error);

    if (source === "welcome-popup") {
      const welcome = await resend.emails.send({
        from: "Veylo <hello@veyloskin.com>",
        to: email,
        ...welcomeEmail,
      });
      if (welcome.error) console.error("Welcome email error:", welcome.error);
    }

    return NextResponse.json({ ok: true, duplicate: Boolean(contact.error) });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
