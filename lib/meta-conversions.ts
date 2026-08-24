import { createHash } from "node:crypto";
import type Stripe from "stripe";

type MetaContentsItem = {
  id: string;
  quantity: number;
  item_price?: number;
};

function normalise(value: string) {
  return value.trim().toLowerCase();
}

function hash(value: string | null | undefined) {
  if (!value) return undefined;
  const normalised = normalise(value);
  if (!normalised) return undefined;
  return createHash("sha256").update(normalised).digest("hex");
}

function hashPhone(value: string | null | undefined) {
  if (!value) return undefined;
  return hash(value.replace(/\D/g, ""));
}

function parseName(value: string | null | undefined) {
  const parts = value?.trim().split(/\s+/).filter(Boolean) ?? [];
  return {
    firstName: parts[0],
    lastName: parts.length > 1 ? parts.at(-1) : undefined,
  };
}

function parseContents(value: string | undefined): MetaContentsItem[] | undefined {
  if (!value) return undefined;

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return undefined;

    const contents = parsed.filter((item): item is MetaContentsItem => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<MetaContentsItem>;
      return typeof candidate.id === "string" && typeof candidate.quantity === "number";
    });

    return contents.length ? contents : undefined;
  } catch {
    return undefined;
  }
}

function addHashed(
  target: Record<string, string | string[]>,
  key: string,
  value: string | undefined,
) {
  if (value) target[key] = [value];
}

export async function sendMetaPurchase(
  session: Stripe.Checkout.Session,
  eventTime: number,
) {
  if (session.metadata?.meta_tracking_consent !== "accepted") {
    return { sent: false, reason: "consent_not_accepted" } as const;
  }

  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    throw new Error("Meta Conversions API environment variables are not configured");
  }

  const details = session.customer_details;
  const address = details?.address;
  const { firstName, lastName } = parseName(details?.name);
  const userData: Record<string, string | string[]> = {};

  addHashed(userData, "em", hash(details?.email));
  addHashed(userData, "ph", hashPhone(details?.phone));
  addHashed(userData, "fn", hash(firstName));
  addHashed(userData, "ln", hash(lastName));
  addHashed(userData, "ct", hash(address?.city));
  addHashed(userData, "st", hash(address?.state));
  addHashed(userData, "zp", hash(address?.postal_code));
  addHashed(userData, "country", hash(address?.country));
  const customerId = typeof session.customer === "string" ? session.customer : details?.email;
  addHashed(userData, "external_id", hash(customerId));

  if (session.metadata?.meta_fbp) userData.fbp = session.metadata.meta_fbp;
  if (session.metadata?.meta_fbc) userData.fbc = session.metadata.meta_fbc;
  if (session.metadata?.meta_client_ip_address) {
    userData.client_ip_address = session.metadata.meta_client_ip_address;
  }
  if (session.metadata?.meta_client_user_agent) {
    userData.client_user_agent = session.metadata.meta_client_user_agent;
  }

  const contents = parseContents(session.metadata?.meta_contents);
  const currency = session.currency?.toUpperCase() ?? "GBP";
  const graphVersion = process.env.META_GRAPH_API_VERSION ?? "v23.0";
  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: eventTime,
        event_id: session.id,
        action_source: "website",
        event_source_url:
          session.metadata?.meta_source_url ?? "https://www.veyloskin.com/checkout/return",
        user_data: userData,
        custom_data: {
          currency,
          value: (session.amount_total ?? 0) / 100,
          order_id: session.id,
          content_type: "product",
          content_ids: contents?.map((item) => item.id),
          contents,
          num_items: contents?.reduce((total, item) => total + item.quantity, 0),
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${encodeURIComponent(pixelId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Meta Conversions API rejected the Purchase event: ${error.slice(0, 500)}`);
  }

  return { sent: true } as const;
}
