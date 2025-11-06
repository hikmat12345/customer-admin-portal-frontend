import VImage from '@/components/ui/image';
import { Separator } from '@/components/ui/separator';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import TooltipText from '@/components/ui/textbox';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';

export default function AssetServiceInfo({
  label = 'Service Info',
  isLoading = false,
  data: {
    number,
    vendor,
    serviceType,
    purpose,
    subAccountNumber,
    status,
    accountNumber,
    description,
    suspended,
    costCenter,
    logo,
  },
}: any) {
  const keys = [
    { label: 'Number', value: number },
    { label: 'Vendor', value: vendor },
    { label: 'Service Type', value: serviceType },
    {
      label: 'Purpose',
      value: purpose,
    },
    { label: 'Sub Account', value: subAccountNumber },
    {
      label: 'Status',
      value: status,
    },
    { label: 'Account', value: accountNumber },
    {
      label: 'Description',
      value: description,
    },
    {
      label: 'Suspended',
      value: suspended,
    },
    {
      label: 'Cost Center',
      value: costCenter,
    },
  ];

  return (
    <div className="mt-4">
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex flex-col items-center gap-[2.775rem] gap-x-[4.375rem] text-nowrap 2md:flex 2md:justify-between lg:flex-col 2lg:flex-row 2xl:flex-row max-lg:flex">
          <div className="flex items-center justify-start md:w-[100%] md:flex-col md:gap-[1.275rem] 2md:flex-row 2md:justify-between xl:gap-[2.275rem]">
            <div className="flex justify-between sm:w-[50%] lg:w-[30%] lg:gap-x-[2.375rem] xl:w-[50%] xl:gap-x-[3.375rem] max-lg:w-[100%]">
              <div className="sm:w-[50%] lg:w-[40%] 2lg:w-[30%] xl:w-[80%]">
                {keys.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] lg:w-[30%] 2lg:w-[35%] xl:w-[80%]">
                {keys.slice(0, 5).map((item, index) => (
                  <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                    {item.value ? <TooltipText text={item.value} maxLength={25} /> : ' - '}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between sm:w-[50%] lg:w-[40%] lg:gap-x-[2.375rem] xl:w-[50%] xl:gap-x-[3.375rem] max-lg:w-[100%]">
              <div className="sm:w-[50%] lg:w-[40%] 2lg:w-[30%] xl:w-[80%]">
                {keys.slice(5).map((item, index) => (
                  <div key={index} className="text-[0.875rem] font-[600] leading-7 text-[#000]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] lg:w-[30%] 2lg:w-[35%] xl:w-[80%]">
                {keys.slice(5).map((item, index) => {
                  const badgeColor =
                    item.value === 'Live' ? 'bg-[#219653]' : item.value === 'Terminated' ? 'bg-[#A40000]' : '';
                  return (
                    <div key={index} className="text-[0.875rem] leading-7 text-[#575757]">
                      {item.value === 'Live' || item.value === 'Terminated' ? (
                        <Badge className={`rounded-lg py-1 text-white ${badgeColor}`} variant="success" shape="block">
                          {item.value}
                        </Badge>
                      ) : item.value ? (
                        <TooltipText text={item.value} maxLength={25} />
                      ) : (
                        ' - '
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="block h-[1px] w-[60%] bg-custom-aluminum lg:h-[1px] lg:w-[60%] 2lg:h-[10em] 2lg:w-[1px] xl:h-[10em] xl:w-[1px]"></div>
          <div className="flex items-center justify-center sm:w-[100%] md:w-[60%] 2md:w-[70%] xl:mt-0 xl:w-[50%]">
            <VImage
              src={logo ? process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + logo : '/device-image.png'}
              alt="account logo"
              width={200}
              height={150}
              className="m-auto block h-[9.375rem] w-[12.5rem] object-contain"
              placeholder="blur"
              blurDataURL="data:image/png;base64,..." // Optional: Use a base64-encoded placeholder
            />
          </div>
        </div>
      )}
      <Separator className="separator-bg-1 mt-8 h-[1px]" />
    </div>
  );
}
