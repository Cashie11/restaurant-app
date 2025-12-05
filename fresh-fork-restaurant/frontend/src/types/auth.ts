export interface SignupData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
}

export interface SigninData {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'user' | 'admin';
    avatar?: string;
    is_active: boolean;
    is_email_verified: boolean;
    phone?: string;
}
