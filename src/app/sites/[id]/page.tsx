import SiteDetailPage from '@/views/site-detail';
import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = params;

  return {
    title: `Site ${id} | Veroxos`,
    description: 'Site Summary',
    icons: {
      icon: '/favicon.ico',
    },
  };
}
export default function Home({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <SiteDetailPage siteId={parseInt(params.id)} />
    </Suspense>
  );
}
