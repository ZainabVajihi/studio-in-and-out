import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer, WhatsAppButton } from "@/components/Footer";
import { Effects } from "@/components/Effects";
import { getSite } from "@/lib/content";
// Brand fonts, served from this site (no request to Google)
import "@fontsource/poppins/latin-300.css";
import "@fontsource/poppins/latin-300-italic.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-400-italic.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/playfair-display/latin-600-italic.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studioinandout.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Studio In & Out | Architecture & Interior Design, Mumbai", template: "%s | Studio In & Out" },
  description:
    "Studio In & Out is a Mumbai architecture and interior design studio founded by Abdeali Kachwala and Ar. Sakina Kachwala. A perspective beyond aesthetics.",
  icons: { icon: "/assets/logo.png" },
  openGraph: {
    title: "Studio In & Out | Architecture & Interior Design, Mumbai",
    description: "A perspective beyond aesthetics. Architecture, interiors and space planning.",
    images: ["/assets/hero2.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F3F3F0" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* marks that scripts run, so the reveal styles only apply when they can finish */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body>
        <div className="guides" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Header />
        {children}
        <Footer site={site} />
        <WhatsAppButton number={site.studio.whatsapp} />
        <Effects />
      </body>
    </html>
  );
}
