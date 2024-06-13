'use client';

import SearchField from '@/components/ui/search-field';
import React, { useEffect } from 'react';
import TabsList from '@veroxos/design-system/dist/ui/TabsList/tabsList';
import TabsTrigger from '@veroxos/design-system/dist/ui/TabsTrigger/tabsTrigger';
import TabsContent from '@veroxos/design-system/dist/ui/TabsContent/tabsContent';
import Tabs from '@veroxos/design-system/dist/ui/Tabs/tabs';
import CreateQueryString from '@/utils/createQueryString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import allReports, { ReportCategory } from './reports';
import ReportsCard from './components/reportsCard';

function ReportsPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const defaultTabValue = searchParams?.get('tab') || 'finance';
  const router = useRouter();
  const createQueryString = CreateQueryString();

  const handleTabChange = (value: string) => {
    router.push(`${pathname}?${createQueryString('tab', value)}`);
  };

  useEffect(() => {
    router.push(`${pathname}?${createQueryString('tab', 'finance')}`);
  }, []);

  return (
    <div>
      <div className="grid-auto-flow-column grid w-full gap-8 rounded-lg border-custom-lightGray bg-custom-white px-9 py-5">
        <div className="relative flex justify-start">
          <Tabs defaultValue={defaultTabValue} onValueChange={handleTabChange}>
            <TabsList className="flex w-full justify-start gap-8">
              <TabsTrigger value="finance" className="px-3">
                Finance Reports
              </TabsTrigger>
              <TabsTrigger value="inventory" className="px-3">
                Inventory Reports
              </TabsTrigger>
              <TabsTrigger value="service" className="px-3">
                Service Management Reports
              </TabsTrigger>
            </TabsList>
            {Object.values(allReports).map((category: ReportCategory) => (
              <TabsContent key={category.categoryName} value={category.value} className="mt-10">
                <div className="grid h-[100vh] grid-cols-1 gap-5 overflow-y-scroll md:grid-cols-1 lg:h-[74vh] lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                  {category?.reports?.map((report) => (
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
          </Tabs>
          <div className="absolute right-0">
            <SearchField
              className="ml-2 w-[500px] rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] xl:min-w-[350px]"
              iconWidth={16}
              iconHeight={16}
              helpText="Searches report title, description and prefixes such as F1, F3, F4 etc"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
