import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { AnnouncementBar } from "@/components/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { CookieConsentProvider } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/components/store-provider";
import { TrackingPixels } from "@/components/tracking-pixels";
import { WelcomeOffer } from "@/components/welcome-offer";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Veylo — beneath the surface", template: "%s | Veylo" },
  description: "Professional skin and body treatment technology, made clearer for use at home. Explore Veylo devices for face, body and scalp rituals.",
  applicationName: "Veylo",
  category: "health and beauty",
  creator: "Veylo",
  publisher: "Veylo",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Veylo",
    title: "Veylo — beneath the surface",
    description: "Professional skin and body treatment technology, made clearer for use at home.",
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Veylo at-home skin and body technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veylo — beneath the surface",
    description: "Professional skin and body treatment technology, made clearer for use at home.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon-48.png",
    apple: { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#faf7f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={GeistSans.variable}>
      <body className="antialiased">
        <StoreProvider>
          <CookieConsentProvider>
            <TrackingPixels />
            <AnnouncementBar />
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
            <WelcomeOffer />
          </CookieConsentProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
