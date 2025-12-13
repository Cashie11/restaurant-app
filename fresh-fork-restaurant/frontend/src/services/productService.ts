import api from '../api/axios';

export interface Product {
    id: number;
    sku: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category: string;
    is_popular: boolean;
    is_special: boolean;
    is_offer: boolean;
    discount_percentage: number;
    stock_quantity: number;
    is_active: boolean;
    rating: number;
    review_count: number;
    weight?: number;
    tags?: string;
    created_at: string;
    updated_at?: string;
}

export interface ProductCreate {
    sku: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category: string;
    is_popular?: boolean;
    is_special?: boolean;
    is_offer?: boolean;
    discount_percentage?: number;
    stock_quantity?: number;
    is_active?: boolean;
}

export const productService = {
    // Public endpoints
    async getProducts(category?: string) {
        const params = category ? `?category=${category}` : '';
        const response = await api.get(`/products${params}`);
        return response.data;
    },

    async getProduct(id: number) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async getPopularProducts(limit: number = 10) {
        const response = await api.get(`/products/popular?limit=${limit}`);
        return response.data;
    },

    async getSpecialProducts(limit: number = 10) {
        const response = await api.get(`/products/special?limit=${limit}`);
        return response.data;
    },

    async getOfferProducts(limit: number = 10) {
        const response = await api.get(`/products/offers?limit=${limit}`);
        return response.data;
    },

    // Admin endpoints
    async createProduct(product: ProductCreate) {
        const response = await api.post('/products', product);
        return response.data;
    },

    async updateProduct(id: number, product: Partial<ProductCreate>) {
        const response = await api.put(`/products/${id}`, product);
        return response.data;
    },

    async deleteProduct(id: number) {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};
