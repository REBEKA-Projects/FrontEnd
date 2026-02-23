"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserData } from "@/hooks/useUserData";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { ShieldCheck, Clock, ShieldAlert, ArrowRight, Fingerprint } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { apiClient } from "@/lib/api/client";

export const InvestorStatus = () => {
    const { kycStatus } = useAuthStore();
    const { data: userData, refetch } = useUserData();
    const [isVerifying, setIsVerifying] = useState(false);

    const handleStartVerification = async () => {
        setIsVerifying(true);
        try {
            const userId = userData?.user?.id;

            if (!userId) {
                console.error("User identifier not found");
                setIsVerifying(false);
                return;
            }

            await apiClient.post('/kyc/start', { userId });
            await refetch();

            setIsVerifying(false);
        } catch (error) {
            console.error("KYC verification error:", error);
            setIsVerifying(false);
        }
    };

    const isApproved = kycStatus === 'APPROVED';

    return (
        <div className="relative isolate group">
            {!isApproved && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[--rebeka-secondary] to-[--rebeka-primary] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            )}

            <GlassCard className="p-6 overflow-visible border-white/5" hover={false}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative shrink-0">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${isApproved ? 'bg-[--rebeka-secondary-dim] border-[--rebeka-secondary-glow]' : 'bg-red-500/5 border-red-500/20'}`}>
                            {isApproved ? (
                                <ShieldCheck className="w-8 h-8 text-[--rebeka-secondary]" />
                            ) : (
                                <Fingerprint className="w-8 h-8 text-[--rebeka-text-muted]" />
                            )}
                        </div>
                        {isApproved && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[--rebeka-success] rounded-full border-2 border-black flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                            <Typography variant="h4" className="text-white italic font-bold uppercase tracking-tight">
                                {isApproved ? "Institutional Identity Verified" : "Identity Verification Required"}
                            </Typography>
                        </div>
                        <Typography variant="p" className="text-[12px] text-[--rebeka-text-secondary] leading-relaxed max-w-2xl font-medium">
                            {isApproved
                                ? "Compliance check succeeded. Your account is now whitelisted for primary and secondary market operations in the Rebeka RWA ecosystem."
                                : "Your institutional identity must be verified via Truora Network to enable token acquisition and settlement features."}
                        </Typography>
                    </div>

                    {!isApproved && (
                        <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                            <Button
                                variant="primary"
                                onClick={handleStartVerification}
                                isLoading={isVerifying}
                                className="w-full md:w-auto btn-gold group/btn !py-3 !px-6"
                            >
                                <span className="flex items-center gap-3">
                                    Authenticate Identity
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </div>
                    )}

                    {isApproved && (
                        <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-8 shrink-0">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Linked Node</span>
                                <span className="text-xs font-mono text-white/60">TRUORA-KYC-03</span>
                            </div>
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
    );
};
