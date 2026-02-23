"use client";

import { useUserData } from "@/hooks/useUserData";
import { Typography } from "@/components/atoms/Typography";
import { Shield, User, Settings, Bell, ArrowUpRight } from "lucide-react";

export default function SettingsPage() {
    const { data: userData, isLoading } = useUserData();

    const investorEmail = userData?.user?.email || (isLoading ? "..." : "investor@example.com");
    const investorId = userData?.user?.id || (isLoading ? "..." : "#728491-00"); // Backend will populate this

    return (
        <div className="space-y-12 animate-fade-in">
            <header className="border-b border-white/5 pb-10">
                <span className="text-[10px] text-white/20 uppercase font-bold tracking-[0.4em] block mb-4">Account Configuration</span>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Typography variant="h1" className="text-white font-bold text-5xl tracking-tighter leading-none uppercase">Profile <span className="text-gradient-primary">Settings</span></Typography>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12 max-w-4xl space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-black border border-white/10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-2xl">
                                    <User className="w-7 h-7" />
                                </div>
                                <div>
                                    <Typography variant="h4" className="text-white font-bold uppercase tracking-tight leading-none mb-1">Personal Profile</Typography>
                                    <Typography variant="caption" className="text-white/30 uppercase font-bold tracking-widest text-[9px]">INVESTOR_ID: {investorId}</Typography>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block mb-2 px-1">Institutional Email</label>
                                        <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white/60 font-mono tracking-tighter italic">
                                            {isLoading ? "Loading profile data..." : investorEmail}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] block mb-2 px-1">Legal Designation</label>
                                        <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white font-bold tracking-tight">
                                            {userData?.user?.kycStatus === 'APPROVED' ? 'Verified Entity' : 'Pending KYC'}
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[--rebeka-primary] hover:text-white transition-colors border-t border-white/5">
                                    Request Profile Modification
                                </button>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-black border border-white/10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[--rebeka-secondary-dim] border border-[--rebeka-secondary-glow] flex items-center justify-center text-[--rebeka-secondary] shadow-2xl">
                                    <Shield className="w-7 h-7" />
                                </div>
                                <div>
                                    <Typography variant="h4" className="text-white font-bold uppercase tracking-tight leading-none mb-1">Security Layer</Typography>
                                    <Typography variant="caption" className="text-white/30 uppercase font-bold tracking-widest text-[9px]">AES-256-GCM ENCRYPTION</Typography>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-[--rebeka-primary-dim] hover:border-[--rebeka-primary-glow] border border-transparent transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-black/40"><Settings className="w-4 h-4 text-white/40" /></div>
                                        <div>
                                            <span className="text-xs text-white font-bold block">Para Identity Management</span>
                                            <span className="text-[9px] text-white/20 uppercase font-bold">Manage 2FA & Multi-sig settings</span>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white" />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-black/40"><Bell className="w-4 h-4 text-white/40" /></div>
                                        <div>
                                            <span className="text-xs text-white font-bold block">Smart Notifications</span>
                                            <span className="text-[9px] text-white/20 uppercase font-bold">Yield disbursement alerts & legal updates</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-5 rounded-full bg-[--rebeka-primary] relative">
                                        <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
