'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { RefreshCw, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  disabled?: boolean;
  className?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  threshold = 100,
  disabled = false,
  className
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);
  const [canPull, setCanPull] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    
    const touch = e.touches[0];
    setStartY(touch.clientY);
    touchStartRef.current = touch.clientY;
    
    // Check if we're at the top of the page
    const isAtTop = window.scrollY === 0;
    setCanPull(isAtTop);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || !canPull) return;
    
    const touch = e.touches[0];
    const currentY = touch.clientY;
    const deltaY = currentY - startY;
    
    if (deltaY > 0) {
      // Prevent default scrolling when pulling down
      e.preventDefault();
      
      // Apply resistance to the pull
      const resistance = 0.6;
      const distance = Math.min(deltaY * resistance, threshold * 2);
      
      setPullDistance(distance);
      setIsPulling(distance > 20);
    }
  };

  const handleTouchEnd = () => {
    if (disabled || isRefreshing || !canPull) return;
    
    if (pullDistance >= threshold) {
      triggerRefresh();
    } else {
      resetPull();
    }
  };

  const triggerRefresh = async () => {
    if (disabled || isRefreshing) return;
    
    setIsRefreshing(true);
    
    // Haptic feedback
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
      resetPull();
    }
  };

  const resetPull = () => {
    setIsPulling(false);
    setPullDistance(0);
    setCanPull(false);
  };

  const getRefreshStatus = () => {
    if (isRefreshing) return 'refreshing';
    if (pullDistance >= threshold) return 'ready';
    if (isPulling) return 'pulling';
    return 'idle';
  };

  const getRefreshText = () => {
    switch (getRefreshStatus()) {
      case 'refreshing':
        return 'Refreshing...';
      case 'ready':
        return 'Release to refresh';
      case 'pulling':
        return 'Pull to refresh';
      default:
        return '';
    }
  };

  const getIconRotation = () => {
    if (isRefreshing) return 'animate-spin';
    if (pullDistance >= threshold) return 'rotate-180';
    return '';
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 z-10 flex items-center justify-center transition-all duration-300 ease-out",
          "bg-gradient-to-b from-blue-50 to-transparent"
        )}
        style={{
          height: `${Math.min(pullDistance, threshold * 1.5)}px`,
          transform: `translateY(-${Math.max(0, threshold * 1.5 - pullDistance)}px)`
        }}
      >
        <div className={cn(
          "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
          "bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200/50",
          isPulling && "scale-100 opacity-100",
          !isPulling && "scale-0 opacity-0"
        )}>
          {isRefreshing ? (
            <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
          ) : (
            <ArrowDown className={cn(
              "w-5 h-5 text-gray-600 transition-transform duration-300",
              getIconRotation()
            )} />
          )}
          <span className="text-sm font-medium text-gray-700">
            {getRefreshText()}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {isPulling && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-150"
            style={{ width: `${Math.min((pullDistance / threshold) * 100, 100)}%` }}
          />
        </div>
      )}

      {/* Content */}
      <div 
        className={cn(
          "transition-transform duration-300 ease-out",
          isRefreshing && "transform translate-y-16"
        )}
        style={{
          transform: `translateY(${isPulling ? pullDistance * 0.5 : 0}px)`
        }}
      >
        {children}
      </div>
    </div>
  );
} 