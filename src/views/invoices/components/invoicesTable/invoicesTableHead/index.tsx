import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

function InvoicesTableHead() {
  return (
    <TableHeader className="bg-custom-white">
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="text-nowrap text-left">Invoice #</TableHead>
        <TableHead className="text-nowrap text-left">Vendor</TableHead>
        <TableHead className="text-nowrap text-left">Account #</TableHead>
        <TableHead className="text-nowrap text-left">Invoice Date</TableHead>
        <TableHead className="text-nowrap text-left">Due Date</TableHead>
        <TableHead className="text-nowrap text-left">Status</TableHead>
        <TableHead className="text-nowrap text-left">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger>APF # </TooltipTrigger>
              <TooltipContent className="rounded-lg px-4 py-2 text-[0.813rem] font-[300] leading-[1.023rem] shadow-[0_4px_14px_0px_#00000040]">
                <p>Account Payable Feed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableHead>
        <TableHead className="text-nowrap text-left">APF Date</TableHead>
        <TableHead className="text-nowrap text-left">Total</TableHead>
        <TableHead className="last:text-left">Currency</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default InvoicesTableHead;
