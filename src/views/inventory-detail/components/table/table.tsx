import React from 'react'
import TableHead from '@veroxos/design-system/dist/ui/TableHead/tableHead'
import TableHeader from '@veroxos/design-system/dist/ui/TableHeader/tableHeader'
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow'
import { Table, TableBody, TableCell } from '@/components/ui/table/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image'
import formatDate from '@/utils/utils'
import { TICKETS_STATUS_LIST } from '@/utils/constants/statusList.constants'
import TableBodySkeleton from '@/components/ui/table/tableBodySkeleton'
import Link from 'next/link'
import { CostTableProps, PlanTableProps, TableDataProps } from '@/types/inventory/types'


export default function TableData({ data, loading, label }: TableDataProps) {
  return (
    <>
      {label && <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] py-7'>{label}</div>}
      {loading ? <Table><TableBodySkeleton rowCount={3} columnCount={3} /></Table> :
        Array.isArray(data) && data?.length < 1 ?
          <div className='text-center text-lg py-8'>No Data Found</div>
          :
          <Table style={{ borderColor: "#e2e2e2" }} className='border-[1px] border-[#e2e2e2] rounded-md text-left   border-separate border-tools-table-outline  '>
            <TableHeader>
              <TableRow>
                {(data && typeof data[0] === 'object' && Object.keys(data[0] || {}).length > 1) ?
                  Object.keys(data[0] || {}).map((key) => (
                    <TableHead key={key} className="w-[100px]  first:pl-10 text-left first:border-tl last:borer capitalize pl-4 pr-4 last:text-left">
                      {key}
                    </TableHead>
                  )) :
                  <div className='text-center text-lg py-8'>No Data Found</div>}

              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) && data?.length > 0 && data?.map((record: TableDataProps) => (
                <TableRow key={record.data} className='border border-[#cdcccc] p-3'>
                  {Object.values(record).map((value, index) => (
                    <TableCell key={index} className={`${index === 0 ? 'text-[14px] text-left' : ' text-left '}  first:pl-10 last:text-left py-3 border-t-[1px] border-[#eaeaea]`}>
                      {
                        Object.keys(record)[index] === 'created' ? formatDate(value) :
                          Object.keys(record)[index] === 'when' ? formatDate(value) :
                            Object.keys(record)[index] === 'reference' ? <Link href={`/tickets/reference_id=${value}`} className="text-sky-600   font-normal  ">SUP{value}</Link> :
                              Object.keys(record)[index] === 'description' ? <div dangerouslySetInnerHTML={{ __html: value }} /> :
                                Object.keys(record)[index] === 'status' ? <span className={`${value == 1 ? 'text-blue-600' : value == 2 ? 'text-gray-700' : 'text-black'}`}> {TICKETS_STATUS_LIST[value]} </span> :
                                  String(value)
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>}
    </>
  );
};

export const PlanTable: React.FC<PlanTableProps> = ({ data, width = "783px" }) => {
  return (
    <div className='pt-10'>
      <Table className={`w-[${width}] border rounded-e-lg `}>
        <TableBody>
          {data?.map((plan, index) => (
            <TableRow key={index}>
              <TableCell className="border last:text-center border-[#D6D6D6] pl-8 font-bold w-[259px]">Plan</TableCell>
              <TableCell className="border last:text-center border-[#D6D6D6] w-[146px] ">{plan.cost} USD</TableCell>
              <TableCell className="border last:text-center border-[#D6D6D6] ">
                <TooltipProvider key={plan.name}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        src="/notification.svg"
                        alt="info"
                        width={16}
                        height={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{plan.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className='relative bottom-1 pl-2'>
                  {plan.name}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const CostTable: React.FC<CostTableProps> = ({ data, costCenter = "-" }) => {
  return (
    <div className='pb-10 pt-5'>
      <Table className={`w-[408px] border rounded-e-lg`}>
        <TableBody>
          <TableRow>
            <TableCell className={`border pl-8 last:text-center border-[#D6D6D6] font-bold`}>
              Cost Center
            </TableCell>
            <TableCell className={`border text-[14px] last:text-center border-[#D6D6D6] `}>
              {costCenter}
            </TableCell>
          </TableRow>
          {data?.map((cost: { gl_code_index: number; name: string; code: string; }) => (
            <>
              <TableRow>
                <TableCell className={`border last:text-center pl-8 border-[#D6D6D6] font-bold`}>
                  GL Code {cost.gl_code_index}
                </TableCell>
                <TableCell className={`border last:text-center border-[#D6D6D6]`}>
                  {cost.name ? cost.name : '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={`border pl-8 last:text-center border-[#D6D6D6] font-bold`}>
                  Company Code
                </TableCell>
                <TableCell className={`border last:text-center border-[#D6D6D6] `}>
                  {cost.code ? cost.code : '-'}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};