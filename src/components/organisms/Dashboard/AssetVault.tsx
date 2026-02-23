"use client";

import { Typography } from "@/components/atoms/Typography";
import { GlassCard } from "@/components/GlassCard";
import { useAssetMetadata, useAssetDocument } from "@/lib/web3/hooks";
import { FileText, ExternalLink, ShieldCheck, Hash } from "lucide-react";
import { keccak256, toBytes } from "viem";

interface AssetVaultProps {
    tokenAddress: `0x${string}`;
}

// Common document IDs (keccak256 of the document name)
const DOCUMENT_IDS = [
    { name: "Deed", label: "Deed of Trust", docId: keccak256(toBytes("Deed")) as `0x${string}` },
    { name: "Blueprint", label: "Technical Blueprint", docId: keccak256(toBytes("Blueprint")) as `0x${string}` },
    { name: "TechSheet", label: "Technical Datasheet", docId: keccak256(toBytes("TechSheet")) as `0x${string}` },
];

export const AssetVault = ({ tokenAddress }: AssetVaultProps) => {
    const { data: metadata, isLoading: isMetadataLoading } = useAssetMetadata(tokenAddress);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
                <FileText className="w-4 h-4 text-white/40" />
                <Typography variant="subtitle" className="text-white text-sm font-bold uppercase tracking-wider italic">
                    Asset Vault
                </Typography>
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest ml-auto">On-chain Registry</span>
            </div>

            <GlassCard className="p-6 border-white/5 space-y-6" hover={false}>
                {/* Metadata Overview */}
                {isMetadataLoading ? (
                    <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
                ) : metadata ? (
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck className="w-4 h-4 text-[--rebeka-secondary]" />
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                Registry Metadata v{Number(metadata[3])}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-[9px] text-white/20 uppercase font-bold block mb-1">IPFS URI</span>
                                <a
                                    href={metadata[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-mono text-[--rebeka-primary] hover:underline flex items-center gap-1 truncate"
                                >
                                    {metadata[0]?.substring(0, 32)}... <ExternalLink className="w-3 h-3 shrink-0" />
                                </a>
                            </div>
                            <div>
                                <span className="text-[9px] text-white/20 uppercase font-bold block mb-1">Content Hash</span>
                                <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                                    <Hash className="w-3 h-3" /> {metadata[1]?.toString().substring(0, 16)}...
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-center text-white/30 font-mono text-xs">
                        NO_METADATA_FOUND
                    </div>
                )}

                {/* Document Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DOCUMENT_IDS.map((doc) => (
                        <DocumentCard
                            key={doc.name}
                            tokenAddress={tokenAddress}
                            docId={doc.docId}
                            label={doc.label}
                            name={doc.name}
                        />
                    ))}
                </div>
            </GlassCard>
        </div>
    );
};

function DocumentCard({
    tokenAddress,
    docId,
    label,
    name,
}: {
    tokenAddress: `0x${string}`;
    docId: `0x${string}`;
    label: string;
    name: string;
}) {
    const { data, isLoading } = useAssetDocument(tokenAddress, docId);

    const hasDocument = data && data[0] && data[0].length > 0;

    return (
        <div className={`group p-4 rounded-xl border transition-all ${hasDocument
            ? 'bg-gradient-to-br from-white/[0.04] to-transparent border-white/5 hover:border-[--rebeka-secondary-glow] cursor-pointer'
            : 'bg-black/20 border-white/5 opacity-50'
            }`}>
            <div className="flex items-center gap-3 mb-3">
                <FileText className={`w-4 h-4 ${hasDocument ? 'text-[--rebeka-secondary]' : 'text-white/20'}`} />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{name}</span>
            </div>
            <Typography variant="p" className="text-white font-bold text-sm mb-2">{label}</Typography>

            {isLoading ? (
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
            ) : hasDocument ? (
                <a
                    href={data[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-[--rebeka-primary] hover:underline flex items-center gap-1"
                >
                    View Document <ExternalLink className="w-3 h-3" />
                </a>
            ) : (
                <span className="text-[10px] font-mono text-white/20">Not registered</span>
            )}
        </div>
    );
}
