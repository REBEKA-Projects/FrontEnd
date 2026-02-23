// Contract addresses from .env.local (Arbitrum Sepolia)
export const CONTRACTS = {
    FACTORY_ROUTER: (process.env.NEXT_PUBLIC_FACTORY_ROUTER || '0x13fcc7cac606eb1dc65a64097c856709b2f31015') as `0x${string}`,
    ASSET_REGISTRY: (process.env.NEXT_PUBLIC_ASSET_REGISTRY || '0x205934d52d3a7067eedf02440c40e71a022adfac') as `0x${string}`,
    USDC: (process.env.NEXT_PUBLIC_USDC_ADDRESS || '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d') as `0x${string}`,
} as const;
