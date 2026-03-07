"use client";

import { useModal, useAccount, useWallet } from "@getpara/react-sdk";

export function ConnectButton() {
    const { openModal } = useModal();
    const { data: wallet } = useWallet();
    const { isConnected } = useAccount();

    return (
        <button
            onClick={() => openModal()}
            className={isConnected ? "btn-secondary text-sm px-5 py-2.5" : "btn-primary text-sm px-5 py-2.5"}
        >
            {isConnected
                ? `${wallet?.address?.slice(0, 6)}...${wallet?.address?.slice(-4)}`
                : "Connect Wallet"}
        </button>
    );
}
