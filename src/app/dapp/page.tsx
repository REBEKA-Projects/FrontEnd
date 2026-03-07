"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, GlassCard } from '@/components/atoms';
import { ParaLogin } from '@/components/organisms';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, Hexagon } from "lucide-react";

export default function DappPage() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, mounted, router]);

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen bg-blueprint overflow-hidden">
            {/* AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-30" />

            <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
                <GlassCard className="w-full max-w-lg p-10 space-y-10 animate-fade-in-up">
                    <div className="space-y-4 text-center">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                            <Hexagon className="w-10 h-10 text-secondary animate-pulse" />
                        </div>
                        <Typography variant="h1" className="text-white font-black tracking-tighter uppercase italic">
                            Protocol <span className="text-secondary">Gateway</span>
                        </Typography>
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-secondary/50 to-transparent mx-auto" />
                        <Typography variant="p" className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                            Institutional access to tokenized Real World Assets. Please authenticate via Para to access your terminal.
                        </Typography>
                    </div>

                    <div className="space-y-6">
                        <ParaLogin />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block">Status</span>
                                <span className="text-[11px] text-secondary font-black uppercase">Ready for connection</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block">Network</span>
                                <span className="text-[11px] text-white font-black uppercase">Arbitrum Sepolia</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 text-center">
                        <button
                            onClick={() => router.push('/')}
                            className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-2 mx-auto group"
                        >
                            Return to Terminal <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </GlassCard>
            </main>
        </div>
    );
}
