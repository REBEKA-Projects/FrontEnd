"use client";

import { useState } from "react";
import { Typography } from '@/components/atoms';
import { ChainlinkVerificationPanel } from '@/components/organisms';
import { SatelliteMap } from '@/components/molecules';
import { MOCK_ORACLE, MOCK_AUDIT_LOGS } from '@/lib/chainlink-mock-data';
import { ShieldCheck, Zap, Target, Database } from "lucide-react";
import type { ProjectItem } from "@/lib/data/projects";

interface ProjectTabsProps {
    project: ProjectItem;
}

type TabKey = 'tokenomics' | 'chainlink' | 'financial' | 'legal';

/**
 * Manages the interactive tabbed interface for project details.
 * Renders the Tokenomics, Chainlink, Financials, or Legal view based on local state.
 */
export const ProjectTabs = ({ project }: ProjectTabsProps) => {
    const [activeTab, setActiveTab] = useState<TabKey>('tokenomics');

    const tabs: { id: TabKey, title: string, icon: React.ReactNode }[] = [
        { id: 'tokenomics', title: 'Tokenomics', icon: <Target className="w-4 h-4" /> },
        { id: 'chainlink', title: 'Chainlink Verification', icon: <Database className="w-4 h-4" /> },
        { id: 'financial', title: 'Financial', icon: <Zap className="w-4 h-4" /> },
        { id: 'legal', title: 'Legal', icon: <ShieldCheck className="w-4 h-4" /> },
    ];

    /**
     * Renders the corresponding content for the currently active tab.
     * Uses a switch statement for cleaner conditional rendering and early returns.
     */
    const renderTabContent = () => {
        switch (activeTab) {
            case 'tokenomics':
                return (
                    <section className="space-y-6 animate-fade-in">
                        <div className="p-6 md:p-12 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-center">
                            <div className="flex flex-col gap-10 w-full max-w-lg">
                                {/* Tokenomics Statistics */}
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <span className="block text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Fixed Supply</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-mono font-bold text-white leading-none">200,000</span>
                                            <span className="text-2xl font-mono font-bold text-white">tokens</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Asset Parity</span>
                                        <div className="inline-block px-3 py-2 bg-[--rebeka-primary-dim] rounded-md border border-[--rebeka-primary-glow]">
                                            <span className="text-sm font-medium text-[--rebeka-primary] block leading-snug">
                                                1 $RBEK-Chiq = 1 m² of Land
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-12 h-px bg-[--rebeka-primary]/30" />

                                {/* Tokenomics Distribution Details */}
                                <div className="flex flex-col justify-center gap-6">
                                    {[
                                        { label: '85.87% - Owner Liquidity Pool (Direct land acquisition)', color: 'bg-white' },
                                        { label: '6.00% - FIDUCCI Core Team', color: 'bg-[--rebeka-primary]' },
                                        { label: '5.13% - Operating Reserve (10-Year All-Inclusive)', color: 'bg-[--rebeka-secondary]' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.color} shadow-[0_0_8px_currentColor] shrink-0 mt-1.5`} />
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/60 leading-relaxed">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case 'chainlink':
                return (
                    <section className="animate-fade-in relative -mx-4 sm:mx-0">
                        <ChainlinkVerificationPanel
                            oracleData={MOCK_ORACLE}
                            auditLogs={MOCK_AUDIT_LOGS}
                            tokenPrice={project.specs.pricePerToken}
                            totalValuation={6_100_000}
                            totalSupply={200_000}
                            autoPlay={true}
                        />
                    </section>
                );

            case 'financial':
                return (
                    <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <Typography variant="p" className="text-[13px] text-white/70 leading-relaxed m-0">
                                {project.thesis.description}
                            </Typography>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-[--rebeka-primary-dim] to-transparent border border-[--rebeka-primary-glow] rounded-2xl relative overflow-hidden group">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-[--rebeka-primary] mb-2">Base Acquisition Cost</span>
                            <span className="text-2xl font-mono font-bold text-white">{project.thesis.acquisitionCost}</span>
                        </div>

                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <span className="block text-[10px] uppercase font-black tracking-widest text-white/30 mb-2">Forced Liquidation</span>
                            <span className="text-[13px] font-medium text-white/90 leading-snug block">{project.exitStrategy.forcedExit}</span>
                        </div>

                        <div className="md:col-span-2 p-5 bg-black/40 border-t border-t-[--rebeka-primary]/20 border-white/5 rounded-2xl border-l-2 border-l-[--rebeka-primary]">
                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-[--rebeka-primary] mb-1.5 block">Spread Utility Mechanism</span>
                            <span className="text-[13px] text-white/80 font-medium leading-relaxed block">
                                {project.thesis.spreadFunction}
                            </span>
                        </div>
                    </section>
                );

            case 'legal':
                return (
                    <section className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Legal Vehicle</span>
                                    <span className="text-xs text-white font-medium leading-snug">{project.legal.documentName}</span>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Fiduciary</span>
                                    <span className="text-xs text-white font-medium leading-snug">{project.legal.fiduciary}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Public Registry Folio</span>
                                <span className="text-xs font-mono text-white/80">{project.legal.folio}</span>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                <span className="block text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Public Deed & Notary</span>
                                <span className="text-[11px] leading-snug text-white/80 block">{project.legal.notary}</span>
                            </div>
                            <a
                                href="https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[--rebeka-success]/10 to-transparent border border-[--rebeka-success]/20 flex items-center justify-center gap-2 hover:bg-[--rebeka-success]/20 transition-all group/link"
                            >
                                <ShieldCheck className="w-4 h-4 text-[--rebeka-success] group-hover/link:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[--rebeka-success]">View Trust Deed (IPFS)</span>
                            </a>
                        </div>

                        <div className="h-full min-h-[300px] rounded-xl overflow-hidden border border-white/5">
                            <SatelliteMap
                                lat={18.962399}
                                lng={-98.194782}
                                zoom={15}
                                label="Asset Location Vector"
                                className="w-full h-full"
                            />
                        </div>
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-8 animate-[fade-in-up_0.8s_ease-out_forwards_0.3s] opacity-0">
            {/* Navigation Header */}
            <div className="flex flex-wrap border-b border-white/10 gap-x-8 gap-y-4">
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

            {/* Rendered View */}
            <div className="pt-4 min-h-[500px]">
                {renderTabContent()}
            </div>
        </div>
    );
};
