import * as React from 'react';
import { TableBody, TableCell, TableRow } from '../table';
import Skeleton from '../../skeleton/skeleton';

export type TableBodySkeletonProps = {
  rowCount?: number;
  columnCount?: number;
};

const TableBodySkeleton: React.FC<TableBodySkeletonProps> = (props) => {
  const { rowCount, columnCount, ...restProps } = props;
  const rows = Array(rowCount).fill('');
  const columns = Array(columnCount).fill('');
  return (
    <TableBody {...restProps}>
      {rows?.map((_row, index) => (
        <TableRow key={index}>
          {columns.map((_column, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton variant="paragraph" rows={1} className="h-[20px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodySkeleton;
