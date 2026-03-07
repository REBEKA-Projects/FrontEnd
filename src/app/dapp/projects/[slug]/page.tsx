import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { ChainlinkVerificationPanel, AssetBuySidebar } from '@/components/organisms';
import { GlassCard, Typography } from '@/components/atoms';
import { getProjectBySlug, ProjectItem } from '@/lib/data/projects';
import { MapPin, ShieldCheck, ArrowRight, Zap, Target, Home } from "lucide-react";
import Link from 'next/link';
import { SatelliteMap } from '@/components/molecules';
import { MOCK_ORACLE, MOCK_AUDIT_LOGS } from '@/lib/chainlink-mock-data';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return { title: "Project Not Found | FIDUCCI" };
    }

    return {
        title: `${project.title} | FIDUCCI Marketplace`,
        description: `${project.thesis.description} — ${project.location.short}. Token: ${project.tokenomics.ticker}, Price: $${project.specs.pricePerToken.toFixed(2)}.`,
        openGraph: {
            title: `${project.title} | FIDUCCI`,
            description: project.thesis.description,
        },
    };
}

export default async function ProjectDetailTemplate({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="relative z-10 pt-20 pb-40">
            <section className="relative h-[50vh] md:h-[55vh] w-full flex items-end">
                <div className="absolute inset-0 z-0 bg-black">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>

                <div className="relative z-10 w-full px-6 py-16">
                    <div className="max-w-6xl mx-auto flex flex-col items-start opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]">
                        <span className="mb-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[--rebeka-primary]/30 text-[10px] uppercase font-black tracking-widest text-[--rebeka-primary] shadow-[0_0_15px_var(--rebeka-primary-dim)]">
                            RWA BACKED ASSET
                        </span>

                        <Typography variant="h1" className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tighter uppercase leading-none text-shadow-lg">
                            {project.title}
                        </Typography>

                        <div className="flex flex-wrap items-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-white/40" />
                                <span className="text-sm font-bold uppercase tracking-widest text-white/80">{project.location.short}</span>
                            </div>
                            <div className="h-4 w-px bg-white/20 hidden md:block" />
                            <div className="flex items-center gap-2">
                                <Home className="w-4 h-4 text-[--rebeka-secondary]" />
                                <span className="text-sm font-bold uppercase tracking-widest text-white/80">{project.specs.type}</span>
                            </div>
                            <div className="h-4 w-px bg-white/20 hidden md:block" />
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-[--rebeka-success]" />
                                <span className="text-sm font-bold uppercase tracking-widest text-white/80">{project.specs.area}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-20 -mt-8 px-6">
                <div className="max-w-6xl mx-auto space-y-8 lg:space-y-12">
                    <GlassCard className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.2s] border-white/5 divide-x divide-white/5" hover={false}>
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] uppercase font-black text-[--rebeka-text-muted] tracking-[0.2em] mb-2">Token Ticker</span>
                            <span className="text-3xl font-mono font-bold text-[--rebeka-primary] drop-shadow-[0_0_10px_var(--rebeka-primary-dim)]">{project.tokenomics.ticker}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] uppercase font-black text-[--rebeka-text-muted] tracking-[0.2em] mb-2">Issue Price</span>
                            <span className="text-3xl font-mono font-bold text-white">${project.specs.pricePerToken.toFixed(2)} <span className="text-sm text-white/40 ml-1">USD</span></span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] uppercase font-black text-[--rebeka-text-muted] tracking-[0.2em] mb-2">Initial TVL</span>
                            <span className="text-3xl font-mono font-bold text-white">{project.specs.totalValue}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] uppercase font-black text-[--rebeka-text-muted] tracking-[0.2em] mb-2">Holding Period</span>
                            <span className="text-3xl font-mono font-bold text-[--rebeka-success] drop-shadow-[0_0_10px_var(--rebeka-success-dim)]">{project.exitStrategy.horizon.split(' ')[0]} <span className="text-sm font-sans text-[--rebeka-success]/60 ml-1">Years</span></span>
                        </div>
                    </GlassCard>

                    {/* Elevated Trust Anchor (Chainlink) - Desktop Only (Mobile flows in column) */}
                    <div className="hidden lg:block">
                        <ChainlinkVerificationPanel
                            oracleData={MOCK_ORACLE}
                            auditLogs={MOCK_AUDIT_LOGS}
                            tokenPrice={project.specs.pricePerToken}
                            totalValuation={6_100_000}
                            totalSupply={200_000}
                            autoPlay={true}
                        />
                    </div>
                </div>
            </section>

            {/* ═══ BENTO BOX LAYOUT ═══ */}
            <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-24">
                <div className="lg:col-span-8 space-y-10 lg:space-y-16">

                    {/* Mobile Chainlink Panel */}
                    <div className="block lg:hidden">
                        <ChainlinkVerificationPanel
                            oracleData={MOCK_ORACLE}
                            auditLogs={MOCK_AUDIT_LOGS}
                            tokenPrice={project.specs.pricePerToken}
                            totalValuation={6_100_000}
                            totalSupply={200_000}
                            autoPlay={true}
                        />
                    </div>

                    {/* 1. Financial Engineering & Strategy */}
                    <section className="space-y-6 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.3s]">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-[--rebeka-primary]" />
                            <Typography variant="h2" className="text-xl font-bold text-white m-0 tracking-tight">
                                Financial Engineering
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Thesis Description Card - Spans full width */}
                            <div className="md:col-span-2 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <Typography variant="p" className="text-[13px] text-white/70 leading-relaxed m-0">
                                    {project.thesis.description}
                                </Typography>
                            </div>

                            {/* Acquisition Cost */}
                            <div className="p-6 bg-gradient-to-br from-[--rebeka-primary-dim] to-transparent border border-[--rebeka-primary-glow] rounded-2xl relative overflow-hidden group">
                                <span className="block text-[10px] uppercase font-black tracking-widest text-[--rebeka-primary] mb-2">Base Acquisition Cost</span>
                                <span className="text-2xl font-mono font-bold text-white">{project.thesis.acquisitionCost}</span>
                            </div>

                            {/* Liquidation */}
                            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <span className="block text-[10px] uppercase font-black tracking-widest text-white/30 mb-2">Forced Liquidation</span>
                                <span className="text-[13px] font-medium text-white/90 leading-snug block">{project.exitStrategy.forcedExit}</span>
                            </div>

                            {/* Spread Utility Mechanism */}
                            <div className="md:col-span-2 p-5 bg-black/40 border-t border-t-[--rebeka-primary]/20 border-white/5 rounded-2xl border-l-2 border-l-[--rebeka-primary]">
                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[--rebeka-primary] mb-1.5 block">Spread Utility Mechanism</span>
                                <span className="text-[13px] text-white/80 font-medium leading-relaxed block">
                                    {project.thesis.spreadFunction}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* 2. Legal Framework & Geography */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-[--rebeka-success]" />
                            <Typography variant="h2" className="text-xl font-bold text-white m-0 tracking-tight">
                                Legal Framework & Geography
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Legal Grid */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Legal Vehicle</span>
                                        <span className="text-xs text-white font-medium leading-snug">{project.legal.documentName}</span>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Fiduciary</span>
                                        <span className="text-xs text-white font-medium leading-snug">{project.legal.fiduciary}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Public Registry Folio</span>
                                    <span className="text-xs font-mono text-white/80">{project.legal.folio}</span>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Public Deed & Notary</span>
                                    <span className="text-[11px] leading-snug text-white/80 block">{project.legal.notary}</span>
                                </div>
                                {/* IPFS Button */}
                                <a
                                    href="https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[--rebeka-success]/10 to-transparent border border-[--rebeka-success]/20 flex items-center justify-center gap-2 hover:bg-[--rebeka-success]/20 transition-all group/link"
                                >
                                    <ShieldCheck className="w-4 h-4 text-[--rebeka-success] group-hover/link:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[--rebeka-success]">View Trust Deed (IPFS)</span>
                                </a>
                            </div>

                            {/* Map */}
                            <div className="h-full min-h-[300px] rounded-xl overflow-hidden border border-white/5">
                                <SatelliteMap
                                    lat={18.962399}
                                    lng={-98.194782}
                                    zoom={15}
                                    label="Asset Location Vector"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 3. Tokenomics */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-white/60" />
                            <Typography variant="h2" className="text-xl font-bold text-white m-0 tracking-tight">
                                Tokenomics
                            </Typography>
                        </div>

                        <div className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">
                            <div>
                                <span className="block text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Fixed Supply</span>
                                <span className="text-3xl font-mono font-bold text-white">{project.tokenomics.supply.toLocaleString()}</span>
                            </div>

                            <div className="h-px w-full md:h-12 md:w-px bg-white/10 hidden md:block" />

                            <div>
                                <span className="block text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Asset Parity</span>
                                <span className="text-sm font-medium text-[--rebeka-primary] px-3 py-1 bg-[--rebeka-primary-dim] rounded-md border border-[--rebeka-primary-glow]">{project.tokenomics.parity}</span>
                            </div>

                            <div className="h-px w-full md:h-12 md:w-px bg-white/10 hidden md:block" />

                            <div className="flex flex-col gap-3">
                                {[
                                    { label: project.tokenomics.distribution.owner, color: 'bg-white' },
                                    { label: project.tokenomics.distribution.core, color: 'bg-[--rebeka-primary]' },
                                    { label: project.tokenomics.distribution.reserve, color: 'bg-[--rebeka-secondary]' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.color} shadow-[0_0_8px_currentColor]`} />
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* ═══ INTERACTIVE BUY SIDEBAR ═══ */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-28">
                        <AssetBuySidebar project={project} />
                    </div>
                </div>
            </div>
        </main>
    );
}
