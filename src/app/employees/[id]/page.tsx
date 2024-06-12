import EmployeeDetailPage from '@/views/employee-detail';
import { Suspense } from 'react';

export default function Detail({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <EmployeeDetailPage employeeId={parseInt(params.id)} />
    </Suspense>
  );
}
