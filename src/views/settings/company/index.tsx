'use client';

import React from 'react';
import InputField from '../components/input-field';
import LoadingSkeleton from '../components/loading-skeleton';
import { useGetUserSettings } from '@/hooks/useUserSettings';

function CompanySettingsPage() {
  const { data: user, isLoading: userLoading, isFetched: userFetched } = useGetUserSettings();

  return (
    <section className="w-full px-12 py-6">
      <div>
        <h1 className="text-2xl font-bold">Company</h1>
      </div>
      <div className="mt-12 w-3/5">
        {userLoading && <LoadingSkeleton rows={4} />}
        {userFetched && user && user.company && (
          <form>
            <InputField name="companyName" title="Company Name" value={user.company.name} />
            <InputField name="industrySector" title="Industry Sector" value={user.company.industrySector} />
            <InputField name="numberOfEmployees" title="Number of Employees" value={user.company.numberOfEmployees} />
            <InputField name="website" title="Website" value={user.company.website} />
          </form>
        )}
      </div>
    </section>
  );
}

export default CompanySettingsPage;
