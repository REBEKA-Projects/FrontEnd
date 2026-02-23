import { notFound } from 'next/navigation';
import { DappHeader } from '@/components/DappHeader';
import { GlassCard } from '@/components/GlassCard';
import { Typography } from '@/components/atoms/Typography';
import { getProjectBySlug, ProjectItem } from '@/lib/data/projects';
import { MapPin, ShieldCheck, ArrowRight, Zap, Target, Home } from "lucide-react";
import Link from 'next/link';

export default async function ProjectDetailTemplate({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="relative min-h-screen bg-blueprint">
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40 z-0" />
            <DappHeader />

            <main className="relative z-10 pt-20 pb-40">
                <section className="relative h-[60vh] md:h-[70vh] w-full flex items-end">
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
                            <span className="mb-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[--rebeka-primary]">
                                RWA BACKED ASSET
                            </span>

                            <Typography variant="h1" className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-4">
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
                    <div className="max-w-6xl mx-auto">
                        <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.2s]">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-2">Token Ticker</span>
                                <span className="text-2xl font-mono font-bold text-[--rebeka-primary]">{project.tokenomics.ticker}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-2">Issue Price</span>
                                <span className="text-2xl font-mono font-bold text-white">${project.specs.pricePerToken.toFixed(2)} USD</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-2">Initial TVL</span>
                                <span className="text-2xl font-mono font-bold text-white">{project.specs.totalValue}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em] mb-2">Holding Period</span>
                                <span className="text-2xl font-mono font-bold text-[--rebeka-success]">{project.exitStrategy.horizon.split(' ')[0]} Years</span>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-16">
                        <section className="space-y-6 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.3s]">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-[--rebeka-primary]" />
                                <Typography variant="h2" className="text-2xl font-bold text-white m-0">
                                    I. Location & Legal Framework
                                </Typography>
                            </div>
                            <Typography variant="p" className="text-[--rebeka-text-muted] leading-relaxed">
                                {project.location.full} — {project.location.coordinates}. We provide institutional-grade security guaranteed by fiduciary trust.
                            </Typography>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Legal Vehicle</span>
                                        <span className="text-sm text-white font-medium">{project.legal.documentName}</span>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Fiduciary Institution</span>
                                        <span className="text-sm text-white font-medium">{project.legal.fiduciary}</span>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Public Registry Folio</span>
                                        <span className="text-sm font-mono text-white/80">{project.legal.folio}</span>
                                    </div>
                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                        <span className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Public Deed & Notary</span>
                                        <span className="text-sm text-white/80">{project.legal.notary}</span>
                                    </div>
                                    <a
                                        href="https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 w-full py-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 group/link hover:bg-white hover:text-black transition-all"
                                    >
                                        <ShieldCheck className="w-4 h-4 text-[--rebeka-success] group-hover/link:text-black" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Fiduciary Trust (IPFS)</span>
                                    </a>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-white/10 relative h-full min-h-[300px] shadow-2xl">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${project.mapUrl})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[--rebeka-primary]">Satellite View: Cerro de Santa Clara</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <Typography variant="h2" className="text-2xl font-bold text-white pb-4 border-b border-white/10">
                                II. Financial Engineering & Strategy
                            </Typography>
                            <Typography variant="p" className="text-[--rebeka-text-muted] leading-relaxed mb-6">
                                {project.thesis.description}
                            </Typography>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-gradient-to-br from-[--rebeka-primary-dim] to-transparent border border-white/10 rounded-xl relative overflow-hidden group">
                                    <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-[--rebeka-primary] opacity-10 group-hover:scale-110 transition-transform" />
                                    <span className="block text-[11px] font-bold text-white/50 uppercase tracking-widest mb-2">Base Acquisition Cost</span>
                                    <span className="text-3xl font-mono font-bold text-white">{project.thesis.acquisitionCost}</span>
                                </div>
                                <div className="p-6 bg-gradient-to-br from-[--rebeka-success-dim] to-transparent border border-white/10 rounded-xl">
                                    <span className="block text-[11px] font-bold text-white/50 uppercase tracking-widest mb-2">Forced Liquidation Clause</span>
                                    <span className="text-sm text-white">{project.exitStrategy.forcedExit}</span>
                                </div>
                            </div>
                            <div className="p-5 bg-black/40 border border-white/5 rounded-xl border-l-2 border-l-[--rebeka-primary]">
                                <Typography variant="p" className="text-sm text-white/80 leading-relaxed m-0">
                                    <span className="text-white font-bold">Spread Utility:</span> {project.thesis.spreadFunction}
                                </Typography>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <Typography variant="h2" className="text-2xl font-bold text-white pb-4 border-b border-white/10">
                                III. Capital Distribution (Tokenomics)
                            </Typography>
                            <Typography variant="p" className="text-[--rebeka-text-muted] mb-8">
                                Fixed asset parity: <span className="text-[--rebeka-primary] font-bold">{project.tokenomics.parity}</span>. Fixed supply of {project.tokenomics.supply}.
                            </Typography>

                            <div className="space-y-3">
                                {[
                                    { label: project.tokenomics.distribution.owner, color: 'bg-white' },
                                    { label: project.tokenomics.distribution.core, color: 'bg-[--rebeka-primary]' },
                                    { label: project.tokenomics.distribution.reserve, color: 'bg-[--rebeka-secondary]' },
                                    { label: project.tokenomics.distribution.allies, color: 'bg-white/20' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm font-medium text-white/80">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-32">
                            <GlassCard className="p-8 border-[--rebeka-primary-glow] relative overflow-hidden">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[--rebeka-primary] blur-[80px] opacity-20 pointer-events-none" />

                                <Typography variant="h3" className="text-xl font-bold text-white mb-2">
                                    Initialize RWA Position
                                </Typography>
                                <Typography variant="p" className="text-xs text-white/40 mb-8">
                                    Requires Identity Verification (KYC) through our Sovereign Permissioned Layer. Compliance enforced on-chain.
                                </Typography>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-xs uppercase text-white/50 tracking-widest">Token Parity</span>
                                        <span className="text-sm font-bold text-white">1 m² / Token</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-xs uppercase text-white/50 tracking-widest">Current Value</span>
                                        <span className="text-sm font-mono font-bold text-[--rebeka-success]">${project.specs.pricePerToken.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-xs uppercase text-white/50 tracking-widest">Network</span>
                                        <span className="text-[10px] font-bold font-mono text-white/40 bg-white/10 px-2 py-1 rounded">ARB SEPOLIA</span>
                                    </div>
                                </div>

                                <Link href="/dapp" className="w-full flex items-center justify-center btn-primary group/btn py-4">
                                    Proceed to Dapp
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>

                                <span className="block text-center text-[9px] text-white/20 mt-4 uppercase tracking-[0.2em]">
                                    Unbreakable Legal Backing
                                </span>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
