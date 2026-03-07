"use client";

import { useState } from "react";
import { Typography, GlassCard } from "@/components/atoms";
import { X, CreditCard, Wallet, Loader2, CheckCircle2, ShoppingCart } from "lucide-react";

interface BuyTokenModalProps {
    projectTitle: string;
    tokenTicker: string;
    pricePerToken: number;
    onClose: () => void;
    onSuccess: () => void;
}

export const BuyTokenModal = ({
    projectTitle,
    tokenTicker,
    pricePerToken,
    onClose,
    onSuccess,
}: BuyTokenModalProps) => {
    const [quantity, setQuantity] = useState<string>("100");
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'usdc' | null>(null);
    const [phase, setPhase] = useState<'input' | 'confirming' | 'success'>('input');

    const numericQuantity = parseInt(quantity) || 0;
    const total = numericQuantity * pricePerToken;

    const formattedTotal = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    const handlePay = (method: 'card' | 'usdc') => {
        setPaymentMethod(method);
        setPhase('confirming');

        // Simulate payment processing
        setTimeout(() => {
            setPhase('success');
        }, 2500);
    };

    const handleDone = () => {
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={onClose} />

            <div className="relative w-full max-w-lg animate-fade-in-up">
                <GlassCard className="p-8 border-white/10 relative overflow-hidden" hover={false}>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all z-20"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {phase === 'success' ? (
                        /* ═══ SUCCESS STATE ═══ */
                        <div className="flex flex-col items-center text-center py-8 space-y-6 animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-[--color-success]/15 border border-[--color-success]/30 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-[--color-success]" />
                            </div>
                            <div>
                                <Typography variant="h3" className="text-white font-bold mb-2">
                                    Payment Confirmed
                                </Typography>
                                <Typography variant="p" className="text-white/50 text-sm">
                                    {numericQuantity.toLocaleString()} {tokenTicker} tokens acquired for {formattedTotal}
                                </Typography>
                            </div>
                            <div className="w-full p-4 bg-[--color-success]/5 border border-[--color-success]/15 rounded-xl font-mono text-[11px] text-[--color-success]/70 space-y-1">
                                <div>&gt; Transaction signed and verified</div>
                                <div>&gt; Tokens minted to wallet: 0x7a3f...e29b</div>
                                <div>&gt; Portfolio updated successfully ✓</div>
                            </div>
                            <button
                                onClick={handleDone}
                                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-[--color-success] transition-all"
                            >
                                View Portfolio →
                            </button>
                        </div>
                    ) : phase === 'confirming' ? (
                        /* ═══ CONFIRMING STATE ═══ */
                        <div className="flex flex-col items-center text-center py-12 space-y-6 animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center relative">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-20 animate-pulse" />
                            </div>
                            <div>
                                <Typography variant="h3" className="text-white font-bold mb-2">
                                    {paymentMethod === 'usdc' ? 'Awaiting Wallet Signature...' : 'Processing Payment...'}
                                </Typography>
                                <Typography variant="p" className="text-white/40 text-sm font-mono">
                                    {formattedTotal} • {numericQuantity.toLocaleString()} tokens
                                </Typography>
                            </div>
                            <div className="w-full p-3 bg-primary/5 border border-primary/15 rounded-xl">
                                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-widest animate-pulse">
                                    {paymentMethod === 'usdc'
                                        ? 'Confirm the transaction in your wallet...'
                                        : 'Processing credit card payment via Stripe...'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        /* ═══ INPUT STATE ═══ */
                        <>
                            <div className="mb-8 pb-6 border-b border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                        <ShoppingCart className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <Typography variant="h3" className="text-white font-bold text-lg m-0">
                                            Buy <span className="text-primary">{tokenTicker}</span> Tokens
                                        </Typography>
                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                                            {projectTitle}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Input */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                                        Token Quantity
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            min="1"
                                            className="w-full h-16 px-5 rounded-2xl bg-black/60 border border-white/10 text-2xl font-mono font-bold text-white text-right focus:outline-none focus:border-primary/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="0"
                                        />
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-white/20 uppercase tracking-widest">
                                            {tokenTicker}
                                        </span>
                                    </div>
                                </div>

                                {/* Price Summary */}
                                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40">Price per token</span>
                                        <span className="text-sm font-mono font-bold text-white">
                                            ${pricePerToken.toFixed(2)} USD
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-white/40">Quantity</span>
                                        <span className="text-sm font-mono font-bold text-white">
                                            × {numericQuantity.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                                        <span className="text-sm font-bold text-white uppercase tracking-wider">Total</span>
                                        <span className="text-2xl font-mono font-black text-[--color-success]">
                                            {formattedTotal}
                                        </span>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                        Payment Method
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handlePay('card')}
                                            disabled={numericQuantity <= 0}
                                            className="group flex flex-col items-center gap-2 p-5 rounded-xl border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <CreditCard className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
                                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                                                Credit Card
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handlePay('usdc')}
                                            disabled={numericQuantity <= 0}
                                            className="group flex flex-col items-center gap-2 p-5 rounded-xl border border-white/10 hover:border-[--color-success]/40 hover:bg-[--color-success]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <Wallet className="w-6 h-6 text-white/40 group-hover:text-[--color-success] transition-colors" />
                                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                                                USDC / Arbitrum
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};
