import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
import { AccountGeneralInfoProps } from "@/types/account/acount.tds";
import Image from "next/image";

export default function AccountGeneralInfo({
    label = 'General Information',
    isLoading = false, 
        data : {
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
        { label: 'Client Vendor ID', value: clientenVendorID },
        { label: 'APF Group', value: accountPayableGroup },
        { label: 'Include in the Accounts Payable Feed', value: includeApFeed === "1" ? "YES" : "NO" },
        { label: 'Rolling Contract', value: rollingContract },
        { label: 'Vendor', value: network?.name },
        { label: 'Country', value: network?.country?.name },
        { label: 'Status', value: companyNetworkStatus?.name },
    ];

    return (
        <div>
            {label && <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[43%]    max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            {staticData.slice(0,8).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">{item.label}</div>
                            ))}
                        </div>
                        <div className='w-[66%]'>
                            {staticData.slice(0,8).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-[40%] max-lg:w-[100%] max-lg:mt-5  justify-center gap-10 pr-3">
                        <div className=''>
                            {staticData.slice(8).map((item, index) => (
                                <div key={index} className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">{item.label}</div>
                            ))}
                        </div>
                        <div>
                            {staticData.slice(8).map((item, index) => (
                                <div key={index} className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{item.value ? item.value : ' - '}</div>
                            ))}
                        </div>
                    </div>
                    <div className='w-[17%] max-lg:w-[100%] max-lg:mt-5 '>
                        <Image src={process.env.NEXT_PUBLIC_ASSETS_LOGOS_PATH + network?.logo} alt="account logo" width={200} height={200} className=" " />
                    </div>
                </div>}
        </div>
    );
}
  