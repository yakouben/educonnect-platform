'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

export function GlassCard({ children, className, hover = true, gradient = 'blue' }: GlassCardProps) {
  const gradientClasses = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-400/20 hover:from-blue-500/20 hover:to-blue-600/10',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-400/20 hover:from-purple-500/20 hover:to-purple-600/10',
    green: 'from-emerald-500/10 to-emerald-600/5 border-emerald-400/20 hover:from-emerald-500/20 hover:to-emerald-600/10',
    orange: 'from-orange-500/10 to-orange-600/5 border-orange-400/20 hover:from-orange-500/20 hover:to-orange-600/10',
    red: 'from-red-500/10 to-red-600/5 border-red-400/20 hover:from-red-500/20 hover:to-red-600/10',
  };

  return (
    <div 
      className={cn(
        "relative backdrop-blur-xl bg-gradient-to-br border shadow-lg rounded-2xl transition-all duration-300",
        gradientClasses[gradient],
        hover && "hover:scale-105 hover:-translate-y-1 hover:shadow-2xl",
        "dark:from-white/5 dark:to-white/2 dark:border-white/10",
        className
      )}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 