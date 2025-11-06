import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Services | Veroxos',
  description: 'View Services',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
