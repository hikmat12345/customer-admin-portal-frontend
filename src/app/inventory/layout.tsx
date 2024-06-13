import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Inventory',
  description: 'View Inventory',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
