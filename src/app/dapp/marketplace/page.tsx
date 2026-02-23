"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import { GlassCard } from "@/components/GlassCard";
import { useTokenInfo, useTokenSupply, useIsAllowed } from "@/lib/web3/hooks";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserData } from "@/hooks/useUserData";
import { KNOWN_TOKENS, type TokenConfig } from "@/lib/config/tokens";
import { formatUnits } from "viem";
import {
    ArrowLeft,
    ArrowUpRight,
    ShieldCheck,
    ShieldX,
    Filter,
    Layers,
    TrendingUp,
    Building2,
    Search,
} from "lucide-react";

// ─── Filter type ───
type MarketplaceFilter = "all" | "whitelisted";

// ─── PropertyCard: enriched with on-chain data ───
function PropertyCard({ token, walletAddr }: { token: TokenConfig; walletAddr: `0x${string}` | undefined }) {
    const router = useRouter();
    const { name, symbol, isLoading: isInfoLoading } = useTokenInfo(token.tokenAddress);
    const { data: totalSupplyRaw, isLoading: isSupplyLoading } = useTokenSupply(token.tokenAddress);
    const { data: isAllowed } = useIsAllowed(
        token.tokenAddress,
        walletAddr || "0x0000000000000000000000000000000000000000"
    );

    const totalSupply = totalSupplyRaw !== undefined
        ? Number(formatUnits(totalSupplyRaw as bigint, 18))
        : null;

    const displayName = name || token.name;
    const displaySymbol = symbol || token.symbol;

    return (
        <GlassCard
            className="group p-0 overflow-hidden border-white/5 hover:border-[--rebeka-secondary-glow] cursor-pointer transition-all"
            hover={true}
        >
            <div onClick={() => router.push(`/dapp/property/${token.tokenAddress}`)}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={token.imageUrl}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[8px] font-black text-[--rebeka-primary] uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-primary] animate-pulse" />
                            Arbitrum
                        </span>
                    </div>
                    <div className="absolute top-3 right-3">
                        {isAllowed !== undefined && (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-sm text-[8px] font-black uppercase tracking-widest ${isAllowed
                                ? 'bg-[--rebeka-success]/20 text-[--rebeka-success] border border-[--rebeka-success]/20'
                                : 'bg-red-500/20 text-red-400 border border-red-500/20'
                                }`}>
                                {isAllowed ? <ShieldCheck className="w-3 h-3" /> : <ShieldX className="w-3 h-3" />}
                                {isAllowed ? 'Whitelisted' : 'Locked'}
                            </span>
                        )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-[--rebeka-secondary] flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4 text-black" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        {isInfoLoading ? (
                            <div className="h-6 w-40 bg-white/5 rounded animate-pulse mb-2" />
                        ) : (
                            <Typography variant="h4" className="text-white font-black tracking-tight leading-none mb-1 uppercase italic">
                                {displayName}
                            </Typography>
                        )}
                        <Typography variant="caption" className="text-white/30 uppercase font-bold tracking-widest text-[9px]">
                            {displaySymbol} • {token.assetClass}
                        </Typography>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Yield</span>
                            <span className="text-sm font-mono text-[--rebeka-success] font-bold">{token.yieldAPY}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Supply</span>
                            {isSupplyLoading ? (
                                <div className="h-5 w-12 bg-white/5 rounded animate-pulse" />
                            ) : (
                                <span className="text-sm font-mono text-white font-bold">
                                    {totalSupply !== null ? totalSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }) : '—'}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Price</span>
                            <span className="text-sm font-mono text-white font-bold">${token.pricePerToken}</span>
                        </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white uppercase tracking-widest group-hover:bg-[--rebeka-secondary] group-hover:text-black group-hover:border-transparent transition-all mt-2">
                        View Property
                    </button>
                </div>
            </div>
        </GlassCard>
    );
}

// ─── Main Page ───
export default function MarketplacePage() {
    const router = useRouter();
    const [filter, setFilter] = useState<MarketplaceFilter>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const { data: userData } = useUserData();
    const walletAddr = userData?.user?.wallet as `0x${string}` | undefined;

    // For "whitelisted" filter, we need to check each token individually.
    // For simplicity, we filter client-side after rendering all cards.
    // The PropertyCard already shows the badge, so filtering here is just about visibility.

    return (
        <div className="min-h-screen bg-[#07080C] noise">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

                {/* Back */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dashboard</span>
                </button>

                {/* Header */}
                <header className="border-b border-white/5 pb-10 space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <span className="text-[10px] text-white/20 uppercase font-black tracking-[0.4em] block mb-4 italic">Property_Explorer</span>
                            <Typography variant="h1" className="text-white font-black text-4xl lg:text-5xl tracking-tighter leading-none italic uppercase">
                                Market<span className="text-gradient-primary">place</span>
                            </Typography>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                                <Search className="w-4 h-4 text-white/30" />
                                <input
                                    type="text"
                                    placeholder="Search assets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-xs text-white font-medium w-32 lg:w-48 placeholder:text-white/20"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex rounded-xl overflow-hidden border border-white/10">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${filter === "all"
                                        ? "bg-white text-black"
                                        : "bg-white/5 text-white/40 hover:text-white"
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter("whitelisted")}
                                    className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${filter === "whitelisted"
                                        ? "bg-[--rebeka-success] text-black"
                                        : "bg-white/5 text-white/40 hover:text-white"
                                        }`}
                                >
                                    <ShieldCheck className="w-3 h-3" /> Whitelisted
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-[10px] text-white/20 font-mono uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5" />
                            {KNOWN_TOKENS.length} Properties Available
                        </span>
                        <span className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" />
                            Arbitrum Sepolia
                        </span>
                    </div>
                </header>

                {/* Grid */}
                {KNOWN_TOKENS.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {KNOWN_TOKENS
                            .filter((t) => {
                                if (!searchQuery) return true;
                                const q = searchQuery.toLowerCase();
                                return t.name.toLowerCase().includes(q) ||
                                    t.symbol.toLowerCase().includes(q) ||
                                    t.assetClass.toLowerCase().includes(q);
                            })
                            .map((token) => (
                                <PropertyCard
                                    key={token.tokenAddress}
                                    token={token}
                                    walletAddr={walletAddr}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                            <TrendingUp className="w-10 h-10 text-white/10" />
                        </div>
                        <Typography variant="p" className="text-white font-bold">No Properties Available</Typography>
                        <Typography variant="caption" className="text-white/30 font-mono text-[10px]">
                            Check back later for new tokenized real estate offerings.
                        </Typography>
                    </div>
                )}

                {/* Coming soon placeholder */}
                <div className="p-10 text-center rounded-2xl border border-white/5 bg-white/[0.01] border-dashed">
                    <Typography variant="caption" className="text-white/20 font-bold uppercase tracking-[0.3em] italic">
                        More properties coming soon
                    </Typography>
                </div>
            </div>
        </div>
    );
}
