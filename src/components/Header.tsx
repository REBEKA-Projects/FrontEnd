import { RebekaLogo } from "@/components/atoms/RebekaLogo";
import { HeaderAuthButton } from "@/components/client/AuthButtons";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 opacity-0 animate-fade-in">
            <nav className="border-b border-white/5 bg-[rgba(15,16,21,0.7)] backdrop-blur-[32px] px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center group">
                        <RebekaLogo size="md" className="group-hover:scale-105 transition-transform" />
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/dashboard" className="text-sm text-text-secondary hover:text-white transition-colors">
                            Dashboard
                        </a>
                        <a href="/dapp/projects" className="text-sm text-text-secondary hover:text-white transition-colors">
                            Marketplace
                        </a>
                        <a href="#legal" className="text-sm text-text-secondary hover:text-white transition-colors">
                            Legal Framework
                        </a>
                    </div>

                    <HeaderAuthButton />
                </div>
            </nav>
        </header>
    );
}
