import { useGetCountries } from '@/hooks/useGetCountries';
import { Country } from '@/types/invoices/types';

const useGetMenuOptions = () => {
  const { data: countries } = useGetCountries();

  const filteredCountries = countries?.data?.map((country: Country) => ({
    value: country?.id,
    label: country?.name,
  }));
  const menuOptions = [
    {
      name: 'Country',
      value: 'country',
      options: filteredCountries,
      paramName: 'country',
      placeholder: 'Search country...',
    },
  ];

  return menuOptions;
};

export default useGetMenuOptions;
