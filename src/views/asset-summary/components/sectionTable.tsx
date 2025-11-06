import { Separator } from '@/components/ui/separator';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';

export const SectionTable = ({ section, sectionIndex }: { section: any; sectionIndex: number }) => (
  <div key={section.id} id={section.id}>
    <div className="pt-8 text-[1.375rem] font-[700] text-custom-blue">{section.title}</div>
    <Table className="mt-4 w-[408px] rounded-e-lg border">
      <TableBody>
        {section.columns.map((column: any, columnIndex: number) => (
          <TableRow key={`section-${sectionIndex}-column-${columnIndex}`}>
            <TableCell className="text-nowrap border border-custom-aluminum py-4 font-bold first:text-center last:text-center">
              {column.header}
            </TableCell>
            <TableCell className="min-w-[105px] border border-custom-aluminum text-[0.875rem] first:text-center last:text-center">
              {column.dataKey in section.data ? section.data[column.dataKey] : '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Separator className="separator-bg-1 mt-8 h-[1px]" />
  </div>
);
