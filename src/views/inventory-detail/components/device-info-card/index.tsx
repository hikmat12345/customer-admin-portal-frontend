import Image from "next/image";
 import { formatSeperateDate } from "@/utils/utils";
import { Badge } from "../badge";
import { Separator } from "@/components/ui/separator"
import { DeviceinfoSkeletons } from "@/components/ui/summary-skeletons";

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
        { label && <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] py-7'>{label}</div>}
         {isAssetLoader ?
            <DeviceinfoSkeletons /> :
            <div className="flex gap-[30px]">
            <div className="flex w-[17%] justify-between px-5">
                <Image
                src={imageUrl}
                height={80}
                width={200}
                className='w-[60%]'
                alt="Logo image"
                style={{ margin: 'auto' }}
                loading="lazy"
                />
            </div>
            <div className=" w-[30%]  px-5">
                <div className='text-[20px] font-[600]'>
                {deviceName}
                </div>
                <div className='flex   justify-between pt-6'>
                <div className=''>
                    <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-9">Upgrade Date</div>
                    <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-9">Status</div>
                    <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-9">Device ID</div>
                    <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-9">Sim ID</div>
                </div>
                <div >
                    <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{datePurchased ? formatSeperateDate(datePurchased) : ' - '}</div>
                    <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>
                    {status === 'Active' ? <Badge status="Active" /> :
                        status === 'Suspended' ? <Badge status="Suspended" /> :
                        status === 'Disconnected' ? <Badge status="Disconnected" /> :
                            status === 'Decommissioned' ? <Badge status="Decommissioned" /> :
                            status === 'Being Prepared' ? <Badge status="Being Prepared" /> :
                            status === 'Awaiting Service' ? <Badge status="Awaiting Service" /> :
                            status === 'In Transit to User' ? <Badge status="In Transit to User" /> :
                            status === 'In Transit from User' ? <Badge status="In Transit from User" /> :
                            status === 'Lost' ? <Badge status="Lost" /> :
                            status === 'Unknown' ? <Badge status="Unknown" /> :
                            <Badge status="Unknown" />
                    }
                    </div>
                    <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>
                    {deviceid ? deviceid : ' - '}
                    </div>
                    <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-9'>{
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

