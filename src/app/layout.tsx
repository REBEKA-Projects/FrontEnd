import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/components/templates/AppProviders";
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

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : new URL('https://rebeka.fi'),
  title: "REBEKA | Real Estate Blockchain Ekosystem Arbitrum",
  description: "Bridging institutional real estate with on-chain liquidity on Arbitrum Sepolia. Fractional investment in premium assets through the REBEKA Protocol.",
  keywords: ["RWA", "Real Estate", "Arbitrum", "Sepolia", "Tokenization", "DeFi", "Blockchain", "REBEKA"],
  authors: [{ name: "REBEKA Protocol" }],
  openGraph: {
    title: "REBEKA | Real Estate Blockchain Ekosystem Arbitrum",
    description: "Bridging institutional real estate with on-chain liquidity on Arbitrum Sepolia.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REBEKA | Real Estate Blockchain Ekosystem Arbitrum",
    description: "Bridging institutional real estate with on-chain liquidity on Arbitrum Sepolia.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased noise`}
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
