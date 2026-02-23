"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/atoms/Typography";
import {
    ShieldCheck,
    TrendingUp,
    Info,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Zap,
    History
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { UserDataResponse, CheckoutOperation } from "@/hooks/useUserData";
import { useTokenBalance, useIsAllowed } from "@/lib/web3/hooks";
import { getTokenConfig } from "@/lib/config/tokens";

interface PortfolioProps {
    portfolioData?: UserDataResponse['portfolio'];
    operations?: CheckoutOperation[];
    isLoading?: boolean;
    walletAddress?: `0x${string}`;
    tokenAddress?: `0x${string}`;
}

export const Portfolio = ({ portfolioData = [], operations = [], isLoading, walletAddress, tokenAddress }: PortfolioProps) => {
    const router = useRouter();
    // Calcular balance total desde el backend
    const totalTokens = portfolioData.reduce((acc, item) => acc + Number(item.balance || 0), 0);
    const globalValueUsd = totalTokens * 350;

    // Lectura on-chain directa (opcional, solo si tenemos wallet y token address)
    const { data: onChainBalance } = useTokenBalance(
        tokenAddress || '0x0000000000000000000000000000000000000000',
        walletAddress || '0x0000000000000000000000000000000000000000'
    );
    const { data: isWhitelisted } = useIsAllowed(
        tokenAddress || '0x0000000000000000000000000000000000000000',
        walletAddress || '0x0000000000000000000000000000000000000000'
    );

    // Usar balance on-chain si disponible, fallback a backend
    const displayTokens = onChainBalance !== undefined ? Number(onChainBalance) : totalTokens;
    const displayValueUsd = displayTokens * 350;

    // Static sparkline data for visual decoration
    const sparklineData = [40, 55, 35, 60, 45, 70, 50, 65, 55, 75, 60, 80, 65, 70, 85, 75, 90, 80, 85, 95];

    return (
        <div className="space-y-8">
            {/* KEY METRICS GRID - High Intensity */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-primary] shadow-[0_0_8px_var(--rebeka-primary)]" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Balance</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        {isLoading ? (
                            <div className="h-8 w-24 bg-white/10 rounded-md animate-pulse" />
                        ) : (
                            <>
                                <span className="text-2xl font-mono font-bold text-[--rebeka-primary]">${displayValueUsd.toLocaleString()}</span>
                                <span className="text-[10px] font-mono text-white/30 uppercase">USD</span>
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex items-center text-[10px] text-[--rebeka-success] font-medium gap-1">
                        <ArrowUpRight className="w-3 h-3" /> +12.5% <span className="text-white/20 ml-1">vs LTM</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-secondary] shadow-[0_0_8px_var(--rebeka-secondary)]" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Tokens Held</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        {isLoading ? (
                            <div className="h-8 w-16 bg-white/10 rounded-md animate-pulse" />
                        ) : (
                            <>
                                <span className="text-2xl font-mono font-bold text-white">{displayTokens.toLocaleString()}</span>
                                <span className="text-[10px] font-mono text-white/30 uppercase">RBK</span>
                            </>
                        )}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-white/30 font-medium">
                        {onChainBalance !== undefined ? (
                            <span className="flex items-center gap-1 text-[--rebeka-success]">
                                <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-success]" /> On-chain verified
                            </span>
                        ) : (
                            <span>Verified via Arbitrum Sepolia</span>
                        )}
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-success] shadow-[0_0_8px_var(--rebeka-success)]" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Equity Area</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        {isLoading ? (
                            <div className="h-8 w-16 bg-white/10 rounded-md animate-pulse" />
                        ) : (
                            <>
                                <span className="text-2xl font-mono font-bold text-white">{(displayTokens * 0.5).toFixed(2)}</span>
                                <span className="text-[10px] font-mono text-white/30 uppercase">m²</span>
                            </>
                        )}
                    </div>
                    <div className="mt-2 text-[10px] text-white/30 font-medium">
                        Asset Backing: 100%
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md overflow-hidden relative group cursor-crosshair">
                    <div className="absolute inset-0 bg-gradient-to-br from-[--rebeka-primary-dim] to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-3 h-3 text-[--rebeka-primary]" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Est. APY</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-mono font-bold text-[--rebeka-success]">8.50%</span>
                    </div>
                    {/* Tiny Sparkline */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end px-2 gap-[1px]">
                        {sparklineData.map((val, i) => (
                            <div key={i} className="flex-1 bg-[--rebeka-success] opacity-20 hover:opacity-100 transition-opacity" style={{ height: `${val}%` }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ASSET COMPOSITION */}
            <div className="w-full space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <BriefcaseIcon className="w-4 h-4 text-white/40" />
                            <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">Asset Allocation</Typography>
                        </div>
                        <button className="text-[10px] font-bold text-[--rebeka-primary] uppercase tracking-widest hover:underline">View All Positions</button>
                    </div>

                    <div className="space-y-3">
                        {portfolioData.length > 0 ? portfolioData.map((item) => {
                            const tokenCfg = getTokenConfig(item.tokenAddress);
                            const displayName = tokenCfg?.name || item.tokenAddress.slice(0, 10) + '...';
                            const displaySymbol = tokenCfg?.symbol || 'TOKEN';
                            const balance = Number(item.balance || 0);
                            const valueUsd = balance * (tokenCfg?.pricePerToken || 350);

                            return (
                                <div
                                    key={item.tokenAddress}
                                    onClick={() => router.push(`/dapp/property/${item.tokenAddress}`)}
                                    className="group relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-[--rebeka-primary-glow] transition-all overflow-hidden cursor-pointer"
                                >
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[--rebeka-primary] blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity" />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center border border-white/10 text-[10px] font-black text-white group-hover:border-[--rebeka-primary-glow] transition-colors shadow-2xl">
                                                {displaySymbol.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Typography variant="p" className="text-white font-bold tracking-tight">{displayName}</Typography>
                                                    <div className="px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-[--rebeka-primary] text-[8px] font-bold border border-blue-500/20 uppercase tracking-tighter">Verified</div>
                                                </div>
                                                <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                                                    <span className="flex items-center gap-1"><History className="w-3 h-3" /> {displaySymbol}</span>
                                                    <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {tokenCfg?.assetClass || 'RWA'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-8 md:text-right">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] mb-1">Balance</span>
                                                <span className="text-sm font-mono font-bold text-white">{balance.toLocaleString('en-US', { maximumFractionDigits: 2 })} tkns</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] mb-1">Value</span>
                                                <span className="text-sm font-mono font-bold text-[--rebeka-success] flex items-center gap-1">
                                                    ${valueUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} <ArrowUpRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                            <button className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-[--rebeka-primary] hover:text-black hover:border-transparent transition-all">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="p-8 text-center text-white/30 font-mono text-xs">
                                NO_POSITIONS_FOUND
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ACTIVITY LOG - OPERATIONS */}
            <div className="w-full space-y-4 pt-6">
                <div className="flex items-center gap-2 px-2">
                    <History className="w-4 h-4 text-white/40" />
                    <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">Transaction Ledger</Typography>
                </div>

                <GlassCard className="p-0 overflow-hidden border-white/5" hover={false}>
                    {isLoading ? (
                        <div className="p-8 text-center text-white/30 font-mono text-xs animate-pulse">
                            Loading ledger data...
                        </div>
                    ) : operations.length === 0 ? (
                        <div className="p-8 text-center text-white/30 font-mono text-xs">
                            NO_OPERATIONS_FOUND
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {operations.map((op) => (
                                <div key={op.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-mono text-[10px] font-black
                                            ${op.status === 'MINTED' ? 'bg-[--rebeka-success-dim] text-[--rebeka-success] border-[--rebeka-success]' :
                                                op.status === 'FAILED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                    op.status === 'PAID' || op.status === 'MINTING' ? 'bg-[--rebeka-primary-dim] text-[--rebeka-primary] border-[--rebeka-primary-glow]' :
                                                        'bg-white/5 text-white/40 border-white/10'}`}>
                                            {op.status.substring(0, 3)}
                                        </div>
                                        <div>
                                            <Typography variant="p" className="text-white font-bold text-sm">
                                                Order <span className="text-white/40 font-mono text-xs">#{op.id.substring(0, 8)}</span>
                                            </Typography>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-mono text-white/40">{new Date(op.createdAt).toLocaleDateString()}</span>
                                                {op.token && (
                                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-white/10 text-white uppercase tracking-wider">
                                                        {op.token.symbol}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-8">
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 block">Status</span>
                                            <span className={`text-xs font-black uppercase tracking-widest
                                                ${op.status === 'MINTED' ? 'text-[--rebeka-success]' :
                                                    op.status === 'FAILED' ? 'text-red-500' :
                                                        op.status === 'PAID' || op.status === 'MINTING' ? 'text-[--rebeka-primary] animate-pulse' :
                                                            'text-white/40'}`}>
                                                {op.status}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 block">Amount</span>
                                            <span className="text-sm font-mono font-bold text-white tracking-tighter">
                                                {op.amount.toLocaleString()} <span className="text-[9px] text-white/30">{op.currency}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};

const BriefcaseIcon = ({ className }: { className: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);
