import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const session = await getStripe().checkout.sessions.retrieve(sessionId);

  return NextResponse.json({
    status: session.status,
    customerEmail: session.customer_details?.email,
    amountTotal: session.amount_total ? session.amount_total / 100 : null,
  });
}
