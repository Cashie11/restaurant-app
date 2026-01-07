import api from '../api/axios';

export const orderService = {
    async getMyOrders() {
        const response = await api.get('/orders/');
        return response.data;
    },

    async getOrder(orderId: number) {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    },

    async markAsPaid(orderId: number) {
        const response = await api.post(`/orders/${orderId}/mark-paid`);
        return response.data;
    },

    async clearOrderHistory() {
        const response = await api.delete('/orders/clear-history');
        return response.data;
    }
};
