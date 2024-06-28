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
    <div className="lg:py-8">
      <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">Invoice Remittance Address</div>
      {isLoading ? (
        <Skeleton variant="paragraph" rows={2} />
      ) : (
        <div className="w-[100%] max-lg:mt-5 max-lg:w-[100%]">
          <div className="w-[100%]">
            <div className="flex gap-2 py-1.5">
              <div className="w-[35%] text-[0.875rem] font-[600] lg:leading-6 xl:leading-7">Address</div>
              <div className="text-[#57575 w-[65%] text-left text-[0.875rem] lg:leading-6 xl:leading-7">
                {remittanceData?.remittanceAddress}
              </div>
            </div>

            <div className="flex gap-2 py-1.5">
              <div className="w-[35%] text-[0.875rem] font-[600] lg:leading-6 xl:leading-7">Matched Status</div>
              <div className="w-[65%] text-left text-[0.875rem] text-[#575757] lg:leading-6 xl:leading-7">
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
