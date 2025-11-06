import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import CollapsibleTable from '../collapsible-table';
import useSettingsStore from '@/stores/useSettingsStore';

interface IProps {
  vendorName: string;
  data: any;
}

function VendorItem(props: IProps) {
  const { vendorName, data } = props;
  const [isChecked, setIsChecked] = useState(false);
  const networkId = data?.[0]?.network.id;
  const { updateCompanyNetworksBulk, removeCompanyNetworksBulk, dbPreferences } = useSettingsStore((state) => state);

  const handleOnCheckedChange = (status: boolean) => {
    setIsChecked(status);
    const comNetIds = data.map((d: any) => ({ networkId: d.network.id, companyNetworkId: d.id, isChecked: status }));
    removeCompanyNetworksBulk(comNetIds);
    return updateCompanyNetworksBulk(comNetIds);
  };

  const count = () => {
    let activeCount = 0;
    let archivedCount = 0;
    data.forEach((v: any) => {
      return v.status === 'Active' ? activeCount++ : archivedCount++;
    });

    return {
      activeCount,
      archivedCount,
      total: data.length,
    };
  };

  useEffect(() => {
    if (dbPreferences.length > 0) {
      const matchingRecords = dbPreferences.filter((p: any) => p.networkId === networkId);
      if (matchingRecords.length === data.length) {
        setIsChecked(true);
      }
    }
  }, [dbPreferences]);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-semibold text-black">
          {vendorName} - {'   '}
          <span className="color-[#444444] text-base font-light">
            ({count().activeCount + ' Active, ' + count().archivedCount + ' Archived'})
          </span>
        </h5>
        <Checkbox
          id={vendorName}
          checked={isChecked}
          onCheckedChange={handleOnCheckedChange}
          className="border-custom-blue"
        />
      </div>
      <CollapsibleTable data={data} isChecked={isChecked} />
    </div>
  );
}

export default VendorItem;
