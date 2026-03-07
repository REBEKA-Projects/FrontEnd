export default function ProjectDetailLoading() {
    return (
        <div className="relative min-h-screen bg-blueprint">
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-40 z-0" />

            {/* Hero skeleton */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-black/50 animate-pulse">
                <div className="absolute bottom-0 w-full px-6 py-16">
                    <div className="max-w-6xl mx-auto space-y-4">
                        <div className="h-8 w-40 bg-white/5 rounded-full" />
                        <div className="h-16 w-[60%] bg-white/5 rounded-xl" />
                        <div className="flex gap-6">
                            <div className="h-5 w-32 bg-white/5 rounded" />
                            <div className="h-5 w-32 bg-white/5 rounded" />
                            <div className="h-5 w-32 bg-white/5 rounded" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics bar skeleton */}
            <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-20 bg-white/5 rounded" />
                            <div className="h-8 w-28 bg-white/5 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Content skeleton */}
            <div className="max-w-6xl mx-auto px-6 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-16">
                    <div className="h-64 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
                    <div className="h-48 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
                </div>
                <div className="lg:col-span-4">
                    <div className="h-96 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse sticky top-24" />
                </div>
            </div>
        </div>
    );
}
