import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AppNav } from '@/components/AppNav';
import { ServiceWorkerRegistrar } from '@/components/ServiceWorkerRegistrar';
import { TimeZoneSync } from '@/components/TimeZoneSync';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Anguiano', template: '%s · Anguiano' },
  description: 'The Anguiano family app',
  manifest: '/manifest.webmanifest',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  appleWebApp: { capable: true, title: 'Anguiano', statusBarStyle: 'black-translucent' },
  icons: {
    icon: [{ url: '/app/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/app/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#131314',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <div
          className="mx-auto min-h-screen w-full max-w-lg px-4"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top))',
            paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))',
          }}
        >
          <ServiceWorkerRegistrar />
          <TimeZoneSync />
          {children}
        </div>
        <AppNav />
        <Analytics />
      </body>
    </html>
  );
}
