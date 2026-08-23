import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = { title: "Secure checkout", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <main className="checkout-page"><div className="site-container"><CheckoutForm /></div></main>;
}
