import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Joinly - Learning Platform',
  description: 'Modern learning platform with responsive design, courses, community, and social features',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Joinly',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Joinly',
    title: 'Joinly - Learning Platform',
    description: 'Modern learning platform with courses, community, and social features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joinly - Learning Platform',
    description: 'Modern learning platform with courses, community, and social features',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Joinly',
    'application-name': 'Joinly',
    'msapplication-TileColor': '#1e40af',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#1e40af',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* PWA and mobile optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Joinly" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Joinly" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Critical CSS preload */}
        <link rel="preload" as="style" href="/globals.css" />
        
        {/* iOS splash screens */}
        <link rel="apple-touch-startup-image" href="/splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-1668x2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-1536x2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-1242x2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/splash-828x1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
        
        {/* Preload critical resources */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
        <link rel="preload" href="/icon.png" as="image" />
        <link rel="preload" href="/icon.png" as="image" />
      </head>
      <body className={`${inter.className} overflow-x-hidden font-inter`}>
        <ThemeProvider>
          {/* App shell with performance optimizations */}
          <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 gpu-accelerated">
            {children}
          </div>
          
          {/* Performance monitoring initialization */}
          <Script id="performance-init" strategy="afterInteractive">
            {`
              (function() {
                'use strict';
                
                // Initialize performance monitoring
                if (typeof window !== 'undefined') {
                  window.perfMonitor = {
                    marks: {},
                    measures: {},
                    metrics: {
                      timeToFirstByte: 0,
                      firstContentfulPaint: 0,
                      largestContentfulPaint: 0,
                      firstInputDelay: 0,
                      cumulativeLayoutShift: 0
                    }
                  };
                  
                  // Mark key performance points
                  window.perfMonitor.mark = function(name) {
                    if (performance.mark) {
                      performance.mark(name);
                      window.perfMonitor.marks[name] = performance.now();
                    }
                  };
                  
                  window.perfMonitor.measure = function(name, startMark, endMark) {
                    if (performance.measure) {
                      performance.measure(name, startMark, endMark);
                      const measure = performance.getEntriesByName(name)[0];
                      window.perfMonitor.measures[name] = measure.duration;
                    }
                  };
                  
                  // Core Web Vitals monitoring
                  if ('PerformanceObserver' in window) {
                    // Largest Contentful Paint
                    const lcpObserver = new PerformanceObserver((list) => {
                      const entries = list.getEntries();
                      const lastEntry = entries[entries.length - 1];
                      window.perfMonitor.metrics.largestContentfulPaint = lastEntry.startTime;
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                    
                    // First Input Delay
                    const fidObserver = new PerformanceObserver((list) => {
                      const entries = list.getEntries();
                      entries.forEach((entry) => {
                        window.perfMonitor.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                      });
                    });
                    fidObserver.observe({ entryTypes: ['first-input'] });
                    
                    // Cumulative Layout Shift
                    const clsObserver = new PerformanceObserver((list) => {
                      let clsValue = 0;
                      const entries = list.getEntries();
                      entries.forEach((entry) => {
                        if (!entry.hadRecentInput) {
                          clsValue += entry.value;
                        }
                      });
                      window.perfMonitor.metrics.cumulativeLayoutShift = clsValue;
                    });
                    clsObserver.observe({ entryTypes: ['layout-shift'] });
                    
                    // First Contentful Paint
                    const fcpObserver = new PerformanceObserver((list) => {
                      const entries = list.getEntries();
                      entries.forEach((entry) => {
                        if (entry.name === 'first-contentful-paint') {
                          window.perfMonitor.metrics.firstContentfulPaint = entry.startTime;
                        }
                      });
                    });
                    fcpObserver.observe({ entryTypes: ['paint'] });
                  }
                  
                  // Memory monitoring
                  if (performance.memory) {
                    window.perfMonitor.getMemoryInfo = function() {
                      return {
                        usedJSHeapSize: performance.memory.usedJSHeapSize,
                        totalJSHeapSize: performance.memory.totalJSHeapSize,
                        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                      };
                    };
                  }
                  
                  // Report performance metrics
                  window.perfMonitor.report = function() {
                    const metrics = window.perfMonitor.metrics;
                    const navigation = performance.getEntriesByType('navigation')[0];
                    
                    if (navigation) {
                      metrics.timeToFirstByte = navigation.responseStart - navigation.requestStart;
                    }
                    
                    console.group('🚀 Performance Metrics');
                    console.log('Time to First Byte:', metrics.timeToFirstByte.toFixed(2) + 'ms');
                    console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2) + 'ms');
                    console.log('Largest Contentful Paint:', metrics.largestContentfulPaint.toFixed(2) + 'ms');
                    console.log('First Input Delay:', metrics.firstInputDelay.toFixed(2) + 'ms');
                    console.log('Cumulative Layout Shift:', metrics.cumulativeLayoutShift.toFixed(4));
                    if (window.perfMonitor.getMemoryInfo) {
                      const memory = window.perfMonitor.getMemoryInfo();
                      console.log('Memory Usage:', (memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB');
                    }
                    console.groupEnd();
                  };
                  
                  // Mark page load start
                  window.perfMonitor.mark('page-load-start');
                  
                  // Report metrics on page load
                  window.addEventListener('load', () => {
                    window.perfMonitor.mark('page-load-end');
                    window.perfMonitor.measure('page-load-duration', 'page-load-start', 'page-load-end');
                    
                    // Report after a short delay to capture all metrics
                    setTimeout(() => {
                      window.perfMonitor.report();
                    }, 1000);
                  });
                }
              })();
            `}
          </Script>
          
          {/* Service Worker Registration */}
          <Script id="sw-registration" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                      
                      // Listen for updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              // New service worker is available
                              if (confirm('New version available! Update now?')) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                              }
                            }
                          });
                        }
                      });
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `}
          </Script>
          
          {/* Install PWA Prompt */}
          <Script id="install-prompt" strategy="afterInteractive">
            {`
              let deferredPrompt;
              let installShown = false;
              
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Show install prompt after user interaction
                if (!installShown) {
                  setTimeout(() => {
                    showInstallPrompt();
                  }, 30000); // Show after 30 seconds
                }
              });
              
              function showInstallPrompt() {
                if (deferredPrompt && !installShown) {
                  installShown = true;
                  
                  // Create install banner
                  const banner = document.createElement('div');
                  banner.id = 'install-banner';
                  banner.innerHTML = \`
                    <div class="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 z-50 border border-gray-200 animate-slide-up gpu-accelerated">
                      <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                        </div>
                        <div class="flex-1">
                          <h3 class="font-semibold text-gray-900">Install Joinly</h3>
                          <p class="text-sm text-gray-600">Get the full app experience!</p>
                        </div>
                        <button id="install-button" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors active:scale-95">
                          Install
                        </button>
                        <button id="dismiss-button" class="p-2 text-gray-400 hover:text-gray-600 transition-colors active:scale-95">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  \`;
                  
                  document.body.appendChild(banner);
                  
                  // Handle install button click
                  document.getElementById('install-button').addEventListener('click', () => {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult) => {
                      if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                      }
                      deferredPrompt = null;
                      banner.remove();
                    });
                  });
                  
                  // Handle dismiss button click
                  document.getElementById('dismiss-button').addEventListener('click', () => {
                    banner.remove();
                  });
                  
                  // Auto dismiss after 10 seconds
                  setTimeout(() => {
                    if (document.getElementById('install-banner')) {
                      banner.remove();
                    }
                  }, 10000);
                }
              }
              
              // Handle app installed
              window.addEventListener('appinstalled', (evt) => {
                console.log('App installed successfully');
                
                // Show success message
                const successBanner = document.createElement('div');
                successBanner.innerHTML = \`
                  <div class="fixed top-4 left-4 right-4 bg-green-500 text-white rounded-2xl p-4 z-50 shadow-2xl animate-slide-down gpu-accelerated">
                    <div class="flex items-center space-x-3">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span class="font-medium">Joinly installed successfully!</span>
                    </div>
                  </div>
                \`;
                
                document.body.appendChild(successBanner);
                
                setTimeout(() => {
                  successBanner.remove();
                }, 3000);
              });
            `}
          </Script>
          
          {/* Haptic Feedback for iOS */}
          <Script id="haptic-feedback" strategy="afterInteractive">
            {`
              // Enhanced haptic feedback helper
              window.hapticFeedback = (type = 'impact') => {
                if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
                  // iOS haptic feedback
                  if (navigator.vibrate) {
                    switch (type) {
                      case 'light':
                        navigator.vibrate(10);
                        break;
                      case 'medium':
                        navigator.vibrate(20);
                        break;
                      case 'heavy':
                        navigator.vibrate(50);
                        break;
                      case 'selection':
                        navigator.vibrate(5);
                        break;
                      case 'notification':
                        navigator.vibrate([100, 50, 100]);
                        break;
                      default:
                        navigator.vibrate(30);
                    }
                  }
                }
              };
              
              // Performance optimization helpers
              window.optimizePerformance = {
                // Debounce function
                debounce: function(func, wait) {
                  let timeout;
                  return function executedFunction(...args) {
                    const later = () => {
                      clearTimeout(timeout);
                      func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                  };
                },
                
                // Throttle function
                throttle: function(func, limit) {
                  let inThrottle;
                  return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                      func.apply(context, args);
                      inThrottle = true;
                      setTimeout(() => inThrottle = false, limit);
                    }
                  };
                },
                
                // Lazy load images
                lazyLoadImages: function() {
                  const images = document.querySelectorAll('img[data-src]');
                  const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                      }
                    });
                  });
                  
                  images.forEach(img => imageObserver.observe(img));
                }
              };
              
              // Initialize lazy loading
              document.addEventListener('DOMContentLoaded', () => {
                window.optimizePerformance.lazyLoadImages();
              });
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}