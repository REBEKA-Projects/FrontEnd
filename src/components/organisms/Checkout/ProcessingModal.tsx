"use client";

import { useEffect, useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Loader2, CheckCircle2, AlertCircle, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import { GlassCard } from "@/components/GlassCard";

interface ProcessingModalProps {
    operationId: string;
    onClose: () => void;
    onSuccess: () => void;
}

type OperationStatus = 'PAID' | 'MINTING' | 'MINTED' | 'FAILED';

export const ProcessingModal = ({ operationId, onClose, onSuccess }: ProcessingModalProps) => {
    const [status, setStatus] = useState<OperationStatus>('PAID');
    const [isPolling, setIsPolling] = useState(true);
    const { refetch } = useUserData();

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const checkStatus = async () => {
            try {
                const res = await refetch();
                const operations = res.data?.operations || [];
                const targetOp = operations.find(o => o.id === operationId);

                if (targetOp) {
                    const currentStatus = targetOp.status as OperationStatus;
                    setStatus(currentStatus);

                    if (currentStatus === 'MINTED' || currentStatus === 'FAILED') {
                        setIsPolling(false);
                        clearInterval(interval);
                    }
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        };

        if (isPolling) {
            checkStatus();
            interval = setInterval(checkStatus, 3000);
        }

        return () => clearInterval(interval);
    }, [operationId, isPolling, refetch]);

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-fade-in" />

            <div className="relative w-full max-w-md animate-fade-in-up">
                <GlassCard className="p-10 border-white/10 text-center space-y-8 overflow-hidden" hover={false}>
                    {isPolling && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[--rebeka-primary] to-transparent animate-scan" />
                    )}

                    {isPolling && (
                        <div className="space-y-8 py-6">
                            <div className="relative mx-auto w-24 h-24">
                                <div className="absolute inset-0 rounded-3xl bg-[--rebeka-primary] blur-2xl opacity-10 animate-pulse" />
                                <div className="relative w-full h-full rounded-3xl bg-black/40 border border-white/5 flex items-center justify-center">
                                    <Cpu className="w-10 h-10 text-[--rebeka-primary] animate-pulse" />
                                </div>
                                <Loader2 className="absolute -bottom-2 -right-2 w-8 h-8 text-[--rebeka-primary-glow] animate-spin bg-black rounded-full p-1" />
                            </div>

                            <div className="space-y-3">
                                <Typography variant="h3" className="text-white font-black italic uppercase tracking-widest">
                                    Minting_<span className="text-gradient-primary">Asset</span>
                                </Typography>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[--rebeka-success] animate-pulse" />
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Awaiting_L2_Finality</span>
                                    </div>
                                    <Typography variant="p" className="text-white/30 text-xs leading-relaxed max-w-xs mx-auto font-medium italic">
                                        [LOG]: Synchronizing institutional ledger. Proprietary FHE adapter generating proof...
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isPolling && status === 'MINTED' && (
                        <div className="space-y-8 py-6 animate-fade-in">
                            <div className="relative mx-auto w-24 h-24">
                                <div className="absolute inset-0 rounded-3xl bg-[--rebeka-success] blur-3xl opacity-20" />
                                <div className="relative w-full h-full rounded-3xl bg-[--rebeka-success-dim] border border-[--rebeka-success] flex items-center justify-center">
                                    <CheckCircle2 className="w-12 h-12 text-[--rebeka-success]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Typography variant="h3" className="text-white font-black italic uppercase tracking-widest">
                                    Issuance_<span className="text-[--rebeka-success]">Verified</span>
                                </Typography>
                                <Typography variant="p" className="text-white/40 text-[11px] leading-relaxed max-w-xs mx-auto font-medium">
                                    Equity fractions have been successfully allocated to your institutional wallet. Legal backing finalized on-chain.
                                </Typography>
                            </div>

                            <button
                                onClick={onSuccess}
                                className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-3"
                            >
                                Enter Vault Dashboard
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {!isPolling && status === 'FAILED' && (
                        <div className="space-y-8 py-6 animate-fade-in">
                            <div className="relative mx-auto w-24 h-24">
                                <div className="absolute inset-0 rounded-3xl bg-red-500 blur-3xl opacity-10" />
                                <div className="relative w-full h-full rounded-3xl bg-red-500/10 border border-red-500 flex items-center justify-center">
                                    <AlertCircle className="w-12 h-12 text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Typography variant="h3" className="text-red-500 font-black italic uppercase tracking-widest">
                                    Ledger_<span className="text-white">Conflict</span>
                                </Typography>
                                <Typography variant="p" className="text-white/40 text-[11px] leading-relaxed max-w-xs mx-auto font-medium">
                                    Fiduciary payment confirmed, but on-chain issuance encountered an error. Our institutional desk will reach out for immediate reconciliation.
                                </Typography>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                            >
                                Dismiss Alert
                            </button>
                        </div>
                    )}

                    <div className="pt-6 border-t border-white/5">
                        <div className="flex items-center justify-center gap-4 text-[8px] font-black text-white/5 uppercase tracking-[0.4em]">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-2 h-2" /> ARBITRUM_L2_SECURE</span>
                            <span className="flex items-center gap-1"><ShieldCheck className="w-2 h-2" /> REBEKA_FHE_PROTOCOL</span>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
