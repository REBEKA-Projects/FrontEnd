"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ParaLogin } from '@/components/organisms/Auth/ParaLogin';
import { useAuthStore } from '@/store/useAuthStore';
import { Typography } from '@/components/atoms/Typography';
import { GlassCard } from '@/components/GlassCard';
import { ArrowRight, Hexagon } from "lucide-react";

export default function DappPage() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [mounted, isAuthenticated, router]);

    if (mounted && isAuthenticated) {
        return null;
    }

    return (
        <div className="relative min-h-screen bg-blueprint flex items-center justify-center p-6">
            {/* ═══ AMBIENT BACKGROUND ═══ */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40 z-0" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-30 z-0" />

            {/* Ambient Flares */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[--rebeka-primary] blur-[150px] opacity-[0.07] pointer-events-none z-0" />
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[--rebeka-secondary] blur-[150px] opacity-[0.05] pointer-events-none z-0" />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">

                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#12131A] flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/5">
                        <Hexagon className="w-8 h-8 text-[--rebeka-primary]" />
                    </div>

                    <Typography variant="h2" className="text-white mb-3">
                        Welcome to REBEKA
                    </Typography>
                    <Typography variant="p" className="text-[--rebeka-text-secondary] text-sm">
                        Connect your wallet or social account to enter the dApp.
                    </Typography>
                </div>

                <GlassCard hover={false} className="p-8 border-white/10 backdrop-blur-xl bg-white/[0.02] shadow-2xl relative overflow-hidden">
                    {/* Inner subtle glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[--rebeka-primary-dim] to-transparent opacity-50" />

                    {mounted && !isAuthenticated ? (
                        <div className="space-y-6">
                            <ParaLogin />
                        </div>
                    ) : (
                        <div className="flex justify-center py-10">
                            <span className="flex h-5 w-5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--rebeka-primary] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-[--rebeka-primary]"></span>
                            </span>
                        </div>
                    )}
                </GlassCard>

                <div className="mt-8 text-center flex items-center justify-center gap-3">
                    <span className="flex h-2 w-2 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--rebeka-primary] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[--rebeka-primary]"></span>
                    </span>
                    <Typography variant="caption" className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                        Secured by Arbitrum Network
                    </Typography>
                </div>
            </div>
        </div>
    );
}
