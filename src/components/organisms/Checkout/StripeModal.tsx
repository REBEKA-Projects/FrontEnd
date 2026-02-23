"use client";

import { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Typography } from "@/components/atoms/Typography";
import { GlassCard } from "@/components/GlassCard";
import { Lock, X, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'Payment failed.');
            setIsProcessing(false);
        } else {
            setIsProcessing(false);
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 shadow-inner">
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <Typography variant="caption" className="text-red-400 font-mono text-[9px] uppercase">
                        [STRIPE_ERROR]: {errorMessage}
                    </Typography>
                </div>
            )}

            <button
                type="submit"
                disabled={isProcessing || !stripe || !elements}
                className="w-full group/btn relative h-16 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-[--rebeka-primary] transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
            >
                {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <Lock className="w-4 h-4" />
                        Execute Fiduciary Payment
                    </>
                )}
            </button>
        </form>
    );
};

export const StripeModal = ({
    clientSecret,
    onSuccess,
    onCancel
}: {
    clientSecret: string;
    onSuccess: () => void;
    onCancel: () => void;
}) => {
    const options = {
        clientSecret,
        appearance: {
            theme: 'night' as const,
            variables: {
                colorPrimary: '#28A0F0',
                colorBackground: '#07080C',
                colorText: '#ffffff',
                colorDanger: '#ef4444',
                fontFamily: 'var(--font-mono), monospace',
                spacingUnit: '4px',
                borderRadius: '12px',
            },
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={onCancel} />

            <div className="relative w-full max-w-lg lg:max-w-xl animate-fade-in-up">
                <GlassCard className="p-8 border-white/10 relative overflow-hidden" hover={false}>
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[--rebeka-primary-dim] border border-[--rebeka-primary-glow]">
                                <ShieldCheck className="w-5 h-5 text-[--rebeka-primary]" />
                            </div>
                            <div>
                                <Typography variant="h4" className="text-white font-black italic uppercase tracking-tighter leading-none">
                                    Secure <span className="text-gradient-primary">Gateway</span>
                                </Typography>
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1 block">Fiduciary_Payment_Protocol</span>
                            </div>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm onSuccess={onSuccess} />
                    </Elements>

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-center gap-8 opacity-20 grayscale">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 invert" />
                        <div className="flex items-center gap-1 font-mono text-[9px] font-black text-white uppercase tracking-widest">
                            PCI_DSS_LEVEL_1
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};
