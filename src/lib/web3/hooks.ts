import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { rwaTokenAbi, revenueDistributorAbi, assetRegistryAbi, usdcAbi } from './abis';
import { CONTRACTS } from './contracts';

// ─── Token Balance (ERC-20 standard) ───
export function useTokenBalance(tokenAddress: `0x${string}`, userAddress: `0x${string}`) {
    return useReadContract({
        address: tokenAddress,
        abi: rwaTokenAbi,
        functionName: 'balanceOf',
        args: [userAddress],
        query: {
            enabled: !!userAddress && !!tokenAddress,
            staleTime: 60_000,
            refetchInterval: 30_000,
        },
    });
}

// ─── Token Supply ───
export function useTokenSupply(tokenAddress: `0x${string}`) {
    return useReadContract({
        address: tokenAddress,
        abi: rwaTokenAbi,
        functionName: 'totalSupply',
        query: {
            staleTime: 300_000,
        },
    });
}

// ─── Token Info (name, symbol, decimals) ───
export function useTokenInfo(tokenAddress: `0x${string}`) {
    const name = useReadContract({
        address: tokenAddress,
        abi: rwaTokenAbi,
        functionName: 'name',
        query: { staleTime: Infinity },
    });
    const symbol = useReadContract({
        address: tokenAddress,
        abi: rwaTokenAbi,
        functionName: 'symbol',
        query: { staleTime: Infinity },
    });
    const decimals = useReadContract({
        address: tokenAddress,
        abi: rwaTokenAbi,
        functionName: 'decimals',
        query: { staleTime: Infinity },
    });

    return {
        name: name.data as string | undefined,
        symbol: symbol.data as string | undefined,
        decimals: decimals.data as number | undefined,
        isLoading: name.isLoading || symbol.isLoading || decimals.isLoading,
    };
}

// ─── KYC Whitelist Check ───
export function useIsAllowed(tokenAddress: `0x${string}`, userAddress: `0x${string}`) {
    return useReadContract({
        address: tokenAddress,
        abi: rwaTokenAbi,
        functionName: 'allowed',
        args: [userAddress],
        query: {
            enabled: !!userAddress && !!tokenAddress,
            staleTime: 60_000,
            refetchInterval: 30_000,
        },
    });
}

// ─── Revenue: Pending Dividends ───
export function usePendingRevenue(distributorAddress: `0x${string}`, userAddress: `0x${string}`) {
    return useReadContract({
        address: distributorAddress,
        abi: revenueDistributorAbi,
        functionName: 'pending',
        args: [userAddress],
        query: {
            enabled: !!userAddress && !!distributorAddress,
            staleTime: 60_000,
            refetchInterval: 30_000,
        },
    });
}

// ─── Revenue: Claim Dividends ───
export function useClaimRevenue(distributorAddress: `0x${string}`) {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const claim = () => {
        writeContract({
            address: distributorAddress,
            abi: revenueDistributorAbi,
            functionName: 'claim',
        });
    };

    return { claim, isPending, isConfirming, isSuccess, error, hash };
}

// ─── USDC Balance ───
export function useUsdcBalance(userAddress: `0x${string}`) {
    return useReadContract({
        address: CONTRACTS.USDC,
        abi: usdcAbi,
        functionName: 'balanceOf',
        args: [userAddress],
        query: {
            enabled: !!userAddress,
            staleTime: 30_000,
            refetchInterval: 15_000,
        },
    });
}

// ─── Asset Registry: Metadata ───
export function useAssetMetadata(tokenAddress: `0x${string}`) {
    return useReadContract({
        address: CONTRACTS.ASSET_REGISTRY,
        abi: assetRegistryAbi,
        functionName: 'metadata',
        args: [tokenAddress],
        query: {
            enabled: !!tokenAddress,
            staleTime: 300_000,
        },
    });
}

// ─── Asset Registry: Document ───
export function useAssetDocument(tokenAddress: `0x${string}`, docId: `0x${string}`) {
    return useReadContract({
        address: CONTRACTS.ASSET_REGISTRY,
        abi: assetRegistryAbi,
        functionName: 'getDocument',
        args: [tokenAddress, docId],
        query: {
            enabled: !!tokenAddress && !!docId,
            staleTime: 300_000,
        },
    });
}

// ─── USDC Allowance (read) ───
export function useUsdcAllowance(owner: `0x${string}`, spender: `0x${string}`) {
    return useReadContract({
        address: CONTRACTS.USDC,
        abi: usdcAbi,
        functionName: 'allowance',
        args: [owner, spender],
        query: {
            enabled: !!owner && !!spender,
            staleTime: 30_000,
            refetchInterval: 15_000,
        },
    });
}

// ─── USDC Approve (write) ───
export function useApproveUsdc() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const approve = (spender: `0x${string}`, amount: bigint) => {
        writeContract({
            address: CONTRACTS.USDC,
            abi: usdcAbi,
            functionName: 'approve',
            args: [spender, amount],
        });
    };

    return { approve, isPending, isConfirming, isSuccess, error, hash };
}

