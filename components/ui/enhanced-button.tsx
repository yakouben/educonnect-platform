'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useState, MouseEvent } from 'react';
import { Loader2 } from 'lucide-react';

interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  ripple?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function EnhancedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  ripple = true,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}: EnhancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled || loading) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);

    onClick?.(e);
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border border-gray-300',
    ghost: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-200 hover:border-blue-300',
    destructive: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-xl',
    md: 'h-10 px-4 text-sm rounded-xl',
    lg: 'h-12 px-6 text-base rounded-2xl',
    xl: 'h-14 px-8 text-lg rounded-2xl',
  };

  return (
    <button
      onClick={createRipple}
      disabled={disabled || loading}
      className={cn(
        // Base styles
        'relative overflow-hidden font-medium transition-all duration-200 transform',
        'inline-flex items-center justify-center',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
        'disabled:pointer-events-none disabled:opacity-50',
        
        // Size and border radius variants
        sizes[size],
        
        // Width variants
        fullWidth && 'w-full',
        
        // Variant styles
        variant === 'primary' && [
          'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
          'hover:from-blue-600 hover:to-blue-700',
          'shadow-lg hover:shadow-xl',
          'border border-blue-400/20',
        ],
        variant === 'secondary' && [
          'bg-white/10 backdrop-blur-sm text-white',
          'hover:bg-white/20',
          'border border-white/20 hover:border-white/40',
        ],
        variant === 'outline' && [
          'bg-transparent border-2 border-white/30 text-white',
          'hover:bg-white/10 hover:border-white/50',
        ],
        variant === 'ghost' && [
          'bg-transparent text-white',
          'hover:bg-white/10',
        ],
        
        className
      )}
    >
      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '600ms',
          }}
        />
      ))}

      {/* Content */}
      <span className="relative flex items-center justify-center space-x-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        <span>{children}</span>
        {!loading && icon && iconPosition === 'right' && icon}
      </span>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  );
} 