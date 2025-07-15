import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';

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
      { url: '/logo-joinly.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-joinly.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-joinly.png', sizes: '180x180', type: 'image/png' },
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo-joinly.png" />
      </head>
      <body className={`${inter.className} overflow-x-hidden font-inter`}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}