import axios from 'axios';
import { API_BASE_URL } from '../api/axios';

const API_URL = API_BASE_URL;

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export const contactService = {
    // Public: Send a message
    sendMessage: async (data: { name: string; email: string; message: string }) => {
        const response = await axios.post(`${API_URL}/contact/`, data);
        return response.data;
    },

    // Admin: Get all messages
    getMessages: async (token: string) => {
        const response = await axios.get(`${API_URL}/contact/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Admin: Mark as read
    markAsRead: async (id: number, token: string) => {
        const response = await axios.put(`${API_URL}/contact/${id}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};
