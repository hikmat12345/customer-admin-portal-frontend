import React, { useState } from 'react';
import { useSavingOverviewOptions } from '../data';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import { FileAttachment, SavingTrackerData } from '@/types/saving-tracker/types';
import TooltipText from '@/components/ui/textbox';
import { format } from 'date-fns';
import { FULL_DATE_AND_TIME_FORMAT } from '@/utils/constants/dateFormat.constants';
import { getSavingTrackerByName, getSavingTrackerColorByStatus } from '@/utils/enums/savingTrackerStatus.enum';
import { getAttachmentBlob } from '@/services/saving-tracker/savingTrackerService';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import { downloadBlobFile } from '@/utils/downloadBlobFile';

interface ISavingOverviewOption {
  id: number;
  label: string;
  value: string | number;
}

const GeneralInfo = ({ data, attachments }: { data: SavingTrackerData; attachments: FileAttachment[] }) => {
  const options = useSavingOverviewOptions(data, attachments);
  const [loadingFileId, setLoadingFileId] = useState<number | null>(null);

  const handleDownload = async (attachmentId: number, fileName: string) => {
    if (loadingFileId === attachmentId) return; // Prevent multiple downloads if one is in progress

    setLoadingFileId(attachmentId); // Set loading state for this file
    try {
      const blob = await getAttachmentBlob(data?.id, fileName);
      downloadBlobFile(blob, fileName);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    } finally {
      setLoadingFileId(null); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        {options?.map(({ id, label, value }: ISavingOverviewOption) => (
          <div key={id}>
            <h2 className="text-base font-semibold">{label}</h2>
            <h4 className="text-sm font-normal">
              {id === 10 ? (
                Array.isArray(attachments) &&
                attachments?.map((attachment) => (
                  <div key={attachment.id} className="flex items-center">
                    <Image
                      src="/svg/saving-tracker/download.svg"
                      alt="Download"
                      width={20}
                      height={20}
                      onClick={() => handleDownload(attachment.id, attachment.fileName)}
                    />
                    <Button
                      variant="null"
                      onClick={() => handleDownload(attachment.id, attachment.fileName)}
                      loading={loadingFileId === attachment.id}
                      className="pl-2"
                    >
                      {attachment.fileName || '-'}
                    </Button>
                  </div>
                ))
              ) : (
                <TooltipText text={`${value}`} maxLength={22} />
              )}
            </h4>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-custom-dimGray">Comment / Description</h2>
        <textarea
          className="box-border h-auto max-h-[10rem] min-h-[6rem] w-full resize-none overflow-auto rounded-lg border border-gray-300 p-3"
          defaultValue={data?.comment || ''}
          readOnly
        />
      </div>

      {data?.savingTrackerUpdates.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-custom-dimGray">Recent Update</h2>
          <div className="flex items-center justify-between">
            <h2>
              {data?.savingTrackerUpdates[0]?.updated
                ? format(new Date(data?.savingTrackerUpdates[0]?.updated), FULL_DATE_AND_TIME_FORMAT)
                : '-'}
            </h2>
            <div className="flex items-center gap-5">
              <div className="text-base text-custom-dimGray">Status</div>
              <Badge
                variant="success"
                shape="block"
                className={`rounded-[0.5rem] px-3 py-1 text-sm font-normal text-white ${getSavingTrackerColorByStatus(data?.savingTrackerUpdates[0]?.status)}`}
              >
                {getSavingTrackerByName(data?.savingTrackerUpdates[0]?.status)}
              </Badge>
            </div>
          </div>

          <textarea
            className="box-border h-auto max-h-[10rem] min-h-[6rem] w-full resize-none overflow-auto rounded-lg border border-gray-300 p-3"
            defaultValue={data?.savingTrackerUpdates[0]?.comment || ''}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default GeneralInfo;
