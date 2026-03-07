import type { Metadata } from "next";
import { GlassCard, Typography } from '@/components/atoms';
import { projectsData } from '@/lib/data/projects';
import { ArrowRight, MapPin, TrendingUp, Building2 } from "lucide-react";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Marketplace | FIDUCCI",
    description: "Browse strictly vetted real-world assets available for fractional investment. Institutional-grade tokenized properties on Arbitrum.",
    openGraph: {
        title: "Marketplace | FIDUCCI",
        description: "Browse strictly vetted real-world assets available for fractional investment.",
    },
};

export default function ProyectosPage() {
    return (
        <main className="relative z-10 pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]">
                    <Typography variant="h1" className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter uppercase leading-none">
                        Institutional <span className="text-[--rebeka-secondary] drop-shadow-[0_0_15px_rgba(201,160,80,0.4)]">Marketplace</span>
                    </Typography>
                    <Typography variant="p" className="text-lg text-[--rebeka-text-secondary] max-w-2xl mx-auto font-medium">
                        Browse strictly vetted real-world assets available for fractional investment on Arbitrum Sepolia.
                    </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <Link href={`/dapp/projects/${project.id}`} key={project.id}>
                            <GlassCard
                                className={`group h-full flex flex-col overflow-hidden border-white/10 hover:border-[--rebeka-primary-glow] transition-all duration-500 opacity-0 animate-fade-in-up cursor-pointer`}
                                style={{ animationDelay: `${(index + 2) * 150}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative h-56 w-full overflow-hidden bg-black/50 p-1">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                                    <div
                                        className="absolute inset-1 rounded-t-2xl bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-80 flex-shrink-0"
                                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                                    />
                                    <div className="absolute top-5 right-5 z-20">
                                        {project.status === 'funding' ? (
                                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[--rebeka-success]/30 text-[9px] uppercase font-black tracking-widest text-[--rebeka-success] shadow-[0_0_15px_var(--rebeka-success-dim)]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-success] animate-pulse" />
                                                Funding Active
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase font-black tracking-widest text-white/50">
                                                Funded
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex-1 flex flex-col z-20 bg-gradient-to-b from-black/80 to-transparent">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="w-3.5 h-3.5 text-[--rebeka-secondary]" />
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/60">
                                            {project.location.short}
                                        </span>
                                    </div>

                                    <Typography variant="h3" className="text-2xl font-bold text-white mb-2 leading-tight">
                                        {project.title}
                                    </Typography>

                                    <Typography variant="p" className="text-[13px] text-[--rebeka-text-muted] line-clamp-2 mb-8 font-medium leading-relaxed">
                                        {project.specs.type} - {project.thesis.description}
                                    </Typography>

                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <span className="block text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1.5">Issue Price</span>
                                                <span className="text-xl font-mono font-bold text-white">${project.specs.pricePerToken.toFixed(2)} <span className="text-[10px] text-white/40 ml-1">USD</span></span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold mb-1.5">Target Yield</span>
                                                <span className="text-xl font-mono font-bold text-[--rebeka-success]">~8.5%</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between group-hover:text-[--rebeka-primary] transition-colors py-2 text-[--rebeka-text-muted]">
                                            <span className="text-[10px] uppercase font-black tracking-widest">View Details</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:scale-110 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div >
        </main >
    );
}
