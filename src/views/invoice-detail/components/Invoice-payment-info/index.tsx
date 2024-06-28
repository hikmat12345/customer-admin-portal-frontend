import TooltipText from '@/components/ui/textbox';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import React from 'react';

type InvoicePaymentInfoProps = {
  paymentData: {
    invoicePaid: string;
    paymentReference: string;
    paymentDate: string;
    paymentNote: string;
  };
  isLoading?: boolean;
};
export default function InvoicePaymentInfo({ paymentData, isLoading = false }: InvoicePaymentInfoProps) {
  return (
    <div className="py-8">
      <div className="pb-6 text-[1.375rem] font-[700] text-custom-blue">
        Invoice Payment Information
        <TooltipText
          text={'If client invoice feedback has been configured, this shows the payment information for this invoice.'}
          maxLength={1}
          className="right-[-5px] text-[0.875rem] leading-6 text-[#575757]"
          type="notification"
        />
      </div>
      {isLoading ? (
        <Skeleton variant="paragraph" rows={2} />
      ) : (
        <div className="w-[100%] max-lg:mt-5 max-lg:w-[100%]">
          <div className="w-[100%]">
            <div className="flex gap-2 py-1.5">
              <div className="w-[35%] text-[0.875rem] font-[600] lg:leading-6 xl:leading-7">Invoice Paid</div>
              <div className="w-[65%] text-left text-[0.875rem] text-[#575757] lg:leading-6 xl:leading-7">
                {paymentData?.invoicePaid ? paymentData?.invoicePaid : ' - '}
              </div>
            </div>

            <div className="flex gap-2 py-1.5">
              <div className="w-[35%] text-[0.875rem] font-[600] lg:leading-6 xl:leading-7">Payment Reference</div>
              <div className="w-[65%] text-left text-[0.875rem] text-[#575757] lg:leading-6 xl:leading-7">
                {paymentData?.paymentReference ? paymentData?.paymentReference : ' - '}
              </div>
            </div>

            <div className="flex gap-2 py-1.5">
              <div className="w-[35%] text-[0.875rem] font-[600] lg:leading-6 xl:leading-7">Payment Date</div>
              <div className="w-[65%] text-left text-[0.875rem] text-[#575757] lg:leading-6 xl:leading-7">
                {paymentData?.paymentDate ? paymentData?.paymentDate : ' - '}
              </div>
            </div>

            <div className="flex gap-2 py-1.5">
              <div className="w-[35%] text-[0.875rem] font-[600] lg:leading-6 xl:leading-7">Payment Note</div>
              <div className="w-[w-60%] text-left text-[0.875rem] text-[#575757] lg:leading-6 xl:leading-7">
                {paymentData?.paymentNote ? paymentData?.paymentNote : ' - '}{' '}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
