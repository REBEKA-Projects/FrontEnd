import { DappHeader } from '@/components/DappHeader';
import { GlassCard } from '@/components/GlassCard';
import { Typography } from '@/components/atoms/Typography';
import { projectsData } from '@/lib/data/projects';
import { ArrowRight, MapPin, TrendingUp, Building2 } from "lucide-react";
import Link from 'next/link';

export default function ProyectosPage() {
    return (
        <div className="relative min-h-screen bg-blueprint">
            {/* ═══ AMBIENT BACKGROUND ═══ */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-30" />

            {/* Asymmetric Light Flares */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[--rebeka-primary] blur-[120px] opacity-[0.05] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-[--rebeka-secondary] blur-[120px] opacity-[0.05] pointer-events-none" />

            <DappHeader />

            <main className="relative z-10 pt-32 pb-24 px-6 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards]">
                        <Typography variant="h1" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                            Institutional <span className="text-gradient-primary">Marketplace</span>
                        </Typography>
                        <Typography variant="p" className="text-lg text-[--rebeka-text-secondary] max-w-2xl mx-auto">
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
                                    <div className="relative h-48 w-full overflow-hidden bg-black/50">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80 flex-shrink-0"
                                            style={{ backgroundImage: `url(${project.imageUrl})` }}
                                        />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-widest text-[--rebeka-primary]">
                                                {project.status === 'funding' ? 'Funding Active' : 'Funded'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-6 flex-1 flex flex-col z-20 bg-gradient-to-b from-black/60 to-transparent">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MapPin className="w-3.5 h-3.5 text-white/40" />
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                                                {project.location.short}
                                            </span>
                                        </div>

                                        <Typography variant="h3" className="text-2xl font-bold text-white mb-2">
                                            {project.title}
                                        </Typography>

                                        <Typography variant="p" className="text-sm text-[--rebeka-text-muted] line-clamp-2 mb-6">
                                            {project.specs.type} - {project.thesis.description}
                                        </Typography>

                                        <div className="mt-auto pt-6 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Issue Price</span>
                                                    <span className="text-lg font-mono font-bold text-[--rebeka-success]">${project.specs.pricePerToken.toFixed(2)} USD</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Target Yield</span>
                                                    <span className="text-lg font-mono font-bold text-white">~8.5%</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between group-hover:text-[--rebeka-primary] transition-colors">
                                                <span className="text-xs uppercase font-bold tracking-widest">View Details</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                </div>
            </main >
        </div >
    );
}
