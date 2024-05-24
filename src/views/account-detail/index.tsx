'use client'
import React, { useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import TableData from './components/table/table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
 import { ServiceTypeBadge } from './components/service-badge'
import {  useGetServiceTypes, useGetSiteInvoices, useGetSiteServices, useGetSiteTickets } from '@/hooks/useGetSites'
import SiteGeneralInfo from './components/account-general-info'
import formatDate, { getServiceType, moneyFormatter } from '@/utils/utils'
import Skeleton from '@/components/ui/skeleton/skeleton'
import Pagination from '@/components/ui/pagination'
import CreateQueryString from '@/utils/createQueryString'
 import LineChart from '@/components/ui/line-chart'
import { useGetAccountCostTrend, useGetAccountDetail } from '@/hooks/useGetAccount'


const VendorDetailPage = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()
	const isTerminated = searchParams.get('showTerminated')

	const [showTerminated, setShowTerminated] = React.useState(isTerminated === 'true'? true : false)
	const createQueryString = CreateQueryString()

	const [isActive, setActive] = React.useState('info')
	const account_id = searchParams.get('account_id')
 	const page = searchParams?.get('page') || '1'

	 const limit = 7
	 const offset = +page - 1
 
	const queryParams = new URLSearchParams(searchParams?.toString())
	const keys = Array.from(queryParams.keys())

	useEffect(() => {
		if (searchParams) {
			if (keys.length > 1 || !keys.includes('page')) {
				router.push(`${pathname}?${createQueryString('page', 1)}`)
			}
		}
 	}, [keys.length])

	// get site detail 
 	const { data: employeeServiceDetailData, isLoading: isemployeeServiceDetailLoader } = useGetAccountDetail(Number(account_id))
			// const {
			// 	{
			// 		"data": {
			// 			"veroxosId": 2144,
			// 			"status": 1,
			// 			"accountNumber": "8495741211919281",
			// 			"masterAccount": "",
			// 			"clientenVendorID": "49348",
			// 			"paymentTerms": 21,
			// 			"apf_group": 1,
			// 			"remittanceAddress": "COMCAST\r\nPO BOX 71211\r\nCHARLOTTE NC 28272-1211",
			// 			"displayName": "Comcast - Internet TV - Jacksonville FL",
			// 			"Include_In_The_Accounts_Payable_Feed": 1,
			// 			"rollingContract": false,
			// 			"network": {
			// 				"name": "Comcast",
			// 				"country": {
			// 					"name": "United States",
			// 					"currency_code": "USD"
			// 				}
			// 			},
			// 			"companyNetworkStatus": {
			// 				"name": "Active"
			// 			}
			// 		}
			// 	}
			// } = employeeServiceDetailData  || {}
 
			const {
				veroxosId,
				status: live,
				accountNumber,
				masterAccount,
				clientenVendorID,
				paymentTerms,
				apf_group,
				remittanceAddress,
				displayName,
				Include_In_The_Accounts_Payable_Feed,
				rollingContract,
				network,
				companyNetworkStatus
			} = employeeServiceDetailData?.data || {}

    // get services types data
	const { data: serviceTypesData, isLoading: isServiceTypesLoading } = useGetServiceTypes(Number(account_id))
 	const serviceTypes= serviceTypesData?.data || []

    // cost and trend data
	const { data: costTrendData, isLoading: isCostTrendLoading } = useGetAccountCostTrend(Number(account_id))
	// site services dat
	const {data: siteServices, 	isLoading: isServicesLoader , refetch: refetchData } = useGetSiteServices(Number(account_id), offset, limit, showTerminated)
 
	const { data: siteTicketsData, isLoading: isSiteTicketsLoader, refetch: refetchTicketsData	 } = useGetSiteTickets(Number(account_id), offset, limit)
	
 	const { data: siteInvoicesData, isLoading: isSiteInvoicesLoader , refetch: getInvoices} = useGetSiteInvoices(Number(account_id), offset, limit)

	const scrollToSection = (id: string) => {
		const section = document.getElementById(id);
		if (section) {
			setActive(id)
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}; 
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
	await refetchData()
   }
   const showTerminatedHandler = async () => {
		setShowTerminated(!showTerminated)
		scrollToSection('services')

		await refetchData()
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
   }, [keys.length, showTerminated])
   
 	const maximumPager = Math.max(siteServices?.total || 0, siteTicketsData?.total || 0, siteInvoicesData?.total || 0);
 
	// Refining the data
const refinedData: {
    number: string;
    service: string;
    serviceType: number;
    serviceDescription: string | null;
    serviceFunctionPurpose: string;
    serviceStatus: number;
    cost: number;
    invoiceDate: string;
}[] = siteServices?.data?.map((item : any) => ({
    number: item.service.number,
    account: item.service.companyNetwork.network.name,
    service_type: item.service.service_type,
    description: item.service.description,
    ["function / purpose"]: item.service["function / purpose"],
    "service status": item.service["service status"],
    cost:  `${moneyFormatter(parseFloat(item.service?.cost?.rental_raw) + parseFloat(item.service?.cost?.usage_raw) + parseFloat(item.service?.cost?.other_raw) + parseFloat(item.service?.cost?.tax_raw),"usd")} (${formatDate(item.invoiceDate, 'MMM YYYY')})`,
 }));
 
const refinedInvoices = siteInvoicesData?.invoices?.map((item: any) => {
		const { country_code, ...rest } = item;
		return rest;
	});


   return (
		<div className='w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg py-5 px-7 '>
			{/* tabs for navigation */}
			<ul className='w-[828px] max-lg:w-[100%]  h-[19px] justify-start items-start gap-[30px] max-lg:gap-[5px] max-lg:mb-5 flex-wrap inline-flex pb-12'>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'info' && 'active-tab'}`} onClick={() => scrollToSection("info")}  >General Information</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'services' && 'active-tab'}`} onClick={() => scrollToSection('services')} >Services</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'cost-trend' && 'active-tab'}`} onClick={() => scrollToSection('cost-trend')} >Cost Trend</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'service-type' && 'active-tab'}`} onClick={() => scrollToSection('service-type')} >Service Type</button>
				<button className={`py-1 px-2 text-zinc-600 lg:text-[14px] xl:text-[16px] font-normal ${isActive === 'tickets' && 'active-tab'}`} onClick={() => scrollToSection('tickets')} >Tickets</button>
            </ul>

			<div className='mt-2 rounded-lg border border-neutral-300 p-5  overflow-y-scroll h-[75vh] relative'>
				{/* General Information  */}
				<div id="info">
				  <SiteGeneralInfo
					label='General Information'
					isLoading={isemployeeServiceDetailLoader}
					data={{  
						veroxosId,
						accountNumber,
						masterAccount,
						network,
						paymentTerms,
						remittanceAddress,
						displayName,
						clientenVendorID,
						apf_group,
						Include_In_The_Accounts_Payable_Feed,
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
					<div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pt-8 '>Service Type</div>
					<div className='flex gap-4 mt-4 flex-wrap'>
					  {/* {isServiceTypesLoading ?
						 <Skeleton variant="paragraph" rows={3} /> : 
						 Array.isArray(serviceTypes) && serviceTypes.length > 0 ?
						  serviceTypes?.map(({service_type, count, subTypes}, i) => {
 						 	return <ServiceTypeBadge key={i} label={getServiceType(service_type)} count={count} subTypes={subTypes} color="blue" />
						 }) :
						<div className='text-center text-lg py-8'>No data available</div>
					   } */}
					   <div className='text-center text-lg py-8'>No data available</div>
					</div>
					<Separator className='h-[3.2px] mt-4 bg-[#5d5b5b61]' />
				</div>

				{/* Tickets  */}
				<div id="tickets">
					<TableData
						label="Tickets"
						loading={isSiteTicketsLoader}
						data={siteTicketsData?.data?.tickets}
					/>
					<Separator className='h-[2.0px] bg-[#5d5b5b61]  mt-8' />
				</div>

				{/* Invoices  */}
				<div id="invoices">
					<TableData
						label="Invoices"
						data={[] }
						currynecy={siteInvoicesData?.invoices[0]?.currency}
						loading={isSiteInvoicesLoader}
					/>
					<Separator className='h-[2.0px] bg-[#5d5b5b61]  mt-8' />
				</div>

				{/* Service  */}
				<div id="services">
					<TableData
						label="Services"
						data={ refinedData }
						loading={isServicesLoader}
					/>
				</div>
				{maximumPager > 8 && (
				  <div className=""> 
					<Pagination
						className="flex justify-end pt-4"
 						totalPages={maximumPager}
						currentPage={Number(page)}
						onPageChange={handlePageChange}
					/>
				</div> )} 
				<button 
			  onClick={showTerminatedHandler}
			  className="w-[280px] h-[48px] px-[18px] pt-3 pb-4 bg-orange-500 rounded-lg border border-orange-500 my-5   gap-2.5  ml-auto block">
			    <span className="text-white text-base font-semibold ">{showTerminated ? "Show Terminated Service": "Show Live Services" } </span>
			</button>
			</div>
			
		</div>
	)
}

export default VendorDetailPage
