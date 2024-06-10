import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import React from 'react';

function AlertsTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-left">NAME</TableHead>
        <TableHead className="w-[600px] text-nowrap text-left xl:min-w-[900px]">DESCRIPTION</TableHead>
        <TableHead className="text-nowrap">DATE</TableHead>
        <TableHead className="text-center last:text-center lg:w-[100px]">VIEWED</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default AlertsTableHead;
