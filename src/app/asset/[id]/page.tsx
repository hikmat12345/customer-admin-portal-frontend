import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import AssetSummaryPage from '@/views/asset-summary';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = params;

  return {
    title: `Asset ${id} | Veroxos`,
    description: 'Asset Summary',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <AssetSummaryPage />
    </Suspense>
  );
}
