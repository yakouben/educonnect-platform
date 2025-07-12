'use client';

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Home, BookOpen, Users, MessageSquare, Hash, Plus, Bell, Search, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThrottle, useRenderTime } from '@/lib/performance';

interface EnhancedMobileBottomNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Memoized nav items to prevent recreation on every render
const navItems = [
  { id: 'home', label: 'Home', icon: Home, color: 'from-blue-500 to-blue-600' },
  { id: 'spaces', label: 'Spaces', icon: Hash, color: 'from-purple-500 to-purple-600' },
  { id: 'courses', label: 'Courses', icon: BookOpen, color: 'from-green-500 to-green-600' },
  { id: 'members', label: 'Members', icon: Users, color: 'from-orange-500 to-orange-600' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'from-pink-500 to-pink-600' },
];

// Memoized individual nav item component
const NavItem = memo(({ 
  item, 
  index, 
  isActive, 
  isPressed, 
  onPress 
}: {
  item: typeof navItems[number];
  index: number;
  isActive: boolean;
  isPressed: boolean;
  onPress: () => void;
}) => {
  const Icon = item.icon;
  
  // Memoize styles to prevent recalculation
  const containerStyle = useMemo(() => ({
    minHeight: '64px',
    animationDelay: `${index * 50}ms`
  }), [index]);

  return (
    <button
      onTouchStart={onPress}
      onClick={onPress}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 min-w-0 flex-1 relative overflow-hidden",
        "active:scale-95 touch-manipulation",
        isPressed && "scale-95"
      )}
      style={containerStyle}
    >
      {/* Ripple effect */}
      {isPressed && (
        <div className="absolute inset-0 bg-gray-200 rounded-2xl opacity-50 animate-ping" />
      )}
      
      {/* Icon container */}
      <div className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300",
        isActive
          ? `bg-gradient-to-br ${item.color} shadow-lg scale-110`
          : "bg-gray-100 hover:bg-gray-200",
        isPressed && "scale-90"
      )}>
        {/* Active indicator */}
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
        )}
        
        <Icon 
          className={cn(
            "w-5 h-5 transition-all duration-200",
            isActive ? "text-white" : "text-gray-600"
          )} 
        />
        
        {/* Badge for notifications */}
        {item.id === 'messages' && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in font-bold">
            3
          </div>
        )}
      </div>
      
      {/* Label */}
      <span className={cn(
        "text-xs font-medium transition-all duration-200 truncate",
        isActive 
          ? "text-gray-900 font-semibold" 
          : "text-gray-500"
      )}>
        {item.label}
      </span>
      
      {/* Active dot */}
      {isActive && (
        <div className="absolute bottom-0 w-1 h-1 bg-gray-900 rounded-full animate-scale-in" />
      )}
    </button>
  );
});

NavItem.displayName = 'NavItem';

// Memoized speed dial component
const SpeedDial = memo(() => {
  const speedDialItems = useMemo(() => [
    { icon: BookOpen, color: 'bg-green-500', label: 'Course' },
    { icon: Users, color: 'bg-purple-500', label: 'Group' },
    { icon: MessageSquare, color: 'bg-pink-500', label: 'Message' },
  ], []);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col-reverse space-y-reverse space-y-3">
      {speedDialItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button 
            key={index}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation",
              item.color
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Icon className="w-6 h-6 text-white" />
          </button>
        );
      })}
    </div>
  );
});

SpeedDial.displayName = 'SpeedDial';

export const EnhancedMobileBottomNav = memo(({ 
  activeSection, 
  setActiveSection 
}: EnhancedMobileBottomNavProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  
  // Performance monitoring
  const renderCount = useRenderTime('EnhancedMobileBottomNav');
  
  // Throttle scroll events for better performance
  const throttledScrollY = useThrottle(lastScrollY, 16); // 60fps

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 100);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Optimized scroll event listener
  useEffect(() => {
    let ticking = false;
    
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScrollHandler);
  }, [handleScroll]);

  // Memoized press handler
  const handlePress = useCallback((itemId: string) => {
    setPressedItem(itemId);
    
    // Haptic feedback (if supported)
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Visual feedback with requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        setPressedItem(null);
        setActiveSection(itemId);
      }, 150);
    });
  }, [setActiveSection]);

  // Memoized navigation items with callbacks
  const memoizedNavItems = useMemo(() => 
    navItems.map((item, index) => ({
      ...item,
      isActive: activeSection === item.id,
      isPressed: pressedItem === item.id,
      onPress: () => handlePress(item.id),
      index
    })), 
    [activeSection, pressedItem, handlePress]
  );

  // Memoized container classes
  const containerClasses = useMemo(() => cn(
    "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 transform gpu-accelerated will-change-transform",
    isVisible ? "translate-y-0" : "translate-y-full"
  ), [isVisible]);

  return (
    <>
      {/* Bottom Navigation */}
      <div className={containerClasses}>
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border-t border-gray-200/50" />
        
        {/* Safe area padding for iPhone */}
        <div className="relative px-4 pt-2 pb-safe-area-inset-bottom">
          <div className="flex items-center justify-between">
            {memoizedNavItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                index={item.index}
                isActive={item.isActive}
                isPressed={item.isPressed}
                onPress={item.onPress}
              />
            ))}
            
            {/* Floating Action Button */}
            <div className="flex flex-col items-center justify-center min-w-0">
              <button className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-1 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation relative overflow-hidden gpu-accelerated">
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-0 hover:opacity-100" />
                <Plus className="w-6 h-6 text-white" />
              </button>
              <span className="text-xs font-medium text-gray-500">Add</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Speed Dial */}
      <SpeedDial />
      
      {/* Performance debug info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-32 left-2 bg-black/50 text-white p-2 rounded text-xs font-mono z-50">
          Renders: {renderCount}
        </div>
      )}
    </>
  );
});

EnhancedMobileBottomNav.displayName = 'EnhancedMobileBottomNav'; 