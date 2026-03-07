import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | FIDUCCI",
        default: "DApp | FIDUCCI",
    },
    description: "FIDUCCI decentralized application — Institutional-Grade Tokenization as a Service.",
};

export default function DappLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative min-h-screen bg-blueprint">
            {/* ═══ SHARED AMBIENT BACKGROUND ═══ */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40 z-0" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-30 z-0" />

            {/* Asymmetric Light Flares */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary blur-[120px] opacity-[0.015] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-secondary blur-[120px] opacity-[0.015] pointer-events-none z-0" />

            {children}
        </div>
    );
}
