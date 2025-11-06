'use client';

import React, { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGetVendorsByCountries } from '@/hooks/useGetVendorByCountries';
import { FinalGroupedData, InitialGroupedData, VendorAccount } from '@/types/settings/types';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import useGetMenuOptions from '../components/select/options';
import SelectComponent from '../components/select';
import LoadingSkeleton from '../components/loading-skeleton';
import VendorItem from '../components/vendor-item';
import useSettingsStore from '@/stores/useSettingsStore';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import {
  useGetUserCompanyNetworkPreferences,
  useGetUserPagePreferences,
  usePostUpdateCompanyNetworkPreferences,
} from '@/hooks/useUserSettings';
import PageToggle from '../components/page-toggle';
import useGetPageToggleOptions from '../components/page-toggle/options';
import toast from 'react-hot-toast';

function DashboardSettingsPage() {
  const [vendorsData, setVendorsData] = useState<FinalGroupedData>({});
  const { data: vendors, isFetched: vendorsFetched, isLoading: vendorsLoading } = useGetVendorsByCountries();
  const { data: userPagePreferences } = useGetUserPagePreferences();
  const { data: userCompanyNetworkPreferences, isFetched: userCompanyNetworkPreferencesFetched } =
    useGetUserCompanyNetworkPreferences();
  const { menuOptions } = useGetMenuOptions();
  const { pageToggleOptions } = useGetPageToggleOptions();
  const { companyNetworks, hydratePreferences } = useSettingsStore((state) => state);
  const [pagePreferencesData, setPagePreferencesData] = useState(pageToggleOptions);
  const { mutate: updateCompanyNetworkPreferences, isPending: pagePreferencesUpdating } =
    usePostUpdateCompanyNetworkPreferences({
      onSuccess: () => {
        toast.success(`Company network preferences updated successfully`);
        setTimeout(() => {
          location.reload(); // TODO: mutate state rather than page reload
        }, 400);
      },
      onError: () => {
        toast.error(`Error updating company network preferences`);
      },
    });

  const transformData = (): FinalGroupedData | {} => {
    if (!vendors) return {};

    const data: InitialGroupedData = vendors;
    return Object.keys(data).reduce<FinalGroupedData>((acc, countryName) => {
      const accounts = data[countryName];

      acc[countryName] = accounts.reduce<{ [networkName: string]: VendorAccount[] }>((networkAcc, account) => {
        const networkName = account.network.name;

        if (!networkAcc[networkName]) {
          networkAcc[networkName] = [];
        }

        networkAcc[networkName].push(account);

        return networkAcc;
      }, {});

      return acc;
    }, {});
  };

  const handleUpdateCompanyNetworkPreferences = () => {
    updateCompanyNetworkPreferences(companyNetworks);
  };

  useEffect(() => {
    if (vendors) {
      const groupedData = transformData();
      setVendorsData(groupedData);
    }
  }, [vendorsFetched]);

  useEffect(() => {
    if (userPagePreferences) {
      const updatedPagePrefs = pagePreferencesData.map((p) => {
        const dbItem = userPagePreferences.find((item: any) => item.pageId === p.pageId);
        return dbItem ? { ...p, status: dbItem.status, id: dbItem.id } : p;
      });
      setPagePreferencesData(updatedPagePrefs);
    }
  }, [userPagePreferences]);

  useEffect(() => {
    if (userCompanyNetworkPreferencesFetched) {
      hydratePreferences(userCompanyNetworkPreferences);
    }
  }, [userCompanyNetworkPreferencesFetched]);

  return (
    <section className="w-full px-12 py-6">
      <div className="flex justify-between">
        <h1 className="flex items-center gap-x-4">
          <span className="text-2xl font-bold">Select Pages to Apply Filters</span>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="text-left">
                <Image className="" src={'/svg/help.svg'} width={20} height={20} alt="help icon" />
              </TooltipTrigger>
              <TooltipContent className="rounded-lg bg-custom-white px-4 py-2 text-[0.813rem] font-[300] leading-[1.023rem] shadow-[0_4px_14px_0px_#00000040]">
                Only the selected pages KPIs will be affected by the selection below
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h1>
      </div>
      <div className="border-b py-4">
        {pagePreferencesData.map((data, index: number) => (
          <PageToggle
            key={index}
            pagePreference={data}
            pagePreferencesData={pagePreferencesData}
            setPagePreferencesData={setPagePreferencesData}
          />
        ))}
      </div>

      <div className="mb-5 mt-6">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold">Dashboard Settings</h4>
          <div className="flex md:gap-1 lg:gap-4">
            {menuOptions?.map((menuOption: any, index: number) => (
              <SelectComponent
                key={index}
                menuOption={menuOption}
                filterName={menuOption.value}
                paramName={menuOption.paramName}
                placeholder={menuOption.placeholder}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            className="bg-[#FC762B]"
            onClick={handleUpdateCompanyNetworkPreferences}
            loading={pagePreferencesUpdating}
          >
            Apply Update
          </Button>
        </div>

        {vendorsLoading && (
          <div className="mt-4">
            <LoadingSkeleton rows={20} columns={2} />
          </div>
        )}

        {vendorsFetched && (
          <div>
            {Object.keys(vendorsData).map((countryName: string, rootIndex: number) => {
              const lastElement = rootIndex === Object.keys(vendorsData).length - 1;
              return (
                <div key={rootIndex} className={cn('border-b pb-4', lastElement && 'border-b-0')}>
                  <h4 className="text-xl font-semibold text-[#C2C2C2]">{countryName}</h4>
                  {Object.keys(vendorsData[countryName]).map((vendorName: string, idx: number) => (
                    <VendorItem key={idx} vendorName={vendorName} data={vendorsData[countryName][vendorName]} />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardSettingsPage;
