"use client";

import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import { useIsAllowed, useTokenBalance, useTokenInfo } from "@/lib/web3/hooks";
import { Typography } from "@/components/atoms/Typography";
import { ArrowRight, ArrowUpRight, Layers, ShieldCheck, ShieldX, Activity } from "lucide-react";
import { formatUnits } from "viem";

// ─── On-chain Asset Card for the 'My Holdings' tab ───
function OnChainAssetCard({ tokenAddress, walletAddress }: { tokenAddress: `0x${string}`; walletAddress: `0x${string}` | undefined }) {
    const router = useRouter();
    const { name, symbol, decimals, isLoading: isInfoLoading } = useTokenInfo(tokenAddress);
    const { data: balanceRaw, isLoading: isBalanceLoading } = useTokenBalance(
        tokenAddress,
        walletAddress || '0x0000000000000000000000000000000000000000'
    );
    const { data: isAllowed } = useIsAllowed(
        tokenAddress,
        walletAddress || '0x0000000000000000000000000000000000000000'
    );

    const tokenDecimals = decimals ?? 18;
    const balance = balanceRaw !== undefined ? Number(formatUnits(balanceRaw as bigint, tokenDecimals)) : 0;
    const displayName = name || 'Loading...';
    const displaySymbol = symbol || '???';

    return (
        <div
            onClick={() => router.push(`/dapp/property/${tokenAddress}`)}
            className="group relative p-8 rounded-3xl bg-black border border-white/10 overflow-hidden hover:border-[--rebeka-primary-glow] transition-all cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5 text-[--rebeka-primary]" />
            </div>

            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[--rebeka-primary-dim] flex items-center justify-center text-[--rebeka-primary] font-black shadow-2xl border border-[--rebeka-primary-glow]">
                    {isInfoLoading ? '...' : displaySymbol.substring(0, 2)}
                </div>
                <div>
                    {isInfoLoading ? (
                        <div className="h-5 w-32 bg-white/5 rounded animate-pulse mb-1" />
                    ) : (
                        <Typography variant="h4" className="text-white font-bold tracking-tight leading-none mb-1 uppercase">{displayName}</Typography>
                    )}
                    <div className="flex items-center gap-2">
                        <Typography variant="caption" className="text-white/30 uppercase font-bold tracking-widest text-[9px]">{displaySymbol} • TOKEN</Typography>
                        {isAllowed !== undefined && (
                            <span className={`inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest ${isAllowed ? 'text-[--rebeka-success]' : 'text-red-400'}`}>
                                {isAllowed ? <ShieldCheck className="w-3 h-3" /> : <ShieldX className="w-3 h-3" />}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Balance</span>
                        {isBalanceLoading ? (
                            <div className="h-6 w-20 bg-white/5 rounded animate-pulse" />
                        ) : (
                            <span className="text-lg font-mono font-bold text-white tracking-tighter">{balance.toLocaleString('en-US', { maximumFractionDigits: 4 })} <span className="text-[10px] text-white/30">Tokens</span></span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Status</span>
                        <span className={`text-lg font-bold uppercase tracking-wider ${isAllowed ? 'text-[--rebeka-success]' : 'text-red-400'}`}>
                            {isAllowed ? 'Verified' : 'Pending'}
                        </span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[--rebeka-primary] uppercase tracking-widest">View Details</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <Activity className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PortfolioPage() {
    const router = useRouter();
    const { data: userData } = useUserData();
    const walletAddr = userData?.user?.wallet as `0x${string}` | undefined;

    return (
        <div className="space-y-12 animate-fade-in">
            <header className="border-b border-white/5 pb-10">
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-[0.4em] block mb-4">Portfolio Units</span>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Typography variant="h1" className="text-white font-bold text-5xl tracking-tighter leading-none uppercase">My <span className="text-gradient-primary">Portfolio</span></Typography>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard/marketplace')}
                            className="h-12 px-6 rounded-xl bg-white text-black font-black uppercase text-[10px] tracking-widest hover:bg-[--rebeka-primary] transition-all flex items-center gap-2"
                        >
                            Explore Marketplace <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </header>

            {userData?.portfolio && userData.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {userData.portfolio.map((item) => (
                        <OnChainAssetCard
                            key={item.tokenAddress}
                            tokenAddress={item.tokenAddress as `0x${string}`}
                            walletAddress={walletAddr}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                        <Layers className="w-10 h-10 text-white/10" />
                    </div>
                    <Typography variant="p" className="text-white font-bold text-sm">No Holdings Yet</Typography>
                    <Typography variant="caption" className="text-white/30 block font-mono text-[10px] max-w-sm leading-relaxed">
                        Your tokenized real estate portfolio is empty. Visit the marketplace to explore available investment opportunities.
                    </Typography>
                    <button
                        onClick={() => router.push('/dashboard/marketplace')}
                        className="mt-4 px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                        Browse Properties
                    </button>
                </div>
            )}
        </div>
    );
}
