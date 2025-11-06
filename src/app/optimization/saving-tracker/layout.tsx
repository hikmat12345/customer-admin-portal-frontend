import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Optimization',
  description: 'View Optimization',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
