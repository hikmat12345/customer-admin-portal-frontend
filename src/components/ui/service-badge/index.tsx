import { getServiceType } from '@/utils/utils';

type ServiceTypeBadgeProps = {
  services: {
    serviceType: string;
    count: number;
    subTypes: { name: string; serviceType: number; count: number }[];
  }[];
};

const ServiceTypesGrid = ({ services }: ServiceTypeBadgeProps) => {
  const refineServices = services.map((service) => {
    const subTypes = service?.subTypes?.filter((subType) => subType.count > 0);
    return { ...service, subTypes };
  });
  return (
    <div className="mt-4 inline-flex w-full flex-col items-start justify-start gap-10 overflow-x-scroll">
      <div className="w-full max-xl:w-[1000px]">
        {Array.isArray(refineServices) ? (
          refineServices.map(
            (
              service: {
                serviceType: string | number;
                count: number;
                subTypes: { name: string; serviceType: number; count: number }[];
              },
              index: number,
            ) => (
              <div
                className="relative flex min-h-52 w-full items-center gap-[147px] rounded-lg p-9 odd:bg-[#F4F7FE] even:py-4"
                key={index}
              >
                <div className="flex h-[60px] w-1/4 min-w-72 max-w-fit gap-3 rounded-lg bg-[#1D46F3] text-center">
                  <div className="w-full pt-4 text-center">
                    <span className="pr-3 text-[1rem] font-semibold text-white">
                      {getServiceType(Number(service.serviceType))}
                    </span>
                    <span
                      className={`relative top-0 inline-flex min-w-8 items-center justify-center rounded-lg bg-white px-2 py-1 text-[0.875rem] font-semibold text-blue-700`}
                    >
                      {service?.count <= 9 ? `0${service?.count}` : new Intl.NumberFormat().format(service?.count)}
                    </span>
                  </div>
                </div>
                {/* childs */}
                <div className="flex w-3/4 flex-wrap">
                  {service?.subTypes
                    .sort(
                      (
                        a: { name: string; serviceType: number; count: number },
                        b: { name: string; serviceType: number; count: number },
                      ) => b.count - a.count,
                    )
                    .map((subType: { name: string; serviceType: number; count: number }, subIndex: number) => (
                      <div className="relative flex w-[33%]" key={subIndex}>
                        <div className="flex items-center justify-center gap-[5px] pb-4 pl-2 pt-2">
                          <div className="text-left text-[0.875rem] text-black">{subType?.name || '-'}</div>
                          <div className="text-center">
                            <div
                              className={`min-w-8 rounded-lg bg-violet-200 px-2 py-1 pl-2 text-base font-semibold text-blue-700`}
                            >
                              {subType?.count <= 9
                                ? `0${subType?.count}`
                                : new Intl.NumberFormat().format(subType?.count)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ),
          )
        ) : (
          <div className="flex w-full justify-center py-8 text-center text-lg">No data found.</div>
        )}
      </div>
    </div>
  );
};

export default ServiceTypesGrid;
