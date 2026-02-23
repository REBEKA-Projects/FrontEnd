"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export function HeaderAuthButton() {
    const { isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-[120px] h-[40px] animate-pulse rounded-xl bg-white/5" />;

    return isAuthenticated ? (
        <Button variant="secondary" size="md" asChild>
            <a href="/dashboard" className="text-sm px-5 py-2.5">
                Panel del Inversor
            </a>
        </Button>
    ) : (
        <Button variant="secondary" size="md" asChild>
            <a href="/dapp" className="text-sm px-5 py-2.5">
                Go to App
            </a>
        </Button>
    );
}

export function HeroAuthButtons() {
    const { isAuthenticated } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards_0.6s]">
            <Button variant="primary" asChild className="group/btn">
                <a href="/dapp/projects">
                    Explore Assets
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </a>
            </Button>
            {mounted && isAuthenticated ? (
                <Button variant="secondary" asChild className="group/btn relative overflow-hidden">
                    <a href="/dashboard">
                        Initialize Dashboard
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                </Button>
            ) : (
                <Button variant="secondary" asChild className="group/btn relative overflow-hidden">
                    <a href="#connect">
                        Whitepaper
                    </a>
                </Button>
            )}
        </div>
    );
}
