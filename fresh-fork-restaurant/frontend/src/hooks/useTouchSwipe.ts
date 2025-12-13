import { useRef, useState, useCallback } from 'react';

interface SwipeHandlers {
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchMove: (e: React.TouchEvent) => void;
    handleTouchEnd: () => void;
}

export const useTouchSwipe = (totalItems: number): SwipeHandlers & {
    currentIndex: number;
    isDragging: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
    goToSlide: (index: number) => void;
    cardOffset: number;
} => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [cardOffset, setCardOffset] = useState(0);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
        setCardOffset(0);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        
        const x = e.touches[0].clientX;
        setCurrentX(x);
        const diff = x - startX;
        setCardOffset(diff);
    }, [isDragging, startX]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;
        
        const diff = currentX - startX;
        const threshold = 100; // Minimum swipe distance
        
        if (Math.abs(diff) > threshold) {
            // Swipe detected - move to next card
            if (currentIndex < totalItems - 1) {
                setCurrentIndex(prev => prev + 1);
            }
        }
        
        // Reset
        setIsDragging(false);
        setCardOffset(0);
    }, [isDragging, currentX, startX, currentIndex, totalItems]);

    const goToSlide = useCallback((index: number) => {
        if (index >= 0 && index < totalItems) {
            setCurrentIndex(index);
        }
    }, [totalItems]);

    return {
        currentIndex,
        isDragging,
        containerRef,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        goToSlide,
        cardOffset
    };
};
