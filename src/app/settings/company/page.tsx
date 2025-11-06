import CompanySettingsPage from '@/views/settings/company';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veroxos - Company Settings',
  description: 'View company settings',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function Company() {
  return (
    <Suspense>
      <CompanySettingsPage />
    </Suspense>
  );
}
