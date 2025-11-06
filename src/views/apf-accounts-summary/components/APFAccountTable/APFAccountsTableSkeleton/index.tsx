import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBodySkeleton from '@veroxos/design-system/dist/ui/TableBodySkeleton/tableBodySkeleton';
import APFAccountTableHead from '../APFAccountsTableHead';
type DownloadTableSkeletonProps = {
  limit: number;
};
const ServiceSitesTableSkeleton: React.FC<DownloadTableSkeletonProps> = ({ limit }) => (
  <div className="overflow-auto lg:max-h-[210px] xl:max-h-full">
    <Table>
      <APFAccountTableHead />
      <TableBodySkeleton rowCount={12} columnCount={8} />
    </Table>
  </div>
);
export default ServiceSitesTableSkeleton;
