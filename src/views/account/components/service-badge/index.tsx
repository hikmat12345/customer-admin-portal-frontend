type ServiceTypeBadgeProps = {
  label: string;
  count: number;
  color: string;
  subTypes?: { name: string; service_type: number }[];
};
export function ServiceTypeBadge({ label = 'Mobile', count = 35, color = '', subTypes = [] }: ServiceTypeBadgeProps) {
  return (
    <div>
      <div className="flex h-[64px] w-[49%] justify-between rounded border border-neutral-300 bg-custom-background pl-5 pr-1 pt-2">
        {label && <div className="pb-2 pt-3 text-base font-semibold text-black">{label} </div>}
        <div
          className={`h-[53px] w-[60px] p-2 ${color || 'bg-blue-700'} inline-flex items-center justify-start gap-2.5 rounded-[41px] !pt-0`}
        >
          <div className="relative top-0 inline-flex h-[44px] w-[60px] items-center justify-center rounded-full bg-blue-700 text-xl font-semibold text-white">
            {count}
          </div>
        </div>
      </div>
      {subTypes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {subTypes.map(({ name, service_type }, i) => (
            <div className="h-[64px] w-[49%]" key={i}>
              <div className="flex h-[64px] justify-between rounded border border-neutral-300 bg-custom-palePathaloBlue pl-5 pr-1 pt-2">
                {name && <div className="pb-2 pt-3 text-base font-semibold text-black">{name} </div>}
                <div className="inline-flex h-[53px] w-[60px] items-center justify-start gap-2.5 rounded-[41px] p-2 !pt-0">
                  <div className="relative top-0 inline-flex h-[44px] w-[60px] items-center justify-center text-xl font-semibold text-blue-700">
                    {service_type}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
