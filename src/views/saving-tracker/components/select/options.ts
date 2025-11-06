import { useGetCountries } from '@/hooks/useGetCountries';
import { useGetVendorsByCountries } from '@/hooks/useGetVendorByCountries';
import { useGetVendors } from '@/hooks/useTickets';
import { Country } from '@/types/saving-tracker/types';
import { VendorAccount } from '@/types/tickets/types';
import { serviceTypeDropdown } from '@/utils/utils';

const useGetMenuOptions = () => {
  const { data: vendorAccounts } = useGetVendors();
  const filterServiceType = serviceTypeDropdown();
  const { data: countries } = useGetCountries();
  const { data } = useGetVendorsByCountries();

  const filteredCountries = countries?.data?.map((country: Country) => ({
    value: country?.id,
    label: country?.name,
  }));

  const filterAccounts = vendorAccounts?.map((item: VendorAccount) => ({
    //TODO: Need to implement the camel case variables from the BE
    value: item?.account_no,
    label: item?.displayName,
  }));

  let vendorOptions: { [key: string]: any[] } = {};

  if (data && typeof data === 'object') {
    Object.entries(data).forEach(([country, vendors]) => {
      (vendors as any[])?.forEach((vendor: any) => {
        const vendorName = vendor.network.name;
        if (!vendorOptions[country]) {
          vendorOptions[country] = [];
        }
        if (!vendorOptions[country].find((existingVendor) => existingVendor.label === vendorName)) {
          vendorOptions[country].push({
            label: vendorName,
            value: vendorName,
            accountNumber: vendor?.account_number,
            country: vendor?.network?.country?.name,
          });
        }
      });
    });
  }

  const menuOptions = [
    {
      name: 'Period',
      value: 'period',
      placeholder: 'Search period...',
      options: [
        {
          value: 1,
          label: 'All',
        },
        {
          value: 2,
          label: 'Last 3 Months',
        },
        {
          value: 3,
          label: 'Last 12 Months',
        },
        {
          value: 4,
          label: 'This Calendar Year',
        },
      ],
    },
    {
      name: 'Service Type',
      value: 'serviceType',
      placeholder: 'Search service type...',
      options: filterServiceType,
    },
    {
      name: 'Country',
      value: 'country',
      placeholder: 'Search country...',
      options: filteredCountries,
    },
    {
      name: 'Vendor',
      value: 'vendor',
      options: Object.entries(vendorOptions).map(([country, vendors]) => ({
        value: country,
        label: country,
        options: vendors,
      })),
    },
    {
      name: 'Account',
      value: 'account',
      placeholder: 'Search account...',
      options: filterAccounts,
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
