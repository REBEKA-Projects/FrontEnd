"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
    LogOut,
    LayoutDashboard,
    Briefcase,
    Settings,
    Bell,
    ChevronRight,
    Menu,
    ChevronLeft,
    Shield,
    ShoppingBag
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RebekaLogo } from "@/components/atoms/RebekaLogo";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { walletAddress, logout } = useAuthStore();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formattedWallet = walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Not Connected";

    if (!mounted) return null;

    const navItems = [
        { id: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: '/dashboard/portfolio', label: 'Portfolio', icon: Briefcase },
        { id: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-blueprint text-[--rebeka-text-primary] flex flex-col selection:bg-[--rebeka-primary] selection:text-white overflow-hidden">
            {/* Structural Blueprint Grid Layers */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-50" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-40" />

            {/* Dynamic Asymmetric Light Blows */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[--rebeka-primary] blur-[120px] opacity-[0.05] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-[--rebeka-secondary] blur-[100px] opacity-[0.04] pointer-events-none" />

            {/* TOP BAR — Navigation + Identity */}
            <header className="h-14 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center px-6 justify-between sticky top-0 z-[100]">
                <div className="flex items-center gap-8">
                    <a href="/" className="flex items-center group">
                        <RebekaLogo size="sm" className="group-hover:scale-105 transition-transform" />
                    </a>

                    <nav className="hidden lg:flex items-center gap-1 border-l border-white/10 pl-8">
                        {[
                            { href: '/dashboard', label: 'Dashboard' },
                            { href: '/dapp/projects', label: 'Marketplace' },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all",
                                    typeof window !== 'undefined' && window.location.pathname === link.href
                                        ? "bg-white/10 text-white border border-white/10"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>


                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Wallet</span>
                            <span className="text-[11px] font-mono text-white/80">{formattedWallet}</span>
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
                            <Bell className="w-4 h-4 text-white/60" />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[--rebeka-primary] rounded-full ring-2 ring-black" />
                        </button>
                        <button onClick={logout} className="p-2 hover:bg-red-500/10 rounded-full group transition-colors">
                            <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* SIDE NAV - Refined Vertical Bar */}
                <aside className={cn(
                    "bg-black/20 border-r border-white/5 flex flex-col gap-8 transition-all duration-300 relative",
                    isSidebarOpen ? "w-64 p-4" : "w-16 p-2 items-center"
                )}>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute -right-3 top-6 bg-black border border-white/10 rounded-full p-1.5 text-white/40 hover:text-white hover:border-[--rebeka-primary-glow] hover:bg-[--rebeka-primary-dim] transition-all z-50 shadow-xl"
                    >
                        {isSidebarOpen ? <ChevronLeft className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
                    </button>

                    <div className="space-y-6 w-full mt-2">
                        <nav className="space-y-1 w-full">
                            {isSidebarOpen && <span className="block px-4 mb-2 text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">Main Navigation</span>}
                            {navItems.map((item) => {
                                const isActive = pathname === item.id;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.id}
                                        title={!isSidebarOpen ? item.label : undefined}
                                        className={cn(
                                            "w-full flex items-center rounded-lg transition-all group",
                                            isSidebarOpen ? "justify-between px-4 py-2.5" : "justify-center p-3 mb-2 mx-auto max-w-[40px]",
                                            isActive
                                                ? "bg-gradient-to-r from-[--rebeka-primary-dim] to-transparent text-[--rebeka-primary] border-l-2 border-[--rebeka-primary]"
                                                : "text-white/40 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className={cn("flex items-center font-medium tracking-tight", isSidebarOpen ? "gap-3 text-xs" : "")}>
                                            <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[--rebeka-primary]" : "text-white/20 group-hover:text-white/60")} />
                                            {isSidebarOpen && <span className="truncate">{item.label}</span>}
                                        </div>
                                        {isSidebarOpen && isActive && <ChevronRight className="w-3 h-3 shrink-0" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* MAIN DASHBOARD CONTENT */}
                <main className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="p-8 max-w-[1400px] mx-auto opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
                        {children}
                    </div>
                </main>
            </div>

            {/* FOOTER BAR */}
            <footer className="h-8 bg-black/60 border-t border-white/5 flex items-center px-6 justify-between text-[10px] font-mono tracking-tighter">
                <span className="text-white/20 uppercase">© 2026 Rebeka Protocol • Arbitrum Sepolia</span>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[--rebeka-success] animate-pulse" />
                    <span className="text-white/30 uppercase">Online</span>
                </div>
            </footer>
        </div>
    );
};
