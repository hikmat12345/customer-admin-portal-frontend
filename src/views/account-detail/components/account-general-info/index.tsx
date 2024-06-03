import GeneratlInfoSkeletons from "@/components/ui/summary-skeletons";
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
     
    return (
        <div>
            {label && <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneratlInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6"> 
                     <div className="flex w-[43%]    max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                            <div className='w-[34%]'>
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Veroxos ID </div> 
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9"> Account #</div>
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Master Account #</div>
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Currency </div>
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Payment Terms</div>
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Remittance Address</div>
                                <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Display Name</div>
                            </div>
                            <div className='w-[66%]'>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{veroxosId ? veroxosId : ' - '} </div>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{accountNumber ? accountNumber : ' - '} </div>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{masterAccount ? masterAccount : ' - '} </div>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{network?.country?.currencyCode ? network?.country?.currencyCode : ' - '} </div>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{paymentTerms ? paymentTerms : ' - '} </div>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{remittanceAddress ? remittanceAddress : ' - '} </div>
                                <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{displayName ? displayName : ' - '} </div>
                            </div>
                        </div>
                        <div className="flex w-[40%] max-lg:w-[100%] max-lg:mt-5  justify-center gap-10 pr-3"> 
                        <div className=''>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9"> Client Vendor ID</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">APF Group</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Include in the Accounts Payable Feed</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Rolling Contract</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Vendor</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Country</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[14px] font-[600] leading-9">Status</div>
                        </div>
                        <div >
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{clientenVendorID ? clientenVendorID : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{accountPayableGroup ? accountPayableGroup : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{includeApFeed ? (includeApFeed =="1" ?"YES":"NO") : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{rollingContract ? rollingContract : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{network?.name ? network?.name : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{network?.country?.name ? network?.country?.name : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[14px] leading-9'>{companyNetworkStatus?.name ? companyNetworkStatus?.name : ' - '} </div>
                        </div>
                    </div>
                    <div className='w-[17%] max-lg:w-[100%] max-lg:mt-5 '> 
                      <Image src={process.env.NEXT_PUBLIC_ASSETS_LOGOS_PATH+network?.logo} alt="account logo" width={200} height={200} className=" " />
                     </div>   
                </div>}
        </div>
    );
}
  