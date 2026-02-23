"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Typography } from "@/components/atoms/Typography";
import { apiClient } from "@/lib/api/client";
import { Coins, ChevronRight, AlertCircle, ShieldAlert } from "lucide-react";
import { useIsAllowed } from "@/lib/web3/hooks";
import { useAccount } from "@getpara/react-sdk";

interface InvestmentFormProps {
    tokenAddress: string;
    pricePerToken: number;
    onCheckoutReady: (clientSecret: string, operationId: string) => void;
}

export const InvestmentForm = ({ tokenAddress, pricePerToken, onCheckoutReady }: InvestmentFormProps) => {
    const [amount, setAmount] = useState<number | "">("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { embedded } = useAccount();
    const userAddress = embedded?.wallets?.[0]?.address as `0x${string}` | undefined;

    const { data: isAllowed, isLoading: isCheckingKyc } = useIsAllowed(
        tokenAddress as `0x${string}`,
        userAddress as `0x${string}`
    );

    const totalCost = (typeof amount === "number" ? amount : 0) * pricePerToken;

    const handleCheckout = async () => {
        if (isAllowed === false) {
            setError("ACCESS_DENIED: Institutional Identity Verification (KYC) required via Truora Network to proceed with asset acquisition.");
            return;
        }

        if (!amount || amount <= 0) {
            setError("AMOUNT_REQUIRED: Please enter a valid token quantity.");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await apiClient.post("/token-checkout", {
                tokenAddress,
                amount,
            });

            const { operationId, clientSecret } = response.data;
            if (clientSecret && operationId) {
                onCheckoutReady(clientSecret, operationId);
            } else {
                throw new Error("INVALID_SERVER_RESPONSE: SECURE_CHANNEL_ERROR");
            }
        } catch (err: any) {
            console.error("Checkout Error:", err);
            setError(err?.response?.data?.message || err?.message || "CHECKOUT_INITIALIZATION_FAILED: Try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-white/20" />
                    <Typography variant="subtitle" className="text-white text-[10px] font-black uppercase tracking-widest">
                        Investment_Configuration
                    </Typography>
                </div>
                <Typography variant="caption" className="text-white/40 block font-mono text-[10px]">
                    Current Evaluation: <span className="text-white font-bold">${pricePerToken.toLocaleString('en-US')} MXN</span> per equity fraction.
                </Typography>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[--rebeka-primary] to-[--rebeka-primary-dim] rounded-xl blur opacity-10 group-focus-within:opacity-30 transition-opacity" />
                    <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="ENTER_TOKEN_AMOUNT"
                        value={amount}
                        className="bg-black/40 border-white/10 text-white font-mono placeholder:text-white/10 relative z-10 h-14"
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setAmount(isNaN(val) ? "" : val);
                            setError(null);
                        }}
                        error={error || undefined}
                    />
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block mb-1">Estimated Commitment</span>
                        <Typography variant="h3" className="text-white font-mono tracking-tighter leading-none">
                            ${totalCost.toLocaleString('en-US')} <span className="text-[10px] text-white/20 font-sans font-medium uppercase ml-1">MXN</span>
                        </Typography>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-white/20" />
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <Typography variant="caption" className="text-red-400 font-mono text-[9px] uppercase leading-tight">
                        [ERROR_LOG]: {error}
                    </Typography>
                </div>
            )}

            <button
                onClick={handleCheckout}
                disabled={!amount || amount <= 0 || isLoading || isCheckingKyc}
                className={`w-full group/btn relative h-16 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_10px_40px_rgba(255,255,255,0.1)] ${isAllowed === false ? 'bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20' : 'bg-white text-black hover:bg-[--rebeka-primary]'}`}
            >
                {isLoading ? (
                    "PROVISIONING_ORDER..."
                ) : isCheckingKyc ? (
                    "VERIFYING_WHITELIST..."
                ) : isAllowed === false ? (
                    <>
                        <ShieldAlert className="w-4 h-4" />
                        KYC_REQUIRED
                    </>
                ) : (
                    <>
                        Initialize Secure Checkout
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">
                <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-[--rebeka-primary]" /> AES_256</span>
                <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-[--rebeka-primary]" /> SECURE_LEDGER</span>
            </div>
        </div>
    );
};
