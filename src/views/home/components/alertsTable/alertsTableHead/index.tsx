import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import React from 'react';

function AlertsTableHead() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-left">NAME</TableHead>
        <TableHead className="text-nowrap text-left">DESCRIPTION</TableHead>
        <TableHead className="text-nowrap text-left">DATE</TableHead>
        <TableHead className="last:text-right">VIEWED</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default AlertsTableHead;
