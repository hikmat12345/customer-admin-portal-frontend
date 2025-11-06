import React, { useEffect, useState } from 'react';
import TableRow from '@veroxos/design-system/dist/ui/TableRow/tableRow';
import TableCell from '@veroxos/design-system/dist/ui/TableCell/tableCell';
import { Checkbox } from '@/components/ui/checkbox';
import useSettingsStore from '@/stores/useSettingsStore';

interface IProps {
  row: any;
  checked: boolean;
}

function CollapsibleTableRow(props: IProps) {
  const { row, checked } = props;
  const [isChecked, setIsChecked] = useState(false);
  const { addCompanyNetwork, removeCompanyNetwork, dbPreferences } = useSettingsStore((state) => state);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    if (dbPreferences) {
      const foundItem = dbPreferences.find((p: any) => p.companyNetworkId === row.id);
      if (foundItem) {
        setIsChecked(true);
        const { companyNetworkId, networkId, id } = foundItem;
        return addCompanyNetwork(companyNetworkId, networkId, true, id);
      }
    }
  }, [dbPreferences]);

  const handleOnCheckedChange = (status: boolean, companyNetworkId: number, networkId: number) => {
    setIsChecked(status);
    if (status) {
      return addCompanyNetwork(companyNetworkId, networkId, status, undefined);
    }
    return removeCompanyNetwork(companyNetworkId);
  };

  const renderStatus = (status: string) =>
    status === 'Archived' ? <p className="text-[#F45E09]">Archived</p> : <p className="text-[#219653]">Active</p>;

  return (
    <TableRow>
      <TableCell className="text-left">{row.id}</TableCell>
      <TableCell className="text-left">{row.account_number}</TableCell>
      <TableCell className="text-left">{renderStatus(row.status)}</TableCell>
      <TableCell className="text-center last:text-center">
        <Checkbox
          id={row.id}
          checked={isChecked}
          onCheckedChange={(status: boolean) => handleOnCheckedChange(status, row.id, row.network.id)}
          className="border-custom-blue"
        />
      </TableCell>
    </TableRow>
  );
}

export default CollapsibleTableRow;
