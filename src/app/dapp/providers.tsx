"use client";

import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParaProvider, Environment } from "@getpara/react-sdk";
import "@getpara/react-sdk/styles.css";
import { arbitrum } from "viem/chains";
import { http } from "viem";

const queryClient = new QueryClient();

/**
 * Wraps the /dapp route with Para SDK authentication and EVM wallet connectors.
 * Social login (OAuth) is temporarily disabled pending backend resolution.
 */
export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const paraClientConfig = useMemo(() => ({
        apiKey: process.env.NEXT_PUBLIC_PARA_API_KEY as string,
        env: Environment.BETA,
    }), []);

    const config = useMemo(() => ({
        appName: "REBEKA",
    }), []);

    const paraModalConfig = useMemo(() => ({
        oAuthMethods: [],
        disableEmailLogin: false,
    }), []);

    const externalWalletConfig = useMemo(() => ({
        wallets: ["METAMASK", "COINBASE", "RAINBOW", "RABBY"] as any[],
        evmConnector: {
            config: {
                chains: [arbitrum] as any,
                transports: { [arbitrum.id]: http() },
            },
        },
    }), []);

    return (
        <QueryClientProvider client={queryClient}>
            <ParaProvider
                paraClientConfig={paraClientConfig}
                config={config}
                paraModalConfig={paraModalConfig}
                externalWalletConfig={externalWalletConfig}
            >
                {children}
            </ParaProvider>
        </QueryClientProvider>
    );
}
