import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api/client';
import { useAuthStore } from '@/store/useAuthStore';

// Matches actual backend response from POST /register-user
interface RegisterResponse {
    userId: string;
    email: string;
    wallet: string;
    kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNREGISTERED';
}

/**
 * Calls POST /register-user after Para SDK login.
 * Idempotent — if user already exists, backend returns existing data.
 * Stores userId and syncs kycStatus in useAuthStore.
 */
export function useAutoRegister() {
    const { setSession, setKycStatus } = useAuthStore();
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = useCallback(async (email: string, wallet: string) => {
        try {
            setIsRegistering(true);
            setError(null);

            const { data } = await apiClient.post<RegisterResponse>('/register-user', {
                email,
                wallet,
            });

            // TODO(backend): Replace with real JWT once POST /register-user returns one.
            // Currently the backend doesn't issue JWTs, so we use a placeholder.
            // This means authenticated endpoints (/token-checkout, /user-data) will
            // fail with "invalid or expired token" until the backend implements JWT signing.
            const placeholderJwt = `para_session_${data.userId}`;
            setSession(placeholderJwt, wallet, email, data.userId);

            // Sync KYC status from backend
            if (data.kycStatus) {
                setKycStatus(data.kycStatus);
            }

            return data;
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Unable to sync identity with backend.';
            setError(msg);
            console.error('Auto-register error:', err);
            throw err;
        } finally {
            setIsRegistering(false);
        }
    }, [setSession, setKycStatus]);

    return { register, isRegistering, error };
}

