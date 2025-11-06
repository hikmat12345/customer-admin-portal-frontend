import { Suspense } from 'react';
import { Metadata } from 'next';
import DashboardSettingsPage from '@/views/settings/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard Settings - Veroxos',
  description: 'View dashboard settings',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function DashboardSettings() {
  return (
    <Suspense>
      <DashboardSettingsPage />
    </Suspense>
  );
}
