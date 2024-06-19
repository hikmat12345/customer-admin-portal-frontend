import SiteDetailPage from '@/views/site-detail';
import { Suspense } from 'react';

export default function Home({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <SiteDetailPage siteId={parseInt(params.id)} />
    </Suspense>
  );
}
