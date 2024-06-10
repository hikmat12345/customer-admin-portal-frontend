import Image from 'next/image';
import { formatSeperateDate } from '@/utils/utils';
import { Separator } from '@/components/ui/separator';
import { DeviceinfoSkeletons } from '@/components/ui/summary-skeletons';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';

type DeviceInfoCardProps = {
  label: string;
  imageUrl: string;
  deviceName: string;
  datePurchased: Date;
  status: string;
  deviceid: string;
  simNumber: string;
  isAssetLoader: boolean;
};
export const DeviceInfoCard: React.FC<DeviceInfoCardProps> = ({
  label = '',
  imageUrl,
  deviceName,
  datePurchased,
  status,
  deviceid,
  simNumber,
  isAssetLoader,
}) => (
  <div id="device">
    {label && <div className="font-[700] text-custom-blue lg:py-4 lg:text-[18px] xl:py-7 xl:text-[20px]">{label}</div>}
    {isAssetLoader ? (
      <DeviceinfoSkeletons />
    ) : (
      <div className="flex gap-[30px]">
        <div className="flex w-[17%] justify-between px-5">
          <Image
            src={imageUrl}
            height={80}
            width={200}
            className="lg:w-[100%] xl:w-[60%]"
            alt="Logo image"
            style={{ margin: 'auto' }}
            loading="lazy"
          />
        </div>
        <div className="w-[30%] px-5">
          <div className="font-[600] lg:text-[15px] xl:text-[18px]">{deviceName}</div>
          <div className="flex justify-between pt-6">
            <div className="">
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Upgrade Date</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Status</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Device ID</div>
              <div className="font-[600] leading-9 text-[#000] lg:text-[13px] xl:text-[14px]">Sim ID</div>
            </div>
            <div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[14px]">
                {datePurchased ? formatSeperateDate(datePurchased) : ' - '}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[14px]">
                {status ? (
                  <Badge
                    className={`rounded-lg p-2 text-white ${status === 'Active' ? 'bg-[#41a673]' : status === 'Suspended' ? 'bg-[#f2994a]' : 'bg-[#772423]'} variant="success" shape="block">{status? status: "Unkown"}</Badge> bg-[#41a673] text-white`}
                    variant="success"
                    shape="block"
                  >
                    {status || 'Unkown'}
                  </Badge>
                ) : (
                  '-'
                )}
              </div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[14px]">{deviceid || ' - '}</div>
              <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[14px]">{simNumber || ' - '}</div>
            </div>
          </div>
        </div>
      </div>
    )}
    <Separator className="mt-8 h-[1.5px] bg-[#5d5b5b61]" />
  </div>
);
