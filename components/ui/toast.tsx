'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

function Toast({ toast, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const variants = {
    success: {
      icon: CheckCircle,
      className: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-100',
      iconColor: 'text-emerald-500',
    },
    error: {
      icon: AlertCircle,
      className: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/20 dark:text-red-100',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      className: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      className: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-100',
      iconColor: 'text-blue-500',
    },
  };

  const variant = variants[toast.variant || 'info'];
  const Icon = variant.icon;

  return (
    <div
    className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-300',
        'transform-gpu',
        isVisible && !isLeaving ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95',
        variant.className
      )}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', variant.iconColor)} />
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{toast.title}</p>
            {toast.description && (
              <p className="mt-1 text-sm opacity-80">{toast.description}</p>
            )}
            
            {toast.action && (
              <div className="mt-3">
                <button
                  onClick={toast.action.onClick}
                  className="text-sm font-medium hover:underline focus:outline-none focus:underline"
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      {toast.duration !== 0 && (
        <div className="h-1 bg-black/10">
          <div 
            className="h-full bg-current opacity-50 transition-all ease-linear"
            style={{
              width: isVisible ? '0%' : '100%',
              transitionDuration: `${toast.duration || 5000}ms`,
            }}
          />
        </div>
      )}
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

// Hook for managing toasts
export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const success = (title: string, description?: string) => {
    addToast({ title, description, variant: 'success' });
  };

  const error = (title: string, description?: string) => {
    addToast({ title, description, variant: 'error' });
  };

  const warning = (title: string, description?: string) => {
    addToast({ title, description, variant: 'warning' });
  };

  const info = (title: string, description?: string) => {
    addToast({ title, description, variant: 'info' });
  };

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}
