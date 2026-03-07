"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { AuditLogEntry } from "@/lib/chainlink-mock-data";

interface AuditLogTerminalProps {
    logs: AuditLogEntry[];
    autoPlay?: boolean;
    intervalMs?: number;
}

const TAG_COLORS: Record<string, string> = {
    'SYSTEM': 'text-primary',
    'AUTH': 'text-[--color-success]',
    'CRE-ID': 'text-primary',
    'FETCH': 'text-[--color-secondary]',
    'DATA': 'text-foreground',
    'VERIFY': 'text-[--color-success]',
    'PROCESS': 'text-white/60',
    'COMPUTE': 'text-[--color-secondary]',
    'SYNC': 'text-primary',
    'TX-HASH': 'text-primary',
    'STATUS': 'text-[--color-success] font-bold',
};

export const AuditLogTerminal = ({ logs, autoPlay = true, intervalMs = 400 }: AuditLogTerminalProps) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const startAnimation = useCallback(() => {
        setVisibleCount(0);
        setIsRunning(true);
    }, []);

    // Auto-start on mount
    useEffect(() => {
        if (autoPlay) {
            const delay = setTimeout(() => startAnimation(), 800);
            return () => clearTimeout(delay);
        }
    }, [autoPlay, startAnimation]);

    // Typewriter effect
    useEffect(() => {
        if (!isRunning || visibleCount >= logs.length) {
            if (visibleCount >= logs.length) setIsRunning(false);
            return;
        }

        const timer = setTimeout(() => {
            setVisibleCount((prev) => prev + 1);
        }, intervalMs + Math.random() * 200);

        return () => clearTimeout(timer);
    }, [isRunning, visibleCount, logs.length, intervalMs]);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleCount]);

    const visibleLogs = logs.slice(0, visibleCount);
    const isComplete = visibleCount >= logs.length;

    return (
        <div className="rounded-xl border border-primary/20 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[rgba(10,25,47,0.95)] border-b border-primary/10">
                <div className="flex items-center gap-2">
                    <span className="text-[--color-success]/40 text-[8px] tracking-[0.3em]">● ● ●</span>
                    <span className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-widest ml-2">
                        FIDUCCI / Chainlink CRE Audit Logs
                    </span>
                </div>
                {!isComplete && !isRunning && (
                    <button
                        onClick={startAnimation}
                        className="text-[8px] font-mono font-bold text-primary uppercase tracking-widest hover:text-white transition-colors"
                    >
                        ▶ Run
                    </button>
                )}
                {isComplete && (
                    <span className="text-[8px] font-mono font-bold text-[--color-success] uppercase tracking-widest">
                        ✓ Complete
                    </span>
                )}
                {isRunning && !isComplete && (
                    <span className="text-[8px] font-mono font-bold text-[--color-secondary] uppercase tracking-widest animate-pulse">
                        Processing...
                    </span>
                )}
            </div>

            {/* Terminal body */}
            <div className="bg-[rgba(10,25,47,0.95)] px-4 py-3 font-mono text-[0.78rem] leading-[1.7] max-h-[320px] overflow-y-auto">
                {visibleLogs.map((log, i) => (
                    <div
                        key={i}
                        className="cre-log-line opacity-0 animate-[log-appear_0.3s_ease-out_forwards]"
                        style={{ animationDelay: '0ms' }}
                    >
                        <span className="text-white/20 mr-1">&gt; </span>
                        <span className={`font-bold ${TAG_COLORS[log.tag] || 'text-white/40'}`}>
                            [{log.tag}]
                        </span>
                        <span className="text-white/70 ml-1">
                            : {log.message}
                        </span>
                        {log.status && (
                            <span className="text-[--color-success] font-bold ml-1">
                                {log.status}
                            </span>
                        )}
                    </div>
                ))}

                {/* Blinking cursor */}
                {isRunning && !isComplete && (
                    <div className="inline-flex items-center mt-1">
                        <span className="text-white/20 mr-1">&gt; </span>
                        <span className="inline-block w-2 h-4 bg-[--color-success] animate-[blink_1s_step-end_infinite]" />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
