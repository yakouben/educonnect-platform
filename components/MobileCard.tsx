'use client';

import React, { useState, useRef, ReactNode, useMemo, useCallback, memo } from 'react';
import { Heart, Share, Bookmark, MoreVertical, MessageCircle, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRenderTime } from '@/lib/performance';

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onComment?: () => void;
  showActions?: boolean;
  isLiked?: boolean;
  isBookmarked?: boolean;
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  variant?: 'default' | 'elevated' | 'flat';
  pressable?: boolean;
  onPress?: () => void;
}

// Memoized action button component
const ActionButton = memo(({ 
  icon: Icon, 
  onClick, 
  className, 
  children,
  'data-testid': testId
}: {
  icon: React.ComponentType<any>;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center space-x-2 transition-colors active:scale-95 touch-manipulation",
      className
    )}
    data-testid={testId}
  >
    <Icon className="w-5 h-5 transition-all duration-200" />
    {children}
  </button>
));

ActionButton.displayName = 'ActionButton';

// Memoized swipe indicator component
const SwipeIndicator = memo(({ 
  swipeDistance, 
  onSwipeLeft, 
  onSwipeRight 
}: {
  swipeDistance: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}) => {
  const opacity = useMemo(() => Math.min(Math.abs(swipeDistance) / 100, 1), [swipeDistance]);
  
  if (swipeDistance > 0 && onSwipeRight) {
    return (
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <div 
          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center gpu-accelerated"
          style={{ opacity }}
        >
          <Heart className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  } else if (swipeDistance < 0 && onSwipeLeft) {
    return (
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <div 
          className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center gpu-accelerated"
          style={{ opacity }}
        >
          <Bookmark className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  }
  
  return null;
});

SwipeIndicator.displayName = 'SwipeIndicator';

// Memoized actions bar component
const ActionsBar = memo(({ 
  liked, 
  bookmarked, 
  likeCounter, 
  commentCount, 
  viewCount, 
  onLike, 
  onComment, 
  onShare, 
  onBookmark 
}: {
  liked: boolean;
  bookmarked: boolean;
  likeCounter: number;
  commentCount: number;
  viewCount: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}) => {
  const likeButtonClasses = useMemo(() => cn(
    "text-gray-600 hover:text-red-500 transition-colors",
    liked && "text-red-500"
  ), [liked]);

  const bookmarkButtonClasses = useMemo(() => cn(
    "text-gray-600 hover:text-blue-500 transition-colors",
    bookmarked && "text-blue-500"
  ), [bookmarked]);

  const heartClasses = useMemo(() => cn(
    "w-5 h-5 transition-all duration-200",
    liked && "fill-red-500 text-red-500 scale-110"
  ), [liked]);

  const bookmarkIconClasses = useMemo(() => cn(
    "w-5 h-5 transition-all duration-200",
    bookmarked && "fill-blue-500 text-blue-500 scale-110"
  ), [bookmarked]);

  return (
    <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Like button */}
          <ActionButton
            icon={Heart}
            onClick={onLike}
            className={likeButtonClasses}
            data-testid="like-button"
          >
            <Heart className={heartClasses} />
            {likeCounter > 0 && (
              <span className="text-sm font-medium">{likeCounter}</span>
            )}
          </ActionButton>
          
          {/* Comment button */}
          <ActionButton
            icon={MessageCircle}
            onClick={onComment}
            className="text-gray-600 hover:text-blue-500 transition-colors"
            data-testid="comment-button"
          >
            <MessageCircle className="w-5 h-5" />
            {commentCount > 0 && (
              <span className="text-sm font-medium">{commentCount}</span>
            )}
          </ActionButton>
          
          {/* View count */}
          {viewCount > 0 && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{viewCount}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Share button */}
          <ActionButton
            icon={Share}
            onClick={onShare}
            className="text-gray-600 hover:text-blue-500 transition-colors"
            data-testid="share-button"
          >
            <Share className="w-5 h-5" />
          </ActionButton>
          
          {/* Bookmark button */}
          <ActionButton
            icon={Bookmark}
            onClick={onBookmark}
            className={bookmarkButtonClasses}
            data-testid="bookmark-button"
          >
            <Bookmark className={bookmarkIconClasses} />
          </ActionButton>
          
          {/* More options */}
          <ActionButton
            icon={MoreVertical}
            className="text-gray-600 hover:text-gray-800 transition-colors"
            data-testid="more-button"
          >
            <MoreVertical className="w-5 h-5" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
});

ActionsBar.displayName = 'ActionsBar';

export const MobileCard = memo(({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onLike,
  onShare,
  onBookmark,
  onComment,
  showActions = false,
  isLiked = false,
  isBookmarked = false,
  likeCount = 0,
  commentCount = 0,
  viewCount = 0,
  variant = 'default',
  pressable = false,
  onPress
}: MobileCardProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCounter, setLikeCounter] = useState(likeCount);
  
  // Performance monitoring
  const renderCount = useRenderTime('MobileCard');
  
  // Refs for touch handling
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Memoized style variants
  const cardStyles = useMemo(() => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg border border-gray-100';
      case 'flat':
        return 'bg-gray-50 border border-gray-200';
      default:
        return 'bg-white shadow-sm border border-gray-200';
    }
  }, [variant]);

  // Memoized container classes
  const containerClasses = useMemo(() => cn(
    "relative rounded-2xl overflow-hidden transition-all duration-200 gpu-accelerated will-change-transform",
    cardStyles,
    pressable && "active:scale-[0.98] touch-manipulation",
    isPressed && "scale-[0.98]",
    className
  ), [cardStyles, pressable, isPressed, className]);

  // Memoized transform and opacity styles
  const transformStyles = useMemo(() => ({
    transform: `translateX(${isDragging ? swipeDistance * 0.3 : 0}px)`,
    opacity: isDragging ? 0.9 : 1
  }), [isDragging, swipeDistance]);

  // Optimized touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!onSwipeLeft && !onSwipeRight && !pressable) return;
    
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    currentXRef.current = touch.clientX;
    
    if (pressable) {
      setIsPressed(true);
    }
  }, [onSwipeLeft, onSwipeRight, pressable]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!onSwipeLeft && !onSwipeRight) return;
    
    const touch = e.touches[0];
    currentXRef.current = touch.clientX;
    const deltaX = currentXRef.current - startXRef.current;
    
    if (Math.abs(deltaX) > 10) {
      setIsDragging(true);
      setSwipeDistance(deltaX);
    }
  }, [onSwipeLeft, onSwipeRight]);

  const handleTouchEnd = useCallback(() => {
    if (pressable) {
      setIsPressed(false);
      if (!isDragging && onPress) {
        onPress();
      }
    }
    
    if (!isDragging) return;
    
    const deltaX = currentXRef.current - startXRef.current;
    const threshold = 100;
    
    if (deltaX > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (deltaX < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    
    // Reset with animation frame for smooth transition
    requestAnimationFrame(() => {
      setIsDragging(false);
      setSwipeDistance(0);
    });
  }, [pressable, isDragging, onPress, onSwipeRight, onSwipeLeft]);

  // Optimized like handler
  const handleLike = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
    
    setLiked(!liked);
    setLikeCounter(liked ? likeCounter - 1 : likeCounter + 1);
    onLike?.();
  }, [liked, likeCounter, onLike]);

  // Optimized bookmark handler
  const handleBookmark = useCallback(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
    
    setBookmarked(!bookmarked);
    onBookmark?.();
  }, [bookmarked, onBookmark]);

  return (
    <div
      ref={cardRef}
      className={containerClasses}
      style={transformStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe indicators */}
      <SwipeIndicator 
        swipeDistance={swipeDistance}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
      
      {/* Card content */}
      <div className="p-4">
        {children}
      </div>
      
      {/* Actions bar */}
      {showActions && (
        <ActionsBar
          liked={liked}
          bookmarked={bookmarked}
          likeCounter={likeCounter}
          commentCount={commentCount}
          viewCount={viewCount}
          onLike={handleLike}
          onComment={onComment}
          onShare={onShare}
          onBookmark={handleBookmark}
        />
      )}
      
      {/* Performance debug info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded text-xs font-mono">
          {renderCount}
        </div>
      )}
    </div>
  );
});

MobileCard.displayName = 'MobileCard'; 