import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import SearchField from '@/components/ui/search-field';
import CollapsibleTableRow from './components/table-row';
import Fuse from 'fuse.js';

interface IProps {
  data: any;
  isChecked: boolean;
}

function CollapsibleTable(props: IProps) {
  const { data: initialData, isChecked } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState(initialData || []);
  const fuse = new Fuse(initialData, {
    threshold: 0.2,
    keys: ['id', 'account_number'],
  });

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '') {
      return setTableData(initialData);
    }
    const searchResults = fuse.search(value);
    const filteredItems = searchResults.map((r) => r.item);
    setTableData(filteredItems);
  };

  return (
    <div>
      <Collapsible onOpenChange={(openState: boolean) => setIsOpen(openState)}>
        <CollapsibleTrigger className="my-2 flex w-full items-center justify-center rounded bg-[#D2DAFD] text-lg font-normal shadow">
          <span className="mr-2">Accounts</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CollapsibleTrigger>
        <CollapsibleContent className="my-2 rounded border px-4 py-2 shadow">
          <div className="ml-2">
            <SearchField
              onChange={handleOnSearchChange}
              className="rounded-none border-b bg-transparent font-normal outline-none focus:border-[#44444480] sm:w-[8.5rem] 2md:min-w-[21.375rem] xl:w-[29.6rem]"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">ID</TableHead>
                <TableHead className="text-left">Account #</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-center last:text-center">Selection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row: any, index: number) => (
                <CollapsibleTableRow key={index} row={row} checked={isChecked} />
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default CollapsibleTable;
