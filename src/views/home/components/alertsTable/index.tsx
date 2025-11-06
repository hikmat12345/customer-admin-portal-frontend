import React from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import AlertsTableHead from './alertsTableHead';
import TableCaption from '@veroxos/design-system/dist/ui/TableCaption/tableCaption';

function AlertsTable() {
  //TODO: This logic will be handled later
  const isNoData = true;

  return (
    <div className="overflow-auto lg:max-h-[220px] xl:max-h-full">
      <Table>
        <AlertsTableHead />
        {isNoData && <TableCaption className="h-[150px]">No data available.</TableCaption>}
        {/* <TableBody>
          <TableRow>
            <TableCell className="pb-5 pr-5 pt-5 text-sm font-normal xl:text-base">High Spend Alert</TableCell>
            <TableCell className="pb-5 pr-5 pt-5 text-justify text-sm font-normal xl:text-base">
              Lorem ipsum dolor sit amet consectetur. Eu viverra aenean amet lacinia sed ac malesuada in. Et pretium sit
              id sed amet enim.
            </TableCell>
            <TableCell className="pb-5 pr-5 pt-5 text-left text-sm font-normal xl:text-base">01/15/2024</TableCell>
            <TableCell className="">
              <Image
                src="/svg/highlightedCheckbox.svg"
                alt="Checked"
                width={20}
                height={20}
                style={{ alignSelf: 'center', margin: 'auto' }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pb-5 pr-5 pt-5 text-sm font-normal xl:text-base">Saving Recommendation</TableCell>
            <TableCell className="pb-5 pr-5 pt-5 text-justify text-sm font-normal xl:text-base">
              Lorem ipsum dolor sit amet consectetur. Eu viverra aenean amet lacinia sed ac malesuada in. Et pretium sit
              id sed amet enim.
            </TableCell>
            <TableCell className="pb-5 pr-5 pt-5 text-left text-sm font-normal xl:text-base">02/09/2024</TableCell>
            <TableCell className="">
              <Image
                src="/svg/disabledCheckbox.svg"
                alt="Checked"
                width={20}
                height={20}
                style={{ alignSelf: 'center', margin: 'auto' }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pb-5 pr-5 pt-5 text-sm font-normal xl:text-base">Upgrade Approval</TableCell>
            <TableCell className="pb-5 pr-5 pt-5 text-justify text-sm font-normal xl:text-base">
              Office ipsum you must be muted. 30,000ft incompetent wiggle resources level diarize.
            </TableCell>
            <TableCell className="pb-5 pr-5 pt-5 text-left text-sm font-normal xl:text-base">03/11/2024</TableCell>
            <TableCell>
              <Image
                src="/svg/highlightedCheckbox.svg"
                alt="Checked"
                width={20}
                height={20}
                style={{ alignSelf: 'center', margin: 'auto' }}
              />
            </TableCell>
          </TableRow>
        </TableBody> */}
      </Table>
    </div>
  );
}

export default AlertsTable;
