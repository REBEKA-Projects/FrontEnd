"use client";

import { Typography, GlassCard } from "@/components/atoms";
import { OracleStatusBadge, AuditLogTerminal, VerifiedValuationLabel } from "@/components/molecules";
import type { OracleVerification, AuditLogEntry } from "@/lib/chainlink-mock-data";
import { Link2 } from "lucide-react";

interface ChainlinkVerificationPanelProps {
    oracleData: OracleVerification;
    auditLogs: AuditLogEntry[];
    tokenPrice: number;
    totalValuation: number;
    totalSupply?: number;
    autoPlay?: boolean;
}

export const ChainlinkVerificationPanel = ({
    oracleData,
    auditLogs,
    tokenPrice,
    totalValuation,
    totalSupply = 200_000,
    autoPlay = true,
}: ChainlinkVerificationPanelProps) => {
    return (
        <section className="space-y-6 opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.5s]">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[--rebeka-primary-dim] border border-[--rebeka-primary-glow] flex items-center justify-center">
                    <Link2 className="w-4 h-4 text-[--rebeka-primary]" />
                </div>
                <div>
                    <Typography variant="h2" className="text-xl font-bold text-white m-0 tracking-tight">
                        Chainlink Trust Verification
                    </Typography>
                    <span className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.2em]">
                        Proof of Value — CRE Runtime
                    </span>
                </div>
            </div>

            <GlassCard className="p-6 space-y-6 border-white/5" hover={false}>
                {/* Oracle Status Badge */}
                <OracleStatusBadge oracle={oracleData} />

                {/* Audit Log Terminal */}
                <AuditLogTerminal
                    logs={auditLogs}
                    autoPlay={autoPlay}
                    intervalMs={400}
                />

                {/* Verified Valuation Label */}
                <VerifiedValuationLabel
                    totalValuation={totalValuation}
                    tokenPrice={tokenPrice}
                    totalSupply={totalSupply}
                />

                {/* TX Hash link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                        Arbitrum TX: <span className="text-white/40">{oracleData.txHash}</span>
                    </span>
                    <a
                        href={`https://sepolia.arbiscan.io/tx/${oracleData.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[9px] font-black text-[--rebeka-primary] uppercase tracking-widest hover:text-white hover:drop-shadow-[0_0_8px_var(--rebeka-primary-dim)] transition-all"
                    >
                        View on Explorer →
                    </a>
                </div>
            </GlassCard>
        </section>
    );
};
