"use client";

import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { GlassCard } from "@/components/GlassCard";
import { usePendingRevenue, useClaimRevenue } from "@/lib/web3/hooks";
import { DollarSign, ArrowDownToLine, CheckCircle, Loader2, Coins } from "lucide-react";
import { formatUnits } from "viem";

interface RevenueManagerProps {
    distributorAddress: `0x${string}`;
    userAddress: `0x${string}`;
    tokenSymbol?: string;
}

export const RevenueManager = ({ distributorAddress, userAddress, tokenSymbol = "USDC" }: RevenueManagerProps) => {
    const { data: pendingRaw, isLoading: isPendingLoading, refetch } = usePendingRevenue(distributorAddress, userAddress);
    const { claim, isPending: isClaiming, isConfirming, isSuccess, error, hash } = useClaimRevenue(distributorAddress);

    // USDC has 6 decimals
    const pendingFormatted = pendingRaw !== undefined ? formatUnits(pendingRaw as bigint, 6) : "0.00";
    const hasPending = pendingRaw !== undefined && (pendingRaw as bigint) > BigInt(0);

    const handleClaim = () => {
        claim();
    };

    // Refetch pending after successful claim
    if (isSuccess) {
        setTimeout(() => refetch(), 3000);
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
                <Coins className="w-4 h-4 text-[--rebeka-secondary]" />
                <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">
                    Revenue Manager
                </Typography>
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-auto">Dividends</span>
            </div>

            <GlassCard className="p-6 border-white/5 space-y-6" hover={false}>
                {/* Pending Revenue Display */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-2">Pending Dividends</span>
                        <div className="flex items-baseline gap-2">
                            {isPendingLoading ? (
                                <div className="h-8 w-20 bg-white/10 rounded-md animate-pulse" />
                            ) : (
                                <>
                                    <span className="text-3xl font-mono font-bold text-[--rebeka-secondary]">
                                        {pendingFormatted}
                                    </span>
                                    <span className="text-[10px] font-mono text-white/30 uppercase">{tokenSymbol}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] flex items-center justify-center">
                        <DollarSign className="w-7 h-7 text-[--rebeka-secondary]" />
                    </div>
                </div>

                {/* Claim Button */}
                <Button
                    variant="primary"
                    onClick={handleClaim}
                    isLoading={isClaiming || isConfirming}
                    disabled={!hasPending || isClaiming || isConfirming}
                    className={`w-full !py-4 !text-xs font-black uppercase tracking-widest transition-all ${hasPending
                        ? 'btn-gold'
                        : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                        }`}
                >
                    <span className="flex items-center justify-center gap-3">
                        {isClaiming ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Signing Transaction...</>
                        ) : isConfirming ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Confirming On-chain...</>
                        ) : isSuccess ? (
                            <><CheckCircle className="w-4 h-4" /> Dividends Claimed!</>
                        ) : hasPending ? (
                            <><ArrowDownToLine className="w-4 h-4" /> Claim Dividends</>
                        ) : (
                            <>No Dividends Available</>
                        )}
                    </span>
                </Button>

                {/* Transaction Hash */}
                {hash && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Transaction</span>
                        <a
                            href={`https://sepolia.arbiscan.io/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[--rebeka-primary] hover:underline truncate block"
                        >
                            {hash}
                        </a>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-widest block mb-1">Error</span>
                        <span className="text-[10px] font-mono text-red-300">
                            {error.message.includes("NothingToClaim")
                                ? "No dividends available to claim."
                                : error.message.substring(0, 120)}
                        </span>
                    </div>
                )}

                {/* Info Footer */}
                <div className="pt-4 border-t border-white/5">
                    <Typography variant="caption" className="text-white/20 text-[10px] leading-relaxed block">
                        Dividends are distributed proportionally to your token holdings. Revenue is deposited by the asset issuer and can be claimed at any time.
                    </Typography>
                </div>
            </GlassCard>
        </div>
    );
};
