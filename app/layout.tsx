import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { headers } from "next/headers";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { CookieConsentProvider } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/components/store-provider";
import { TrackingPixels } from "@/components/tracking-pixels";
import "./globals.css";


export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host")?.split(",")[0].trim() ?? requestHeaders.get("host") ?? "www.veyloskin.com";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: { default: "Veylo — at-home beauty tech", template: "%s | Veylo" },
    description: "Design-led at-home beauty tech from the UK. Simple devices, honest guidance and rituals that take minutes.",
    applicationName: "Veylo",
    keywords: ["at-home beauty tech", "red light therapy device UK", "LED face mask UK", "facial massage tools", "beauty devices UK"],
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: "Veylo",
      title: "Veylo — at-home beauty tech",
      description: "Design-led at-home beauty tech from the UK. Simple devices, honest guidance and rituals that take minutes.",
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Veylo — at-home beauty tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Veylo — at-home beauty tech",
      description: "Design-led at-home beauty tech from the UK. Simple devices, honest guidance and rituals that take minutes.",
      images: [socialImage],
    },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#faf7f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${GeistSans.variable} antialiased`}>
        <StoreProvider>
          <CookieConsentProvider>
            <TrackingPixels />
            <AnnouncementBar />
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
          </CookieConsentProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
