'use client'
import React, { useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import {  useGetSiteInvoices } from '@/hooks/useGetSites'
import SiteGeneralInfo from './components/employee-general-info'
import Pagination from '@/components/ui/pagination'
import CreateQueryString from '@/utils/createQueryString'
import { useGetEmployeeCostTrend, useGetEmployeeDetail , useGetEmployeeTickets} from '@/hooks/useGetEmployees'
import LineChart from '@/components/ui/line-chart'
import TableData from '@/components/ui/summary-tables/table'
import { ScrollTabs } from '@/components/ui/scroll-tabs'

type EmployeeDetailPageProps = {
	employeeId: number
}
const EmployeeDetailPage = ({ employeeId }: EmployeeDetailPageProps) => {
	const searchParams = useSearchParams() as ReadonlyURLSearchParams
	const router = useRouter()
	const pathname = usePathname()
	const isTerminated = searchParams.get('showTerminated')

	const [showTerminated, setShowTerminated] = React.useState(isTerminated === 'true'? true : false)
	const createQueryString = CreateQueryString()

	const employee_id = employeeId
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
 	}, [keys.length, createQueryString, pathname, router, searchParams, keys])

	// get site detail 
 	const { data: employeeServiceDetailData, isLoading: isemployeeServiceDetailLoader } = useGetEmployeeDetail(Number(employee_id))
			const {
				id: veroxosId,
				 live,
				 search,
				 jobTitle,
				 employeeLevelId: employee_level,
				 managerEmployeeId: manage_id,
				 externalId: client_employee_id,
				 ticketApprovalManager: vip_executive,
				 costCentreForNewService: cost_center,
				 site
			} = employeeServiceDetailData  || {}
 
    // cost and trend data
	const { data: costTrendData, isLoading: isCostTrendLoading } = useGetEmployeeCostTrend(Number(employee_id)) 
	const { data: siteTicketsData, isLoading: isSiteTicketsLoader, refetch: refetchTicketsData	 } = useGetEmployeeTickets(Number(employee_id), offset, limit)
 	const { data: siteInvoicesData, isLoading: isSiteInvoicesLoader , refetch: getInvoices} = useGetSiteInvoices(Number(employee_id), offset, limit)
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
   
 	const maximumPager = Math.max(  siteTicketsData?.total || 0, siteInvoicesData?.total || 0);
  
const refinedInvoices = siteInvoicesData?.invoices?.map((item: any) => {
		const { country_code, ...rest } = item;
		return rest;
	});


   return (
		<div className='w-full border border-[#ECECEC] bg-[#FFFFFF] rounded-lg py-5 px-7 '>
		   <ScrollTabs tabs={['general-information', 'cost-trend', 'service-type', 'tickets', 'services']} >

				{/* General Information  */}
				<div id="general-information">
				  <SiteGeneralInfo
					label='General Information'
					isLoading={isemployeeServiceDetailLoader}
					data={{  
						veroxosId: veroxosId,
						firstName: search?.split(',')[0],
						email: search?.split(',')[2],
						status:live,
						site: site,
						manage_id: manage_id,
						client_employee_id: client_employee_id,
						last_name: search?.split(',')[1],
						job_title: jobTitle,
						employee_level: employee_level,
						cost_center: cost_center,
						vip_executive: vip_executive, 
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
					   <div className='text-center text-lg py-8 flex 
						  justify-center items-center w-full h-full 
						'>No data available</div>
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
				{/* Service  */}
				<div id="services">
					<TableData
						label="Services"
						data={ [] }
						loading={false}
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
				{/* un-comment when call the services list api  */}
				{/* <button 
			  onClick={showTerminatedHandler}
			  className="w-[280px] h-[48px] px-[18px] pt-3 pb-4 bg-orange-500 rounded-lg border border-orange-500 my-5   gap-2.5  ml-auto block">
			    <span className="text-white text-base font-semibold ">{showTerminated ? "Show Terminated Service": "Show Live Services" } </span>
			</button> */} 
	    	</ScrollTabs> 
			
		</div>
	)
}

export default EmployeeDetailPage
