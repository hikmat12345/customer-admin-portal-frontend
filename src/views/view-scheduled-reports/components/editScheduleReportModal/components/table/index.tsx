'use client';
import React, { useEffect, useState } from 'react';
import Table from '@veroxos/design-system/dist/ui/Table/table';
import TableBody from '@veroxos/design-system/dist/ui/TableBody/tableBody';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import { currencyList, serviceOptions } from '@/utils/utils';
import { useGetVendors } from '@/hooks/useTickets';
import { Separator } from '@radix-ui/react-dropdown-menu';

function ScheduledReportDetailsTable({ reportData }: { reportData: any }) {
  const { data: vendorAccounts } = useGetVendors();
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const keys = Object.keys(reportData.config);
    for (let i = 0; i < keys.length; i++) {
      if (getKeys().includes(keys[i])) {
        setShowTable(true);
        break;
      }
    }
  }, []);

  const getKeys = () => {
    let keys: string[];
    switch (reportData?.reportType?.toLowerCase()) {
      case 'f7':
        keys = ['serviceType', 'accounts', 'from', 'to', 'currency'];
        break;
      case 'f12':
        keys = ['currencyId', 'year'];
        break;
      case 'i7':
        keys = ['includeTerminated', 'invoiceCost', 'veroxosCost', 'serviceType'];
        break;
      default:
        keys = ['from', 'to'];
    }
    return keys;
  };

  const getKeyLabel = (key: string) => {
    switch (key) {
      case 'serviceType':
        return 'Service Type';

      case 'accounts':
        return 'Accounts';

      case 'from':
        return 'From';

      case 'to':
        return 'To';

      case 'currency':
        return 'Currency';

      case 'currencyId':
        return 'Currency';

      case 'year':
        return 'Year';

      case 'includeTerminated':
        return 'Include Terminated Services';

      case 'invoiceCost':
        return 'Include Last Available Rental Charge Column';

      case 'veroxosCost':
        return 'Include Rental Contract Charge Column';
    }
  };

  const findSelectedOptionLabel = (options: any, value: any) => {
    if (value == 0) return 'All';

    const selectedOption: any = options.find((option: any) => option.id == value);
    if (selectedOption) return selectedOption.label ?? selectedOption.displayName;
  };

  const getKeyValue = (key: string, value: any) => {
    let keyValue: any;
    switch (key) {
      case 'serviceType':
        if (Array.isArray(value)) {
          value.map((serviceType, index) => {
            keyValue =
              (keyValue ?? '') +
              findSelectedOptionLabel(serviceOptions, serviceType) +
              (index != value.length - 1 ? ',' : '');
          });
        } else {
          keyValue = findSelectedOptionLabel(serviceOptions, value);
        }
        break;

      case 'accounts':
        if (Array.isArray(value)) {
          value.map((vendorAccount, index) => {
            keyValue =
              (keyValue ?? '') +
              findSelectedOptionLabel(vendorAccounts, vendorAccount) +
              (index != value.length - 1 ? ',' : '');
          });
        } else {
          keyValue = findSelectedOptionLabel(vendorAccounts, value);
        }
        break;

      case 'from':
      case 'to':
        // TODO: might need to use later
        // parse dates in any format
        // const parsedDate = parse(value, 'dd\/MM\/yyyy', new Date());
        // keyValue = format(parsedDate, DATE_FORMAT);
        keyValue = value;
        break;
      case 'currency':
      case 'currencyId':
        keyValue = currencyList.find((currency) => currency.value == value)?.label;
        break;

      case 'year':
        keyValue = value;

      case 'invoiceCost':
      case 'veroxosCost':
      case 'includeTerminated':
        keyValue = value ? 'true' : 'false';
    }
    return keyValue;
  };

  return (
    showTable && (
      <div className="overflow-auto text-[#575757]">
        <Separator className="mt-2 h-[2px] bg-[#D6D6D6] opacity-40" />
        <Table>
          <TableBody>
            {reportData?.config &&
              Object.keys(reportData.config)?.map((key: any) => {
                if (getKeys().includes(key))
                  return (
                    <TableRow className="w-full" key={key}>
                      <TableCell className="w-1/3 text-left text-[0.875rem] font-[600] capitalize">
                        {getKeyLabel(key)}
                      </TableCell>
                      <TableCell className="w-1/3 text-left text-[0.875rem]">
                        {getKeyValue(key, reportData?.config[key]) ?? '-'}
                      </TableCell>
                    </TableRow>
                  );
              })}
          </TableBody>
        </Table>
        <Separator className="mt-2 h-[2px] bg-[#D6D6D6] opacity-40" />
      </div>
    )
  );
}

export default ScheduledReportDetailsTable;
