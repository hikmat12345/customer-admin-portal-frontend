import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import VendorAccountsTableHead from '../employeesTableHead';

type DownloadTableSkeletonProps = {
  limit: number;
};
const EmployeesTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
    <Table>
      <VendorAccountsTableHead />
      <TableBodySkeleton rowCount={limit} columnCount={9} />
    </Table>
  </div>
);

export default EmployeesTableSkeleton;
