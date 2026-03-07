import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat } from "next/font/google";
import { AppProviders } from "@/components/templates";
import { Header } from "@/components/organisms";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : new URL('https://fiducci.io'),
  title: "FIDUCCI | The Trust Stack for Real World Assets",
  description: "Institutional-Grade Tokenization as a Service. Transparent. Secure. Liquid. Powered by Chainlink CRE on Arbitrum.",
  keywords: ["RWA", "Real Estate", "Arbitrum", "Tokenization", "DeFi", "Blockchain", "FIDUCCI", "Chainlink CRE", "TaaS"],
  authors: [{ name: "FIDUCCI Protocol" }],
  openGraph: {
    title: "FIDUCCI | The Trust Stack for Real World Assets",
    description: "Institutional-Grade Tokenization as a Service. Transparent. Secure. Liquid.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIDUCCI | The Trust Stack for Real World Assets",
    description: "Institutional-Grade Tokenization as a Service. Transparent. Secure. Liquid.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable} antialiased noise`}
      >
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
