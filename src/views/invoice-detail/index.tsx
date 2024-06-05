'use client'
import React from 'react'
import { useGetInvoiceActivityLog, useGetInvoiceSummary, useGetPaymentInfo, useGetRemittanceAddress, useGetVendorInfo } from '@/hooks/useGetInvoices'
import { Separator } from '@radix-ui/react-dropdown-menu'
import InvoiceRemittanceAddress from './components/invoice-remittance-address'
import InvoicePaymentInfo from './components/Invoice-payment-info'
import InvoiceSummary from './components/general-info'
import TableData from '@/components/ui/summary-tables/table'

type InvoiceSummaryPageProps = {
	invoiceId: number
}
const InvoiceSummaryPage = ({ invoiceId }: InvoiceSummaryPageProps) => {
	const invoice_id = invoiceId
	const { data: invoiceSummaryData, isLoading: isInvoiceSummaryLoading } = useGetInvoiceSummary(Number(invoice_id))
	const { data: invoiceActivityLogData, isLoading: isInvoiceActivityLogLoading } =useGetInvoiceActivityLog(Number(invoice_id))

	const invoiceActivityLog = invoiceActivityLogData?.map((activity:any) => ({
		description: activity.description,
		who: activity.administrator.firstName + ' ' + activity.administrator.lastName,
		when: activity.created, 
	}))
	const { data: remittanceAddressData, isLoading: isRemittanceAddressLoading } =useGetRemittanceAddress(Number(invoice_id))
	const { data: vendorInfoData, isLoading: isVendorInfoLoading } =useGetVendorInfo(Number(invoice_id))
	const { data: paymentInfoData, isLoading: isPaymentInfoLoading } =useGetPaymentInfo(Number(invoice_id))
   
	const {
		invoiceId: id,
		invoiceDate,
		country,
		fiscalMonthYear,
		dueDate,
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
			<div id="general-info">
					<InvoiceSummary
						invoiceData={{
							invoiceId: id,
							invoiceDate:  invoiceDate,
							country:  country,
							fiscalMonthYear:  fiscalMonthYear,
							invoiceDueDate:  dueDate,
							previousBalancePaid:  previousBalancePaid,
							invoiceNumber:  invoiceNumber,
							carriedForwardBalance:  carriedForwardBalance,
							adjustments: adjustments,
							taxAndFees:  taxAndFees,
							subTotal: subTotal,
							amountToPay: amountToPay,
							total: total,
							invoicePDF:  invoicePDF,
							invoiceType:invoiceType,
							apfRequestNumber: apfRequestNumber,
							includeInAPF: includeInAPF,
							dateEntered: dateEntered,
							status:  status,
						}}
						vendorData={vendorInfo}
						isLoading={false}
					/>
					<Separator className='h-[1.5px] bg-[#5d5b5b61]' />
				</div>

				<div id="device-information">
					<div className="flex max-lg:block gap-[19px] pb-6">
						<div className="w-[55%] max-lg:w-[100%] max-lg:mt-5">
							<InvoicePaymentInfo paymentData={paymentInfoData} isLoading={isPaymentInfoLoading} />
						</div>
						<div className="w-[45%] max-lg:w-[100%] max-lg:mt-5">
							<InvoiceRemittanceAddress remittanceData={remittanceAddressData?.data} isLoading={isRemittanceAddressLoading} />
						</div>
					</div>
					<Separator className='h-[2px] bg-[#5d5b5b61]' />
				</div>

				<div id="activity">
					<TableData
						label="Activity Log"
						data={invoiceActivityLog}
						loading={isInvoiceActivityLogLoading}
					/>
				</div>
			</div>
		</div>
	)
}

export default InvoiceSummaryPage
