import React from 'react';
import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead';
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import { Table, TableBody, TableCell } from '@/components/ui/table/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import formatDate, { getServiceType, moneyFormatter, stringFindAndReplaceAll } from '@/utils/utils';
import { TICKETS_STATUS_LIST } from '@/utils/constants/statusList.constants';
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton';
import Link from 'next/link';
import { DownloadAbleLink } from '@/components/ui/download-link';
import { CostTableProps, PlanTableProps, TableDataProps } from '@/types/site';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import TooltipText from '../textbox';

/**
 * TableHeaderContent Component
 * This component renders the header of a table based on the keys of the data objects.
 * @param {Array} data - The data array to extract keys for the header.
 * @returns {JSX.Element} The rendered table header content.
 */

function TableHeaderContent({ data }: any) {
  return (
    <>
      {data && typeof data[0] === 'object' && Object.keys(data[0] || {}).length > 1 ? (
        Object.keys(data[0] || {}).map((key) => (
          <TableHead
            key={key}
            className="first:border-tl w-[100px] pl-4 pr-4 text-left capitalize first:pl-10 last:border-none last:text-left"
          >
            {key === 'invoiceBreakdowns'
              ? 'Cost'
              : key === 'tax_and_fees'
                ? 'Tax & Fees'
                : key === 'invoiceDate'
                  ? 'Invoice Date'
                  : key === 'invoice_ref'
                    ? 'ID'
                    : key === 'vendor_name'
                      ? 'Vendor'
                      : key === 'Invoice_#'
                        ? 'ID'
                          : key.replaceAll('_', ' ')}
          </TableHead>
        ))
      ) : (
        <div className="py-8 text-center text-lg">Data Not Found</div>
      )}
    </>
  );
}

// part of table component it is used to render the body of the table
function TableBodyContent({ record, currencySymbol }: any) {
  return (
    <>
      {Object.values(record).map((value: any, index: number) => (
        <TableCell
          key={index}
          className={`${index === 0 ? 'text-left text-[14px]' : 'text-left'} border-t-[1px] border-custom-plaster py-3 first:pl-10 first:text-[12px] last:text-left`}
        >
          {Object.keys(record)[index] === 'created' ? (
            formatDate(value)
          ) : Object.keys(record)[index] === 'when' ? (
            formatDate(value)
          ) : Object.keys(record)[index] === 'service_type' ? (
            <TooltipText
                text={getServiceType(value)}
                maxLength={15} 
              />   
          ) : Object.keys(record)[index] === 'description' ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : Object.keys(record)[index] === 'Veroxos REF' ? (
            value !== '-' ? (
              <Link href={value && `/support/tickets/ticket-summary/${value}`} className="font-normal text-14 text-[#1175BE]">
                {value ? `SUP${value}` : ' - '}
              </Link>
            ) : Object.keys(record)[index] === 'number_value' ? (
              <Link
                href={value ? `/inventory/${stringFindAndReplaceAll(value, '-/', ' ', 1)}` : ''}
                className="font-normal text-[#1175BE]"
              >
                 <TooltipText
                  text={value.split('-/')[0]}
                  maxLength={10}
                  className=""
                />  
              </Link>
            ) : (
              '-'
            )
          ) : Object.keys(record)[index] === 'number' || Object.keys(record)[index] === 'ID' ? (
             value  ? <Link
              href={value ? `/inventory/${stringFindAndReplaceAll(value, '-/', ' ', 1)}` : ''}
              className="font-normal text-[#1175BE]"
            >
               <TooltipText
                text={stringFindAndReplaceAll(value, '-/', ' ', 0)}
                maxLength={10} 
              /> 
            </Link> : <span className='pl-5'>-</span>
          ) : Object.keys(record)[index] === 'vendor_name' ? (
            stringFindAndReplaceAll(value, ' ', ' ', 0)
          ) : Object.keys(record)[index] === 'Invoice_#' ? (
            <Link
              href={value ? `/accounts/invoices/${stringFindAndReplaceAll(value, '-/', ' ', 1)}` : ''}
              className="font-normal text-[#1175BE]"
            >
               <TooltipText
                text={stringFindAndReplaceAll(value, '-/', ' ', 0)}
                maxLength={10} 
              /> 
             </Link>
          ) : Object.keys(record)[index] === 'invoice_ref' ? (
            <Link
              href={value ? `/accounts/invoices/${stringFindAndReplaceAll(value, '-/', ' ', 1)}` : ''}
              className="font-normal text-[#1175BE]">
              <TooltipText
                text={stringFindAndReplaceAll(value, '-/', ' ', 0)}
                maxLength={10} 
              />  
            </Link>
          ) : (Object.keys(record)[index] === 'invoice_date' || Object.keys(record)[index] === 'invoiceDate' )? (
            formatDate(value, 'MMM dd, yyyy')
          ) : Object.keys(record)[index] === 'account' ? (
            <Link
              href={value ? `/vendors/${stringFindAndReplaceAll(value, '-/', ' ', 1)}` : ''}
              className="font-normal text-[#1175BE]"
            >
                {stringFindAndReplaceAll(value, '-/', ' ', 0)} 
             </Link>
          ) : Object.keys(record)[index] === 'service status' ? (
            <Badge
              className={`rounded-lg py-1 text-white ${value == 1 ? 'bg-[#219653]' : value == 0 ? 'bg-[#A40000]' : 'bg-[#FC762B]'}`}
              variant="success"
              shape="block"
            >
              {value == 1 ? 'Live' : value == 0 ? 'Terminated' : 'Suspended'}
            </Badge>
          ) : Object.keys(record)[index] === 'download' ? (
            <DownloadAbleLink invoice_id={value} index={index} />
          ) : Object.keys(record)[index] === 'currency' ? (
            <span className="text-[#47de88]">{currencySymbol}</span>
          ) : Object.keys(record)[index] === 'total' ||
            Object.keys(record)[index] === 'cost_centre' ||
            Object.keys(record)[index] === 'sub_total' ||
            Object.keys(record)[index] === 'tax_and_fees' ||
            Object.keys(record)[index] === 'total_site_cost' ? (
            `${moneyFormatter(value, currencySymbol)}`
          ) : Object.keys(record)[index] === 'status' ? (
            <span className={`${value == 1 ? 'text-blue-600' : value == 2 ? 'text-gray-700' : 'text-black'}`}>
              {TICKETS_STATUS_LIST[value]}
            </span>
          ) : String(value) == 'null' || String(value) == 'undefined' || String(value) == '' ? (
            <span className="pl-[10%]">-</span>
          ) : (
            String(value)
          )}
        </TableCell>
      ))}
    </>
  );
}

/**
 * TableData Component
 * This component renders a generic table that can handle an array of objects.
 * It provides a loading state, handles various data types, and formats the data
 * accordingly. The table can be used for different datasets by passing appropriate props.
 */

export default function TableData({ data, loading, label, currency, tableClass }: TableDataProps) {
  currency = currency ? currency.toUpperCase() : null;
  const currencySymbol = currency;
  return (
    <>
      {/* lable of the table  */}
      {label && (
        <div className="font-[700] text-custom-blue lg:py-7 lg:text-[18px] xl:py-7 xl:text-[20px]">{label}</div>
      )}
      {/* load the skeleton if the data is still loading */}
      {loading ? (
        <Table className={`${tableClass}`}>
          <TableBodySkeleton rowCount={3} columnCount={3} />
        </Table>
      ) : Array.isArray(data) && data.length < 1 ? (
        <div className="py-8 text-center text-lg">Data Not Found</div>
      ) : (
        <div className="no-scrollbar max-h-[600px]">
          <Table
            style={{ borderColor: '#e2e2e2' }}
            className={`border-tools-table-outline border-separate rounded-md border-[1px] border-[#e2e2e2] text-left ${tableClass}`}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderContent data={data} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) &&
                data.length > 0 &&
                data.map((record, index) => (
                  <TableRow key={index} className="border border-[#cdcccc] p-3">
                    <TableBodyContent record={record} currencySymbol={currencySymbol} />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

export const PlanTable: React.FC<PlanTableProps> = ({ data, width = '783px' }) => (
  <div className="pt-10">
    <Table className={`w-[${width}] rounded-e-lg border`}>
      <TableBody>
        {data?.map((plan, index) => (
          <TableRow key={index}>
            <TableCell className="w-[230px] border border-custom-aluminum pl-8 font-bold last:text-center py-4">
              Plan
            </TableCell>
            <TableCell className="w-[177px] border border-custom-aluminum last:text-center lg:text-[12px] xl:text-[14px]">
              {plan.cost} USD
            </TableCell>
            <TableCell className="border border-custom-aluminum last:text-center">
              <TooltipProvider key={plan.name}>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src="/notification.svg" alt="info" width={16} height={16} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="lg:text-[12px] xl:text-[14px] w-96">{plan.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="relative bottom-1 pl-2 lg:text-[12px] xl:text-[14px]">{plan.name}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const CostTable: React.FC<CostTableProps> = ({ data, costCenter = '-' }) => (
  <div className="pb-10 pt-10">
    <Table className="w-[408px] rounded-e-lg border">
      <TableBody>
        <TableRow>
          <TableCell className="border border-custom-aluminum pl-8 font-bold last:text-center py-4">Cost Center</TableCell>
          <TableCell className="border border-custom-aluminum last:text-center lg:text-[12px] xl:text-[14px]">
            {costCenter}
          </TableCell>
        </TableRow>
        {data?.map((cost: { gl_code_index: number; name: string; code: string }) => (
          <>
            <TableRow>
              <TableCell className="border border-custom-aluminum pl-8 font-bold last:text-center">
                GL Code {cost.gl_code_index}
              </TableCell>
              <TableCell className="border border-custom-aluminum last:text-center lg:text-[12px] xl:text-[14px]">
                {cost.name ? cost.name : <span className="pl-[20%]">-</span>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-custom-aluminum pl-8 font-bold last:text-center">
                Company Code
              </TableCell>
              <TableCell className="border border-custom-aluminum last:text-center lg:text-[12px] xl:text-[14px]">
                {cost.code ? cost.code : <span className="pl-[20%]">-</span>}
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  </div>
);
