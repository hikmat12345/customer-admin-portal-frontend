import { getServiceType, getServiceTypeColor, getServiceTypeSubColor } from "@/utils/utils";

type ServiceTypeBadgeProps = {
    services: { service_type: string; count: number; subTypes: { name: string; service_type: number; count:number }[]; }[] 
} 

const ServiceTypesGrid = ({ services }: ServiceTypeBadgeProps) => {
    return (
        <div className="flex flex-wrap gap-4">
            {services.map((service: { service_type: string| number; count: number; subTypes: { name: string; service_type: number; count:number }[]; }, index: number) => (
                <> 
                <div key={index} className={` ${service.subTypes?.length > 1 ? 'w-[99%]' : 'w-[49%]'} h-[52px] bg-custom-background rounded border border-neutral-300 flex  ${service.subTypes?.length  > 1 ? 'justify-center gap-3' : 'justify-between'} pl-5 pr-1 pt-1.5`}>
                    <div className="text-black pb-2 pt-2 text-base font-semibold">
                        {getServiceType(Number(service.service_type))}
                    </div>
                    <div className={`h-[34px] w-[34px] p-2 ${getServiceTypeColor(Number(service.service_type))} rounded-[41px] justify-start items-center gap-2.5 inline-flex pb-0  !pt-0`}>
                        <div className={`inline-flex items-center justify-center text-white w-[34px] h-[34px] text-[16px] font-semibold  rounded-full relative top-0`}>{service.count}</div>
                    </div>
                </div>

                {service.subTypes.map((subType: { name: string; service_type: number; count: number }, subIndex: number) => (
                    <div key={subIndex} className={`  ${service.subTypes?.length > 2 ? "w-[32.2%]": "w-[49%]"} h-[52px] ${getServiceTypeSubColor(Number(service.service_type))} rounded border border-neutral-300 flex justify-between pl-5 pr-1 pt-2`}>
                        <div className="text-black pb-2 pt-[0.35rem] text-base font-semibold">
                            {subType?.name}
                        </div>
                        <div className={`h-[53px] w-[41px] p-2 rounded-[41px] justify-start items-center gap-2.5 inline-flex !pt-0`}>
                            <div className="inline-flex items-center justify-center text-black w-[60px] h-[44px] text-[16px] font-semibold  relative top-0 ">{subType?.count}</div>
                        </div>
                    </div>
                ))}  
                </>
            ))}
        </div>
    );
};
  
export default ServiceTypesGrid;