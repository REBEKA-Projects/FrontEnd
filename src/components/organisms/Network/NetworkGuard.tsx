"use client";

import { useEffect, useState } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { arbitrumSepolia } from "viem/chains";
import { GlassCard } from "@/components/GlassCard";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { AlertTriangle, ArrowRight, Wifi } from "lucide-react";

const TARGET_CHAIN = arbitrumSepolia;

/**
 * Renders a banner prompting the user to switch to Arbitrum Sepolia
 * if they are connected but on the wrong network.
 */
export const NetworkGuard = () => {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChain, isPending, error } = useSwitchChain();
    const [dismissed, setDismissed] = useState(false);

    const isWrongNetwork = isConnected && chainId !== TARGET_CHAIN.id;

    // Auto-prompt on first detection
    useEffect(() => {
        if (isWrongNetwork && !dismissed) {
            // Small delay to avoid jarring UX
            const timer = setTimeout(() => {
                switchChain?.({ chainId: TARGET_CHAIN.id });
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isWrongNetwork, dismissed, switchChain]);

    if (!isWrongNetwork || dismissed) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 animate-fade-in">
            <GlassCard className="p-5 border-[--rebeka-secondary-glow] shadow-[0_0_40px_rgba(212,175,55,0.15)]" hover={false}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-[--rebeka-secondary]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <Typography variant="p" className="text-white font-bold text-sm mb-0.5">
                            Wrong Network Detected
                        </Typography>
                        <Typography variant="caption" className="text-white/40 text-xs block">
                            Switch to <span className="text-[--rebeka-primary] font-bold">Arbitrum Sepolia</span> to interact with Rebeka contracts.
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <Button
                            variant="primary"
                            onClick={() => switchChain?.({ chainId: TARGET_CHAIN.id })}
                            isLoading={isPending}
                            className="btn-gold !py-2 !px-4 !text-[10px]"
                        >
                            <span className="flex items-center gap-2">
                                <Wifi className="w-3 h-3" /> Switch
                            </span>
                        </Button>
                        <button
                            onClick={() => setDismissed(true)}
                            className="text-white/20 hover:text-white/60 text-xs transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-[10px] font-mono text-red-400">{error.message.substring(0, 100)}</span>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};
