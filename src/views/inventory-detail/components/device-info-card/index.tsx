import Image from "next/image";
 import { formatSeperateDate } from "@/utils/utils";
import { Separator } from "@/components/ui/separator"
import { DeviceinfoSkeletons } from "@/components/ui/summary-skeletons";
import Badge from "@veroxos/design-system/dist/ui/Badge/badge";
  
type DeviceInfoCardProps = {
    label: string;
    imageUrl: string;
    deviceName: string;
    datePurchased: Date;
    status: string;
    deviceid: string;
    simNumber: string;
    isAssetLoader: boolean;
 }
export const DeviceInfoCard: React.FC<DeviceInfoCardProps> = ({label="", imageUrl, deviceName, datePurchased, status, deviceid, simNumber, isAssetLoader }) => {
    return (
        <div id="device">
        { label && <div className='text-custom-blue lg:text-[18px] xl:text-[20px] font-[700] lg:py-4 xl:py-7'>{label}</div>}
         {isAssetLoader ?
            <DeviceinfoSkeletons /> :
            <div className="flex gap-[30px]">
            <div className="flex w-[17%] justify-between px-5">
                <Image
                src={imageUrl}
                height={80}
                width={200}
                className='lg:w-[100%] xl:w-[60%]'
                alt="Logo image"
                style={{ margin: 'auto' }}
                loading="lazy"
                />
            </div>
            <div className=" w-[30%]  px-5">
                <div className=' lg:text-[15px] xl:text-[18px] font-[600]'>
                {deviceName}
                </div>
                <div className='flex   justify-between pt-6'>
                <div className=''>
                    <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Upgrade Date</div>
                    <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Status</div>
                    <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Device ID</div>
                    <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Sim ID</div>
                </div>
                <div >
                    <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{datePurchased ? formatSeperateDate(datePurchased) : ' - '}</div>
                    <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>
                        {
                          <Badge className={`p-2 rounded-lg text-white
                          ${status === 'Active' ? 'bg-[#41a673]' : status === 'Suspended' ? 'bg-[#f2994a]'  : 'bg-[#772423]'} variant="success" shape="block">{status? status: "Unkown"}</Badge>
                          bg-[#41a673] text-white`} variant="success" shape="block">{status? status: "Unkown"}</Badge>
                        }
                    </div>
                    <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>
                    {deviceid ? deviceid : ' - '}
                    </div>
                    <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{
                    simNumber ? simNumber : ' - '
                    }</div>
                </div>
                </div>
            </div>
            </div>}
        <Separator className='h-[1.5px] mt-8 bg-[#5d5b5b61]' />
        </div>
    )
}

