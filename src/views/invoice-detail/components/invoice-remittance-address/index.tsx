import Skeleton from "@/components/ui/skeleton/skeleton";
import React from "react";

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
            <div className="text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pb-6">Invoice Remittance Address</div>
            {isLoading ? (
                <Skeleton variant="paragraph" rows={2} />
            ) : (
                <div className="w-[100%] max-lg:w-[100%] max-lg:mt-5">
                    <div className="w-[100%]">
                    <div className="flex gap-2 justify-between py-1.5">
                        <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Address</div>
                        <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{remittanceData?.remittanceAddress}</div>
                    </div>

                    <div className="flex gap-2 justify-between py-1.5">
                        <div className="lg:text-[13px] xl:text-[16px] xl:leading-7 lg:leading-6 font-[600]">Matched Status</div>
                        <div className="text-left lg:text-[12px] xl:text-[14px] xl:leading-7 lg:leading-6">{remittanceData?.remittanceAddressMatched !== undefined ?(remittanceData?.remittanceAddressMatched? 'Matched' : 'Not Matched') : "-"}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
