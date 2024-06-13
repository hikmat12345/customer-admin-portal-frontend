import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vendor Details',
  description: 'View Vendor',
  icons: {
    icon: '/favicon.svg',
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
