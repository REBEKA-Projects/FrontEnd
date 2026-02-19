import { Header } from '@/components/Header';
import { PropertyCard } from '@/components/PropertyCard';
import { GlassCard } from '@/components/GlassCard';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(40,160,240,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      <Header />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-in-up">
            <span className="badge-fiduciary mb-6 inline-flex">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Legal Certainty On-Chain
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 opacity-0 animate-fade-in-up delay-100">
            <span className="text-white">Real Estate</span>
            <br />
            <span className="text-gradient-primary">Tokenized</span>
          </h1>

          <p className="text-lg md:text-xl text-[--rebeka-text-secondary] max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up delay-200">
            Fractional investment in premium real estate assets backed by
            <span className="text-[--rebeka-secondary]"> Irrevocable Trust</span> and
            on-chain liquidity on <span className="text-[--rebeka-primary]">Arbitrum</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up delay-300">
            <a href="#projects" className="btn-primary">
              Explore Projects
            </a>
            <button className="btn-secondary">
              Whitepaper
            </button>
          </div>

        </div>
      </section>

      <section id="legal" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
              Institutional <span className="text-gradient-secondary">Legal Framework</span>
            </h2>
            <p className="text-[--rebeka-text-secondary] max-w-2xl mx-auto">
              Every asset in REBEKA is backed by a fiduciary structure that guarantees
              asset protection and operational transparency.
            </p>
          </div>


          <div className="space-y-4">
            <div className="group flex items-center gap-6 p-6 bg-[#12131A] rounded-2xl border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-300 opacity-0 animate-fade-in-up stagger-1">
              <span className="text-[--rebeka-text-muted] font-mono text-sm shrink-0">01</span>
              <div className="w-10 h-10 rounded-lg bg-[--rebeka-primary-dim] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[--rebeka-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-1">Irrevocable Trust</h3>
                <p className="text-sm text-[--rebeka-text-muted] font-light">
                  Legal structure that permanently protects assets, preventing unilateral modifications.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-6 p-6 bg-[#12131A] rounded-2xl border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-300 opacity-0 animate-fade-in-up stagger-2">
              <span className="text-[--rebeka-text-muted] font-mono text-sm shrink-0">02</span>
              <div className="w-10 h-10 rounded-lg bg-[--rebeka-primary-dim] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[--rebeka-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-1">Arbitrum Stylus</h3>
                <p className="text-sm text-[--rebeka-text-muted] font-light">
                  High-performance smart contracts with minimal gas costs and Ethereum L1 security.
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-6 p-6 bg-[#12131A] rounded-2xl border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-300 opacity-0 animate-fade-in-up stagger-3">
              <span className="text-[--rebeka-text-muted] font-mono text-sm shrink-0">03</span>
              <div className="w-10 h-10 rounded-lg bg-[--rebeka-primary-dim] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[--rebeka-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-1">Full Transparency</h3>
                <p className="text-sm text-[--rebeka-text-muted] font-light">
                  Immutable on-chain records of all transactions, valuations and yield distributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="badge-blockchain mb-4 inline-flex">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Genesis Project
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
              Asset <span className="text-gradient-primary">Marketplace</span>
            </h2>
            <p className="text-[--rebeka-text-secondary] max-w-2xl">
              Access tokenized real estate investment opportunities with
              legal backing and instant liquidity.
            </p>
          </div>

          <PropertyCard
            name="Génesis Puebla"
            location="Puebla, Mexico"
            type="Mixed Urban Development — Residential, Commercial & Services"
            metrics={[
              { value: '200,000', label: 'Square Meters', mono: true },
              { value: '$30', label: 'USD / Token', mono: true },
              { value: '6,666,666', label: 'Token Supply', mono: true },
            ]}
            fiduciaryStatus="Irrevocable Trust"
            tokenSymbol="GPUE"
            contractAddress="0x...Arbitrum Stylus"
          />

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <GlassCard className="p-6" hover={false}>
              <h4 className="text-sm font-semibold text-[--rebeka-text-muted] uppercase tracking-wider mb-4">
                Legal Structure
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-secondary] mt-2 shrink-0" />
                  <span className="text-[--rebeka-text-secondary]">
                    <span className="text-white font-medium">Settlor:</span> Original Developer
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-secondary] mt-2 shrink-0" />
                  <span className="text-[--rebeka-text-secondary]">
                    <span className="text-white font-medium">Trustee:</span> Regulated Banking Institution
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-secondary] mt-2 shrink-0" />
                  <span className="text-[--rebeka-text-secondary]">
                    <span className="text-white font-medium">Beneficiaries:</span> $GPUE Token Holders
                  </span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h4 className="text-sm font-semibold text-[--rebeka-text-muted] uppercase tracking-wider mb-4">
                Technology
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-primary] mt-2 shrink-0" />
                  <span className="text-[--rebeka-text-secondary]">
                    <span className="text-white font-medium">Network:</span> Arbitrum One (Layer 2)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-primary] mt-2 shrink-0" />
                  <span className="text-[--rebeka-text-secondary]">
                    <span className="text-white font-medium">Contracts:</span> Stylus (Rust/WASM)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-primary] mt-2 shrink-0" />
                  <span className="text-[--rebeka-text-secondary]">
                    <span className="text-white font-medium">Standard:</span> ERC-1155 Multi-Asset
                  </span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <section id="connect" className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <GlassCard className="p-8 md:p-12" hover={false}>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[--rebeka-primary] to-[#60CFFF] flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-4">
              Start Investing
            </h2>
            <p className="text-[--rebeka-text-secondary] mb-8">
              Access the tokenized asset marketplace
              and participate in exclusive opportunities.
            </p>
            <div className="flex flex-col gap-4">
              <a href="/dapp" className="btn-gold w-full text-center">
                Go to dApp
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-[--rebeka-text-muted]">
                <div className="w-2 h-2 rounded-full bg-[--rebeka-primary] animate-pulse" />
                <span>Arbitrum Network</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <footer className="relative z-10 py-12 px-6 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[--rebeka-primary] to-[#60CFFF] flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-sm text-[--rebeka-text-muted]">
                © 2026 REBEKA Protocol. Real Estate Blockchain Ekosystem Arbitrum.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[--rebeka-text-muted]">
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
