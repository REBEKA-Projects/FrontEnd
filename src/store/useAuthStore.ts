import { create } from 'zustand';

type KycStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNREGISTERED';

interface AuthState {
    jwt: string | null;
    walletAddress: string | null;
    email: string | null;
    userId: string | null;
    kycStatus: KycStatus;
    isAuthenticated: boolean;

    // Actions
    setSession: (jwt: string, wallet: string, email: string, userId?: string) => void;
    setKycStatus: (status: KycStatus) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    jwt: null,
    walletAddress: null,
    email: null,
    userId: null,
    kycStatus: 'UNREGISTERED',
    isAuthenticated: false,

    setSession: (jwt, walletAddress, email, userId) =>
        set({ jwt, walletAddress, email, userId: userId || null, isAuthenticated: true }),

    setKycStatus: (kycStatus) => set({ kycStatus }),

    logout: () => set({
        jwt: null,
        walletAddress: null,
        email: null,
        userId: null,
        kycStatus: 'UNREGISTERED',
        isAuthenticated: false
    })
}));
