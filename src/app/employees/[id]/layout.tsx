import Head from 'next/head';
import * as React from 'react';

export const metadata = {
  description: 'View Employees',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <Head>
        <title>Employee {params.id}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
      </Head>
      <main>{children}</main>
    </>
  );
}
