import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BaseLayout from '@/components/ui/baseLayout/layout';
import { Toaster } from 'react-hot-toast';
import Providers from '../../lib/query-provider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home | Veroxos',
  description: 'Home',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
        <Script
          id="ze-snippet"
          src="https://static.zdassets.com/ekr/snippet.js?key=938a4316-1359-46f8-83b5-f33bab574e7b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
