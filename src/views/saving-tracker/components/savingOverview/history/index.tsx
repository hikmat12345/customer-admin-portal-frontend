import React from 'react';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { SavingTrackerUpdate } from '@/types/saving-tracker/types';
import { getSavingTrackerByName, getSavingTrackerColorByStatus } from '@/utils/enums/savingTrackerStatus.enum';
import { format } from 'date-fns';
import { FULL_DATE_AND_TIME_FORMAT } from '@/utils/constants/dateFormat.constants';

const History = ({ updates }: { updates: SavingTrackerUpdate[] }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <h2 className="text-base font-semibold">Previous Updates</h2>
      </div>
      {Array.isArray(updates) && updates.length > 0 ? (
        updates.map(({ updated, comment, status }: SavingTrackerUpdate, index: number) => (
          <div className="flex flex-col gap-4" key={`${status}-${index}`}>
            <div className="flex items-center justify-between">
              <h2>{format(new Date(updated), FULL_DATE_AND_TIME_FORMAT)}</h2>
              <div className="flex items-center gap-5">
                <div className="text-base text-custom-dimGray">Status</div>
                <Badge
                  variant="success"
                  shape="block"
                  className={`rounded-[0.5rem] ${getSavingTrackerColorByStatus(status)} px-3 py-1 text-sm font-normal text-white`}
                >
                  {getSavingTrackerByName(status)}
                </Badge>
              </div>
            </div>

            <textarea
              className="box-border h-auto max-h-[10rem] min-h-[6rem] w-full resize-none overflow-auto rounded-lg border border-gray-300 p-3"
              defaultValue={comment}
              readOnly
            />
          </div>
        ))
      ) : (
        <div className="mb-4 text-center">No data available.</div>
      )}
    </div>
  );
};

export default History;
