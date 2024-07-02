'use client';

import React from 'react';
import SearchField from '@/components/ui/search-field';
import SearchTable from './components/searchTable';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGetSearchResults } from '@/hooks/useGetSearchResults';
import { useRouter } from 'next/navigation';
import { FILTERS } from './components/searchTable/select/options';
import SelectComponent from './components/searchTable/select';
import CreateQueryString from '@/utils/createQueryString';
import { sanitizeSearchQuery } from '@/utils/utils';
const SearchPage = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [inputValidation, setInputValidation] = React.useState('');
  const searchFieldRef = React.createRef<HTMLInputElement>();
  const createQueryString = CreateQueryString();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const search: string = sanitizeSearchQuery(searchParams?.get('query'?.toString()) || '');
  const { data, isLoading } = useGetSearchResults(search, selectedFilters);

  React.useEffect(() => {
    const allFilters = FILTERS.map((f: any) => f.name);
    setSelectedFilters(allFilters);
  }, []);

  const updateSearchParams = () => {
    setInputValidation('');
    if (searchFieldRef.current && searchFieldRef.current.value) {
      const newSearchVal = sanitizeSearchQuery(searchFieldRef.current.value);
      if (newSearchVal.length < 2) {
        return setInputValidation('Must contain at least two characters');
      }
      searchFieldRef.current.value = newSearchVal;
      router.replace(`${pathname}?${createQueryString('query', newSearchVal)}`);
    } else {
      return setInputValidation('This field is required');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateSearchParams();
    }
  };

  const searchData = data?.results || [];

  return (
    <div className="h-screen">
      <div className="my-4 flex items-center justify-between rounded-lg bg-custom-white p-4">
        <div className="w-4/6">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            className="ml-2 mr-2 w-full rounded-none border-b bg-transparent shadow-none"
            defaultValue={search}
            ref={searchFieldRef}
            onKeyDown={handleKeyDown}
            helpText="Searches ID, invoice number, first name, last name, client reference number, account number, account display name, serial number, service number, site name, building name, contact name, contact email, etc"
          />
          {inputValidation !== '' && <p className="ml-2 mt-2 text-xs text-red-600">{inputValidation}</p>}
        </div>
        <div className="flex justify-end gap-x-2">
          <SelectComponent selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          <Button variant="primary" onClick={updateSearchParams} className="bg-[#1d46f3] text-white">
            Search
          </Button>
        </div>
      </div>
      {isLoading && !searchData.length && (
        <div className="flex items-center justify-center rounded-lg bg-custom-white py-8">
          <p className="text-base font-bold">{'Loading...'}</p>
        </div>
      )}
      {!isLoading && !searchData.length && (
        <div className="flex items-center justify-center rounded-lg bg-custom-white py-8">
          <p className="text-base font-bold">{'No Results Found'}</p>
        </div>
      )}
      {!isLoading && searchData.length > 0 && (
        <div className="max-h-[75%] overflow-y-auto rounded-lg bg-custom-white">
          <div className="w-[100%] py-4 pl-4">
            <p className="text-base font-bold text-[#000]">Search Result</p>
            <p className="text-sm text-[#575757]">Maximum 1000 Results Shown</p>
          </div>
          <SearchTable data={searchData} />
        </div>
      )}
    </div>
  );
};
export default SearchPage;
