'use client';

import React from 'react';
import InputField from '../components/input-field';
import LoadingSkeleton from '../components/loading-skeleton';
import { useGetUserSettings } from '@/hooks/useUserSettings';

function ProfileSettingsPage() {
  const { data: user, isLoading: userLoading, isFetched: userFetched } = useGetUserSettings();

  return (
    <section className="w-full px-12 py-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <div className="mt-12 w-3/5">
        {userLoading && <LoadingSkeleton />}
        {userFetched && user && user.profile && (
          <form>
            <InputField name="fistName" title="First Name" value={user.profile.firstName} />
            <InputField name="lastName" title="Last Name" value={user.profile.lastName} />
            <InputField name="jobTitle" title="Job Title" value={user.profile.jobRole} />
            <InputField
              name="manager"
              title="Manager"
              value={user.profile?.manager?.firstName + ' ' + user.profile?.manager?.lastName}
            />
            <InputField name="adId" title="AD ID" value={user.profile.adId} />
            <InputField name="externalId" title="External ID" value={user.profile.externalId} />
          </form>
        )}
      </div>
    </section>
  );
}

export default ProfileSettingsPage;
