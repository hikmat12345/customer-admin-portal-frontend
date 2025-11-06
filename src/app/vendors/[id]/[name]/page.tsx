import VendorDetailPage from '@/views/account-detail';
import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { decrypt } from '@/utils/encryptParam';

type Props = {
  params: { id: string; name: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id, name } = params;

  return {
    title: `Vendor ${id} - ${decrypt(name)} | Veroxos`,
    description: 'Asset Summary',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function Detail({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <VendorDetailPage vendorId={parseInt(params.id)} />
    </Suspense>
  );
}
