"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/lib/catalog";
import { trackAddToCart } from "@/lib/tracking";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  variant: string;
  finish: string;
  finishHex: string;
  price: number;
  quantity: number;
};

type AddItemOptions = {
  variant?: string;
  finish?: string;
  quantity?: number;
  openDrawer?: boolean;
};

type StoreContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (product: Product, options?: AddItemOptions) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const syncSavedCart = () => {
      try {
        const saved = window.localStorage.getItem("veylo-cart");
        if (saved) {
          const parsed = JSON.parse(saved) as CartItem[];
          setItems(parsed.filter((item) => {
            const product = products.find((entry) => entry.slug === item.slug);
            return Boolean(product);
          }));
        }
      } catch {
        window.localStorage.removeItem("veylo-cart");
      } finally {
        setHydrated(true);
      }
    };
    const timer = window.setTimeout(syncSavedCart, 0);
    window.addEventListener("storage", syncSavedCart);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", syncSavedCart);
    };
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("veylo-cart", JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(product: Product, options: AddItemOptions = {}) {
    const variant = product.variants.find((entry) => entry.label === options.variant) ?? product.variants[0];
    const finish = product.finishes.find((entry) => entry.name === options.finish) ?? product.finishes[0];
    const id = `${product.slug}-${variant.label}-${finish.name}`;
    const quantity = options.quantity ?? 1;

    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...current,
        {
          id,
          slug: product.slug,
          name: product.name,
          variant: variant.label,
          finish: finish.name,
          finishHex: finish.hex,
          price: variant.price,
          quantity,
        },
      ];
    });

    trackAddToCart({ id: product.slug, name: product.name, price: variant.price, quantity });
    if (options.openDrawer !== false) setDrawerOpen(true);
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
      drawerOpen,
      setDrawerOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart: () => setItems([]),
    }),
    [items, drawerOpen],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
