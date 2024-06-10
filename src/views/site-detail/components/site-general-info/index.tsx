"use client"
import GeneralInfoSkeletons from "@/components/ui/summary-skeletons";
 import { SiteGeneralInfoProps } from "@/types/site";  
import dynamic from 'next/dynamic';
const MapBox = dynamic(() => import('../../../../components/ui/map-box').then(mod => mod.MapBox), {
    loading: () => <p>loading...</p>,
    ssr: false,
}); 


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
    const labels = [
        'Veroxos ID',
        'Name',
        'Street Line 1',
        'City',
        'Post / Zip Code',
        'Contact Name',
        'Status',
        'Site Code',
        'Building Name',
        'Street Line 2',
        'State / County',
        'Country',
        'Contact Email'
    ];
    return (
        <div>
            {label && <div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-6'>{label}</div>}
            {isLoading ? <GeneralInfoSkeletons /> :
                <div className="flex max-lg:block lg:gap-x-[32px] xl:gap-x-[71px] pb-6">
                    <div className="flex w-[32%]  max-lg:w-[100%] max-lg:mt-5  justify-between  lg:gap-x-[32px] xl:gap-x-[71px] ">
                        <div className='w-[34%] '>
                            {
                                labels.slice(0, 7).map((label, index) => (
                                    <div key={index} className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">{label}</div>
                                ))
                            }  
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
                    <div className="flex w-[32%] max-lg:w-[100%] max-lg:mt-5  justify-between lg:gap-x-[32px] xl:gap-x-[71px]"> 
                        <div className='w-[34%] '>
                            { labels.slice(7, 13).map((label, index) => (
                                    <div key={index} className="text-[#000] lg:text-[13px] xl:text-[16px] font-[600] leading-7">{label}</div>
                                )) } 
                        </div>
                        <div className="w-[66%] ">
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{siteCode ? siteCode : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{buildingName ? buildingName : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{streetLine2 ? streetLine2 : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{stateCounty ? stateCounty : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{country?.name ? country?.name : ' - '} </div>
                            <div className='text-[#575757] lg:text-[13px] xl:text-[16px] leading-7'>{contactEmail ? contactEmail : ' - '} </div>
                        </div>
                    </div>
                    <div className='w-[32%] max-lg:w-[100%] max-lg:mt-5 '>
                        <div className="mapouter  rounded-lg border border-neutral-300 p-1">
                            <div className="gmap_canvas">
                                {latitude && longitude ?
                                <MapBox lat={latitude} long={longitude} address={streetLine1? streetLine1 : streetLine2 } siteId={Number(veroxosId)} />
                                : <div className='text-center text-lg py-8 h-[230px] flex align-bottom justify-center items-center'>Google map can't find the location</div>}
                             </div>
                        </div>
                     </div>
                </div>}
        </div>
    );
}
  