export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing logo mark */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-surface to-surface-elevated border border-white/10 flex items-center justify-center shadow-2xl">
            <span className="font-heading text-2xl font-bold text-primary tracking-tighter">F</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Loading</span>
          <div className="w-24 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-primary to-primary/50 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
