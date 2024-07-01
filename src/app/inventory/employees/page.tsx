import EmployeesPage from '@/views/employees';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Suspense>
      <EmployeesPage />
    </Suspense>
  );
}
