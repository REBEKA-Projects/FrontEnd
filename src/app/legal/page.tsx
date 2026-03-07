import { Typography } from '@/components/atoms';
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LegalPlaceholder() {
    return (
        <div className="relative min-h-screen bg-blueprint flex items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-10 h-10 text-secondary" />
                </div>
                <div className="space-y-4">
                    <Typography variant="h1" className="text-white font-bold tracking-tighter uppercase">
                        Legal <span className="text-secondary">Framework</span>
                    </Typography>
                    <Typography variant="p" className="text-text-secondary leading-relaxed">
                        Our legal compliance documentation and terms of service are currently being audited for the V1 mainnet launch. FIDUCCI operates under a Mexican Fiduciary Trust structure for all RWA holdings.
                    </Typography>
                </div>
                <div className="pt-8">
                    <Link href="/" className="text-sm font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
                        Return to Terminal
                    </Link>
                </div>
            </div>
        </div>
    );
}
