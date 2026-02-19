export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 opacity-0 animate-fade-in">
            <nav className="glass-panel px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--rebeka-primary] to-[#60CFFF] flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-white">REBEKA</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#projects" className="text-sm text-[--rebeka-text-secondary] hover:text-white transition-colors">
                            Projects
                        </a>
                        <a href="#legal" className="text-sm text-[--rebeka-text-secondary] hover:text-white transition-colors">
                            Legal Framework
                        </a>
                        <a href="#connect" className="text-sm text-[--rebeka-text-secondary] hover:text-white transition-colors">
                            Technology
                        </a>
                    </div>

                    <a href="/dapp" className="btn-secondary text-sm px-5 py-2.5">
                        Go to dApp
                    </a>
                </div>
            </nav>
        </header>
    );
}
