import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory Summary',
  description: 'View Inventory Summary',
  icons: {
    icon: '/favicon.svg',
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
