import { formatSeperateDate } from '@/utils/utils';
import { Separator } from '@/components/ui/separator';
import { DeviceinfoSkeletons } from '@/components/ui/summary-skeletons';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import VImage from '@/components/ui/image';

type DeviceInfoCardProps = {
  label: string;
  imageUrl: string;
  deviceName: string;
  datePurchased: Date;
  status: number;
  deviceId: string;
  simNumber: string;
  isAssetLoader: boolean;
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
}) => {
  return (
    <div id="device">
      {label && (
        <div className="font-[700] text-custom-blue lg:py-4 lg:text-[18px] xl:py-7 xl:text-[20px]">{label}</div>
      )}
      {isAssetLoader ? (
        <DeviceinfoSkeletons />
      ) : (
        <div className="flex gap-[30px]">
          <div className="flex w-[17%] justify-between px-5">
            <VImage
              src={imageUrl}
              alt="asset Image"
              height={169}
              width={240}
              className="lg:w-[240px] xl:w-[169px]"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,..." // Optional: Use a base64-encoded placeholder
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
                  {status !== undefined && status !== null ? (
                    <Badge
                      className={`rounded-lg py-1 text-white ${status == 1 ? 'bg-[#219653]' : status == 0 ? 'bg-[#A40000]' : 'bg-[#FC762B]'}`}
                      variant="success"
                      shape="block"
                    >
                      {status == 1 ? 'Live' : status == 0 ? 'Terminated' : 'Suspended'}
                    </Badge>
                  ) : (
                    ' - '
                  )}
                </div>
                <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[14px]">
                  {deviceId ? deviceId : ' - '}
                </div>
                <div className="leading-9 text-[#575757] lg:text-[13px] xl:text-[14px]">
                  {simNumber ? simNumber : ' - '}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Separator className="separator-bg-1 mt-8 h-[1.0px]" />
    </div>
  );
};
