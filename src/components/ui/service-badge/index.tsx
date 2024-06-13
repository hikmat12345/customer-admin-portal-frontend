import { getServiceType, getServiceTypeColor, getServiceTypeSubColor } from '@/utils/utils';

type ServiceTypeBadgeProps = {
  services: {
    serviceType: string;
    count: number;
    subTypes: { name: string; serviceType: number; count: number }[];
  }[];
};

const ServiceTypesGrid = ({ services }: ServiceTypeBadgeProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {services.map(
        (
          service: {
            serviceType: string | number;
            count: number;
            subTypes: { name: string; serviceType: number; count: number }[];
          },
          index: number,
        ) => (
          <>
            <div
              key={index}
              className={` ${service?.subTypes?.length > 1 ? 'w-[99%]' : 'w-[49%]'} flex h-[52px] rounded border border-neutral-300 bg-custom-background ${service.subTypes?.length > 1 ? 'justify-center gap-3' : 'justify-between'} pl-5 pr-1 pt-1.5`}
            >
              <div className="pb-2 pt-2 text-base font-semibold text-black">
                {getServiceType(Number(service.serviceType))}
              </div>
              <div
                className={` ${service.count >= 1000 ? 'mt-1 h-[30px] w-[64px] rounded-md' : 'h-[38px] w-[38px] rounded-full'} p-1 ${getServiceTypeColor(Number(service.serviceType))} inline-flex items-center justify-start gap-2.5 rounded-[41px] !pt-0 pb-0`}
              >
                <div
                  className={`relative top-0 inline-flex ${service.count >= 1000 ? 'h-[24px] w-[134px] rounded-md' : 'h-[34px] w-[34px] rounded-full'} items-center justify-center rounded-full text-[16px] font-semibold text-white`}
                >
                  {service.count}
                </div>
              </div>
            </div>

            {service?.subTypes
              ?.sort(
                (
                  a: { name: string; serviceType: number; count: number },
                  b: { name: string; serviceType: number; count: number },
                ) => b.count - a.count,
              )
              .map((subType: { name: string; serviceType: number; count: number }, subIndex: number) => (
                <div
                  key={subIndex}
                  className={` ${service.subTypes?.length > 2 ? 'w-[32.2%]' : 'w-[49%]'} h-[52px] ${getServiceTypeSubColor(Number(service.serviceType))} flex justify-between rounded border border-neutral-300 pl-5 pr-1 pt-2`}
                >
                  <div className="pb-2 pt-[0.35rem] font-semibold text-black lg:text-[13px] xl:text-[15px]">
                    {subType?.name}
                  </div>
                  <div
                    className={`inline-flex h-[53px] w-[61px] items-center justify-start gap-2.5 rounded-[41px] p-2 !pt-0`}
                  >
                    <div className="relative top-0 inline-flex h-[44px] w-[61px] items-center justify-center pb-2 font-semibold text-black lg:text-[13px] xl:text-[15px]">
                      {subType?.count}
                    </div>
                  </div>
                </div>
              ))}
          </>
        ),
      )}
    </div>
  );
};

export default ServiceTypesGrid;
