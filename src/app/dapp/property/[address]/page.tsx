"use client";

import { useParams, useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import { GlassCard } from "@/components/GlassCard";
import { AssetVault } from "@/components/organisms/Dashboard/AssetVault";
import { RevenueManager } from "@/components/organisms/Dashboard/RevenueManager";
import { InvestmentForm } from "@/components/organisms/Checkout/InvestmentForm";
import { StripeModal } from "@/components/organisms/Checkout/StripeModal";
import { ProcessingModal } from "@/components/organisms/Checkout/ProcessingModal";
import { NetworkGuard } from "@/components/organisms/Network/NetworkGuard";
import { useTokenInfo, useTokenSupply, useTokenBalance, useIsAllowed } from "@/lib/web3/hooks";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserData } from "@/hooks/useUserData";
import { getTokenConfig } from "@/lib/config/tokens";
import { formatUnits } from "viem";
import { useState, useEffect } from "react";
import {
    ArrowLeft,
    ExternalLink,
    Shield,
    ShieldCheck,
    ShieldX,
    Coins,
    BarChart3,
    Percent,
    Layers,
    Copy,
    Check,
    Wallet,
    AlertTriangle,
    TrendingUp,
    Zap,
} from "lucide-react";

// ─── Helper: truncate address ───
function truncateAddress(addr: string): string {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function PropertyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const rawAddress = params?.address as string;
    const tokenAddress = rawAddress as `0x${string}`;

    // Auth & user data
    const { isAuthenticated } = useAuthStore();
    const { data: userData, refetch: refetchUserData } = useUserData();
    const walletAddr = userData?.user?.wallet as `0x${string}` | undefined;

    // Token config (static metadata)
    const tokenConfig = getTokenConfig(rawAddress);

    // On-chain reads
    const { name, symbol, decimals, isLoading: isInfoLoading } = useTokenInfo(tokenAddress);
    const { data: totalSupplyRaw, isLoading: isSupplyLoading } = useTokenSupply(tokenAddress);
    const { data: userBalanceRaw, isLoading: isBalanceLoading } = useTokenBalance(
        tokenAddress,
        walletAddr || "0x0000000000000000000000000000000000000000"
    );
    const { data: isAllowed, isLoading: isAllowedLoading } = useIsAllowed(
        tokenAddress,
        walletAddr || "0x0000000000000000000000000000000000000000"
    );

    // Stripe / checkout state
    const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
    const [processingOpId, setProcessingOpId] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Graceful fallback: if on-chain data doesn't resolve in 5s, show static data
    const [onChainTimedOut, setOnChainTimedOut] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (isInfoLoading) setOnChainTimedOut(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isInfoLoading]);

    // After timeout, treat loading as "resolved with no data"
    const effectiveInfoLoading = isInfoLoading && !onChainTimedOut;
    const effectiveSupplyLoading = isSupplyLoading && !onChainTimedOut;
    const effectiveBalanceLoading = isBalanceLoading && !onChainTimedOut;
    const effectiveAllowedLoading = isAllowedLoading && !onChainTimedOut;

    // Derived values
    const tokenDecimals = decimals ?? 18;
    const totalSupply = totalSupplyRaw !== undefined ? Number(formatUnits(totalSupplyRaw as bigint, tokenDecimals)) : 0;
    const userBalance = userBalanceRaw !== undefined ? Number(formatUnits(userBalanceRaw as bigint, tokenDecimals)) : 0;
    const ownershipPct = totalSupply > 0 ? ((userBalance / totalSupply) * 100) : 0;

    const displayName = name || tokenConfig?.name || "Unknown Asset";
    const displaySymbol = symbol || tokenConfig?.symbol || "???";

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(tokenAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#07080C] noise">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* ═══ BACK NAVIGATION ═══ */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back</span>
                </button>

                {/* ═══ SECTION 1: PROPERTY HEADER ═══ */}
                <header className="space-y-6 border-b border-white/5 pb-10">
                    {/* Timed-out indicator */}

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="space-y-4">
                            {/* Network Badge */}
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[--rebeka-primary-dim] border border-[--rebeka-primary-glow] text-[8px] font-black text-[--rebeka-primary] uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-primary] animate-pulse" />
                                    Arbitrum Sepolia
                                </span>
                                {/* Whitelist Badge */}
                                {!effectiveAllowedLoading && isAllowed !== undefined && (
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${isAllowed
                                        ? 'bg-[--rebeka-success]/10 text-[--rebeka-success] border border-[--rebeka-success]/20'
                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                        {isAllowed ? <ShieldCheck className="w-3 h-3" /> : <ShieldX className="w-3 h-3" />}
                                        {isAllowed ? 'Whitelisted' : 'Not Whitelisted'}
                                    </span>
                                )}
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[8px] font-black text-white/60 uppercase tracking-widest">
                                    <Shield className="w-3 h-3 text-[--rebeka-secondary]" />
                                    FHE Protected
                                </span>
                            </div>

                            {/* Asset Name */}
                            {effectiveInfoLoading ? (
                                <div className="h-12 w-80 bg-white/5 rounded-xl animate-pulse" />
                            ) : (
                                <Typography variant="h1" className="text-white font-black text-4xl lg:text-5xl tracking-tighter leading-none italic uppercase">
                                    {displayName} <span className="text-white/20 font-mono text-lg font-normal not-italic">{displaySymbol}</span>
                                </Typography>
                            )}

                            {/* Contract Address */}
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Contract:</span>
                                <a
                                    href={`https://sepolia.arbiscan.io/address/${tokenAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-mono text-[--rebeka-primary] hover:underline flex items-center gap-1.5"
                                >
                                    {truncateAddress(tokenAddress)}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <button onClick={handleCopyAddress} className="text-white/20 hover:text-white transition-colors">
                                    {copied ? <Check className="w-3.5 h-3.5 text-[--rebeka-success]" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>

                        {/* Supply Badge */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block mb-1">Total Supply</span>
                                {effectiveSupplyLoading ? (
                                    <div className="h-8 w-24 bg-white/5 rounded animate-pulse" />
                                ) : (
                                    <span className="text-2xl font-mono font-bold text-white tracking-tighter">
                                        {totalSupply.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                        <span className="text-[10px] text-white/30 ml-2">{displaySymbol}</span>
                                    </span>
                                )}
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] flex items-center justify-center">
                                <Layers className="w-7 h-7 text-[--rebeka-secondary]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* ═══ SECTION 2: TOKEN METRICS ═══ */}
                <section>
                    <div className="flex items-center gap-2 px-2 mb-6">
                        <BarChart3 className="w-4 h-4 text-[--rebeka-primary]" />
                        <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">
                            Token Metrics
                        </Typography>
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-auto">On-chain Data</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Supply */}
                        <GlassCard className="p-6 border-white/5" hover={false}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Supply</span>
                                <div className="w-9 h-9 rounded-xl bg-[--rebeka-primary-dim] border border-[--rebeka-primary-glow] flex items-center justify-center">
                                    <Coins className="w-4 h-4 text-[--rebeka-primary]" />
                                </div>
                            </div>
                            {effectiveSupplyLoading ? (
                                <div className="h-7 w-20 bg-white/5 rounded animate-pulse" />
                            ) : (
                                <span className="text-xl font-mono font-bold text-white tracking-tighter">
                                    {totalSupply.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                </span>
                            )}
                            <span className="text-[10px] font-mono text-white/30 block mt-1">{displaySymbol}</span>
                        </GlassCard>

                        {/* Your Balance */}
                        <GlassCard className="p-6 border-white/5" hover={false}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Balance</span>
                                <div className="w-9 h-9 rounded-xl bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] flex items-center justify-center">
                                    <Wallet className="w-4 h-4 text-[--rebeka-secondary]" />
                                </div>
                            </div>
                            {effectiveBalanceLoading || !walletAddr ? (
                                <div className="h-7 w-20 bg-white/5 rounded animate-pulse" />
                            ) : (
                                <span className="text-xl font-mono font-bold text-white tracking-tighter">
                                    {userBalance.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                                </span>
                            )}
                            <span className="text-[10px] font-mono text-white/30 block mt-1">Your Tokens</span>
                        </GlassCard>

                        {/* Ownership % */}
                        <GlassCard className="p-6 border-white/5" hover={false}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Ownership</span>
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Percent className="w-4 h-4 text-white/60" />
                                </div>
                            </div>
                            {effectiveBalanceLoading || effectiveSupplyLoading || !walletAddr ? (
                                <div className="h-7 w-20 bg-white/5 rounded animate-pulse" />
                            ) : (
                                <span className="text-xl font-mono font-bold text-[--rebeka-success] tracking-tighter">
                                    {ownershipPct.toFixed(4)}%
                                </span>
                            )}
                            <span className="text-[10px] font-mono text-white/30 block mt-1">of Total Supply</span>
                        </GlassCard>

                        {/* Whitelist Status */}
                        <GlassCard className="p-6 border-white/5" hover={false}>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">KYC Status</span>
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isAllowed
                                    ? 'bg-[--rebeka-success]/10 border border-[--rebeka-success]/20'
                                    : 'bg-red-500/10 border border-red-500/20'
                                    }`}>
                                    <Shield className={`w-4 h-4 ${isAllowed ? 'text-[--rebeka-success]' : 'text-red-400'}`} />
                                </div>
                            </div>
                            {effectiveAllowedLoading ? (
                                <div className="h-7 w-20 bg-white/5 rounded animate-pulse" />
                            ) : (
                                <span className={`text-lg font-bold uppercase tracking-wider ${isAllowed ? 'text-[--rebeka-success]' : 'text-red-400'}`}>
                                    {isAllowed ? 'Verified' : 'Pending'}
                                </span>
                            )}
                            <span className="text-[10px] font-mono text-white/30 block mt-1">Whitelist</span>
                        </GlassCard>
                    </div>
                </section>

                {/* ═══ MAIN CONTENT GRID ═══ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* ═══ SECTION 3: ASSET VAULT ═══ */}
                        <AssetVault tokenAddress={tokenAddress} />

                        {/* ═══ SECTION 5: REVENUE MANAGER ═══ */}
                        {tokenConfig?.distributorAddress && walletAddr ? (
                            <RevenueManager
                                distributorAddress={tokenConfig.distributorAddress}
                                userAddress={walletAddr}
                                tokenSymbol="USDC"
                            />
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 px-2">
                                    <TrendingUp className="w-4 h-4 text-[--rebeka-secondary]" />
                                    <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">
                                        Revenue Manager
                                    </Typography>
                                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-auto">Dividends</span>
                                </div>
                                <GlassCard className="p-8 border-white/5" hover={false}>
                                    <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                                        <div className="w-16 h-16 rounded-full bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] flex items-center justify-center opacity-40">
                                            <Zap className="w-8 h-8 text-[--rebeka-secondary]" />
                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="p" className="text-white font-bold text-sm">Revenue Distribution Not Yet Active</Typography>
                                            <Typography variant="caption" className="text-white/30 block font-mono text-[10px] max-w-sm leading-relaxed">
                                                The revenue distributor for this asset has not been deployed yet. Dividend claims will be available once the issuer activates revenue distribution.
                                            </Typography>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        )}
                    </div>

                    {/* Right Column (4 cols) — Investment Terminal */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2 px-2">
                            <Coins className="w-4 h-4 text-[--rebeka-secondary]" />
                            <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">
                                Investment Terminal
                            </Typography>
                        </div>

                        <GlassCard className="p-6 border-white/5" hover={false}>
                            {effectiveAllowedLoading ? (
                                <div className="space-y-4">
                                    <div className="h-6 w-40 bg-white/5 rounded animate-pulse" />
                                    <div className="h-14 bg-white/5 rounded-xl animate-pulse" />
                                    <div className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                                </div>
                            ) : isAllowed ? (
                                <div className="relative">
                                    <InvestmentForm
                                        tokenAddress={tokenAddress}
                                        pricePerToken={tokenConfig?.pricePerToken ?? 350}
                                        onCheckoutReady={(clientSecret, operationId) => {
                                            setStripeClientSecret(clientSecret);
                                            setProcessingOpId(operationId);
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-6 py-4">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                            <AlertTriangle className="w-8 h-8 text-amber-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Typography variant="p" className="text-white font-bold text-sm">KYC Verification Required</Typography>
                                            <Typography variant="caption" className="text-white/30 block text-[10px] leading-relaxed max-w-xs">
                                                You must pass the institutional verification process before investing in this asset. This ensures regulatory compliance.
                                            </Typography>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[--rebeka-primary] transition-all flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
                                    >
                                        <ShieldCheck className="w-4 h-4" /> Start Verification
                                    </button>
                                </div>
                            )}
                        </GlassCard>

                        {/* Static info card */}
                        {tokenConfig && (
                            <GlassCard className="p-6 border-white/5 space-y-4" hover={false}>
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest block">Asset Information</span>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-[10px] text-white/30 font-bold uppercase">Class</span>
                                        <span className="text-xs font-mono text-white">{tokenConfig.assetClass}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[10px] text-white/30 font-bold uppercase">Est. Yield</span>
                                        <span className="text-xs font-mono text-[--rebeka-success]">{tokenConfig.yieldAPY}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[10px] text-white/30 font-bold uppercase">Price/Token</span>
                                        <span className="text-xs font-mono text-white">${tokenConfig.pricePerToken.toLocaleString('en-US')} MXN</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <Typography variant="caption" className="text-white/20 text-[10px] leading-relaxed block">
                                        {tokenConfig.description}
                                    </Typography>
                                </div>
                            </GlassCard>
                        )}
                    </aside>
                </div>

                {/* Stripe Modal */}
                {stripeClientSecret && (
                    <StripeModal
                        clientSecret={stripeClientSecret}
                        onSuccess={() => {
                            setStripeClientSecret(null);
                            // processingOpId was already set when InvestmentForm returned
                            // If somehow not set, generate a fallback
                            if (!processingOpId) {
                                setProcessingOpId("OP_" + Math.random().toString(36).substr(2, 9).toUpperCase());
                            }
                        }}
                        onCancel={() => setStripeClientSecret(null)}
                    />
                )}

                {/* Processing Modal */}
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

                {/* Network Guard */}
                <NetworkGuard />
            </div>
        </div>
    );
}
