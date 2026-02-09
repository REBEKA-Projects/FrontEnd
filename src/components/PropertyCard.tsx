interface PropertyMetric {
    value: string;
    label: string;
    mono?: boolean;
}

interface PropertyCardProps {
    name: string;
    location: string;
    type: string;
    metrics: PropertyMetric[];
    fiduciaryStatus: string;
    tokenSymbol: string;
    contractAddress?: string;
}

export function PropertyCard({
    name,
    location,
    type,
    metrics,
    fiduciaryStatus,
    tokenSymbol,
    contractAddress,
}: PropertyCardProps) {
    return (
        <div className="glass-card-static p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{name}</h3>
                    <p className="text-[--rebeka-text-secondary] text-sm">{location}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="badge-fiduciary">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {fiduciaryStatus}
                    </span>
                    <span className="badge-blockchain">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Arbitrum
                    </span>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4 border border-[rgba(255,255,255,0.05)]"
                    >
                        <div className={`metric-value ${metric.mono ? 'font-mono' : ''}`}>
                            {metric.value}
                        </div>
                        <div className="metric-label mt-1">{metric.label}</div>
                    </div>
                ))}
            </div>

            {/* Token Info */}
            <div className="border-t border-[rgba(255,255,255,0.08)] pt-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <span className="metric-label">Token</span>
                        <span className="font-mono text-lg text-white ml-2">${tokenSymbol}</span>
                    </div>
                    {contractAddress && (
                        <div className="hash-display text-xs md:text-sm truncate max-w-full md:max-w-[280px]">
                            {contractAddress}
                        </div>
                    )}
                </div>
            </div>

            {/* Property Type */}
            <div className="mt-4 text-sm text-[--rebeka-text-muted]">
                {type}
            </div>
        </div>
    );
}
