import Skeleton from '@/components/ui/skeleton/skeleton';
import React from 'react';

type InvoiceRemittanceAddressProps = {
  remittanceData: {
    remittanceAddress: string;
    remittanceAddressMatched: string;
  };
  isLoading?: boolean;
};
export default function InvoiceRemittanceAddress({ remittanceData, isLoading = false }: InvoiceRemittanceAddressProps) {
  return (
    <div className="py-8">
      <div className="pb-6 font-[700] text-custom-blue lg:text-[20px] xl:text-[22px]">Invoice Remittance Address</div>
      {isLoading ? (
        <Skeleton variant="paragraph" rows={2} />
      ) : (
        <div className="w-[100%] max-lg:mt-5 max-lg:w-[100%]">
          <div className="w-[100%]">
            <div className="flex gap-2 py-1.5">
              <div className="w-[50%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[14px] xl:leading-7">Address</div>
              <div className="text-[#57575 w-[50%] text-left lg:text-[13px] lg:leading-6 xl:text-[14px] xl:leading-7">
                {remittanceData?.remittanceAddress}
              </div>
            </div>

            <div className="flex gap-2 py-1.5">
              <div className="w-[50%] font-[600] lg:text-[13px] lg:leading-6 xl:text-[14px] xl:leading-7">
                Matched Status
              </div>
              <div className="w-[50%] text-left text-[#575757] lg:text-[13px] lg:leading-6 xl:text-[14px] xl:leading-7">
                {remittanceData?.remittanceAddressMatched !== undefined
                  ? remittanceData?.remittanceAddressMatched
                    ? 'Matched'
                    : 'Not Matched'
                  : '-'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
