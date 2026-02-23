"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Typography } from "@/components/atoms/Typography";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            const timer = setTimeout(() => {
                router.push("/");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#07080C] noise">
                <div className="text-center space-y-8">
                    <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto" />
                    <div className="space-y-3">
                        <Typography variant="h4" className="text-white font-bold tracking-tight uppercase">Secure Login</Typography>
                        <Typography variant="caption" className="text-white/30 block tracking-widest text-[9px] uppercase font-bold">Verifying Credentials</Typography>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
