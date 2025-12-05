import api from '../api/axios';
import { SignupData, SigninData, AuthResponse } from '../types/auth';

export const authService = {
    signup: async (data: SignupData) => {
        const response = await api.post('/auth/signup', data);
        return response.data;
    },

    signin: async (data: SigninData): Promise<AuthResponse> => {
        // FastAPI expects form data for OAuth2 password flow
        const formData = new FormData();
        formData.append('username', data.email);
        formData.append('password', data.password);

        const response = await api.post('/auth/signin', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};
