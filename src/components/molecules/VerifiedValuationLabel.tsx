"use client";

import { BarChart3 } from "lucide-react";

interface VerifiedValuationLabelProps {
    totalValuation: number;
    tokenPrice: number;
    totalSupply?: number;
}

export const VerifiedValuationLabel = ({
    totalValuation,
    tokenPrice,
    totalSupply = 200_000,
}: VerifiedValuationLabelProps) => {
    const formattedValuation = totalValuation.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    const formattedPrice = tokenPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    return (
        <div className="rounded-xl border border-[--color-secondary]/20 bg-[--color-secondary]/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[--color-secondary]" />
                <span className="text-[10px] font-bold text-[--color-secondary] uppercase tracking-widest">
                    Data Source: Chainlink CRE Verified Feed
                </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest block mb-1">
                        Parity Value
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                        {formattedValuation}
                    </span>
                </div>
                <div>
                    <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest block mb-1">
                        Total Supply
                    </span>
                    <span className="text-sm font-mono font-bold text-white">
                        {totalSupply.toLocaleString()} tokens
                    </span>
                </div>
                <div>
                    <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest block mb-1">
                        Price / Token
                    </span>
                    <span className="text-sm font-mono font-bold text-[--color-success]">
                        {formattedPrice}
                    </span>
                </div>
            </div>

            <div className="pt-2 border-t border-white/5">
                <span className="text-[9px] font-mono text-white/20 leading-relaxed block">
                    {formattedValuation} ÷ {totalSupply.toLocaleString()} tokens = {formattedPrice}/token
                </span>
            </div>
        </div>
    );
};
