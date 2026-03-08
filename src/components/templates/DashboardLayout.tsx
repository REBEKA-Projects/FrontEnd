"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex h-screen pt-20 bg-blueprint text-[--rebeka-text-primary] selection:bg-[--rebeka-primary] selection:text-white overflow-hidden relative">
            {/* Structural Blueprint Grid Layers */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-50 z-0" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-40 z-0" />

            {/* Dynamic Asymmetric Light Blows */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[--rebeka-primary] blur-[120px] opacity-[0.02] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-[--rebeka-secondary] blur-[100px] opacity-[0.02] pointer-events-none z-0" />

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10 w-full overflow-hidden">


                {/* SCROLLABLE VIEWPORT */}
                <main className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-10">
                    <div className="max-w-[1400px] mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_forwards] pb-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
