import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CartPageContent } from "@/components/cart-page-content";

export const metadata: Metadata = { title: "Your shopping bag", robots: { index: false, follow: true } };

export default function CartPage() {
  return <main className="cart-page"><div className="site-container page-breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} /><span>Bag</span></div><header className="site-container cart-header"><span className="eyebrow">Your selection</span><h1>Shopping <em>bag.</em></h1></header><div className="site-container"><CartPageContent /></div></main>;
}
