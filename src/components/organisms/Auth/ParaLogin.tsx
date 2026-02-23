"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAutoRegister } from "@/hooks/useAutoRegister";
import { Typography } from "@/components/atoms/Typography";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Fingerprint, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { useModal, useAccount } from "@getpara/react-sdk";

export const ParaLogin = () => {
    const router = useRouter();
    const { isAuthenticated, userId } = useAuthStore();
    const { register, isRegistering, error: registerError } = useAutoRegister();
    const { isOpen, openModal } = useModal();
    const { isConnected, embedded } = useAccount();

    const [localError, setLocalError] = useState<string | null>(null);
    const [phase, setPhase] = useState<'idle' | 'auth' | 'registering' | 'done'>('idle');

    // Handle the auto-sync after Para finishes logging the user in
    useEffect(() => {
        // Only trigger if Para says connected, and we have the embedded data
        if (isConnected && embedded?.wallets && embedded.wallets.length > 0 && !userId && phase !== 'registering' && phase !== 'done') {
            const syncIdentity = async () => {
                setPhase('registering');
                setLocalError(null);
                try {
                    const email = embedded?.email || 'investor@example.com';
                    const walletAddress = embedded?.wallets?.[0]?.address;

                    if (!walletAddress) {
                        throw new Error("No wallet address found in Para session.");
                    }

                    await register(email, walletAddress);

                    setPhase('done');
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 600);
                } catch (err: any) {
                    console.error("Identity Sync Error:", err);
                    setLocalError(registerError || "IDENTITY_SYNC_FAILURE");
                    setPhase('idle');
                }
            };
            syncIdentity();
        }
    }, [isConnected, embedded, userId, phase, register, registerError, router]);

    // Track when Para Modal opens
    useEffect(() => {
        if (isOpen && phase === 'idle') {
            setPhase('auth');
        } else if (!isOpen && phase === 'auth' && !isConnected) {
            setPhase('idle'); // User closed modal without authenticating
        }
    }, [isOpen, phase, isConnected]);

    const handleParaLoginClick = () => {
        setLocalError(null);
        openModal();
    };

    const isProcessing = isRegistering || phase === 'auth' || phase === 'done';

    const activePhaseLabel = (() => {
        if (phase === 'auth') return 'Waiting for Signature...';
        if (phase === 'registering') return 'Setting up Account...';
        if (phase === 'done') return 'Success ✓';
        return null;
    })();

    return (
        <div className="max-w-md w-full mx-auto">
            <GlassCard className="p-8 relative overflow-hidden group border-white/10" hover={false}>
                {/* Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[--rebeka-primary-glow] to-transparent" />

                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center shadow-2xl relative z-10">
                            {isProcessing ? (
                                <Loader2 className="w-10 h-10 text-[--rebeka-primary] animate-spin" />
                            ) : (
                                <Shield className="w-10 h-10 text-[--rebeka-primary]" />
                            )}
                        </div>
                        {isProcessing && (
                            <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-[--rebeka-primary] blur-2xl opacity-20 animate-pulse" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Typography variant="h3" className="text-white font-black tracking-widest uppercase italic">
                            Sign <span className="text-gradient-primary">In</span>
                        </Typography>
                        <div className="flex items-center justify-center gap-2">
                            <Fingerprint className="w-3 h-3 text-white/20" />
                            <Typography variant="caption" className="text-white/40 block font-mono tracking-widest uppercase">
                                Authentication Required
                            </Typography>
                        </div>
                    </div>

                    {/* Phase indicator */}
                    {activePhaseLabel && (
                        <div className="w-full p-3 bg-[--rebeka-primary-dim] border border-[--rebeka-primary-glow] rounded-xl animate-fade-in">
                            <Typography variant="caption" className="text-[--rebeka-primary] font-mono text-[10px] block uppercase tracking-widest">
                                {activePhaseLabel}
                            </Typography>
                        </div>
                    )}

                    {localError && (
                        <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-3">
                            <Typography variant="caption" className="text-red-400 font-mono text-[10px] block uppercase">
                                [ERROR]: {localError}
                            </Typography>
                            <button
                                onClick={() => setLocalError(null)}
                                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all"
                            >
                                <RefreshCw className="w-3 h-3" /> Retry
                            </button>
                        </div>
                    )}

                    <button
                        onClick={handleParaLoginClick}
                        disabled={isProcessing}
                        className="w-full group/btn relative h-16 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-[--rebeka-primary] transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
                    >
                        {isProcessing ? (
                            activePhaseLabel || "Processing..."
                        ) : (
                            <>
                                Connect Wallet
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left" />
                    </button>

                    <div className="w-full pt-4 border-t border-white/5">
                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.3em] leading-relaxed">
                            Powered by Para Protocol
                        </p>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};


