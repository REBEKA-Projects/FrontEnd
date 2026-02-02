export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] animate-float" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.1)_0%,transparent_70%)] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.1)_0%,transparent_70%)] animate-float" style={{ animationDelay: '-5s' }} />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#22d3ee] flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">REBEKA</span>
          </div>

          <button className="btn-secondary text-sm px-5 py-2.5">
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 flex items-center justify-center" style={{ height: 'calc(100vh - 140px)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up">
            <span className="text-white">Tokenized</span>
            <br />
            <span className="gradient-text animate-gradient">Real Estate</span>
          </h1>

          <p className="text-lg md:text-xl text-[--text-secondary] max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up stagger-1">
            Bridging institutional real estate with on-chain liquidity.
            Fractional investment in premium assets through the REBEKA Protocol.
          </p>

          <div className="opacity-0 animate-fade-in-up stagger-2">
            <button className="btn-primary">
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-[--text-secondary]">
          © 2026 REBEKA Protocol
        </div>
      </footer>
    </div>
  );
}
