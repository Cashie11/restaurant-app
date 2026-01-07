import axios from 'axios';
import { API_BASE_URL } from '../api/axios';

const API_URL = `${API_BASE_URL}/banks`;

export interface BankAccount {
    id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    is_active: boolean;
}

export interface BankAccountCreate {
    bank_name: string;
    account_number: string;
    account_name: string;
}

export const bankService = {
    getAllBanks: async (token: string): Promise<BankAccount[]> => {
        const response = await axios.get(`${API_URL}/all`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getActiveBanks: async (): Promise<BankAccount[]> => {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    },

    createBank: async (bankData: BankAccountCreate, token: string): Promise<BankAccount> => {
        const response = await axios.post(API_URL, bankData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteBank: async (id: number, token: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};
