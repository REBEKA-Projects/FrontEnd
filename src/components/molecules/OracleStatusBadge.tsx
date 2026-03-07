"use client";

import { ShieldCheck } from "lucide-react";
import type { OracleVerification } from "@/lib/chainlink-mock-data";

interface OracleStatusBadgeProps {
    oracle: OracleVerification;
}

export const OracleStatusBadge = ({ oracle }: OracleStatusBadgeProps) => {
    const statusColor = oracle.status === 'VERIFIED'
        ? 'border-[--color-success]/30 bg-[--color-success]/10'
        : 'border-[--color-secondary]/30 bg-[--color-secondary]/10';

    const statusTextColor = oracle.status === 'VERIFIED'
        ? 'text-[--color-success]'
        : 'text-[--color-secondary]';

    const formattedDate = new Date(oracle.lastUpdate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return (
        <div className={`rounded-xl border ${statusColor} p-5 space-y-3`}>
            {/* Status Row */}
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${oracle.status === 'VERIFIED' ? 'bg-[--color-success]/15' : 'bg-[--color-secondary]/15'}`}>
                    <ShieldCheck className={`w-5 h-5 ${statusTextColor}`} />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-black uppercase tracking-wider ${statusTextColor}`}>
                            On-Chain Asset Valuation: {oracle.status}
                        </span>
                        {oracle.status === 'VERIFIED' && (
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--color-success] opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[--color-success]" />
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-mono text-white/30 tracking-wider block mt-0.5">
                        Workflow: {oracle.workflowId}
                    </span>
                </div>
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/5">
                <div>
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block mb-1">Last Update</span>
                    <span className="text-xs font-mono text-white/60">{formattedDate}</span>
                </div>
                <div>
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block mb-1">Source</span>
                    <span className="text-xs text-white/60 leading-tight block">{oracle.source}</span>
                </div>
            </div>
        </div>
    );
};
