import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { cartService, Cart } from '../services/cartService';
import { useAuth } from './AuthContext';

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const refreshCart = useCallback(async () => {
        if (!user) {
            setCart(null);
            return;
        }

        try {
            setLoading(true);
            const cartData = await cartService.getCart();
            setCart(cartData);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const addToCart = async (productId: number, quantity: number = 1) => {
        try {
            setLoading(true);
            await cartService.addToCart(productId, quantity);
            await refreshCart();
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        try {
            setLoading(true);
            await cartService.updateCartItem(itemId, quantity);
            await refreshCart();
        } catch (error) {
            console.error('Failed to update cart item:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            setLoading(true);
            await cartService.removeFromCart(itemId);
            await refreshCart();
        } catch (error) {
            console.error('Failed to remove cart item:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await cartService.clearCart();
            await refreshCart();
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Load cart when user logs in
    useEffect(() => {
        if (user) {
            refreshCart();
        } else {
            setCart(null);
        }
    }, [user, refreshCart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                refreshCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
