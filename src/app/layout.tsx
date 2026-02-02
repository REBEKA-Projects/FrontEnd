import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REBEKA | Real Estate Blockchain Ekosystem Arbitrum",
  description: "Bridging institutional real estate with on-chain liquidity on Arbitrum Stylus. Fractional investment in premium assets through the REBEKA Protocol.",
  keywords: ["RWA", "Real Estate", "Arbitrum", "Stylus", "Tokenization", "DeFi", "Blockchain", "REBEKA"],
  authors: [{ name: "REBEKA Protocol" }],
  openGraph: {
    title: "REBEKA | Real Estate Blockchain Ekosystem Arbitrum",
    description: "Bridging institutional real estate with on-chain liquidity on Arbitrum Stylus.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REBEKA | Real Estate Blockchain Ekosystem Arbitrum",
    description: "Bridging institutional real estate with on-chain liquidity on Arbitrum Stylus.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased noise`}
      >
        {children}
      </body>
    </html>
  );
}
