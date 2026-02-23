import { Header } from '@/components/Header';
import { RebekaLogo } from '@/components/atoms/RebekaLogo';
import { PropertyCard } from '@/components/PropertyCard';
import { GlassCard } from '@/components/GlassCard';
import { ParaLogin } from '@/components/organisms/Auth/ParaLogin';
import { HeroAuthButtons } from '@/components/client/AuthButtons';
import { Typography } from '@/components/atoms/Typography';
import { projectsData } from '@/lib/data/projects';
import { ArrowRight, MapPin, TrendingUp, Ruler } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-blueprint">
      {/* ═══ AMBIENT BACKGROUND ═══ */}
      <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40" />
      <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-30" />

      {/* Asymmetric Light Flares */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary blur-[120px] opacity-[0.05] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-secondary blur-[120px] opacity-[0.05] pointer-events-none" />

      <Header />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Typography variant="h1" className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.2s]">
            <span className="text-white">Real Estate Equity, </span>
            <span className="text-gradient-primary">Reengineered</span> <br className="hidden md:block" />
            <span className="text-white"> for the Digital Era</span>
          </Typography>

          <Typography variant="p" className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.4s]">
            Access high-yield property markets through secure, compliant, and privacy-preserving tokenization on <span className="text-primary font-semibold">Arbitrum Sepolia</span>.
          </Typography>

          <HeroAuthButtons />
        </div>
      </section>

      {/* ═══ CORE PILLARS ═══ */}
      <section id="infrastructure" className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary blur-[100px] opacity-10 pointer-events-none" />
            <Typography variant="h2" className="text-white mb-4">
              Institutional-Grade <span className="text-gradient-secondary">Infrastructure</span>
            </Typography>
            <Typography variant="p" className="text-text-secondary max-w-2xl mx-auto">
              Our protocol is engineered from the ground up to protect your capital. Unbreakable legal backing meets zero-knowledge privacy.
            </Typography>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <GlassCard hover={true} className="group p-8 transition-all duration-300 opacity-0 animate-fade-in-up stagger-1 border-white/5 flex flex-col h-full bg-white/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 group-hover:border-primary/40 transition-all">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <Typography variant="h3" className="text-lg font-bold text-white mb-3 tracking-tight">Sovereign Compliance Layer</Typography>
                <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed mb-6">
                  Bank-grade identity verification (KYC/AML) built directly into the protocol layer. A secure environment where only strictly verified participants operate.
                </Typography>
              </div>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-white/30 tracking-widest">Powered by Truora</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary opacity-80"></span>
                </span>
              </div>
            </GlassCard>

            {/* Pillar 2 */}
            <GlassCard hover={true} className="group p-8 transition-all duration-300 opacity-0 animate-fade-in-up stagger-2 border-white/5 flex flex-col h-full bg-white/[0.02] relative overflow-hidden">
              {/* FHE Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 group-hover:border-secondary/40 transition-all relative z-10">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1 relative z-10">
                <Typography variant="h3" className="text-lg font-bold text-white mb-3 tracking-tight">Zero-Knowledge Privacy</Typography>
                <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed mb-6">
                  Your portfolio is your business. Powered by FHE encryption, your balances and asset positions remain completely private, while staying fully compliant with regulatory standards.
                </Typography>
              </div>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="font-mono text-[10px] uppercase text-white/30 tracking-widest">Fhenix Architecture</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary opacity-80"></span>
                </span>
              </div>
            </GlassCard>

            {/* Pillar 3 */}
            <GlassCard hover={true} className="group p-8 transition-all duration-300 opacity-0 animate-fade-in-up stagger-3 border-white/5 flex flex-col h-full bg-white/[0.02]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 group-hover:border-white/30 transition-all">
                <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <Typography variant="h3" className="text-lg font-bold text-white mb-3 tracking-tight">Unbreakable Legal Backing</Typography>
                <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed mb-6">
                  Code meets contract. Every digital fraction you hold is legally bound to physical real estate through irrevocable Mexican fiduciary trusts, immutably registered on IPFS.
                </Typography>
              </div>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-white/30 tracking-widest">Asset Registry Ledger</span>
                <svg className="w-3 h-3 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ═══ THE FLOW (Timeline) ═══ */}
      <section className="relative z-10 py-24 px-6 bg-black border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="h2" className="text-white mb-4">
              Streamlined <span className="text-gradient-primary">Onboarding</span>
            </Typography>
            <Typography variant="p" className="text-text-secondary max-w-2xl mx-auto">
              From fiat capital to tokenized equity in four seamless, secure steps.
            </Typography>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connecting Line (hidden on mobile) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

            {/* Step 1 */}
            <div className="relative z-10 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-black border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                <span className="font-mono text-2xl font-bold tracking-tighter text-white">01</span>
              </div>
              <div>
                <Typography variant="h3" className="text-white font-bold text-sm uppercase tracking-widest mb-2">Verify</Typography>
                <Typography variant="caption" className="text-text-muted px-4 block">Complete a streamlined, secure identity check.</Typography>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center space-y-4 mt-8 md:mt-0">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-black border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                <span className="font-mono text-2xl font-bold tracking-tighter text-white">02</span>
              </div>
              <div>
                <Typography variant="h3" className="text-white font-bold text-sm uppercase tracking-widest mb-2">Fund</Typography>
                <Typography variant="caption" className="text-text-muted px-4 block">Onboard capital seamlessly via global payment rails.</Typography>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center space-y-4 mt-8 md:mt-0">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-black border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
                <span className="font-mono text-2xl font-bold tracking-tighter text-white">03</span>
              </div>
              <div>
                <Typography variant="h3" className="text-white font-bold text-sm uppercase tracking-widest mb-2">Acquire</Typography>
                <Typography variant="caption" className="text-text-muted px-4 block">Purchase fractional equity in premium real estate.</Typography>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative z-10 text-center space-y-4 mt-8 md:mt-0">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-primary blur-md opacity-20" />
                <span className="font-mono text-2xl font-bold tracking-tighter text-primary">04</span>
              </div>
              <div>
                <Typography variant="h3" className="text-primary font-bold text-sm uppercase tracking-widest mb-2">Yield</Typography>
                <Typography variant="caption" className="text-text-muted px-4 block">Claim automated dividends directly to your vault.</Typography>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ FEATURED ASSETS — Project Showcase ═══ */}
      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-blockchain mb-4 inline-flex font-mono uppercase text-[9px] tracking-[0.2em] mx-auto">
              <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Live Offerings
            </span>
            <Typography variant="h2" className="text-white mb-4">
              Tokenized <span className="text-gradient-primary">Real Estate</span>
            </Typography>
            <Typography variant="p" className="text-text-secondary max-w-2xl mx-auto">
              Explore our curated selection of institutional-grade properties, each backed by irrevocable fiduciary trusts and tokenized on Arbitrum.
            </Typography>
          </div>

          <div className="space-y-8">
            {projectsData.map((project) => (
              <Link key={project.id} href={`/dapp/projects/${project.id}`} className="block group">
                <GlassCard hover={true} className="overflow-hidden border-white/5">
                  <div className="grid lg:grid-cols-2">
                    {/* Left: Image with overlay */}
                    <div className="relative h-64 lg:h-auto lg:min-h-[380px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/50 lg:to-black/90" />
                      {/* Status badge */}
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-primary/30 text-[10px] uppercase font-bold tracking-widest text-primary">
                          {project.status === 'funding' ? '● Funding Active' : project.status === 'funded' ? '● Funded' : '● Completed'}
                        </span>
                      </div>
                      {/* Location */}
                      <div className="absolute bottom-5 left-5 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-white/50" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">{project.location.short}</span>
                      </div>
                    </div>

                    {/* Right: Project Info */}
                    <div className="p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-[10px] text-secondary font-bold tracking-widest">{project.tokenomics.ticker}</span>
                        </div>
                        <Typography variant="h3" className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight font-heading">
                          {project.title}
                        </Typography>
                        <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed mb-6 max-w-md">
                          {project.thesis.description}
                        </Typography>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-1 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> Token Price
                            </span>
                            <span className="text-lg font-mono font-bold text-success">${project.specs.pricePerToken.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-1">Total Value</span>
                            <span className="text-lg font-mono font-bold text-white">{project.specs.totalValue}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest mb-1 flex items-center gap-1">
                              <Ruler className="w-3 h-3" /> Area
                            </span>
                            <span className="text-lg font-mono font-bold text-white">{project.specs.area.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress + CTA */}
                      <div>
                        <div className="mb-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Funding Progress</span>
                            <span className="text-[11px] font-mono font-bold text-primary">{project.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-[#60CFFF] rounded-full transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{project.specs.type}</span>
                          <span className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-widest group-hover:text-white transition-colors">
                            View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Browse All CTA */}
          <div className="mt-12 text-center">
            <Link href="/dapp/projects" className="btn-primary group/btn inline-flex">
              Browse All Properties
              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <RebekaLogo size="sm" />
              <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">
                © 2026 REBEKA Protocol. Real Estate Blockchain Ekosystem Arbitrum.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
