import api from '../api/axios';

export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    price_at_addition: number;
    product?: {
        id: number;
        sku: string;
        name: string;
        image_url?: string;
        price: number;
        stock_quantity: number;
    };
}

export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[];
    total_items: number;
    subtotal: number;
}

export const cartService = {
    async getCart(): Promise<Cart> {
        const response = await api.get('/cart');
        return response.data;
    },

    async addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
        const response = await api.post('/cart/items', {
            product_id: productId,
            quantity
        });
        return response.data;
    },

    async updateCartItem(itemId: number, quantity: number): Promise<CartItem> {
        const response = await api.put(`/cart/items/${itemId}`, { quantity });
        return response.data;
    },

    async removeFromCart(itemId: number): Promise<void> {
        await api.delete(`/cart/items/${itemId}`);
    },

    async clearCart(): Promise<void> {
        await api.delete('/cart');
    }
};
