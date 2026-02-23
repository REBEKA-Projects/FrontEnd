"use client";

import { useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { KNOWN_TOKENS } from "@/lib/config/tokens";

export default function MarketplacePage() {
    const router = useRouter();

    return (
        <div className="space-y-12 animate-fade-in">
            <header className="border-b border-white/5 pb-10">
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-[0.4em] block mb-4">Property Explorer</span>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Typography variant="h1" className="text-white font-bold text-5xl tracking-tighter leading-none uppercase">Market<span className="text-gradient-primary">place</span></Typography>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dapp/projects')}
                            className="h-12 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2"
                        >
                            Public Catalog <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {KNOWN_TOKENS.map((token) => (
                    <div
                        key={token.tokenAddress}
                        onClick={() => router.push(`/dapp/property/${token.tokenAddress}`)}
                        className="group p-8 rounded-3xl bg-black border border-white/10 overflow-hidden hover:border-[--rebeka-secondary-glow] transition-all cursor-pointer relative"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black">
                                {token.symbol.substring(0, 2)}
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-[--rebeka-secondary] uppercase tracking-widest">{token.yieldAPY} APY</span>
                                <div className="flex items-center gap-1 justify-end mt-1">
                                    <ShieldCheck className="w-3 h-3 text-[--rebeka-success]" />
                                    <span className="text-[8px] font-bold text-white/40 uppercase">Verified</span>
                                </div>
                            </div>
                        </div>

                        <Typography variant="h4" className="text-white font-black tracking-tight leading-none mb-2 uppercase italic">{token.name}</Typography>
                        <Typography variant="p" className="text-xs text-white/40 mb-8 line-clamp-2">{token.description}</Typography>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Token Price</span>
                                <span className="text-lg font-mono font-bold text-white">${token.pricePerToken}</span>
                            </div>
                            <button className="p-3 rounded-full bg-white/5 group-hover:bg-[--rebeka-secondary] group-hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
