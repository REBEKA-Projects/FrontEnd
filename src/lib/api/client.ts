import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://rebekamockedback-production.up.railway.app';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const jwt = useAuthStore.getState().jwt;
        if (jwt) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized: Token might be expired or invalid.');
        }
        return Promise.reject(error);
    }
);
