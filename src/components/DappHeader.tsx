import Link from "next/link";
import { ConnectButton } from "./ConnectButton";

export function DappHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="glass-panel px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--rebeka-primary] to-[#60CFFF] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-white">REBEKA</span>
                    </Link>

                    <ConnectButton />
                </div>
            </nav>
        </header>
    );
}
