"use client";

import { DashboardTabs } from "@/components/organisms";
import { Typography } from "@/components/atoms";
import { Shield } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* DASHBOARD HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4">
                <div>
                    <Typography variant="h1" className="text-white font-bold text-4xl lg:text-5xl tracking-tighter leading-none mb-4 uppercase">
                        Investor <span className="text-secondary">Overview</span>
                    </Typography>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] w-fit">
                        <Shield className="w-3 h-3 text-[--rebeka-secondary]" />
                        <span className="text-[8px] font-black text-[--rebeka-secondary] uppercase tracking-[0.2em]">Privacy Secured by FHE</span>
                    </div>
                </div>
            </div>

            {/* TABS CONTAINER */}
            <div className="w-full">
                <DashboardTabs />
            </div>
        </div>
    );
}

