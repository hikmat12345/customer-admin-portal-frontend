"use client";

import React from "react";
import SearchField from "@/components/ui/search-field";
import SearchTable from "./components/searchTable";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetSearchResults } from "@/hooks/useGetSearchResults";
import { useRouter } from "next/navigation";
import { FILTERS } from "./components/searchTable/select/options";
import SelectComponent from "./components/searchTable/select";
import CreateQueryString from "@/utils/createQueryString";
import { sanitizeSearchQuery } from "@/utils/utils";
const SearchPage = () => {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [inputValidation, setInputValidation] = React.useState("");
  const searchFieldRef = React.createRef<HTMLInputElement>();
  const createQueryString = CreateQueryString();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const search: string = sanitizeSearchQuery(
    searchParams?.get("query"?.toString()) || ""
  );
  const { data, isLoading } = useGetSearchResults(search, selectedFilters);

  React.useEffect(() => {
    const allFilters = FILTERS.map((f: any) => f.name);
    setSelectedFilters(allFilters);
  }, []);

  const updateSearchParams = () => {
    setInputValidation("");
    if (searchFieldRef.current && searchFieldRef.current.value) {
      const newSearchVal = sanitizeSearchQuery(searchFieldRef.current.value);
      if (newSearchVal.length < 3) {
        return setInputValidation(
          "Query must contain at least three characters"
        );
      }
      searchFieldRef.current.value = newSearchVal;
      router.replace(`${pathname}?${createQueryString("query", newSearchVal)}`);
    } else {
      return setInputValidation("Query is required");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateSearchParams();
    }
  };

  const searchData = data?.results || [];

  return (
    <div className="h-screen">
      <div className="bg-custom-white rounded-lg my-4 p-4 flex items-center justify-between">
        <div className="flex-1 ">
          <SearchField
            iconWidth={16}
            iconHeight={16}
            className="bg-transparent border-b shadow-none rounded-none ml-2 min-w-full max-w-full"
            defaultValue={search}
            ref={searchFieldRef}
            onKeyDown={handleKeyDown}
          />
          {inputValidation !== "" && (
            <p className="text-xs text-red-600 ml-2 mt-2">{inputValidation}</p>
          )}
        </div>
        <div className="flex justify-end gap-x-2">
          <SelectComponent
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <Button
            variant="primary"
            onClick={updateSearchParams}
            className="bg-[#1d46f3] text-white"
          >
            Search
          </Button>
        </div>
      </div>
      {isLoading && !searchData.length && (
        <div className="bg-custom-white rounded-lg flex items-center justify-center py-8">
          <p className="font-bold text-base">{"Loading..."}</p>
        </div>
      )}
      {!isLoading && !searchData.length && (
        <div className="bg-custom-white rounded-lg flex items-center justify-center py-8">
          <p className="font-bold text-base">{"No Results Found"}</p>
        </div>
      )}
      {!isLoading && searchData.length > 0 && (
        <div className="bg-custom-white rounded-lg max-h-[75%] overflow-y-auto">
          <div className="w-[100%] pl-4 py-4">
            <p className="text-[#000] font-bold text-base">Search Result</p>
            <p className="text-[#575757] text-sm">
              Maximum 1000 Results Shown.
            </p>
          </div>
          <SearchTable data={searchData} />
        </div>
      )}
    </div>
  );
};
export default SearchPage;
