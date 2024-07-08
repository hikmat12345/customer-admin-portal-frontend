'use client';

import GeneralInfoSkeletons from '@/components/ui/summary-skeletons';
import { SiteGeneralInfoProps } from '@/types/site';
import Badge from '@veroxos/design-system/dist/ui/Badge/badge';
import dynamic from 'next/dynamic';

const MapBox = dynamic(() => import('../../../../components/ui/map-box').then((mod) => mod.MapBox), {
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
    status,
  },
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
    'Contact Email',
  ];
  return (
    <div className="w-full">
      {label && <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="justify-between gap-[1.188rem] text-nowrap pb-6 lg:block xl:flex">
          <div className="gap-2 sm:block lg:flex lg:w-[100%] xl:w-[70%] 2xl:w-[65%]">
            <div className="flex justify-between lg:w-[50%] xl:w-[60%] 2xl:w-[55%]">
              <div className="sm:w-[50%] lg:w-[40%] 2xl:w-[34%]">
                {labels.slice(0, 7).map((label, index) => (
                  <div key={index} className="text-[1rem] font-[600] leading-7 text-[#000]">
                    {label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] lg:w-[60%] 2xl:w-[66%]">
                <div className="text-[1rem] leading-7 text-[#575757]">{veroxosId || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{name?.trim() ? name : ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{streetLine1?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{city?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{postZipCode?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{contactName?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">
                  {status !== undefined && status !== null ? (
                    <Badge
                      className={`rounded-md py-[3px] text-white ${status == 0 ? 'bg-[#219653]' : status == 1 ? 'bg-[#A40000]' : ''}`}
                      variant="success"
                      shape="block"
                    >
                      {status === 0 ? 'Live' : 'Terminated'}
                    </Badge>
                  ) : (
                    ' - '
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between sm:mt-5 lg:mt-0 lg:w-[50%] xl:w-[40%] 2xl:w-[45%]">
              <div className="sm:w-[50%] lg:w-[40%] 2xl:w-[45%]">
                {labels.slice(7, 13).map((label, index) => (
                  <div key={index} className="text-[1rem] font-[600] leading-7 text-[#000]">
                    {label}
                  </div>
                ))}
              </div>
              <div className="sm:w-[50%] lg:w-[60%] xl:w-[60%] 2xl:w-[55%]">
                <div className="text-[1rem] leading-7 text-[#575757]">{siteCode?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{buildingName?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{streetLine2?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{stateCounty?.trim() || ' - '} </div>
                <div className="text-[1rem] leading-7 text-[#575757]">
                  {country?.name?.trim() ? country?.name : ' - '}{' '}
                </div>
                <div className="text-[1rem] leading-7 text-[#575757]">{contactEmail || ' - '} </div>
              </div>
            </div>
          </div>
          {latitude && longitude && (
            <div className="sm:mt-5 lg:w-[100%] xl:mt-0 xl:w-[30%] 2xl:w-[35%]">
              <div className="mapouter rounded-lg border border-neutral-300 p-1">
                <div className="gmap_canvas">
                  <MapBox
                    height="12.5rem"
                    lat={latitude}
                    long={longitude}
                    address={streetLine1 || streetLine2}
                    siteId={Number(veroxosId)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
