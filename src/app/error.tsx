"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[FIDUCCI Error Boundary]", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Error icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>

                <div className="space-y-3">
                    <h2 className="font-heading text-2xl font-bold text-white tracking-tight">
                        Something went wrong
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        An unexpected error occurred. Our team has been notified.
                    </p>
                    {error.digest && (
                        <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-[#6B8AFF] text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(55,91,210,0.4)] hover:-translate-y-0.5 transition-all"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
