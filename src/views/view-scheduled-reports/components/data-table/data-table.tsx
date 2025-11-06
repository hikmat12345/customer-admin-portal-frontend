'use client';

import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import SearchField from '@/components/ui/search-field';
import Pagination from '@/components/ui/pagination';
import { format } from 'date-fns';
import { DATE_FORMAT_TO_MMM_DD_YYYY } from '@/utils/constants/dateFormat.constants';
import useGetMenuOptions from '../select/options';
import SelectComponent from '../select';
import CommonDialog from '@/components/ui/CommonDialog';
import {
  useDeleteScheduledReports,
  useGetScheduledReports,
  usePostScheduledReportDownloadUrl,
} from '@/hooks/useGetReportData';
import toast from 'react-hot-toast';
import { sanitizeSearchQuery } from '@/utils/utils';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateQueryString from '@/utils/createQueryString';
import EditScheduleReportModal from '../editScheduleReportModal';

interface ScheduledReport {
  id: number;
  reportType: string;
  name: string;
  created: Date;
  frequencyType: string;
  frequencyDay: string;
  frequencyOneOffDate: string;
  config: string;
  active: string;
  sendEmail: boolean;
  companyId: number;
  report: {
    name: string;
    description: string;
  };
  scheduledReportHistory: null | {};
  company: {
    name: string;
  };
  results: { id: number; created: string }[] | null;
}

export function DataTable() {
  const [openEditReportDialog, setOpenEditReportDialog] = React.useState(false);
  const [editReportData, setEditReportData] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const currentPage = 1;
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const searchQuery = searchParams && searchParams?.get('searchQuery');
  const frequencyType = searchParams && searchParams?.get('frequency');
  const status = searchParams && searchParams?.get('status');

  const createQueryString = CreateQueryString();
  const {
    data: reportsData,
    isLoading,
    refetch: refetchScheduledReports,
  } = useGetScheduledReports(
    searchQuery?.trim() || undefined,
    typeof frequencyType !== 'undefined' && frequencyType !== null ? frequencyType.split(',').join(',') : undefined,
    status,
  );

  const { mutate: removeScheduledReport, isPending } = useDeleteScheduledReports({
    onSuccess: (data) => {
      toast.success('Report deleted successfully.');
      refetchScheduledReports();
      setOpenDeleteDialog(false);
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to delete report.');
    },
  });

  const reports = reportsData?.data;

  const menuOptions = useGetMenuOptions();

  const data = React.useMemo(
    () =>
      reports?.map((data: ScheduledReport) => {
        return {
          id: data.id,
          title: data.report.name,
          resultId: data?.results?.length ? data?.results[0].id : null,
          config: data?.config ? JSON.parse(data?.config) : '',
          description: data.report.description,
          lastRunDate:
            data.results?.length && data.results[0].created
              ? format(data.results[0].created, DATE_FORMAT_TO_MMM_DD_YYYY)
              : null,
          nextRunDate: '', // Will do this in the next iteration - round 2
          createdBy: data.company ? data.company.name : '',
          frequencyType: data.frequencyType,
          frequencyDay: data.frequencyDay,
          frequencyOneOffDate: data.frequencyOneOffDate,
          active: data.active,
          sendEmail: data.sendEmail,
          reportType: data.reportType,
        };
      }) || [],
    [reports],
  );

  const ActionCell = ({ row }: { row: any }) => {
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

    const handleDownload = async () => {
      const reportId = row?.original?.resultId;
      const reportName = `${row.original.title}.xlsx`;
      postDownloadReport({ id: reportId, fileNameOverRide: reportName });
    };

    const handleEdit = () => {
      setEditReportData(row.original);
      setOpenEditReportDialog(true);
    };

    return (
      <div className="flex items-end gap-2 text-center">
        <Button className="p-0" onClick={handleEdit} variant="null" size="sm">
          <Image src="/svg/pencil.svg" alt="Edit icon" width={18} height={18} />
        </Button>
        <Button className="p-0" variant="null" size="sm" onClick={handleDownload}>
          <Image src="/svg/download.svg" alt="Download icon" width={18} height={18} />
        </Button>
      </div>
    );
  };

  const columns: ColumnDef<{
    id: number;
    title: string;
    description: string;
    lastRunDate: string | null;
    nextRunDate: string | null;
    createdBy: string;
  }>[] = [
    {
      id: 'select',
      header: ({ table }) => {},
      cell: ({ row }) => (
        <Checkbox
          className="h-5 w-5"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'description',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Description
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'lastRunDate',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Last Run Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('lastRunDate') || '-'}</div>,
    },
    {
      accessorKey: 'nextRunDate',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Next Run Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.getValue('nextRunDate') || '-'}</div>,
    },
    {
      accessorKey: 'createdBy',
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created By
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left uppercase">{row.getValue('createdBy')}</div>,
    },
    {
      id: 'actions',
      header: () => <div className="items-center">Action</div>,
      cell: ({ row }) => <ActionCell row={row} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const totalPages = Math.ceil(reports?.length / pagination.pageSize);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page - 1 }));
  };

  const handleDeleteReport = async () => {
    if (selectedRows.length === 0) {
      return toast.error('Please select the report');
    }
    setOpenDeleteDialog(true);
  };

  const handleSearchKeydown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      let { value } = event.target;
      value = sanitizeSearchQuery(value);
      if (value.length === 0) {
        router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
      } else {
        router.push(`${pathname}?${createQueryString('searchQuery', value)}`);
      }
    }
  };

  const handleSearchChange = (event: any) => {
    if (event.target.value === '') router.push(`${pathname}?${createQueryString('searchQuery', undefined)}`);
  };

  const displayedData = table
    ?.getRowModel()
    ?.rows.slice((currentPage - 1) * pagination.pageSize, currentPage * pagination.pageSize);

  React.useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original.id);
    setSelectedRows(selectedRows);
  }, [rowSelection]);

  React.useEffect(() => {
    router.push(`${pathname}?${createQueryString('status', 1)}`);
  }, []);

  return (
    <div>
      <div className="grid-auto-flow-column mt-6 grid w-full gap-3 rounded-lg border border-custom-lightGray bg-custom-white px-5 pb-2 pt-5">
        <div className="flex justify-between">
          <div className="mb-9">
            <SearchField
              iconWidth={16}
              iconHeight={16}
              onChange={handleSearchChange}
              defaultValue={(table?.getColumn('title')?.getFilterValue() as string) ?? ''}
              onKeyDown={handleSearchKeydown}
              className="ml-2 rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] sm:w-[8.5rem] 2md:min-w-[21.375rem] xl:w-[33rem]"
              helpText="Search in ID, Title, Description and Created fields"
            />
          </div>
          <div className="flex justify-center gap-2">
            {menuOptions?.map((menuOption: any, index: number) => (
              <SelectComponent key={index} menuOption={menuOption} index={index} />
            ))}
            <Button variant="null" className="flex gap-2 font-normal" onClick={handleDeleteReport}>
              <Image src="/svg/delete.svg" alt="Delete icon" width={20} height={20} />
              Delete Selected Reports
            </Button>
          </div>
        </div>
        <div className="overflow-auto" style={{ height: 'calc(100vh - 280px)' }}>
          <Table>
            <TableHeader className="bg-custom-white">
              {table?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="p-0 text-left last:text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {displayedData?.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-base last:text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && reports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-base last:text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {reports?.length > 15 && (
        <div>
          <Pagination
            className="flex justify-end pt-4"
            totalPages={totalPages}
            currentPage={pagination.pageIndex + 1}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {openDeleteDialog && (
        <CommonDialog
          open={openDeleteDialog}
          actions={
            <>
              <Button onClick={() => setOpenDeleteDialog(false)} variant="outline">
                Cancel
              </Button>
              <Button
                variant="destructive"
                color="primary"
                onClick={async () => {
                  await removeScheduledReport(selectedRows);
                }}
                loading={isPending}
              >
                Confirm
              </Button>
            </>
          }
          content={
            <div>
              <p className="text-sm">Are you sure you want to delete the selected reports? Click confirm to proceed.</p>
            </div>
          }
          description=""
          onClose={() => setOpenDeleteDialog(false)}
          size="medium"
          title="Delete Report"
        />
      )}
      <EditScheduleReportModal
        refetchScheduledReports={refetchScheduledReports}
        reportData={editReportData}
        open={openEditReportDialog}
        setOpen={setOpenEditReportDialog}
      />
    </div>
  );
}
