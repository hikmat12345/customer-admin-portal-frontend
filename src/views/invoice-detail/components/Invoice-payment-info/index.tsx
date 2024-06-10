import formatDate from "@/utils/utils";
import React from "react";

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
            <div className="text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pb-6">Invoice Payment Information</div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-[100%] max-lg:w-[100%] max-lg:mt-5 pr-20">
                    <div className="w-[100%]">
                    <div className="flex gap-2   py-0.5">
                        <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[35%]">Invoice Paid</div>
                        <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[w-60%] ">{paymentData?.invoicePaid ? paymentData?.invoicePaid : ' - '}</div>
                    </div>

                         <div className="flex gap-2   py-0.5">
                        <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[35%]">Payment Reference</div>
                        <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[w-60%] ">{paymentData?.paymentReference ? paymentData?.paymentReference : ' - '}</div>
                    </div>

                    <div className="flex gap-2  py-0.5">
                        <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[35%]">Payment Date</div>
                        <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[60%]">{paymentData?.paymentDate ? formatDate(paymentData?.paymentDate , 'MMM dd, yyyy'): ' - '}</div>
                    </div>

                    <div className="flex gap-2   py-0.5">
                        <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600] w-[35%]">Payment Note</div>
                        <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6 w-[w-60%] ">{paymentData?.paymentNote ? paymentData?.paymentNote : ' - '} </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
