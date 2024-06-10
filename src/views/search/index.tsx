'use client';

import React from 'react';
import SearchField from '@/components/ui/search-field';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useGetSearchResults } from '@/hooks/useGetSearchResults';
import CreateQueryString from '@/utils/createQueryString';
import { FILTERS } from './components/searchTable/select/options';
import SelectComponent from './components/searchTable/select';
import SearchTable from './components/searchTable';

function SearchPage() {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const createQueryString = CreateQueryString();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const search: string = searchParams?.get('query'?.toString()) || '';
  const { data, isLoading } = useGetSearchResults(search, selectedFilters);

  const searchFieldRef = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    const allFilters = FILTERS.map((f: any) => f.name);
    setSelectedFilters(allFilters);
  }, []);

  const updateSearchParams = () => {
    if (searchFieldRef.current && searchFieldRef.current.value) {
      const newSearchVal = searchFieldRef.current.value;
      router.replace(`${pathname}?query=${newSearchVal}`);
    } else {
      router.push(`${pathname}?${createQueryString('query', undefined)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const searchData = data?.results || [];

  return (
    <div className="h-screen">
      <div className="my-4 flex items-center justify-between rounded-lg bg-custom-white p-4">
        <div className="flex-1">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            className="ml-2 min-w-full max-w-full rounded-none border-b bg-transparent shadow-none"
            defaultValue={search}
            ref={searchFieldRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex justify-end gap-x-2">
          <SelectComponent selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          <Button variant="primary" onClick={updateSearchParams}>
            Search
          </Button>
        </div>
      </div>
      {isLoading && !searchData.length && (
        <div className="flex items-center justify-center rounded-lg bg-custom-white py-8">
          <p className="text-base font-bold">Loading...</p>
        </div>
      )}
      {!isLoading && !searchData.length && (
        <div className="flex items-center justify-center rounded-lg bg-custom-white py-8">
          <p className="text-base font-bold">No Results Found</p>
        </div>
      )}
      {!isLoading && searchData.length > 0 && (
        <div className="max-h-[66.6%] rounded-lg bg-custom-white">
          <div className="w-[100%] py-4 pl-4">
            <p className="text-base font-bold text-[#000]">Search Result</p>
            <p className="text-sm text-[#575757]">
              Maximum 1000 Results Shown. Currently showing ({searchData.length})
            </p>
          </div>
          <SearchTable data={searchData} />
        </div>
      )}
    </div>
  );
}
export default SearchPage;
