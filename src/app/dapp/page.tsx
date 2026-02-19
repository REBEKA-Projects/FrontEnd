import { DappHeader } from "@/components/DappHeader";

export default function DappPage() {
    return (
        <>
            <DappHeader />
            <main className="min-h-screen flex items-center justify-center pt-[72px]">
                <div className="text-center">
                    <p className="text-[--rebeka-text-muted] text-sm font-mono tracking-wider uppercase">
                        REBEKA Protocol
                    </p>
                </div>
            </main>
        </>
    );
}
