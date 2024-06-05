'use client'
import React, { useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@/components/ui/pagination'
import CreateQueryString from '@/utils/createQueryString'
import LineChart from '@/components/ui/line-chart'
import { useGetAccountCostTrend, useGetAccountDetail, useGetAccountInvoices, useGetAccountTickets } from '@/hooks/useGetAccount'
import AccountGeneralInfo from './components/account-general-info'
import TableData from '@/components/ui/summary-tables/table'
import { ScrollTabs } from '@/components/ui/scroll-tabs' 

type VendorDetailPageProps = {
	vendorId: number
}
const VendorDetailPage = ({ vendorId }: VendorDetailPageProps) => {
	const searchParams = useSearchParams() as ReadonlyURLSearchParams
	const router = useRouter()
	const pathname = usePathname()
	const isTerminated = searchParams.get('showTerminated')

	const [showTerminated, setShowTerminated] = React.useState(isTerminated === 'true'? true : false)
	const createQueryString = CreateQueryString()

	const account_id = vendorId
 	const page = searchParams?.get('page') || '1'

	 const limit = 7
	 const offset = +page - 1
 
	const queryParams = new URLSearchParams(searchParams?.toString())
	const keys = Array.from(queryParams.keys())

	// get account general information 
 	const { data: accountDetailData, isLoading: isAccountDetailLoader } = useGetAccountDetail(Number(account_id))
    const {
				veroxosId,
				status: live,
				accountNumber,
				masterAccount,
				clientenVendorID,
				paymentTerms,
				accountPayableGroup,
				remittanceAddress,
				displayName,
				includeApFeed,
				rollingContract,
				network,
				companyNetworkStatus
			} = accountDetailData?.data || {}
 

    // cost and trend data
	const { data: costTrendData, isLoading: isCostTrendLoading } = useGetAccountCostTrend(Number(account_id))

	const { data: accountTicketsData, isLoading: isAccountTicketsLoader, refetch: refetchTicketsData	 } = useGetAccountTickets(Number(account_id), offset, limit)
	
 	const { data: siteInvoicesData, isLoading: isSiteInvoicesLoader , refetch: getInvoices} = useGetAccountInvoices(Number(account_id), offset, limit)
    const handlePageChange = async (page: number) => {
	 const params = new URLSearchParams()
	  if (searchParams) {
		searchParams.forEach((value, key) => {
			params.set(key, value)
		})
	}
	params.set('page', page.toString())
	router.push(`${pathname}?${params.toString()}`)
	await refetchTicketsData()
	await getInvoices()
    }
   const showTerminatedHandler = async () => {
		setShowTerminated(!showTerminated)
 		await refetchTicketsData() 
	}
   useEffect(() => {
	 if (searchParams) {
		if (keys.length > 1 || !keys.includes('page')) {
			router.push(`${pathname}?${createQueryString('page', 1)}`)
		}
	 }
     if (showTerminated) {
		router.push(`${pathname}?${createQueryString('showTerminated', showTerminated.toString())}`)
	 }
   }, [keys.length, showTerminated, createQueryString, pathname, router, searchParams, keys])
   
   useEffect(() => {
	if (searchParams) {
		if (keys.length > 1 || !keys.includes('page')) {
			router.push(`${pathname}?${createQueryString('page', 1)}`)
		}
	}
    }, [keys.length, pathname, router, searchParams, keys])

 	const totalPages = Math.max(  accountTicketsData?.total || 0, siteInvoicesData?.total || 0);
   
   return (
		<div className='w-full border border-custom-lightGray bg-custom-white rounded-lg py-5 px-7 '>
		   <ScrollTabs tabs={["general-information", "cost-trend", "service-type", "tickets", "invoices", "services"]}>
               {/* General Information  */}
				<div id="general-information">
				  <AccountGeneralInfo
					label='General Information'
					isLoading={isAccountDetailLoader}
					data={{  
						veroxosId,
						accountNumber,
						masterAccount,
						network,
						paymentTerms,
						remittanceAddress,
						displayName,
						clientenVendorID,
						accountPayableGroup,
						includeApFeed,
						rollingContract, 
						companyNetworkStatus
					}} /> 
					<Separator className='h-[1.5px] bg-[#5d5b5b61]' />
				</div>

				{/* Cost Trend  */}
				<div id="cost-trend">
					 <LineChart label='Cost Trend' data={costTrendData} isLoading={isCostTrendLoading} />
					 <Separator className='h-[2.2px] mt-4 bg-[#5d5b5b61]' />
				</div>

				{/* Service Type */}
				<div id="service-type">
					<div className='text-custom-blue lg:text-[20px] xl:text-[22px] font-[700] pt-8 '>Service Type</div>
					<div className='flex gap-4 mt-4 flex-wrap'> 
					   <div className='text-center text-lg py-8'>No data available</div>
					</div>
					<Separator className='h-[3.2px] mt-4 bg-[#5d5b5b61]' />
				</div>

				{/* Tickets  */}
				<div id="tickets">
					<TableData
						label="Tickets"
						loading={isAccountTicketsLoader}
						data={accountTicketsData?.data?.tickets}
					/>
					<Separator className='h-[2px] bg-[#5d5b5b61]  mt-8' />
				</div>

				{/* Invoices  */}
				<div id="invoices">
					<TableData
						label="Invoices"
						data={ siteInvoicesData?.invoices }
						currency={siteInvoicesData?.invoices[0]?.Currency}
						loading={isSiteInvoicesLoader}
					/>
					<Separator className='h-[2px] bg-[#5d5b5b61]  mt-8' />
				</div>

				{/* Service  */}
				<div id="services">
					<TableData
						label="Services"
						data={[]}
						loading={false}
					/>
				</div>
				{totalPages > 8 && (
				  <div> 
					<Pagination
						className="flex justify-end pt-4"
 						totalPages={totalPages}
						currentPage={Number(page)}
						onPageChange={handlePageChange}
					/>
				</div> )} 
				<button 
			       onClick={showTerminatedHandler}
			       className="w-[280px] h-[48px] px-[18px] pt-3 pb-4 bg-orange-500 rounded-lg border border-orange-500 my-5   gap-2.5  ml-auto block">
			         <span className="text-white text-base font-semibold ">{showTerminated ? "Show Terminated Service": "Show Live Services" } </span>
		     	</button>
			</ScrollTabs>
		</div>
	)
}
export default VendorDetailPage
