export default function DashboardLoading() {
    return (
        <div className="space-y-12 animate-fade-in">
            {/* Header skeleton */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-white/5 pb-10">
                <div className="space-y-4">
                    <div className="h-12 w-80 bg-white/5 rounded-xl animate-pulse" />
                    <div className="h-6 w-48 bg-white/5 rounded-full animate-pulse" />
                </div>
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-12">
                    {/* KYC Status skeleton */}
                    <div className="h-24 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
                    {/* Portfolio skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 w-40 bg-white/5 rounded-lg animate-pulse" />
                        <div className="h-64 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
                    </div>
                </div>
                <aside className="lg:col-span-4">
                    <div className="h-96 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
                </aside>
            </div>
        </div>
    );
}
