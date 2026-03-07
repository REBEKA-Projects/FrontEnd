import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-blueprint flex items-center justify-center px-6">
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40" />

            <div className="relative z-10 max-w-md w-full text-center space-y-8">
                {/* 404 Display */}
                <div className="relative">
                    <span className="font-mono text-[120px] md:text-[160px] font-bold leading-none tracking-tighter text-white/[0.03]">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="font-heading text-2xl font-bold text-white tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        The asset or page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-[#6B8AFF] text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(55,91,210,0.4)] hover:-translate-y-0.5 transition-all"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/dapp/projects"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-white/10 text-white/60 font-bold text-sm uppercase tracking-widest hover:bg-white/5 hover:-translate-y-0.5 transition-all"
                    >
                        Marketplace
                    </Link>
                </div>

                <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
                    FIDUCCI Protocol
                </p>
            </div>
        </div>
    );
}
