import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    this.recordMetric(name, end - start);
    return result;
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    this.recordMetric(name, end - start);
    return result;
  }

  // Record a metric
  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  // Get average for a metric
  getAverage(name: string): number {
    const values = this.metrics.get(name) || [];
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  // Get all metrics
  getAllMetrics(): Record<string, { average: number; count: number; last: number }> {
    const result: Record<string, { average: number; count: number; last: number }> = {};
    this.metrics.forEach((values, name) => {
      result[name] = {
        average: this.getAverage(name),
        count: values.length,
        last: values[values.length - 1] || 0
      };
    });
    return result;
  }

  // Start observing performance entries
  startObserving() {
    if (typeof window === 'undefined') return;

    // Observe paint timings
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric(entry.name, entry.startTime);
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('paint', paintObserver);

      // Observe largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric('largest-contentful-paint', entry.startTime);
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // Observe first input delay
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          this.recordMetric('first-input-delay', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);
    }
  }

  // Stop observing
  stopObserving() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }

  // Report performance metrics
  reportMetrics(): void {
    const metrics = this.getAllMetrics();
    console.group('🚀 Performance Metrics');
    Object.entries(metrics).forEach(([name, data]) => {
      console.log(`${name}: ${data.average.toFixed(2)}ms (avg), ${data.last.toFixed(2)}ms (last)`);
    });
    console.groupEnd();
  }
}

// Performance hooks
export function usePerformanceMonitor() {
  const monitor = useMemo(() => PerformanceMonitor.getInstance(), []);
  
  useEffect(() => {
    monitor.startObserving();
    return () => monitor.stopObserving();
  }, [monitor]);

  return {
    measureFunction: monitor.measureFunction.bind(monitor),
    measureAsyncFunction: monitor.measureAsyncFunction.bind(monitor),
    recordMetric: monitor.recordMetric.bind(monitor),
    getMetrics: monitor.getAllMetrics.bind(monitor),
    reportMetrics: monitor.reportMetrics.bind(monitor)
  };
}

// Hook for measuring component render time
export function useRenderTime(componentName: string) {
  const renderCount = useRef(0);
  const monitor = PerformanceMonitor.getInstance();

  useEffect(() => {
    renderCount.current++;
    const renderTime = performance.now();
    monitor.recordMetric(`${componentName}-render-${renderCount.current}`, renderTime);
  });

  return renderCount.current;
}

// Hook for debounced values (performance optimization)
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for throttled values
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= delay) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
}

// Hook for intersection observer (lazy loading)
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}

// Hook for optimized async operations
export function useOptimizedAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await PerformanceMonitor.getInstance().measureAsyncFunction(
        'async-operation',
        asyncFunction
      );
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, dependencies);

  return { ...state, execute };
}

// Memory usage monitoring
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// Performance optimization utilities
export const performanceUtils = {
  // Optimize images
  optimizeImage: (src: string, width?: number, height?: number) => {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('f', 'webp');
    params.append('q', '80');
    
    return `${src}?${params.toString()}`;
  },

  // Preload critical resources
  preloadResource: (href: string, as: string) => {
    if (typeof document === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Prefetch resources
  prefetchResource: (href: string) => {
    if (typeof document === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  // Critical CSS injection
  injectCriticalCSS: (css: string) => {
    if (typeof document === 'undefined') return;
    
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  },

  // Measure FPS
  measureFPS: (duration: number = 1000): Promise<number> => {
    return new Promise((resolve) => {
      let frames = 0;
      const start = performance.now();
      
      const tick = () => {
        frames++;
        const now = performance.now();
        if (now - start < duration) {
          requestAnimationFrame(tick);
        } else {
          resolve(frames * 1000 / (now - start));
        }
      };
      
      requestAnimationFrame(tick);
    });
  },

  // Bundle size estimation
  estimateBundleSize: (): Promise<number> => {
    return new Promise((resolve) => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const transferSize = navigationEntry?.transferSize || 0;
        resolve(transferSize);
      } else {
        resolve(0);
      }
    });
  }
};

// Initialize performance monitoring
export function initializePerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  const monitor = PerformanceMonitor.getInstance();
  monitor.startObserving();

  // Report metrics every 30 seconds in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
      monitor.reportMetrics();
    }, 30000);
  }

  // Report critical metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      monitor.reportMetrics();
    }, 2000);
  });
} 