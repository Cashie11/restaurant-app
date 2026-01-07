import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const location = useLocation();

    useEffect(() => {
        // Start transition when location changes
        setIsTransitioning(true);

        // Fade out current content
        const timer1 = setTimeout(() => {
            // Update content during fade out
            setDisplayChildren(children);
        }, 150);

        // Fade in new content
        const timer2 = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [location.pathname, children]);

    return (
        <>
            <style>
                {`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes slideInFromRight {
                        from {
                            opacity: 0;
                            transform: translateX(50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    
                    .page-transition-container {
                        min-height: 100vh;
                        position: relative;
                    }
                    
                    .page-transition-content {
                        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                        transform-origin: top center;
                    }
                    
                    .page-transition-content.fade-out {
                        opacity: 0;
                        transform: scale(0.98) translateY(-10px);
                    }
                    
                    .page-transition-content.fade-in {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                    
                    .page-transition-content.entering {
                        animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                    
                    /* Smooth scroll behavior */
                    html {
                        scroll-behavior: smooth;
                    }
                    
                    /* Loading skeleton animation */
                    @keyframes shimmer {
                        0% { background-position: -1000px 0; }
                        100% { background-position: 1000px 0; }
                    }
                    
                    .page-loading {
                        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                        background-size: 1000px 100%;
                        animation: shimmer 2s infinite;
                    }
                `}
            </style>

            <div className="page-transition-container">
                <div
                    className={`page-transition-content ${isTransitioning ? 'fade-out' : 'fade-in'
                        }`}
                >
                    {displayChildren}
                </div>

                {isTransitioning && (
                    <div
                        className="page-loading"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            zIndex: 9999,
                            background: 'linear-gradient(90deg, #FF6B35, #F7931E, #FF6B35)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite'
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default PageTransition;
