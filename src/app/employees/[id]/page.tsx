import EmployeeDetailPage from '@/views/employee-detail';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // Extract id from params
  const { id } = params;

  return {
    title: `Employee ${id}`,
    description: 'View Employees',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default function Detail({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <EmployeeDetailPage employeeId={parseInt(params.id)} />
    </Suspense>
  );
}
