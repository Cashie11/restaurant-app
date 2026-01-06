import api from '../api/axios';

export const adminService = {
    // Dashboard stats
    async getStats() {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // User management
    async getUsers(skip: number = 0, limit: number = 100, search?: string) {
        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (search) params.append('search', search);

        const response = await api.get(`/admin/users?${params.toString()}`);
        return response.data;
    },

    async getRecentUsers(limit: number = 5) {
        const response = await api.get(`/admin/users/recent?limit=${limit}`);
        return response.data;
    },

    async updateUser(userId: number, data: any) {
        const response = await api.put(`/admin/users/${userId}`, data);
        return response.data;
    },

    async deleteUser(userId: number) {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },

    // Order management
    async getOrders(skip: number = 0, limit: number = 100, status?: string) {
        const params = new URLSearchParams();
        params.append('skip', skip.toString());
        params.append('limit', limit.toString());
        if (status) params.append('status', status);

        const response = await api.get(`/admin/orders?${params.toString()}`);
        return response.data;
    },

    async getRecentOrders(limit: number = 10) {
        const response = await api.get(`/admin/orders/recent?limit=${limit}`);
        return response.data;
    },

    async getOrder(orderId: number) {
        const response = await api.get(`/admin/orders/${orderId}`);
        return response.data;
    },

    async updateOrderStatus(orderId: number, status: string, cancellation_reason?: string) {
        const response = await api.put(`/admin/orders/${orderId}/status`, {
            status,
            cancellation_reason
        });
        return response.data;
    },

    async confirmPayment(orderId: number) {
        const response = await api.post(`/admin/orders/${orderId}/confirm-payment`, {});
        return response.data;
    }
};
