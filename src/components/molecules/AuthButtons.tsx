"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms";
import Link from "next/link";

export function HeaderAuthButton() {
    const { isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-[120px] h-[40px] animate-pulse rounded-xl bg-white/5" />;

    return isAuthenticated ? (
        <Button variant="secondary" size="md" asChild>
            <Link href="/dashboard" className="text-sm px-5 py-2.5">
                Panel del Inversor
            </Link>
        </Button>
    ) : (
        <Button variant="secondary" size="md" asChild>
            <Link href="/dapp" className="text-sm px-5 py-2.5">
                Launch Portal
            </Link>
        </Button>
    );
}

export function HeroAuthButtons() {
    const { isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.6s]">
            <Button variant="primary" asChild className="group/btn">
                <Link href="/dapp/projects">
                    Explore Assets
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </Button>
            {mounted && isAuthenticated ? (
                <Button variant="secondary" asChild className="group/btn relative overflow-hidden">
                    <Link href="/dashboard">
                        Initialize Dashboard
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            ) : (
                <Button variant="secondary" asChild className="group/btn relative overflow-hidden">
                    <Link href="#connect">
                        Whitepaper
                    </Link>
                </Button>
            )}
        </div>
    );
}
