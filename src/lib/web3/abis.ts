import { parseAbi } from 'viem';

// ─── RWAPermissionedERC20 (Share Token) ───
// Standard ERC-20 reads + compliance (allowed) + metadata
export const rwaTokenAbi = parseAbi([
    // ERC-20 Standard
    'function balanceOf(address owner) view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function allowance(address owner, address spender) view returns (uint256)',
    // Compliance / KYC
    'function allowed(address user) view returns (bool)',
    // Write (for USDC approval flow)
    'function approve(address spender, uint256 amount) returns (bool)',
    'function transfer(address to, uint256 amount) returns (bool)',
]);

// ─── RevenueDistributor (Public) ───
export const revenueDistributorAbi = parseAbi([
    'function pending(address user) view returns (uint256)',
    'function claim() external',
    'function checkpoint(address user) external',
]);

// ─── AssetRegistry ───
export const assetRegistryAbi = parseAbi([
    'function metadata(address token) view returns (string uri, bytes32 contentHash, uint256 updatedAt, uint256 version)',
    'function getDocument(address token, bytes32 docId) view returns (string uri, bytes32 contentHash, uint256 updatedAt)',
]);

// ─── USDC (ERC-20 for payments) ───
export const usdcAbi = parseAbi([
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
]);
