'use client'
import React from 'react'
import { useGetInvoiceActivityLog, useGetInvoiceSummary, useGetPaymentInfo, useGetRemittanceAddress, useGetVendorInfo } from '@/hooks/useGetInvoices'

type InvoiceSummaryPageProps = {
	invoiceId: number
}
const InvoiceSummaryPage = ({ invoiceId }: InvoiceSummaryPageProps) => {
	const invoice_id = invoiceId
	const { data: invoiceSummaryData, isLoading: isInvoiceSummaryLoading } = useGetInvoiceSummary(Number(invoice_id))
	const { data: invoiceActivityLogData, isLoading: isInvoiceActivityLogLoading } =useGetInvoiceActivityLog(Number(invoice_id))

	const invoiceActivityLog = invoiceActivityLogData?.map((activity:any) => ({
		description: activity.step,
		when: activity.created,
		who: activity.administrator.who,
	}))
	const { data: remittanceAddressData, isLoading: isRemittanceAddressLoading } =useGetRemittanceAddress(Number(invoice_id))
	const { data: vendorInfoData, isLoading: isVendorInfoLoading } =useGetVendorInfo(Number(invoice_id))
	const { data: paymentInfoData, isLoading: isPaymentInfoLoading } =useGetPaymentInfo(Number(invoice_id))
   
	const {
		invoiceDate,
		country,
		fiscalMonthYear,
		invoiceDueDate,
		previousBalancePaid,
		invoiceNumber,
		carriedForwardBalance,
		adjustments,
		taxAndFees,
		subTotal,
		amountToPay,
		total,
		invoicePDF,
		invoiceType,
		apfRequestNumber,
		includeInAPF,
		dateEntered,
		status,
	} = invoiceSummaryData || {}
   const vendorInfo = {
		vendor: vendorInfoData?.invoice?.companyNetwork?.network?.name,
		accountNumber: vendorInfoData?.invoice?.companyNetwork?.accountNumber,
		displayName: vendorInfoData?.invoice?.companyNetwork?.displayName,
		currency: vendorInfoData?.invoice?.companyNetwork?.network?.country?.currencyCode,
		clientVendorID: vendorInfoData?.invoice?.companyNetwork?.sapVendorNumber,
		logo : vendorInfoData?.invoice?.companyNetwork?.network?.logo
	}
	return (
		<div className='w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg py-5 px-7 '>
			<div className='mt-2 rounded-lg border border-neutral-300 p-5  overflow-y-scroll h-[75vh]'>
				 
			</div>
		</div>
	)
}

export default InvoiceSummaryPage
