import { Separator } from '@/components/ui/separator';
import { DeviceinfoSkeletons } from '@/components/ui/summary-skeletons';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import VImage from '@/components/ui/image';
import { statusColor } from '@/utils/enums/assetStatus.enum';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AssetDeviceInfoCardProps = {
  label: string;
  imageUrl: string;
  deviceName: string;
  status: number;
  dmStatus: number | null;
  simNumber: string;
  isAssetLoader: boolean;
};
export const AssetDeviceInfoCard: React.FC<AssetDeviceInfoCardProps> = ({
  label = '',
  imageUrl,
  deviceName,
  status,
  dmStatus,
  simNumber,
  isAssetLoader,
}) => {
  return (
    <>
      <div>
        {label && <div className="text-[1.375rem] font-[700] text-custom-blue sm:py-4 xl:py-7">{label}</div>}
        {isAssetLoader ? (
          <DeviceinfoSkeletons />
        ) : (
          <div className="flex items-center justify-between gap-[2rem] md:flex-col lg:flex-row">
            <div className="flex items-center justify-between sm:w-[100%] md:w-[100%] 2md:w-[100%] lg:w-[100%] xl:mt-0 xl:w-[50%]">
              <div className="flex justify-between">
                <VImage
                  src={imageUrl}
                  alt="asset Image"
                  height={40}
                  width={200}
                  className="h-[11.875rem] w-[11.875rem] object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,..." // Optional: Use a base64-encoded placeholder
                />
              </div>
              <div className="flex-grow px-5">
                <div className="text-[1.125rem] font-[600]">{deviceName}</div>
                <div className="flex gap-[2rem] pt-6">
                  <div className="">
                    <div className="text-nowrap text-[0.875rem] font-[600] leading-9 text-[#000]">Asset Status</div>
                    <div className="text-nowrap text-[0.875rem] font-[600] leading-9 text-[#000]">DM Status</div>
                    <div className="text-nowrap text-[0.875rem] font-[600] leading-9 text-[#000]">Sim ID</div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="text-[0.875rem] leading-9 text-custom-dimGray">
                      {status !== undefined && status !== null ? (
                        <Badge
                          className={`text-nowrap rounded-lg py-1 text-white ${statusColor(`${status}`)}`}
                          variant="success"
                          shape="block"
                        >
                          {status}
                        </Badge>
                      ) : (
                        ' - '
                      )}
                    </div>
                    <div className="flex items-center text-[0.875rem] leading-9 text-custom-dimGray">
                      <div className="flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="relative">
                              <Checkbox
                                className="size-4 rounded-full font-normal data-[state=checked]:bg-[#219653]"
                                color="green"
                                checked={dmStatus === 1}
                                iconSize="h-3 h-3"
                                iconThickness="stroke-2"
                              />
                            </TooltipTrigger>
                            <TooltipContent>{dmStatus === 1 ? 'Synced' : 'Unsynced'}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="text-[0.875rem] leading-9 text-[#575757]">{simNumber || '-'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Separator className="separator-bg-1 mt-8 h-[1px]" />
      </div>
    </>
  );
};
