import { GlassCard, Typography, RebekaLogo } from '@/components/atoms';
import { projectsData } from '@/lib/data/projects';
import { ArrowRight, MapPin, TrendingUp, Ruler } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-blueprint">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40" />
      <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-30" />

      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary blur-[120px] opacity-[0.015] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-secondary blur-[120px] opacity-[0.015] pointer-events-none" />

      {/* Hero */}
      <section className="relative z-10 px-6 pt-32 pb-8 md:pt-44 md:pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.1s]">
            <div className="h-px w-12 bg-secondary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary font-bold">Tokenization as a Service</span>
          </div>

          <Typography variant="h1" className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.2s] leading-[0.95]">
            <span className="text-white">The Trust Stack for </span>
            <span className="text-secondary">Real World Assets.</span>
          </Typography>

          <Typography variant="p" className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.35s]">
            Institutional-grade protocol for tokenizing, managing, and investing in real-world assets. <span className="text-white font-medium">Transparent. Secure. Liquid.</span>
          </Typography>

          <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.45s]">
            <Link
              href="/dapp/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-secondary text-background font-bold text-sm tracking-wide hover:bg-secondary/90 hover:-translate-y-0.5 transition-all"
            >
              Explore Marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dapp"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-white/70 font-medium text-sm tracking-wide hover:border-white/25 hover:text-white hover:-translate-y-0.5 transition-all"
            >
              Launch Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Access cards */}
      <section className="relative z-10 px-6 pt-8 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">

          {/* Investor Access */}
          <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.55s] hover:border-primary/20 transition-colors duration-300">
            {/* Accent line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/60 to-transparent" />

            <div className="p-8 pl-10 flex flex-col h-full">
              {/* Label row */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Investor Access</span>
                <span className="flex items-center gap-1.5 text-[10px] text-success font-bold uppercase tracking-widest">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-50"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
                  </span>
                  Live
                </span>
              </div>

              {/* Content */}
              <Typography variant="h3" className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">
                Invest in Verified RWA Projects
              </Typography>
              <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed mb-8 max-w-sm">
                Curated real-world asset offerings with Chainlink-verified data. Direct access, instant settlement, transparent yields.
              </Typography>


              <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-white/5">
                <div>
                  <span className="block font-mono text-lg font-bold text-white">$30</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Min. Entry</span>
                </div>
                <div>
                  <span className="block font-mono text-lg font-bold text-white">~8.5%</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Target Yield</span>
                </div>
                <div>
                  <span className="block font-mono text-lg font-bold text-primary">Arbitrum</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">Network</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <Link
                  href="/dapp/projects"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest group-hover:gap-3 transition-all"
                >
                  Explore Marketplace
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tokenization Access */}
          <div className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.65s] hover:border-secondary/20 transition-colors duration-300">
            {/* Accent line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-secondary via-secondary/60 to-transparent" />

            <div className="p-8 pl-10 flex flex-col h-full">
              {/* Label row */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary font-bold">Tokenization Access</span>
                <span className="px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-bold uppercase tracking-widest text-secondary">
                  Inquiry Only
                </span>
              </div>

              {/* Content */}
              <Typography variant="h3" className="text-xl lg:text-2xl font-bold text-white mb-3 tracking-tight">
                Tokenize Your Institutional Assets
              </Typography>
              <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed mb-8 max-w-sm">
                Unlock capital and global markets by digitizing high-value assets using FIDUCCI&apos;s TaaS protocol. Enhanced security, standardized legal framework.
              </Typography>


              <div className="space-y-3 mb-8 pt-6 border-t border-white/5">
                {["SPV structuring & fiduciary trusts", "On-chain registry via IPFS", "Compliant token issuance (ERC-3643)"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-secondary/60 shrink-0" />
                    <span className="text-[12px] text-white/50 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="mailto:inquiry@fiducci.protocol?subject=Asset%20Tokenization%20Inquiry"
                  className="inline-flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-widest group-hover:gap-3 transition-all"
                >
                  Start Inquiry
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-white/15 hidden sm:block">|</span>
                <a
                  href="mailto:demos@fiducci.protocol?subject=Protocol%20Demo%20Request"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/30 uppercase tracking-widest hover:text-white/50 transition-colors"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core pillars */}
      <section id="infrastructure" className="relative z-10 pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 relative">
            <Typography variant="h2" className="text-white mb-4">
              Institutional-Grade <span className="text-secondary">Infrastructure</span>
            </Typography>
            <Typography variant="p" className="text-text-secondary max-w-xl">
              Our protocol is engineered from the ground up to protect your capital. Unbreakable legal backing meets zero-knowledge privacy.
            </Typography>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">

            <GlassCard hover={true} className="lg:col-span-5 group p-8 lg:p-10 transition-all duration-300 opacity-0 animate-fade-in-up stagger-1 border-white/5 flex flex-col h-full bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full bg-primary" />
                <Typography variant="h3" className="text-lg font-bold text-white tracking-tight m-0">Sovereign Compliance Layer</Typography>
              </div>
              <div className="flex-1">
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


            <GlassCard hover={true} className="lg:col-span-7 group p-8 lg:p-10 transition-all duration-300 opacity-0 animate-fade-in-up stagger-2 border-white/5 flex flex-col h-full bg-white/[0.02] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary blur-[60px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-1 h-8 rounded-full bg-secondary" />
                <Typography variant="h3" className="text-lg font-bold text-white tracking-tight m-0">Zero-Knowledge Privacy</Typography>
              </div>
              <div className="flex-1 relative z-10">
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


            <GlassCard hover={true} className="lg:col-span-12 group p-8 lg:p-10 transition-all duration-300 opacity-0 animate-fade-in-up stagger-3 border-white/5 bg-white/[0.02]">
              <div className="lg:flex lg:items-start lg:gap-12">
                <div className="flex items-center gap-3 mb-6 lg:mb-0 lg:shrink-0">
                  <div className="w-1 h-8 rounded-full bg-white/40" />
                  <Typography variant="h3" className="text-lg font-bold text-white tracking-tight m-0">Unbreakable Legal Backing</Typography>
                </div>
                <div className="flex-1">
                  <Typography variant="p" className="text-[13px] text-text-muted leading-relaxed m-0">
                    Code meets contract. Every digital fraction you hold is legally bound to physical real estate through irrevocable Mexican fiduciary trusts, immutably registered on IPFS.
                  </Typography>
                </div>
                <div className="mt-6 lg:mt-0 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-8 flex items-center gap-4 lg:shrink-0">
                  <span className="font-mono text-[10px] uppercase text-white/30 tracking-widest">Asset Registry Ledger</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Onboarding timeline */}
      <section className="relative z-10 py-32 px-6 overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/40 to-background pointer-events-none" />
        <div className="absolute inset-0 blueprint-mask opacity-60 pointer-events-none" />


        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16">
            <Typography variant="h2" className="text-white mb-4">
              Streamlined <span className="text-secondary">Onboarding</span>
            </Typography>
            <Typography variant="p" className="text-text-secondary max-w-xl">
              From fiat capital to tokenized equity in four seamless, secure steps.
            </Typography>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">

            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />


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

      {/* Featured assets */}
      <section id="projects" className="relative z-10 pt-20 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 gap-8">
            <div>
              <span className="badge-blockchain mb-4 inline-flex font-mono uppercase text-[9px] tracking-[0.2em]">
                <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                Live Offerings
              </span>
              <Typography variant="h2" className="text-white mb-4">
                Tokenized <span className="text-secondary">Real Estate</span>
              </Typography>
            </div>
            <Typography variant="p" className="text-text-secondary max-w-sm hidden lg:block">
              Institutional-grade properties, each backed by irrevocable fiduciary trusts and tokenized on Arbitrum.
            </Typography>
          </div>

          <div className="space-y-8">
            {projectsData.map((project) => (
              <Link key={project.id} href={`/dapp/projects/${project.id}`} className="block group">
                <GlassCard hover={true} className="overflow-hidden border-white/5">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto lg:min-h-[380px] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${project.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/50 lg:to-black/90" />

                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-primary/30 text-[10px] uppercase font-bold tracking-widest text-primary">
                          {project.status === 'funding' ? '● Funding Active' : project.status === 'funded' ? '● Funded' : '● Completed'}
                        </span>
                      </div>

                      <div className="absolute bottom-5 left-5 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-white/50" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">{project.location.short}</span>
                      </div>
                    </div>

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
                © 2026 FIDUCCI Protocol. The Trust Stack for Real World Assets.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <a href="https://docs.fiducci.protocol" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
