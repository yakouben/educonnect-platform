'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text' | 'card';
}

export function Skeleton({ className, variant = 'default' }: SkeletonProps) {
  const variants = {
    default: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    text: 'h-3 rounded w-full',
    card: 'h-32 rounded-2xl',
  };

  return (
    <div 
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
        "bg-[length:200%_100%] animate-[shimmer_2s_infinite]",
        variants[variant],
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton variant="card" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
}

export function SkeletonCourseCard() {
  return (
    <div className="rounded-2xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton variant="circular" className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton variant="circular" className="w-6 h-6" />
      </div>
    </div>
  );
}
