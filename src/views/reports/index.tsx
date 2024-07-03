'use client';

import SearchField from '@/components/ui/search-field';
import React, { useEffect, useState } from 'react';
import TabsList from '@veroxos/design-system/dist/ui/TabsList/tabsList';
import TabsTrigger from '@veroxos/design-system/dist/ui/TabsTrigger/tabsTrigger';
import TabsContent from '@veroxos/design-system/dist/ui/TabsContent/tabsContent';
import Tabs from '@veroxos/design-system/dist/ui/Tabs/tabs';
import CreateQueryString from '@/utils/createQueryString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GetAllReports, { AllReports, ReportCategory } from './reports';
import ReportsCard from './components/reportsCard';

function ReportsPage() {
  const allReports = GetAllReports();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTabValue = searchParams?.get('tab') || 'finance';
  const router = useRouter();
  const createQueryString = CreateQueryString();
  const [filteredReports, setFilteredReports] = useState(allReports);
  const [activeTab, setActiveTab] = useState(defaultTabValue);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [noReportsFound, setNoReportsFound] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`${pathname}?${createQueryString('tab', value)}`);
  };

  const handleSearch = (term: string) => {
    if (term === '') {
      setFilteredReports(allReports);
      setActiveTab(defaultTabValue);
      setNoReportsFound(false);
      return;
    }

    const filtered: Partial<AllReports> = {};
    let firstCategory: keyof AllReports | null = null;
    let found = false;

    (Object.keys(allReports) as (keyof AllReports)[]).forEach((key) => {
      const category = allReports[key];
      const reports = category.reports.filter(
        (report) =>
          report.label.toLowerCase().includes(term.toLowerCase()) ||
          report.reportName.toLowerCase().includes(term.toLowerCase()) ||
          report.description.toLowerCase().includes(term.toLowerCase()),
      );
      if (reports.length > 0) {
        found = true;
        filtered[key] = { ...category, reports };
        if (!firstCategory) firstCategory = key;
      }
    });

    if (found) {
      if (firstCategory && filtered[firstCategory]) {
        setActiveTab((filtered[firstCategory] as ReportCategory).value);
        setFilteredReports(filtered as AllReports);
        setNoReportsFound(false);
      } else {
        setFilteredReports(allReports);
        setNoReportsFound(false);
      }
    } else {
      setFilteredReports({} as AllReports);
      setNoReportsFound(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      handleSearch(term); // Reset search when input is cleared
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Backspace') {
      handleSearch(searchTerm);
    }
  };

  useEffect(() => {
    router.push(`${pathname}?${createQueryString('tab', 'finance')}`);
  }, []);

  return (
    <div>
      <div className="grid-auto-flow-column grid w-full gap-8 rounded-lg border-custom-lightGray bg-custom-white px-9 py-5">
        <div className="relative flex justify-start">
          <Tabs className="w-full" value={activeTab} onValueChange={handleTabChange}>
            <div className="2md:flex-row flex flex-col justify-between gap-4">
              <TabsList className="2md:justify-start flex w-full justify-between gap-4 lg:gap-8">
                <TabsTrigger
                  value="finance"
                  className="px-3 data-[state=active]:bg-[#1D46F333] data-[state=active]:text-custom-blue data-[state=active]:shadow"
                >
                  Finance Reports
                </TabsTrigger>
                <TabsTrigger value="inventory" className="px-3">
                  Inventory Reports
                </TabsTrigger>
                <TabsTrigger value="service" className="px-3">
                  Service Management Reports
                </TabsTrigger>
              </TabsList>
              <div>
                <SearchField
                  className="ml-2 rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] xl:min-w-[350px]"
                  iconWidth={16}
                  iconHeight={16}
                  helpText="Searches report title, description and prefixes such as F1, F3, F4 etc"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            {Object.values(filteredReports).map((category: ReportCategory) => (
              <TabsContent key={category.categoryName} value={category.value} className="mt-10">
                <div className="grid h-[100vh] grid-cols-1 gap-5 overflow-y-scroll md:grid-cols-1 lg:h-[74vh] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                  {category.reports.map((report) => (
                    <ReportsCard
                      key={report.label}
                      label={report.label}
                      description={report.description}
                      reportName={report.reportName}
                      fieldTypes={report.fields}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
            {noReportsFound && <div className="absolute mt-10 w-full text-center text-gray-500">No reports found</div>}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
