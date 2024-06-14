import InvoiceSummaryPage from '@/views/invoice-detail';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // Extract id from params
  const { id } = params;

  return {
    title: `Invocie - ${id}`,
    description: 'Invoice Summary',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function Home({ params }: { params: { id: string } }) {
   return (
    <Suspense>
      <InvoiceSummaryPage invoiceId={parseInt(params.id)} />
    </Suspense>
  );
}
