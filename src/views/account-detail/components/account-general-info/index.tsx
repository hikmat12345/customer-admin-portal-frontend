import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
import TooltipText from "@/components/ui/textbox";
import { AccountGeneralInfoProps } from "@/types/account/acount.tds";
import Image from "next/image";

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
        companyNetworkStatus
    }
}: AccountGeneralInfoProps) {

    const staticData = [
        { label: 'Veroxos ID', value: veroxosId },
        { label: 'Account #', value: accountNumber },
        { label: 'Master Account #', value: masterAccount },
        { label: 'Currency', value: network?.country?.currencyCode },
        { label: 'Payment Terms', value: paymentTerms },
        { label: 'Remittance Address', value: remittanceAddress },
        { label: 'Display Name', value: displayName },
        { label: 'Include in the Accounts Payable Feed', value:(includeApFeed !==undefined && includeApFeed !==null) ? (includeApFeed ?'Yes' : 'No'): " - " },
        { label: 'Rolling Contract', value: (displayName !==undefined && displayName !==null) ? (displayName ?'Yes' : 'No'): " - "},
        { label: 'Vendor', value: network?.name },
        { label: 'Status', value: companyNetworkStatus?.name },
        { label: 'Country', value: network?.country?.name }, 
        { label: 'Client Vendor ID', value: clientenVendorID },
        { label: 'APF Group', value: accountPayableGroup }, 
    ];

    return (
        <div>
            {label && <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block lg:gap-x-[32px] xl:gap-x-[60px] pb-6">
                    <div className="flex w-[40%] max-lg:w-[100%] max-lg:mt-5  justify-between lg:gap-x-[32px] xl:gap-x-[60px] ">
                        <div className='w-[40%]'>
                            {staticData.slice(0, 7).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-6">{item.label}</div>
                            ))}
                        </div>
                        <div className='w-[60%]'>
                            {staticData.slice(0, 7).map((item, index) => (
                                <div key={index} className=''>
                                    {typeof item.value !== 'undefined' ? (
                                        typeof item.value === 'boolean' ? (
                                            <div>{item.value ? item.value : ' - '}</div>
                                        ) :  
                                        (
                                            <TooltipText
                                                text={item.value ? item.value : ' - '}
                                                maxLength={27}
                                                className="text-[#575757] lg:text-[13px] xl:text-[14px] leading-6"
                                            />
                                        )
                                    ) : (
                                        <div>-</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-[40%] max-lg:w-[100%] max-lg:mt-5  justify-center lg:gap-x-[32px] xl:gap-x-[60px] pr-3">
                        <div className='w-[60%]'>
                            {staticData.slice(7).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-6">{item.label}</div>
                            ))}
                        </div>
                        <div className="w-[40%]">
                            {staticData.slice(7).map((item, index) => (
                                <div key={index}>
                                    {typeof item.value !== 'undefined' ? (
                                        typeof item.value === 'boolean' ? (
                                            <div>{item.value ? item.value : ' - '}</div>
                                        ) :  
                                        (
                                            <TooltipText
                                                text={item.value ? item.value : ' - '}
                                                maxLength={35}
                                                className="text-[#575757] lg:text-[13px] xl:text-[14px] leading-6"
                                            />
                                        )
                                    ) : (
                                        <div>-</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-[20%] max-lg:w-[100%] max-lg:mt-5 '>
                        <Image src={process.env.NEXT_PUBLIC_ASSETS_LOGO_PATH + network?.logo} alt="account logo" width={200} height={200} className=" " />
                    </div>
                </div>}
        </div>
    );
}
