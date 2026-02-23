"use client";

import { useState } from "react";
import { InvestorStatus } from "@/components/organisms/KYC/InvestorStatus";
import { Portfolio } from "@/components/organisms/Dashboard/Portfolio";
import { RevenueManager } from "@/components/organisms/Dashboard/RevenueManager";
import { StripeModal } from "@/components/organisms/Checkout/StripeModal";
import { ProcessingModal } from "@/components/organisms/Checkout/ProcessingModal";
import { NetworkGuard } from "@/components/organisms/Network/NetworkGuard";
import { Typography } from "@/components/atoms/Typography";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserData } from "@/hooks/useUserData";
import { useIsAllowed } from "@/lib/web3/hooks";
import { KNOWN_TOKENS, getTokenConfig } from "@/lib/config/tokens";
import { GlassCard } from "@/components/GlassCard";
import { TrendingUp, ArrowUpRight, ArrowRight, Filter, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardOverviewPage() {
    const router = useRouter();
    const { kycStatus } = useAuthStore();
    const { data: userData, isLoading: isUserDataLoading, refetch: refetchUserData } = useUserData();

    // On-chain whitelist check
    const walletAddr = userData?.user?.wallet as `0x${string}` | undefined;
    const firstTokenAddr = userData?.portfolio?.[0]?.tokenAddress as `0x${string}` | undefined;
    const { data: isWhitelistedOnChain } = useIsAllowed(
        firstTokenAddr || '0x0000000000000000000000000000000000000000',
        walletAddr || '0x0000000000000000000000000000000000000000'
    );

    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
    const [processingOpId, setProcessingOpId] = useState<string | null>(null);

    return (
        <div className="space-y-12 animate-fade-in">
            {/* DASHBOARD HEADER - Dense Information */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
                <div>
                    <Typography variant="h1" className="text-white font-bold text-4xl lg:text-5xl tracking-tighter leading-none mb-4 uppercase">
                        Investor <span className="text-gradient-primary">Overview</span>
                    </Typography>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] w-fit">
                        <Shield className="w-3 h-3 text-[--rebeka-secondary]" />
                        <span className="text-[8px] font-black text-[--rebeka-secondary] uppercase tracking-[0.2em]">Privacy Secured by FHE</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Invest Asset button removed as per user request */}
                </div>
            </div>

            {/* GRID COMPOSITION - Bloomberg Style Hierarchy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Interaction Column */}
                <div className="lg:col-span-8 space-y-12">
                    <InvestorStatus />
                    <Portfolio
                        portfolioData={userData?.portfolio}
                        operations={userData?.operations}
                        isLoading={isUserDataLoading}
                        walletAddress={userData?.user?.wallet as `0x${string}` | undefined}
                        tokenAddress={userData?.portfolio?.[0]?.tokenAddress as `0x${string}` | undefined}
                    />

                    {/* Revenue Manager Section */}
                    {(() => {
                        const firstToken = userData?.portfolio?.[0];
                        const tokenCfg = firstToken ? getTokenConfig(firstToken.tokenAddress) : null;
                        if (!isWhitelistedOnChain) return null;
                        if (tokenCfg?.distributorAddress && walletAddr) {
                            return (
                                <RevenueManager
                                    distributorAddress={tokenCfg.distributorAddress}
                                    userAddress={walletAddr}
                                    tokenSymbol="USDC"
                                />
                            );
                        }
                        return (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 px-2">
                                    <Zap className="w-4 h-4 text-[--rebeka-secondary]" />
                                    <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">
                                        Revenue Manager
                                    </Typography>
                                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-auto">Dividends</span>
                                </div>
                                <GlassCard className="p-8 border-white/5" hover={false}>
                                    <div className="flex flex-col items-center justify-center text-center space-y-3 py-2">
                                        <div className="w-12 h-12 rounded-full bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] flex items-center justify-center opacity-40">
                                            <Zap className="w-6 h-6 text-[--rebeka-secondary]" />
                                        </div>
                                        <Typography variant="p" className="text-white font-bold text-sm">Revenue Distribution Not Yet Active</Typography>
                                        <Typography variant="caption" className="text-white/30 block font-mono text-[10px] max-w-sm leading-relaxed">
                                            Dividend claims will be available once the issuer activates revenue distribution for your holdings.
                                        </Typography>
                                    </div>
                                </GlassCard>
                            </div>
                        );
                    })()}
                </div>

                {/* Sidereal Data Column */}
                <aside className="lg:col-span-4 space-y-10">
                    <div className="flex flex-col gap-6 p-1 rounded-3xl bg-white/[0.01] border border-white/5">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <Typography variant="h4" className="text-white uppercase tracking-widest font-bold flex items-center gap-3 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-[--rebeka-primary]" />
                                    Market Opportunities
                                </Typography>
                                <Filter className="w-4 h-4 text-white/20" />
                            </div>

                            {kycStatus === 'APPROVED' ? (
                                <div className="space-y-6 relative">
                                    {KNOWN_TOKENS.map((token) => (
                                        <div
                                            key={token.tokenAddress}
                                            onClick={() => router.push(`/dapp/property/${token.tokenAddress}`)}
                                            className="group p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-[--rebeka-secondary-glow] transition-all cursor-pointer relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                                <ArrowUpRight className="w-4 h-4 text-[--rebeka-secondary]" />
                                            </div>
                                            <span className="text-[9px] font-black text-[--rebeka-secondary] uppercase tracking-[0.2em] mb-3 block">Primary Offering</span>
                                            {/* On-chain KYC Badge */}
                                            {isWhitelistedOnChain !== undefined && (
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest mb-3 ${isWhitelistedOnChain
                                                    ? 'bg-[--rebeka-success]/10 text-[--rebeka-success] border border-[--rebeka-success]/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isWhitelistedOnChain ? 'bg-[--rebeka-success]' : 'bg-red-400'}`} />
                                                    {isWhitelistedOnChain ? 'Whitelisted' : 'Not Whitelisted'}
                                                </span>
                                            )}
                                            <Typography variant="p" className="text-white font-bold text-lg leading-none mb-2">{token.name} <span className="text-white/30 font-mono text-xs font-normal">{token.symbol}</span></Typography>
                                            <Typography variant="caption" className="text-white/40 block mb-6 leading-tight font-medium">{token.description}</Typography>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-bold text-white/20 uppercase">Yield</span>
                                                    <span className="text-sm font-mono text-[--rebeka-success] font-bold">{token.yieldAPY}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-bold text-white/20 uppercase">Asset Class</span>
                                                    <span className="text-sm font-mono text-white font-bold">{token.assetClass}</span>
                                                </div>
                                            </div>

                                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white uppercase tracking-widest group-hover:bg-[--rebeka-secondary] group-hover:text-black group-hover:border-transparent transition-all">
                                                View Property
                                            </button>
                                        </div>
                                    ))}

                                    <div className="p-10 text-center rounded-2xl border border-white/5 bg-white/[0.01] border-dashed">
                                        <Typography variant="caption" className="text-white/20 font-bold uppercase tracking-[0.3em] italic">More assets coming soon</Typography>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center rounded-3xl bg-black border border-white/10 shadow-inner">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 grayscale opacity-40">
                                        <TrendingUp className="w-8 h-8 text-white/20" />
                                    </div>
                                    <Typography variant="p" className="text-white text-sm font-bold mb-2">Access Locked</Typography>
                                    <Typography variant="caption" className="text-white/30 leading-relaxed block font-medium">
                                        Complete the secure verification check to access exclusive institutional real estate vaults.
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {stripeClientSecret && (
                <StripeModal
                    clientSecret={stripeClientSecret}
                    onSuccess={() => {
                        setStripeClientSecret(null);
                        setProcessingOpId("OP_" + Math.random().toString(36).substr(2, 9).toUpperCase());
                    }}
                    onCancel={() => setStripeClientSecret(null)}
                />
            )}

            {processingOpId && (
                <ProcessingModal
                    operationId={processingOpId}
                    onClose={() => setProcessingOpId(null)}
                    onSuccess={() => {
                        setProcessingOpId(null);
                        refetchUserData();
                    }}
                />
            )}

            <NetworkGuard />
        </div>
    );
}
