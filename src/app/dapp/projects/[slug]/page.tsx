import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { AssetBuySidebar, ProjectTabs } from '@/components/organisms';
import { GlassCard, Typography } from '@/components/atoms';
import { getProjectBySlug, ProjectItem } from '@/lib/data/projects';
import { MapPin, Home, Target } from "lucide-react";

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
                </div>
            </section>

            {/* ═══ BENTO BOX LAYOUT ═══ */}
            <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-24">
                <div className="lg:col-span-8">
                    <ProjectTabs project={project} />
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
