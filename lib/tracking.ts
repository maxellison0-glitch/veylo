declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      page: () => void;
      track: (event: string, params?: Record<string, unknown>) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export function trackViewContent(item: TrackingItem) {
  const value = item.price * item.quantity;

  window.fbq?.("track", "ViewContent", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    contents: [{ id: item.id, quantity: item.quantity }],
    value,
    currency: "GBP",
  });

  window.ttq?.track("ViewContent", {
    content_id: item.id,
    content_name: item.name,
    content_type: "product",
    value,
    currency: "GBP",
    quantity: item.quantity,
  });

  window.gtag?.("event", "view_item", {
    currency: "GBP",
    value,
    items: [{ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity }],
  });
}

export function trackAddToCart(item: TrackingItem) {
  const value = item.price * item.quantity;

  window.fbq?.("track", "AddToCart", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    contents: [{ id: item.id, quantity: item.quantity }],
    value,
    currency: "GBP",
  });

  window.ttq?.track("AddToCart", {
    content_id: item.id,
    content_name: item.name,
    content_type: "product",
    value,
    currency: "GBP",
    quantity: item.quantity,
  });

  window.gtag?.("event", "add_to_cart", {
    currency: "GBP",
    value,
    items: [{ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity }],
  });
}

export function trackBeginCheckout(value: number, items: TrackingItem[]) {
  const quantity = items.reduce((total, item) => total + item.quantity, 0);

  window.fbq?.("track", "InitiateCheckout", {
    content_ids: items.map((item) => item.id),
    contents: items.map((item) => ({ id: item.id, quantity: item.quantity })),
    value,
    currency: "GBP",
    num_items: quantity,
  });

  window.ttq?.track("InitiateCheckout", {
    contents: items.map((item) => ({ content_id: item.id, quantity: item.quantity })),
    value,
    currency: "GBP",
    quantity,
  });

  window.gtag?.("event", "begin_checkout", {
    currency: "GBP",
    value,
    items: items.map((item) => ({ item_id: item.id, item_name: item.name, price: item.price, quantity: item.quantity })),
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
