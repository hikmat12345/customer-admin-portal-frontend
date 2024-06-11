import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import TooltipText from '@/components/ui/textbox';
import { AccountGeneralInfoProps } from '@/types/account/acount.tds';
import Image from 'next/image';

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
      {label && <div className="pb-6 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex pb-6 lg:gap-x-[32px] xl:gap-x-[60px] max-lg:block">
          <div className="flex w-[40%] justify-between lg:gap-x-[32px] xl:gap-x-[60px] max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[40%]">
              {staticData.slice(0, 7).map((item, index) => (
                <div key={index} className="font-[600] leading-6 text-[#000] lg:text-[13px] xl:text-[14px]">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[60%]">
              {staticData.slice(0, 7).map((item, index) => (
                <div key={index} className="">
                  {typeof item.value !== 'undefined' ? (
                    typeof item.value === 'boolean' ? (
                      <div>{item.value ? item.value : ' - '}</div>
                    ) : (
                      <TooltipText
                        text={item.value ? item.value : ' - '}
                        maxLength={27}
                        className="leading-6 text-[#575757] lg:text-[13px] xl:text-[14px]"
                      />
                    )
                  ) : (
                    <div>-</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-[40%] justify-center pr-3 lg:gap-x-[32px] xl:gap-x-[60px] max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[60%]">
              {staticData.slice(7).map((item, index) => (
                <div key={index} className="font-[600] leading-6 text-[#000] lg:text-[13px] xl:text-[14px]">
                  {item.label}
                </div>
              ))}
            </div>
            <div className="w-[40%]">
              {staticData.slice(7).map((item, index) => (
                <div key={index}>
                  {typeof item.value !== 'undefined' ? (
                    typeof item.value === 'boolean' ? (
                      <div>{item.value ? item.value : ' - '}</div>
                    ) : (
                      <TooltipText
                        text={item.value ? item.value : ' - '}
                        maxLength={35}
                        className="leading-6 text-[#575757] lg:text-[13px] xl:text-[14px]"
                      />
                    )
                  ) : (
                    <div>-</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-[20%] max-lg:mt-5 max-lg:w-[100%]">
            <Image
              src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + network?.logo}
              alt="account logo"
              width={200}
              height={200}
              className=" "
            />
          </div>
        </div>
      )}
    </div>
  );
}
