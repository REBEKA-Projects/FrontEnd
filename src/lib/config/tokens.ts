// ─── Known RWA Tokens (Arbitrum Sepolia) ───
// Temporary source of truth until a subgraph or backend endpoint is available.
// Replace placeholder addresses with real deployed contract addresses.

export interface TokenConfig {
    tokenAddress: `0x${string}`;
    distributorAddress: `0x${string}` | null;
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    yieldAPY: string;
    assetClass: string;
    pricePerToken: number;
}

export const KNOWN_TOKENS: TokenConfig[] = [
    {
        // TODO(deploy): Replace with the real deployed ERC-3643 contract address
        // after running the create-terreno deployment script via FactoryRouter.
        tokenAddress: '0x7892347293847293847293847293847293847293' as `0x${string}`,
        distributorAddress: null,
        name: 'Genesis Puebla',
        symbol: 'GPUE',
        description: 'Mixed Urban Development — Residential & Commercial Hub in Central Puebla.',
        imageUrl: '/assets/genesis-puebla.jpg',
        yieldAPY: '8.5%',
        assetClass: 'Residential-Commercial',
        pricePerToken: 350,
    },
];

/**
 * Lookup a token config by its address (case-insensitive).
 */
export function getTokenConfig(address: string): TokenConfig | undefined {
    return KNOWN_TOKENS.find(
        (t) => t.tokenAddress.toLowerCase() === address.toLowerCase()
    );
}
