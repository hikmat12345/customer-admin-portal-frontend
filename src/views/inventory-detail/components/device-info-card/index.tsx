import { formatSeperateDate } from '@/utils/utils';
import { Separator } from '@/components/ui/separator';
import { DeviceinfoSkeletons } from '@/components/ui/summary-skeletons';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import VImage from '@/components/ui/image';
import Link from 'next/link';

type DeviceInfoCardProps = {
  label: string;
  imageUrl: string;
  deviceName: string;
  datePurchased: Date;
  status: number;
  deviceId: string;
  simNumber: string;
  isAssetLoader: boolean;
  suspended: number;
  assetId: number | string;
};
export const DeviceInfoCard: React.FC<DeviceInfoCardProps> = ({
  label = '',
  imageUrl,
  deviceName,
  datePurchased,
  status,
  deviceId,
  simNumber,
  isAssetLoader,
  suspended,
  assetId,
}) => {
  return (
    <div id="device">
      {label && <div className="text-[1.375rem] font-[700] text-custom-blue sm:py-4 xl:py-7">{label}</div>}
      {isAssetLoader ? (
        <DeviceinfoSkeletons />
      ) : (
        <div className="flex gap-[2rem]">
          <div className="flex justify-between pl-5">
            <VImage
              src={imageUrl}
              alt="asset Image"
              height={169}
              width={240}
              className="w-[12.75rem]"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,..." // Optional: Use a base64-encoded placeholder
            />
          </div>
          <div className="flex-grow px-5">
            <div className="text-[1.125rem] font-[600]">{deviceName}</div>
            <div className="flex gap-[2rem] pt-6">
              <div className="">
                <div className="text-[0.875rem] font-[600] leading-9 text-[#000]">Upgrade Date</div>
                <div className="text-[0.875rem] font-[600] leading-9 text-[#000]">Service Status</div>
                <div className="text-[0.875rem] font-[600] leading-9 text-[#000]">Device ID</div>
                <div className="text-[0.875rem] font-[600] leading-9 text-[#000]">Sim ID</div>
                <div className="text-[0.875rem] font-[600] leading-9 text-[#000]">Asset ID</div>
              </div>
              <div>
                <div className="text-[0.875rem] leading-9 text-[#575757]">
                  {datePurchased ? formatSeperateDate(datePurchased) : ' - '}
                </div>
                <div className="text-[0.875rem] leading-9 text-[#575757]">
                  {status !== undefined && status !== null ? (
                    <Badge
                      className={`rounded-lg py-1 text-white ${status == 1 && suspended === 1 ? 'bg-[#FC762B]' : status == 1 && suspended == 0 ? 'bg-[#219653]' : status == 0 ? 'bg-[#A40000]' : ''}`}
                      variant="success"
                      shape="block"
                    >
                      {status == 1 && suspended === 1 ? (
                        <>
                          Live<div className="pl-1 font-bold"> {'(Suspended)'}</div>
                        </>
                      ) : status == 1 && suspended == 0 ? (
                        'Live'
                      ) : status == 0 ? (
                        'Terminated'
                      ) : (
                        ''
                      )}
                    </Badge>
                  ) : (
                    ' - '
                  )}
                </div>
                <div className="text-[0.875rem] leading-9 text-[#575757]">{deviceId ? deviceId : ' - '}</div>
                <div className="text-[0.875rem] leading-9 text-[#575757]">{simNumber ? simNumber : ' - '}</div>
                {assetId ? (
                  <Link
                    href={`/asset/${assetId}`}
                    className={`border-b-[1px] border-[#1175BE] text-[0.875rem] leading-9 text-[#1175BE]`}
                  >
                    {assetId}
                  </Link>
                ) : (
                  <div className="text-[1.075rem] font-bold leading-9 text-[#637381]">No Asset Linked</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Separator className="separator-bg-1 mt-8 h-[1.0px]" />
    </div>
  );
};
