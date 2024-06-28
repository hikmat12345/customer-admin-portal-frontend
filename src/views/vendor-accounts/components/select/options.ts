import { useGetCountries } from '@/hooks/useGetCountries';
import { useGetVendorsByCountries } from '@/hooks/useGetVendorByCountries';
import { Country } from '@/types/invoices/types';

const useGetMenuOptions = () => {
  const { data: countries } = useGetCountries();
  const { data: vendors } = useGetVendorsByCountries();

  const filteredCountries = countries?.data?.map((country: Country) => ({
    value: country?.id,
    label: country?.name,
  }));

  const vendorOptions: { [key: string]: any[] } = {};

  if (vendors && typeof vendors === 'object') {
    Object.entries(vendors).forEach(([country, vendors]) => {
      (vendors as any[])?.forEach((vendor: any) => {
        const vendorName = vendor.network.name;
        if (!vendorOptions[country]) {
          vendorOptions[country] = [];
        }
        if (!vendorOptions[country].find((existingVendor) => existingVendor.label === vendorName)) {
          vendorOptions[country].push({
            label: vendorName,
            value: vendorName,
            account_number: vendor?.account_number,
            country: vendor?.network?.country?.name,
          });
        }
      });
    });
  }

  const filteredVendorOptions = Object.entries(vendorOptions).map(([country, vendors]) => ({
    value: country,
    label: country,
    options: vendors,
  }));

  const menuOptions = [
    {
      name: 'Vendor',
      value: 'vendor',
      options: filteredVendorOptions,
      paramName: 'vendor',
      placeholder: 'Search vendor...',
    },
    {
      name: 'Country',
      value: 'country',
      options: filteredCountries,
      paramName: 'country',
      placeholder: 'Search country...',
    },
    {
      name: 'Show Archived',
      value: 'showArchived',
      options: [
        { value: 0, label: 'No' },
        { value: 1, label: 'Yes' },
      ],
      paramName: 'show_archived',
      placeholder: 'Search...',
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
