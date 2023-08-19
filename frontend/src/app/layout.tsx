import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import PageLayout from '@/components/common/PageLayout';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import GoogleTagManager from '@/components/common/GoogleTagManager';
import GoogleTagNoScript from '@/components/common/GoogleTagNoScript';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-House Automation',
  description: 'Automate dinner reservation form',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <GoogleAnalytics />
        <GoogleTagManager />
      </head>
      <UserProvider>
        <body className={inter.className}>
          <GoogleTagNoScript />
          <PageLayout>{children}</PageLayout>
        </body>
      </UserProvider>
    </html>
  );
}
