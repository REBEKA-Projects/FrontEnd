"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { ArrowRight, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/atoms";
import Link from "next/link";
import { useModal, useAccount } from "@getpara/react-sdk";
import { useAutoRegister } from "@/hooks/useAutoRegister";
import { useRouter } from "next/navigation";

export function HeaderAuthButton() {
    const { isAuthenticated, userId, walletAddress, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    // Para Logic
    const { isOpen, openModal } = useModal();
    const { isConnected, embedded } = useAccount();
    const { register, isRegistering } = useAutoRegister();
    const router = useRouter();
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Global Sync Logic
    useEffect(() => {
        if (isConnected && embedded?.wallets && embedded.wallets.length > 0 && !userId && !isSyncing) {
            const syncIdentity = async () => {
                setIsSyncing(true);
                try {
                    const email = embedded?.email || 'investor@example.com';
                    const addr = embedded?.wallets?.[0]?.address;
                    if (addr) {
                        await register(email, addr);
                        router.refresh();
                    }
                } catch (err) {
                    console.error("Global Identity Sync Error:", err);
                } finally {
                    setIsSyncing(false);
                }
            };
            syncIdentity();
        }
    }, [isConnected, embedded, userId, isSyncing, register, router]);

    if (!mounted) return <div className="w-[120px] h-[40px] animate-pulse rounded-xl bg-white/5" />;

    const formattedWallet = walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Not Connected";

    return isAuthenticated ? (
        <div className="flex items-center gap-3 pl-2 lg:pl-4">
            <div className="hidden lg:flex flex-col items-end">
                <span className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em]">Connected Wallet</span>
                <span className="text-xs font-mono text-white/90 font-medium tracking-tight">{formattedWallet}</span>
            </div>
            <div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center p-[1px] group cursor-pointer"
                onClick={logout}
                title="Disconnect Wallet"
            >
                <div className="w-full h-full rounded-[10px] bg-black/40 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                    <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400 transition-colors" />
                </div>
            </div>
        </div>
    ) : (
        <Button variant="secondary" size="md" onClick={() => openModal()} disabled={isOpen || isSyncing} className="group/btn relative overflow-hidden">
            <span className="text-sm px-4 py-2 flex items-center gap-2">
                {(isOpen || isSyncing || isRegistering) ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin text-[--rebeka-primary]" />
                        Connecting...
                    </>
                ) : (
                    "Connect Wallet"
                )}
            </span>
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
