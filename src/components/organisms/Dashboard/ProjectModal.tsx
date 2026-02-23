"use client";

import { Typography } from "@/components/atoms/Typography";
import { GlassCard } from "@/components/GlassCard";
import {
    X,
    ShieldCheck,
    Building2,
    MapPin,
    BadgeCheck,
    BarChart3,
    Coins,
    Clock,
    FileText
} from "lucide-react";
import { InvestmentForm } from "@/components/organisms/Checkout/InvestmentForm";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckoutReady: (clientSecret: string, operationId: string) => void;
    project: {
        id: string;
        title: string;
        code: string;
        description: string;
        yieldAPY: string;
        liquidity: string;
        tokenAddress: string;
        pricePerToken: number;
    } | null;
}

export const ProjectModal = ({ isOpen, onClose, onCheckoutReady, project }: ProjectModalProps) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in-up">
                <GlassCard className="h-full border-white/10 flex flex-col p-0 overflow-hidden" hover={false}>
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[--rebeka-primary-dim] border border-[--rebeka-primary-glow] flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-[--rebeka-primary]" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Typography variant="h4" className="text-white font-black italic uppercase tracking-tight leading-none">
                                        {project.title}
                                    </Typography>
                                    <span className="text-white/20 font-mono text-xs">{project.code}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <MapPin className="w-3 h-3 text-white/40" />
                                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest leading-none">Puebla, MEXICO</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Scrollable Area */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Side: Info & Metrics */}
                            <div className="space-y-10">
                                <section className="space-y-4">
                                    <Typography variant="subtitle" className="text-[--rebeka-primary] font-black uppercase text-xs tracking-[0.2em] italic">
                                        Executive_Summary
                                    </Typography>
                                    <Typography variant="p" className="text-white/60 leading-relaxed text-sm font-medium">
                                        {project.description} This institutional-grade mixed development represents a cornerstone of urban modernization in the region. Strategically located to maximize commercial flow and residential demand.
                                    </Typography>
                                </section>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <BarChart3 className="w-3 h-3 text-[--rebeka-success]" />
                                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Projected APY</span>
                                        </div>
                                        <Typography variant="h3" className="text-[--rebeka-success] font-mono leading-none tracking-tighter">
                                            {project.yieldAPY}
                                        </Typography>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-3 h-3 text-[--rebeka-secondary]" />
                                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Risk Tier</span>
                                        </div>
                                        <Typography variant="h3" className="text-white font-mono leading-none tracking-tighter">
                                            A+ <span className="text-[10px] text-white/20 tracking-normal font-sans font-medium uppercase font-normal ml-1 whitespace-nowrap">Secure</span>
                                        </Typography>
                                    </div>
                                </div>

                                <section className="space-y-4">
                                    <Typography variant="subtitle" className="text-[--rebeka-primary] font-black uppercase text-xs tracking-[0.2em] italic">
                                        Technical_Specifications
                                    </Typography>
                                    <div className="space-y-2 font-mono text-[11px]">
                                        <div className="flex justify-between p-3 border-b border-white/5">
                                            <span className="text-white/30 uppercase flex items-center gap-2"><Clock className="w-3 h-3" /> Duration</span>
                                            <span className="text-white font-bold">36 Months</span>
                                        </div>
                                        <div className="flex justify-between p-3 border-b border-white/5">
                                            <span className="text-white/30 uppercase flex items-center gap-2"><Coins className="w-3 h-3" /> Token Standard</span>
                                            <span className="text-white font-bold">ERC-3643</span>
                                        </div>
                                        <div className="flex justify-between p-3 border-b border-white/5">
                                            <span className="text-white/30 uppercase flex items-center gap-2"><FileText className="w-3 h-3" /> Trust Structure</span>
                                            <span className="text-white font-bold underline decoration-white/20 decoration-dashed">Irrevocable Fiduciary</span>
                                        </div>
                                        <div className="flex justify-between p-3">
                                            <span className="text-white/30 uppercase flex items-center gap-2"><BadgeCheck className="w-3 h-3" /> Legal Status</span>
                                            <span className="text-[--rebeka-success] font-bold">100% REGULATED</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <a
                                            href={`/documents/trust_deed_${project.code.toLowerCase()}.pdf`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 hover:text-white hover:bg-white/5 hover:border-[--rebeka-secondary-glow] transition-all group/legal"
                                        >
                                            <FileText className="w-4 h-4 text-[--rebeka-secondary] group-hover/legal:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em]">View Fiduciary Deed</span>
                                        </a>
                                    </div>
                                </section>
                            </div>

                            {/* Right Side: Investment Form */}
                            <div className="relative">
                                <div className="p-8 rounded-3xl bg-black/40 border border-white/10 shadow-inner relative z-10 backdrop-blur-xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black italic shadow-xl">
                                            $
                                        </div>
                                        <div>
                                            <Typography variant="h4" className="text-white font-black italic uppercase tracking-tighter leading-none">
                                                Acquire <span className="text-gradient-primary">Equity</span>
                                            </Typography>
                                            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 block">Institutional Purchase Flow</span>
                                        </div>
                                    </div>

                                    {/* The Investment Form Component we analyzed earlier */}
                                    <InvestmentForm
                                        tokenAddress={project.tokenAddress}
                                        pricePerToken={project.pricePerToken}
                                        onCheckoutReady={onCheckoutReady}
                                    />

                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-3 grayscale opacity-30">
                                            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[10px] font-black italic text-black shrink-0">S</div>
                                            <p className="text-[8px] text-white font-medium leading-tight underline decoration-white/10">
                                                Fiduciary operations processed through Stripe institutional gateways.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Background Highlight */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[--rebeka-primary] blur-[100px] opacity-10 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
