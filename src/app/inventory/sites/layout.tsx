import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Service Sites',
  description: 'View Service Sites',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}