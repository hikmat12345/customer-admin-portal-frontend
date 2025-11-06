'use client';
import React, { useEffect, useState } from 'react';
import SavingTrackerCard from './components/savingTrackerCard';
import { useSavingTrackers, statuses } from './data';
import { ISavingTrackerProps, SavingTrackerData } from '@/types/saving-tracker/types';
import Pagination from '@/components/ui/pagination';
import SavingTrackerTable from './components/savingTrackerTable';
import SelectComponent from './components/select';
import useGetMenuOptions from './components/select/options';
import SearchField from '@/components/ui/search-field';
import CheckStatus from './components/checkStatus';
import { RadioGroup } from '@/components/ui/radio-group';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateQueryString from '@/utils/createQueryString';
import { sanitizeSearchQuery } from '@/utils/utils';
import { useGetAllAttachments, useGetSavingTracker } from '@/hooks/useGetSavingTracker';
import { PAGE_SIZE } from '@/utils/constants/constants';
import SavingTrackerTableSkeleton from './components/savingTrackerTableSkeleton';
import { Separator } from '@/components/ui/separator';
import StatusOverviewModal from './components/savingOverview/modal';

const SavingTrackerPage = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<SavingTrackerData | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const searchQuery = searchParams.get('searchQuery')?.trim() || undefined;
  const account = searchParams.get('account') || undefined;
  const status = Number(searchParams.get('status')) || undefined;
  const period = Number(searchParams.get('period')) || undefined;
  const serviceType = searchParams.get('serviceType') || undefined;
  const vendor = searchParams.get('vendor') || undefined;
  const country = searchParams.get('country') || undefined;

  const { savingTrackers, isAllSavingsLoading } = useSavingTrackers();

  const limit = PAGE_SIZE;

  const page = searchParams?.get('page') || '1';
  const offset = +page - 1;

  const {
    data: savingTrackerData,
    isFetched: isSavingTrackerFetched,
    isLoading: isSavingTrackerLoading,
    refetch: refetchSavingTracker,
  } = useGetSavingTracker(offset, limit, searchQuery, account, status, period, serviceType, vendor, country);

  const { data: attachments } = useGetAllAttachments(selectedRowData?.id);

  const rowCount = savingTrackerData?.tickets?.length || 8;
  const totalPages = savingTrackerData?.total / limit;

  const createQueryString = CreateQueryString();

  const menuOptions = useGetMenuOptions();

  const handleValueChange = (value: string) => {
    const selectedStatus = statuses.find((status) => status.value === value);
    if (selectedStatus) {
      router.push(`${pathname}?${createQueryString('status', selectedStatus.id)}`);
    }
  };

  const handleSearchKeydown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      let { value } = event.target;
      value = sanitizeSearchQuery(value);
      if (value.length === 0) {
        router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`); //We are basically removing the params that's why we are using undefineds
      } else {
        router.push(`${pathname}?${createQueryString('searchQuery', value)}`);
      }
    }
  };

  const handleSearchChange = (event: any) => {
    if (event.target.value === '') router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
  };

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      // TODO: Will use proper types later
      searchParams.forEach((value: string, key: string) => {
        params.set(key, value);
      });
    }
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
    await refetchSavingTracker();
  };

  const queryParams = new URLSearchParams(searchParams?.toString());
  const keys = Array.from(queryParams.keys());

  useEffect(() => {
    if (searchParams) {
      if (keys.length > 1 || !keys.includes('page')) {
        router.push(`${pathname}?${createQueryString('page', 1)}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.length]);

  useEffect(() => {
    // Because we need these two params on every page render
    router.push(`${pathname}?${createQueryString('status', 0)}`);
    router.push(`${pathname}?${createQueryString('period', 1)}`);
  }, []);

  return (
    <>
      <div className="mt-3">
        <div className="flex items-center justify-between rounded-[0.625rem] border-custom-lightGray bg-custom-white pb-[1.125rem] pl-[4rem] pr-[4rem] pt-[1.125rem]">
          <div className="grid w-full gap-5 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-[4rem] 2lg:grid-cols-4 2lg:gap-[1rem] xl:gap-[3rem] 2xl:gap-[5rem]">
            {savingTrackers.map(({ id, imgSrc, title, valueColor, value }: ISavingTrackerProps, index: number) => (
              <SavingTrackerCard
                key={id}
                title={title}
                imgSrc={imgSrc}
                value={value}
                valueColor={valueColor}
                isLastCard={index === savingTrackers.length - 1}
                isLoading={isAllSavingsLoading}
              />
            ))}
          </div>
        </div>
        <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-6 pb-2 pt-5">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex lg:flex-col lg:items-start lg:justify-between lg:gap-7 2lg:flex-row">
            <SearchField
              className="ml-2 rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] md:w-[23rem] 2md:w-[25.375rem] lg:w-[30rem] 2lg:w-[19rem] xl:w-[24rem] 3xl:w-[35rem]"
              iconWidth={16}
              iconHeight={16}
              onChange={handleSearchChange}
              defaultValue={searchQuery}
              onKeyDown={handleSearchKeydown}
              helpText="Searches the id, vendor, description, saving, spotted and status."
            />
            <div className="flex w-full items-center justify-start gap-1 sm:flex-wrap sm:justify-between md:justify-start md:gap-2 2md:justify-start lg:justify-end lg:gap-2">
              {menuOptions?.map((menuOption: any, index: number) => (
                <SelectComponent key={index} menuOption={menuOption} index={index} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full flex-col gap-3 p-4 md:flex-col md:items-start md:justify-between 2md:flex-wrap lg:justify-between lg:gap-6 2lg:flex-row 2lg:flex-nowrap 2lg:justify-between 2lg:gap-[6rem]">
              {/* // TODO: Will move this color to design system */}
              <h1 className="text-base font-normal text-[#616161]">Status</h1>
              <RadioGroup
                className="flex w-full flex-wrap items-start justify-start gap-4 md:justify-start md:gap-4 2md:justify-start lg:justify-start 2lg:items-center 2lg:justify-between"
                defaultValue={statuses[0].value}
                onValueChange={handleValueChange}
              >
                {Array.isArray(statuses) && statuses.map((status) => <CheckStatus status={status} key={status.id} />)}
              </RadioGroup>
            </div>
            <Separator />
          </div>
          <div className="mt-2 overflow-x-auto">
            {isSavingTrackerLoading && <SavingTrackerTableSkeleton limit={rowCount} />}
            {isSavingTrackerFetched && (
              <SavingTrackerTable
                data={savingTrackerData?.data}
                setOpenDialog={setOpenDialog}
                setSelectedRowData={setSelectedRowData}
              />
            )}
          </div>
        </div>

        {savingTrackerData?.total > 8 && savingTrackerData?.length !== 0 && (
          <div>
            <Pagination
              className="flex justify-end pt-4"
              totalPages={Math.ceil(totalPages)}
              currentPage={Number(page)}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <StatusOverviewModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        data={selectedRowData}
        attachments={attachments}
      />
    </>
  );
};

export default SavingTrackerPage;
