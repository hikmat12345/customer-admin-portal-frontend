import CommonDialog from '@/components/ui/CommonDialog';
import { useState } from 'react';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import TabsList from '@veroxos/design-system/dist/ui/TabsList/tabsList';
import TabsTrigger from '@veroxos/design-system/dist/ui/TabsTrigger/tabsTrigger';
import Tabs from '@veroxos/design-system/dist/ui/Tabs/tabs';
import GeneralInfo from '../generalInfo';
import History from '../history';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { FileAttachment, SavingTrackerData } from '@/types/saving-tracker/types';
import { getSavingTrackerByName, getSavingTrackerColorByStatus } from '@/utils/enums/savingTrackerStatus.enum';

const StatusOverviewModal = ({
  open,
  onClose,
  data,
  attachments,
}: {
  open: boolean;
  onClose: () => void;
  data: SavingTrackerData | null;
  attachments: FileAttachment[];
}) => {
  const [activeTab, setActiveTab] = useState('general');

  const statusOverviewDialogContent = (
    <div className="flex justify-start">
      <Tabs className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
        <div className="mb-6 flex gap-2">
          <TabsList className="flex w-full justify-start gap-2">
            <TabsTrigger
              value="general"
              className="px-3 data-[state=active]:bg-[#1D46F333] data-[state=active]:text-custom-blue data-[state=active]:shadow"
            >
              General
            </TabsTrigger>
            <TabsTrigger value="history" className="px-3">
              History
            </TabsTrigger>
          </TabsList>
          {activeTab === 'general' && (
            <div className="flex items-center gap-5">
              <div className="text-base text-custom-dimGray">Status</div>
              <Badge
                variant="success"
                shape="block"
                className={`text-nowrap rounded-[0.5rem] px-3 py-[5px] text-sm font-normal text-white ${data && getSavingTrackerColorByStatus(data?.status)}`}
              >
                {data ? getSavingTrackerByName(data?.status) : '-'}
              </Badge>
            </div>
          )}
        </div>
        {data && (
          <>
            {activeTab == 'general' && <GeneralInfo data={data} attachments={attachments} />}
            {activeTab == 'history' && <History updates={data?.savingTrackerUpdates} />}
          </>
        )}
      </Tabs>
    </div>
  );

  const statusOverviewDialogActions = (
    <div className="flex items-center justify-center">
      <Button variant="outline" className="w-[100px] border-custom-blue text-custom-blue" onClick={onClose}>
        Close
      </Button>
    </div>
  );

  return (
    <CommonDialog
      open={open}
      onClose={onClose}
      title={<div className="text-[26px] font-semibold">Saving Overview</div>}
      size="large"
      content={statusOverviewDialogContent}
      actions={statusOverviewDialogActions}
    />
  );
};

export default StatusOverviewModal;
