import { GoogleMap } from "@/components/ui/google-map";
import GeneratlInfoSkeletons from "@/components/ui/summary-skeletons";
 import { SiteGeneralInfoProps } from "@/types/site";

export default function SiteGeneralInfo({
    label = 'General Information',
    isLoading = false,
    data: {
        veroxosId,
        siteCode,
        name,
        buildingName,
        streetLine1,
        streetLine2,
        city,
        stateCounty,
        postZipCode,
        country,
        contactName,
        contactEmail,
        longitude,
        latitude,
        status
    }
}: SiteGeneralInfoProps) {
    
    return (
        <div>
            {label && <div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneratlInfoSkeletons /> :
                <div className="flex max-lg:block gap-[19px] pb-6">
                    <div className="flex w-[33%]  max-lg:w-[100%] max-lg:mt-5  justify-between  ">
                        <div className='w-[34%]'>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Veroxos ID </div> 
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Street Line 1</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">City</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Post / Zip Code</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Contact Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Status</div>
                        </div>
                        <div className='w-[66%]'>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{veroxosId ? veroxosId : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{name ? name : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{streetLine1 ? streetLine1 : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{city ? city : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{postZipCode ? postZipCode : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{contactName ? contactName : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{status ? status : ' - '} </div>
                           </div>
                    </div>
                    <div className="flex w-[25%] max-lg:w-[100%] max-lg:mt-5  justify-between pr-20"> 
                        <div className=''>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Site Code</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Building Name</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Street Line 2</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">State / County</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Country</div>
                            <div className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">Contact Email</div>
                        </div>
                        <div >
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{siteCode ? siteCode : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{buildingName ? buildingName : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{streetLine2 ? streetLine2 : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{stateCounty ? stateCounty : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{country?.name ? country?.name : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{contactEmail ? contactEmail : ' - '} </div>
                        </div>
                    </div>
                    <div className='w-[35%] max-lg:w-[100%] max-lg:mt-5 '>
                        <div className="mapouter  rounded-lg border border-neutral-300 p-1">
                            <div className="gmap_canvas">
                                {latitude && longitude ?
                                <GoogleMap lat={latitude} long={longitude} address={streetLine1? streetLine1 : streetLine2 } />
                                : <div className='text-center text-lg py-8 h-[230px] flex align-bottom justify-center items-center'>Google map can't find the location</div>}
                             </div>
                        </div>
                     </div>
                </div>}
        </div>
    );
}
  