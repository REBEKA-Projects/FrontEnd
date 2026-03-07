"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, GlassCard } from "@/components/atoms";
import { useTokenInfo, useTokenSupply } from "@/lib/web3/hooks";
import { KNOWN_TOKENS, type TokenConfig } from "@/lib/config/tokens";
import { formatUnits } from "viem";
import {
    ArrowLeft,
    ArrowUpRight,
    ShieldCheck,
    TrendingUp,
    MapPin,
    Target,
    Activity,
    Users,
    ChevronRight,
    Wallet,
    ShoppingBag,
    Info,
    History
} from "lucide-react";

// ─── DASHBOARD ASSET CARD ───
function AssetMarketCard({ token, onSelect }: { token: TokenConfig; onSelect: () => void }) {
    const { name, symbol, decimals } = useTokenInfo(token.tokenAddress);
    const { data: supplyRaw } = useTokenSupply(token.tokenAddress);
    const tokenDecimals = decimals ?? 18;
    const supply = supplyRaw ? Number(formatUnits(supplyRaw as bigint, tokenDecimals)) : 0;

    return (
        <div
            onClick={onSelect}
            className="group relative p-8 rounded-[2.5rem] bg-black border border-white/10 overflow-hidden hover:border-secondary transition-all cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <ArrowUpRight className="w-6 h-6 text-secondary" />
            </div>

            <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-black shadow-2xl border border-secondary/20 group-hover:bg-secondary group-hover:text-black transition-colors">
                    {symbol?.substring(0, 2) || "RB"}
                </div>
                <div>
                    <Typography variant="h4" className="text-white font-black tracking-tight leading-none mb-1 uppercase italic">
                        {name || token.name}
                    </Typography>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{symbol || "TKN"}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="flex items-center gap-1 text-[9px] font-bold text-secondary uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3" /> Institutional
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block mb-1">Target Yield</span>
                        <span className="text-lg font-mono font-bold text-secondary">{token.yieldAPY}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block mb-1">Min. Entry</span>
                        <span className="text-lg font-mono font-bold text-white">${token.pricePerToken}</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/20" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Investors: 142</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
}

// ─── MAIN MARKETPLACE COMPONENT ───
export default function MarketplacePage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-blueprint">
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-30" />

            <main className="relative z-10 p-6 md:p-12 lg:p-20 pt-32 max-w-7xl mx-auto space-y-20">
                {/* HERO SECTION */}
                <header className="space-y-6 max-w-3xl">
                    <div className="flex items-center gap-4 animate-fade-in">
                        <div className="h-px w-12 bg-secondary" />
                        <span className="text-[11px] font-black text-secondary uppercase tracking-[0.4em]">Strategic_Opportunity_Pool</span>
                    </div>
                    <Typography variant="h1" className="text-white font-black text-6xl md:text-7xl tracking-tighter leading-none uppercase italic animate-fade-in delay-100">
                        Institutional <span className="text-gradient-secondary">Marketplace</span>
                    </Typography>
                    <Typography variant="p" className="text-text-secondary text-base leading-relaxed max-w-xl animate-fade-in delay-200">
                        Precision-engineered Real World Asset fractions. Execute direct chain-of-title initialization with institutional-grade liquidity and on-chain legal certainty.
                    </Typography>
                </header>

                {/* FILTERS & STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in delay-300">
                    <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                        {['All Assets', 'Real Estate', 'Infrastructure', 'Treasuries'].map((f, i) => (
                            <button key={f} className={`h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-end gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)]" /> Live Exchange</span>
                        <span className="flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> 2.4s Finality</span>
                    </div>
                </div>

                {/* ASSET GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in delay-400">
                    {KNOWN_TOKENS.map((token) => (
                        <AssetMarketCard
                            key={token.tokenAddress}
                            token={token}
                            onSelect={() => router.push(`/dapp/property/${token.tokenAddress}`)}
                        />
                    ))}
                </div>

                {/* FOOTER CALLOUT */}
                <GlassCard className="p-12 md:p-16 text-center space-y-8 border-white/5 bg-black/40 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2" />
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <Typography variant="h2" className="text-white font-black text-3xl md:text-4xl uppercase italic tracking-tighter">
                            Ready to <span className="text-secondary">Scale?</span>
                        </Typography>
                        <Typography variant="p" className="text-white/40 text-sm leading-relaxed">
                            Our institutional onboarding desk is available for high-volume transactions and custom yield strategies. Protocol compliance is enforced at the bytecode level.
                        </Typography>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-secondary transition-all">
                            Institutional Desk
                        </button>
                        <button className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                            Compliance Guide
                        </button>
                    </div>
                </GlassCard>
            </main>
        </div>
    );
}
