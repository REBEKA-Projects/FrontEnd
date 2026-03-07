"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { ParaProvider, Environment } from "@getpara/react-sdk";
import "@getpara/react-sdk/styles.css";
import { useMemo } from "react";

const queryClient = new QueryClient();

// Configure Wagmi
const wagmiConfig = createConfig({
    chains: [arbitrum, arbitrumSepolia],
    transports: {
        [arbitrum.id]: http(),
        [arbitrumSepolia.id]: http(),
    },
});

// Biconomy Gasless Placeholder
// export const BiconomyProvider = ({children}) => { ... initialize SmartAccount ... return <Context.Provider value={...}>{children}</Context.Provider>}

export function AppProviders({ children }: { children: ReactNode }) {
    const paraClientConfig = useMemo(() => ({
        apiKey: process.env.NEXT_PUBLIC_PARA_API_KEY as string,
        env: Environment.BETA,
    }), []);

    const config = useMemo(() => ({
        appName: "FIDUCCI",
    }), []);

    const paraModalConfig = useMemo(() => ({
        oAuthMethods: [],
        disableEmailLogin: false,
    }), []);

    const externalWalletConfig = useMemo(() => ({
        wallets: ["METAMASK", "COINBASE", "RAINBOW", "RABBY"] as ("METAMASK" | "COINBASE" | "RAINBOW" | "RABBY")[],
        evmConnector: {
            config: {
                chains: [arbitrumSepolia] as [typeof arbitrumSepolia, ...typeof arbitrumSepolia[]],
                transports: { [arbitrumSepolia.id]: http() },
            },
        },
    }), []);

    return (
        <WagmiProvider config={wagmiConfig}>
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
        </WagmiProvider>
    );
}
