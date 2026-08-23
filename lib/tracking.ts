declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingItem = {
  name: string;
  price: number;
  quantity: number;
};

export function trackAddToCart(item: TrackingItem) {
  window.fbq?.("track", "AddToCart", {
    content_name: item.name,
    content_type: "product",
    value: item.price,
    currency: "GBP",
  });

  window.ttq?.track("AddToCart", {
    content_name: item.name,
    content_type: "product",
    value: item.price,
    currency: "GBP",
    quantity: item.quantity,
  });

  window.gtag?.("event", "add_to_cart", {
    currency: "GBP",
    value: item.price,
    items: [{ item_name: item.name, price: item.price, quantity: item.quantity }],
  });
}

export function trackBeginCheckout(value: number, items: TrackingItem[]) {
  window.fbq?.("track", "InitiateCheckout", {
    value,
    currency: "GBP",
    num_items: items.length,
  });

  window.ttq?.track("InitiateCheckout", {
    value,
    currency: "GBP",
    quantity: items.length,
  });

  window.gtag?.("event", "begin_checkout", {
    currency: "GBP",
    value,
    items: items.map((i) => ({ item_name: i.name, price: i.price, quantity: i.quantity })),
  });
}

export function trackPurchase(value: number, transactionId?: string) {
  window.fbq?.("track", "Purchase", {
    value,
    currency: "GBP",
  });

  window.ttq?.track("CompletePayment", {
    value,
    currency: "GBP",
  });

  window.gtag?.("event", "purchase", {
    currency: "GBP",
    value,
    transaction_id: transactionId,
  });
}

export {};
