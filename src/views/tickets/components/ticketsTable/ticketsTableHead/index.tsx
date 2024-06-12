import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import React from 'react';

function TicketsTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-nowrap">Veroxos REF</TableHead>
        <TableHead className="w-[18%] text-nowrap text-left">Client REF</TableHead>
        <TableHead className="w-[12%] text-nowrap text-left">Site / Employee</TableHead>
        <TableHead className="w-[10%] text-nowrap text-left">Vendor</TableHead>
        <TableHead className="text-nowrap text-left">Request Type</TableHead>
        <TableHead className="text-nowrap">Status</TableHead>
        <TableHead className="text-nowrap">Last Updated</TableHead>
        <TableHead className="text-nowrap">Priority</TableHead>
        <TableHead className="text-right">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default TicketsTableHead;
