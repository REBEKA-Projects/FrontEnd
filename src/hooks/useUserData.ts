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
        queryFn: async () => {
            // DEMO: hardcoded data for video recording
            return {
                user: {
                    id: 'demo-user-123',
                    email: 'investor@fiducci.io',
                    wallet: '0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P',
                    kycStatus: 'APPROVED',
                },
                portfolio: [
                    {
                        tokenAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
                        symbol: 'USDC',
                        balance: 2000,
                        pending: 0,
                    },
                    {
                        tokenAddress: '0x7892347293847293847293847293847293847293',
                        symbol: 'GPUE',
                        balance: 6000,
                        pending: 0,
                    }
                ],
                operations: [
                    {
                        id: 'OP-DEMO-001',
                        status: 'MINTED',
                        amount: 100,
                        currency: 'GPUE',
                        createdAt: new Date().toISOString(),
                        token: {
                            symbol: 'GPUE',
                            name: 'Genesis Puebla',
                        }
                    },
                    {
                        id: 'OP-DEMO-002',
                        status: 'PAID',
                        amount: 3000,
                        currency: 'USDC',
                        createdAt: new Date(Date.now() - 3600000).toISOString(),
                    }
                ]
            } as UserDataResponse;
        },
        enabled: true, // Always enabled for demo
        staleTime: 1000 * 60,
    });
};
