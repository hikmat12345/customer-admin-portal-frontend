import Head from 'next/head';
import * as React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
