'use client';

import React from 'react';
import Image from 'next/image';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import { usePostScheduledReportDownloadUrl } from '@/hooks/useGetReportData';
import toast from 'react-hot-toast';
// import useUserStore from '@/stores/useUserStore';
// import { convertToTimeZone } from '@/utils/utils';
import { DATE_FORMAT_TO_MMM_DD_YYYY } from '@/utils/constants/dateFormat.constants';
import { format } from 'date-fns';

function ReportResultsTable({ reportResults }: { reportResults: any }) {
  const isNoData = reportResults?.data?.length === 0;
  //   TODO : might need this later
  //   const { loggedInUser } = useUserStore((state: any) => ({ loggedInUser: state.user }));

  const { mutate: postDownloadReport } = usePostScheduledReportDownloadUrl({
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">No Download History</p>
                  <p className="mt-1 text-sm text-gray-500">
                    The report that you're trying to download has no download history.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to start report download.');
    },
  });

  return (
    <div className="overflow-auto" style={{ height: `calc(100vh - 560px)` }}>
      <Table>
        <TableHeader className="bg-custom-white">
          <TableRow className="w-full">
            <TableHead className="w-1/3 text-left">ID</TableHead>
            <TableHead className="w-1/3 text-left">Created</TableHead>
            <TableHead className="w-1/3 text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        {isNoData && <TableCaption>No data found.</TableCaption>}

        <TableBody>
          {reportResults?.data?.map((result: any) => {
            return (
              <TableRow className="w-full" key={result?.id}>
                <TableCell className="w-1/3 text-left font-medium">{result?.id}</TableCell>
                <TableCell className="w-1/3 text-left">
                  {/* //   TODO : might need this later
                  {convertToTimeZone(result?.created, DATE_FORMAT_TO_MMM_DD_YYYY, loggedInUser?.timezone?.name)} */}
                  {format(result?.created, DATE_FORMAT_TO_MMM_DD_YYYY)}
                </TableCell>

                <TableCell className="w-1/3 text-center">
                  <Button variant="null" size="sm" onClick={() => postDownloadReport({ id: parseInt(result?.id) })}>
                    <Image src="/svg/download.svg" alt="Download icon" width={18} height={18} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReportResultsTable;
