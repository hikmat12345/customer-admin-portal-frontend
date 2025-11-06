import InventoryDetailPage from '@/views/inventory-detail';
import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = params;

  return {
    title: `Service ${id} | Veroxos`,
    description: 'View Service',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <InventoryDetailPage serviceId={parseInt(params.id)} />
    </Suspense>
  );
}
