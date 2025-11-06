import APFAccountSummaryPage from '@/views/apf-accounts-summary';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string; name: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // Extract id from params
  const { id, name } = params;

  return {
    title: `APF ${id} | Veroxos`,
    description: 'Account Payable Feed Summary',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function Home({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <APFAccountSummaryPage apfPageId={parseInt(params.id)} />
    </Suspense>
  );
}
