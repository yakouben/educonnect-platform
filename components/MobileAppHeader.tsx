'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Bell, MoreVertical, Heart, Share, Download, Menu, X, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MobileAppHeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showMenu?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
  onNotifications?: () => void;
  variant?: 'default' | 'transparent' | 'colored';
  className?: string;
}

export function MobileAppHeader({ 
  title, 
  showBack = false, 
  showSearch = true, 
  showNotifications = true, 
  showMenu = true,
  onBack,
  onSearch,
  onNotifications,
  variant = 'default',
  className 
}: MobileAppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Handle scroll to show/hide header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHeaderStyle = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent';
      case 'colored':
        return 'bg-gradient-to-r from-blue-500 to-purple-600';
      default:
        return cn(
          'bg-white/80 backdrop-blur-2xl border-b border-gray-200/50',
          isScrolled && 'bg-white/95 shadow-sm'
        );
    }
  };

  const getTextColor = () => {
    return variant === 'colored' ? 'text-white' : 'text-gray-900';
  };

  const getButtonStyle = () => {
    return variant === 'colored' 
      ? 'text-white/80 hover:text-white hover:bg-white/20' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
  };

  const handleNotificationClick = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onNotifications?.();
  };

  return (
    <>
      {/* Main Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          getHeaderStyle(),
          className
        )}
      >
        {/* Status bar space (iOS style) */}
        <div className="h-safe-area-inset-top bg-transparent" />
        
        {/* Header content */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center space-x-3">
              {showBack && (
                <button
                  onClick={onBack}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 active:scale-95 touch-manipulation",
                    getButtonStyle()
                  )}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              
              {showMenu && !showBack && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <Image
                      src="/logo-joinly.png"
                      alt="Joinly"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={cn(
                      "p-2 rounded-full transition-all duration-200 active:scale-95 touch-manipulation",
                      getButtonStyle()
                    )}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
              )}
              
              {/* Title */}
              <h1 className={cn(
                "text-lg font-semibold truncate",
                getTextColor()
              )}>
                {title}
              </h1>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-2">
              {showSearch && (
                <button
                  onClick={onSearch}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200 active:scale-95 touch-manipulation",
                    getButtonStyle()
                  )}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
              
              {showNotifications && (
                <button
                  onClick={handleNotificationClick}
                  className={cn(
                    "relative p-2 rounded-full transition-all duration-200 active:scale-95 touch-manipulation",
                    getButtonStyle()
                  )}
                >
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in font-bold">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </div>
                  )}
                </button>
              )}
              
              {/* Profile button */}
              <button className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white/20 transition-all duration-200 active:scale-95 touch-manipulation">
                <span className="text-white font-semibold text-sm">JD</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute top-safe-area-inset-top left-4 right-4 bg-white rounded-2xl shadow-2xl animate-scale-in">
            <div className="p-4 space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <Download className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Download App</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-left">
                <Share className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900 font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacing for fixed header */}
      <div className="h-safe-area-inset-top" />
      <div className="h-16" />
    </>
  );
} 