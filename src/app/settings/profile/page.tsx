import { Suspense } from 'react';
import ProfileSettingsPage from '@/views/settings/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veroxos - Profile Settings',
  description: 'View profile settings',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function Profile() {
  return (
    <Suspense>
      <ProfileSettingsPage />
    </Suspense>
  );
}
