import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/useAuthStore';

export interface PortfolioItem {
    tokenAddress: string;
    symbol: string;
    balance: string | number;
    pending: string | number;
}

export interface CheckoutOperation {
    id: string;
    status: 'RESERVED' | 'EXPIRED' | 'PAID' | 'MINTING' | 'MINTED' | 'FAILED';
    amount: number;
    currency: string;
    createdAt: string;
    token?: {
        symbol: string;
        name: string;
    };
}

export interface UserDataResponse {
    user: {
        id: string;
        email: string;
        wallet: string;
        kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNREGISTERED';
    };
    portfolio: PortfolioItem[];
    operations: CheckoutOperation[];
}

export const useUserData = () => {
    const { isAuthenticated, jwt } = useAuthStore();

    return useQuery({
        queryKey: ['userData'],
        // Fetch only if the user is authenticated and we have a JWT
        queryFn: async () => {
            const { data } = await apiClient.get<UserDataResponse>('/user-data');
            return data;
        },
        enabled: isAuthenticated && !!jwt,
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 15, // Refetch every 15s to keep dashboard fresh
    });
};
