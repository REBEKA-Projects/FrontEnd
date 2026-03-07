import Link from "next/link";
import { RebekaLogo } from "@/components/atoms";
import { HeaderAuthButton } from "@/components/molecules";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 opacity-0 animate-fade-in">
            <nav className="border-b border-white/5 bg-[rgba(10,25,47,0.85)] backdrop-blur-xl px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center group">
                            <RebekaLogo size="md" className="group-hover:scale-105 transition-transform" />
                        </Link>

                        <nav className="hidden md:flex items-center gap-1 border-l border-white/10 pl-8">
                            <Link
                                href="/dashboard"
                                className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/dapp/projects"
                                className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
                            >
                                Marketplace
                            </Link>
                        </nav>
                    </div>

                    <HeaderAuthButton />
                </div>
            </nav>
        </header>
    );
}
