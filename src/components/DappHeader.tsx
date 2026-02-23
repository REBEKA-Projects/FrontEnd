import Link from "next/link";
import { RebekaLogo } from "./atoms/RebekaLogo";
import { ConnectButton } from "./ConnectButton";

export function DappHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="glass-panel px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center group">
                        <RebekaLogo size="md" className="group-hover:scale-105 transition-transform" />
                    </Link>

                    <ConnectButton />
                </div>
            </nav>
        </header>
    );
}
