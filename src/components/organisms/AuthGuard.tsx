"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/atoms";
import { ParaLogin } from "@/components/organisms/Auth/ParaLogin";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        // We no longer forcefully redirect to Home.
        // If not authenticated, the user remains on the route but sees the blocked AuthGuard state below.
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blueprint text-foreground noise relative overflow-hidden">
                {/* Background FX */}
                <div className="absolute inset-0 bg-blueprint-fade opacity-50 z-0 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[80vw] max-h-[600px] bg-[--rebeka-primary] blur-[150px] opacity-[0.03] z-0 pointer-events-none" />

                <div className="relative z-10 w-full max-w-md">
                    {/* Injecting the Production PARA Login Flow */}
                    <ParaLogin />

                    <div className="mt-6 text-center">
                        <Typography variant="p" className="text-white/40 text-xs leading-relaxed max-w-sm mx-auto">
                            The Institutional Dashboard requires a secure, encrypted wallet signature via Para Protocol to verify investor credentials.
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }

    return children as React.ReactElement;
}
