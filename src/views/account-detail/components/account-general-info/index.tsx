import VImage from '@/components/ui/image';
import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import TooltipText from '@/components/ui/textbox';
import { AccountGeneralInfoProps } from '@/types/account/acount';

export default function AccountGeneralInfo({
  label = 'General Information',
  isLoading = false,
  data: {
    veroxosId,
    accountNumber,
    masterAccount,
    network,
    paymentTerms,
    remittanceAddress,
    displayName,
    clientenVendorID,
    accountPayableGroup,
    includeApFeed,
    rollingContract,
    companyNetworkStatus,
  },
}: AccountGeneralInfoProps) {
  const staticData = [
    { label: 'Veroxos ID', value: veroxosId },
    { label: 'Account #', value: accountNumber },
    { label: 'Master Account #', value: masterAccount },
    { label: 'Currency', value: network?.country?.currencyCode },
    { label: 'Payment Terms', value: paymentTerms },
    { label: 'Remittance Address', value: remittanceAddress },
    { label: 'Display Name', value: displayName },
    {
      label: 'Include in the Accounts Payable Feed',
      value: includeApFeed !== undefined && includeApFeed !== null ? (includeApFeed ? 'Yes' : 'No') : ' - ',
    },
    {
      label: 'Rolling Contract',
      value: displayName !== undefined && displayName !== null ? (displayName ? 'Yes' : 'No') : ' - ',
    },
    { label: 'Vendor', value: network?.name },
    { label: 'Status', value: companyNetworkStatus?.name },
    { label: 'Country', value: network?.country?.name },
    { label: 'Client Vendor ID', value: clientenVendorID },
    { label: 'APF Group', value: accountPayableGroup },
  ];

  return (
    <div>
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="text-nowrap pb-6 sm:block sm:gap-x-[1rem] xl:flex xl:gap-x-[2.1rem] 2xl:gap-x-[3.75rem]">
          <div className="sm:block sm:w-[100%] lg:flex xl:w-[80%]">
            <div className="flex justify-between sm:w-[100%] lg:w-[50%] lg:gap-x-[2rem] xl:gap-x-[2.1rem] 2xl:gap-x-[3.75rem] max-lg:w-[100%]">
              <div className="sm:w-[50%] lg:w-[40%]">
                {staticData.slice(0, 7).map((item, index) => (
                  <div key={index} className="text-[0.875rem] font-[600] leading-6 text-[#000]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] sm:pl-4 lg:w-[60%] lg:pl-0">
                {staticData.slice(0, 7).map((item, index) => (
                  <div key={index} className="">
                    {typeof item.value !== 'undefined' ? (
                      typeof item.value === 'boolean' ? (
                        <div>{item.value ? item.value : ' - '}</div>
                      ) : (
                        <TooltipText
                          text={item.value ? item.value : ' - '}
                          maxLength={27}
                          className="text-[0.875rem] text-[#575757]"
                        />
                      )
                    ) : (
                      <div className="text-[0.875rem] leading-6 text-[#575757]">-</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center pr-3 sm:mt-5 sm:w-[100%] lg:mt-0 lg:w-[50%] lg:gap-x-[2rem] xl:gap-x-[2.1rem] 2xl:gap-x-[3.75rem] max-lg:mt-5 max-lg:w-[100%]">
              <div className="sm:w-[50%] lg:w-[70%]">
                {staticData.slice(7).map((item, index) => (
                  <div key={index} className="text-[0.875rem] font-[600] leading-6 text-[#000]">
                    {item.label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] sm:pl-4 lg:w-[30%] lg:pl-0">
                {staticData.slice(7).map((item, index) => (
                  <div key={index}>
                    {typeof item.value !== 'undefined' ? (
                      typeof item.value === 'boolean' ? (
                        <div>{item.value ? item.value : ' - '}</div>
                      ) : (
                        <TooltipText
                          text={item.value ? item.value : ' - '}
                          maxLength={13}
                          className="text-left text-[0.875rem] leading-6 text-[#575757]"
                        />
                      )
                    ) : (
                      <div className="text-[0.875rem] leading-6 text-[#575757]">-</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sm:mt-5 sm:w-[100%] xl:mt-0 xl:w-[20%]">
            {network?.logo && (
              <VImage
                src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + network?.logo}
                alt="account logo"
                width={200}
                height={150}
                className="m-auto block h-[9.375rem] w-[12.5rem] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
