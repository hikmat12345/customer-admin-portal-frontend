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
    <div>
      {label && <div className="pb-6 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">{label}</div>}
      {isLoading ? (
        <GeneralInfoSkeletons />
      ) : (
        <div className="flex gap-[19px] pb-6 max-lg:block">
          <div className="flex w-[33%] justify-between max-lg:mt-5 max-lg:w-[100%]">
            <div className="w-[34%]">
              {labels.slice(0, 7).map((label, index) => (
                <div key={index} className="font-[600] leading-7 text-[#000] lg:text-[13px] xl:text-[16px]">
                  {label}
                </div>
              ))}
            </div>
            <div className="w-[66%]">
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">{veroxosId || ' - '} </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {name?.trim() ? name : ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {streetLine1?.trim() || ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">{city?.trim() || ' - '} </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {postZipCode?.trim() || ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {contactName?.trim() || ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {status !== undefined && status !== null ? (
                  <Badge
                    className={`rounded-lg py-[3px] text-white ${status == 1 ? 'bg-[#219653]' : status == 0 ? 'bg-[#A40000]' : 'bg-[#FC762B]'}`}
                    variant="success"
                    shape="block"
                  >
                    {status == 1 ? 'Live' : status == 0 ? 'Terminated' : 'Suspended'}
                  </Badge>
                ) : (
                  ' - '
                )}{' '}
              </div>
            </div>
          </div>
          <div className="flex w-[25%] justify-between pr-20 max-lg:mt-5 max-lg:w-[100%]">
            <div className="">
              {labels.slice(7, 13).map((label, index) => (
                <div key={index} className="font-[600] leading-7 text-[#000] lg:text-[13px] xl:text-[16px]">
                  {label}
                </div>
              ))}
            </div>
            <div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">{siteCode?.trim() || ' - '} </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {buildingName?.trim() || ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {streetLine2?.trim() || ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {stateCounty?.trim() || ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">
                {country?.name?.trim() ? country?.name : ' - '}{' '}
              </div>
              <div className="leading-7 text-[#575757] lg:text-[13px] xl:text-[16px]">{contactEmail || ' - '} </div>
            </div>
          </div>
          <div className="w-[35%] max-lg:mt-5 max-lg:w-[100%]">
            <div className="mapouter rounded-lg border border-neutral-300 p-1">
              <div className="gmap_canvas">
                {latitude && longitude ? (
                  <MapBox
                    height="200px"
                    lat={latitude}
                    long={longitude}
                    address={streetLine1 || streetLine2}
                    siteId={Number(veroxosId)}
                  />
                ) : (
                  <div className="flex h-[230px] items-center justify-center py-8 text-center align-bottom text-lg">
                    Google map can't find the location
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
