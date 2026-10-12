import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { cartService, Cart, CartItem } from '../services/cartService';
import { productService } from '../services/productService';
import { useAuth } from './AuthContext';

const GUEST_CART_KEY = 'urban_grille_guest_cart';

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

function loadGuestItems(): CartItem[] {
    try {
        const raw = localStorage.getItem(GUEST_CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveGuestItems(items: CartItem[]): void {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function computeCart(items: CartItem[]): Cart {
    const total_items = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price_at_addition * i.quantity, 0);
    return { id: -1, user_id: 0, items, total_items, subtotal };
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const refreshCart = useCallback(async () => {
        if (user) {
            try {
                setLoading(true);
                const cartData = await cartService.getCart();
                setCart(cartData);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            } finally {
                setLoading(false);
            }
        } else {
            const items = loadGuestItems();
            setCart(items.length > 0 ? computeCart(items) : null);
        }
    }, [user]);

    const addToCart = async (productId: number, quantity: number = 1) => {
        setLoading(true);
        try {
            if (user) {
                await cartService.addToCart(productId, quantity);
                await refreshCart();
            } else {
                // Guest mode: store the cart in localStorage using the product snapshot
                const product = await productService.getProduct(productId);
                const snapshot = {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    image_url: product.image_url,
                    price: product.price,
                    stock_quantity: product.stock_quantity,
                };
                const items = loadGuestItems();
                const existing = items.find((i) => i.product_id === productId);
                let nextItems: CartItem[];
                if (existing) {
                    nextItems = items.map((i) =>
                        i.product_id === productId
                            ? { ...i, quantity: i.quantity + quantity, product: snapshot }
                            : i
                    );
                } else {
                    nextItems = [
                        ...items,
                        {
                            id: Date.now(),
                            cart_id: -1,
                            product_id: productId,
                            quantity,
                            price_at_addition: product.price,
                            product: snapshot,
                        },
                    ];
                }
                saveGuestItems(nextItems);
                setCart(computeCart(nextItems));
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        setLoading(true);
        try {
            if (user) {
                await cartService.updateCartItem(itemId, quantity);
                await refreshCart();
            } else {
                const items = loadGuestItems();
                const nextItems = items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
                saveGuestItems(nextItems);
                setCart(computeCart(nextItems));
            }
        } catch (error) {
            console.error('Failed to update cart item:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (itemId: number) => {
        setLoading(true);
        try {
            if (user) {
                await cartService.removeFromCart(itemId);
                await refreshCart();
            } else {
                const items = loadGuestItems();
                const nextItems = items.filter((i) => i.id !== itemId);
                saveGuestItems(nextItems);
                setCart(nextItems.length > 0 ? computeCart(nextItems) : null);
            }
        } catch (error) {
            console.error('Failed to remove cart item:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        setLoading(true);
        try {
            if (user) {
                await cartService.clearCart();
                await refreshCart();
            } else {
                saveGuestItems([]);
                setCart(null);
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // On mount and whenever the auth state changes:
    // - Guests load their cart from localStorage.
    // - On login, merge any guest cart items into the account cart, then clear localStorage.
    useEffect(() => {
        if (user) {
            const guestItems = loadGuestItems();
            if (guestItems.length > 0) {
                (async () => {
                    try {
                        for (const item of guestItems) {
                            await cartService.addToCart(item.product_id, item.quantity);
                        }
                        saveGuestItems([]);
                    } catch (error) {
                        console.error('Failed to merge guest cart:', error);
                    } finally {
                        await refreshCart();
                    }
                })();
            } else {
                refreshCart();
            }
        } else {
            const items = loadGuestItems();
            setCart(items.length > 0 ? computeCart(items) : null);
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
                refreshCart,
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
