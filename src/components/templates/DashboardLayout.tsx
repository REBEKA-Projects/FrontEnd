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
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <div className="flex h-screen pt-20 bg-blueprint text-[--rebeka-text-primary] selection:bg-[--rebeka-primary] selection:text-white overflow-hidden relative">
            {/* Structural Blueprint Grid Layers */}
            <div className="fixed inset-0 pointer-events-none blueprint-mask opacity-50 z-0" />
            <div className="fixed inset-0 pointer-events-none bg-blueprint-fade opacity-40 z-0" />

            {/* Dynamic Asymmetric Light Blows */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[--rebeka-primary] blur-[120px] opacity-[0.02] pointer-events-none z-0" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[35%] h-[35%] bg-[--rebeka-secondary] blur-[100px] opacity-[0.02] pointer-events-none z-0" />

            {/* LEFT SIDEBAR */}
            <aside className={cn(
                "w-72 shrink-0 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col z-[100] transition-all duration-300 relative",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full absolute h-full lg:static lg:translate-x-0 lg:w-20"
            )}>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5 shrink-0">
                    <Link href="/" className={cn("flex items-center group transition-all", !isSidebarOpen && "lg:scale-75")}>
                        <RebekaLogo size="md" className="group-hover:scale-105 transition-transform" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto scrollbar-hide py-8 px-4 space-y-2">
                    <span className={cn("block px-4 mb-4 text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 transition-opacity duration-300", !isSidebarOpen && "lg:opacity-0")}>
                        Terminal Menu
                    </span>
                    {navItems.map((item) => {
                        const isActive = pathname === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.id}
                                title={(!isSidebarOpen) ? item.label : undefined}
                                className={cn(
                                    "flex items-center rounded-xl transition-all group overflow-hidden",
                                    isSidebarOpen ? "px-4 py-3.5" : "lg:justify-center p-3.5 mx-auto max-w-[48px]",
                                    isActive
                                        ? "bg-gradient-to-r from-[--rebeka-primary-dim] to-transparent text-[--rebeka-primary] border-l-2 border-[--rebeka-primary] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                        : "text-white/40 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-[--rebeka-primary]" : "text-white/30 group-hover:text-white/80")} />
                                <span className={cn("ml-4 text-[11px] font-black uppercase tracking-widest truncate transition-all duration-300", !isSidebarOpen ? "lg:opacity-0 lg:w-0 lg:ml-0" : "opacity-100")}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer (Status) */}
                <div className={cn("p-6 border-t border-white/5 transition-all duration-300", !isSidebarOpen && "lg:p-4")}>
                    <div className={cn("flex items-center gap-3", !isSidebarOpen && "lg:justify-center")}>
                        <div className="relative">
                            <span className="w-2.5 h-2.5 rounded-full bg-[--rebeka-success] flex shadow-[0_0_10px_var(--rebeka-success-dim)]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[--rebeka-success] absolute inset-0 animate-ping opacity-75" />
                        </div>
                        <div className={cn("flex flex-col transition-all duration-300", !isSidebarOpen && "lg:hidden")}>
                            <span className="text-[9px] text-[--rebeka-success] font-black uppercase tracking-widest">System Online</span>
                            <span className="text-[8px] font-mono text-white/30 uppercase">Arbitrum Sepolia</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10 w-full overflow-hidden">
                {/* TOP HEADER */}
                <header className="h-20 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 lg:px-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 lg:hidden text-white/40 hover:text-white transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Dynamic Breadcrumb based on pathname */}
                        <div className="hidden lg:flex flex-col items-start gap-0.5">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8892B0]">Terminal Active</span>
                            <h2 className="text-white font-black italic uppercase tracking-tighter leading-none text-xl">
                                {pathname === '/dashboard' ? 'Overview' : navItems.find(n => n.id === pathname)?.label || 'Dashboard'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Quick Action: Marketplace */}
                        <Link
                            href="/dapp/projects"
                            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                        >
                            <ShoppingBag className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Marketplace</span>
                        </Link>

                        <div className="w-px h-8 bg-white/10 hidden lg:block" />

                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors relative group">
                                <Bell className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[--rebeka-primary] rounded-full ring-2 ring-black shadow-[0_0_8px_var(--rebeka-primary-dim)]" />
                            </button>

                            <div className="flex items-center gap-3 pl-2 lg:pl-4 border-l border-white/5">
                                <div className="hidden lg:flex flex-col items-end">
                                    <span className="text-[9px] text-white/40 uppercase font-bold tracking-[0.2em]">Connected Wallet</span>
                                    <span className="text-xs font-mono text-white/90 font-medium tracking-tight">{formattedWallet}</span>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center p-[1px] group cursor-pointer" onClick={logout}>
                                    <div className="w-full h-full rounded-[10px] bg-black/40 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                                        <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

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
