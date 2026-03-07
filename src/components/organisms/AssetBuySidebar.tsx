"use client";

import { useState } from "react";
import { Typography, GlassCard } from "@/components/atoms";
import { BuyTokenModal } from "@/components/organisms";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProjectItem } from "@/lib/data/projects";

interface AssetBuySidebarProps {
    project: ProjectItem;
}

export const AssetBuySidebar = ({ project }: AssetBuySidebarProps) => {
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="sticky top-32">
                <GlassCard className="p-8 border-[--rebeka-primary-glow] relative overflow-hidden" hover={false}>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[--rebeka-primary] blur-[80px] opacity-20 pointer-events-none" />

                    <Typography variant="h3" className="text-xl font-bold text-white mb-2 tracking-tight">
                        Initialize RWA Position
                    </Typography>
                    <Typography variant="p" className="text-[11px] text-white/40 mb-8 font-medium leading-relaxed">
                        Requires Identity Verification (KYC) through our Sovereign Permissioned Layer. Compliance enforced on-chain.
                    </Typography>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-[10px] uppercase text-white/40 tracking-[0.2em] font-bold">Token Parity</span>
                            <span className="text-sm font-bold text-white">1 m² / Token</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-[10px] uppercase text-white/40 tracking-[0.2em] font-bold">Current Value</span>
                            <span className="text-sm font-mono font-bold text-[--rebeka-success] drop-shadow-[0_0_10px_var(--rebeka-success-dim)]">${project.specs.pricePerToken.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-[10px] uppercase text-white/40 tracking-[0.2em] font-bold">Network</span>
                            <span className="text-[10px] font-bold font-mono text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-md shadow-inner">ARB SEPOLIA</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-[10px] uppercase text-white/40 tracking-[0.2em] font-bold">Chainlink CRE</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-[--rebeka-success]">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Verified
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsBuyModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[--rebeka-primary] font-black uppercase text-[11px] tracking-[0.2em] text-black hover:bg-white hover:shadow-[0_0_30px_var(--rebeka-primary-dim)] hover:scale-[1.02] transition-all duration-300 group/btn"
                    >
                        Buy Tokens
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:scale-110 transition-all" />
                    </button>

                    <span className="block text-center text-[9px] text-white/20 mt-4 uppercase tracking-[0.2em]">
                        Unbreakable Legal Backing
                    </span>
                </GlassCard>
            </div>

            {isBuyModalOpen && (
                <BuyTokenModal
                    projectTitle={project.title}
                    tokenTicker={project.tokenomics.ticker}
                    pricePerToken={project.specs.pricePerToken}
                    onClose={() => setIsBuyModalOpen(false)}
                    onSuccess={() => router.push('/dashboard')}
                />
            )}
        </>
    );
};
