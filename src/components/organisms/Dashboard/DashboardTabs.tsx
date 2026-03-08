"use client";

import { useState } from "react";
import { OverviewTab } from "./OverviewTab";
import { PortfolioTab } from "./PortfolioTab";
import { SettingsTab } from "./SettingsTab";
import { LayoutDashboard, Briefcase, Settings as SettingsIcon } from "lucide-react";

type TabKey = 'overview' | 'portfolio' | 'settings';

export function DashboardTabs() {
    const [activeTab, setActiveTab] = useState<TabKey>('overview');

    const tabs: { id: TabKey, title: string, icon: React.ReactNode }[] = [
        { id: 'overview', title: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'portfolio', title: 'Portfolio', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'settings', title: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    ];

    return (
        <div className="space-y-8 animate-[fade-in-up_0.8s_ease-out_forwards_0.1s] opacity-0">
            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10 gap-x-8">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 pt-2 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap
                                ${isActive ? 'text-[--rebeka-primary]' : 'text-white/40 hover:text-white/80'}`}
                        >
                            {tab.icon}
                            {tab.title}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[--rebeka-primary] shadow-[0_0_10px_var(--rebeka-primary-glow)]" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content Area */}
            <div className="pt-2 min-h-[500px]">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'portfolio' && <PortfolioTab />}
                {activeTab === 'settings' && <SettingsTab />}
            </div>
        </div>
    );
}
