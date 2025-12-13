import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FloatingCart: React.FC = () => {
    const { cart } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Show floating cart only on mobile and when there are items
        const checkMobileAndCart = () => {
            const hasItems = cart && cart.total_items > 0;
            const isMobile = window.innerWidth < 768;

            if (hasItems && isMobile) {
                setIsVisible(true);
                // Trigger bounce animation when items are added
                if (cart.total_items > 0) {
                    setIsAnimating(true);
                    setTimeout(() => setIsAnimating(false), 600);
                }
            } else {
                setIsVisible(false);
            }
        };

        checkMobileAndCart();
        window.addEventListener('resize', checkMobileAndCart);

        return () => window.removeEventListener('resize', checkMobileAndCart);
    }, [cart]);

    if (!isVisible) return null;

    return (
        <>
            <style>
                {`
                    @keyframes bounce-in {
                        0% { transform: scale(0) rotate(0deg); opacity: 0; }
                        50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
                        100% { transform: scale(1) rotate(360deg); opacity: 1; }
                    }
                    
                    @keyframes pulse-ring {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.3); opacity: 0.3; }
                        100% { transform: scale(1.5); opacity: 0; }
                    }
                    
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    .floating-cart {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 1000;
                        animation: float 3s ease-in-out infinite;
                    }
                    
                    .floating-cart-icon {
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3), 0 4px 10px rgba(255, 107, 53, 0.2);
                        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        cursor: pointer;
                        text-decoration: none;
                        color: white;
                    }
                    
                    .floating-cart-icon:hover {
                        transform: scale(1.1);
                        box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4), 0 6px 15px rgba(255, 107, 53, 0.3);
                        background: linear-gradient(135deg, #F7931E 0%, #FF6B35 100%);
                    }
                    
                    .floating-cart-icon.bounce-in {
                        animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    }
                    
                    .cart-badge {
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                        color: white;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        font-weight: bold;
                        box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
                        border: 2px solid white;
                    }
                    
                    .cart-badge.pulse::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: inherit;
                        animation: pulse-ring 1.5s ease-out infinite;
                    }
                    
                    .cart-icon {
                        font-size: 24px;
                        color: white;
                    }
                `}
            </style>

            <div className="floating-cart">
                <Link
                    to="/cart"
                    className={`floating-cart-icon ${isAnimating ? 'bounce-in' : ''}`}
                >
                    <i className="ci-shopping-cart cart-icon"></i>
                    {cart && cart.total_items > 0 && (
                        <span className={`cart-badge ${isAnimating ? 'pulse' : ''}`}>
                            {cart.total_items > 99 ? '99+' : cart.total_items}
                        </span>
                    )}
                </Link>
            </div>
        </>
    );
};

export default FloatingCart;
