'use client'
import React, { useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import {  useGetSiteInvoices } from '@/hooks/useGetSites'
import SiteGeneralInfo from './components/employee-general-info'
import Pagination from '@/components/ui/pagination'
import CreateQueryString from '@/utils/createQueryString'
import { useGetEmployeeCostTrend, useGetEmployeeDetail , useGetEmployeeServiceTypes, useGetEmployeeServices, useGetEmployeeTickets} from '@/hooks/useGetEmployees'
import LineChart from '@/components/ui/line-chart'
import TableData from '@/components/ui/summary-tables/table'
import { ScrollTabs } from '@/components/ui/scroll-tabs'
import Skeleton from '@/components/ui/skeleton/skeleton'
import ServiceTypesGrid from '@/components/ui/service-badge'

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
	 const { data: employeeServices, isLoading: isEmployeeServicesLoading } = useGetEmployeeServices(Number(employee_id))
	 const { data: employeeServiceTypes, isLoading: isEmployeeServiceType } = useGetEmployeeServiceTypes(Number(employee_id))
 
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
   
   useEffect(() => {
	if (searchParams) {
		if (keys.length > 1 || !keys.includes('page')) {
			router.push(`${pathname}?${createQueryString('page', 1)}`)
		}
	}
   }, [keys.length, createQueryString, pathname, router, searchParams, keys])

 	const totalPages = Math.max(  siteTicketsData?.total || 0, siteInvoicesData?.total || 0);
  
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
						manageId: manage_id,
						clientEmployeeId: client_employee_id,
						lastName: search?.split(',')[1],
						jobTitle: jobTitle,
						employeeLevel: employee_level,
						costCenter: cost_center,
						vipExecutive: vip_executive, 
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
					<div className='text-[#1D46F3] lg:text-[20px] xl:text-[22px] font-[700] pt-8 flex gap-4'>Service Type </div>
					<div className='flex gap-4 mt-4 flex-wrap'>
						{isEmployeeServiceType ?
							<Skeleton variant="paragraph" rows={3} /> :
							  Array.isArray(employeeServiceTypes) && employeeServiceTypes.length > 0 ?
							  <ServiceTypesGrid services={employeeServiceTypes.sort((a,b)=>b.subTypes?.length - a.subTypes?.length)} />
 								:
								<div className='text-center text-lg py-8'>No data available</div>
						}
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
					<Separator className='h-[2.px] bg-[#5d5b5b61]  mt-8' />
				</div>  
				{/* Service  */}
				<div id="services">
					<TableData
						label="Services"
						data={employeeServices}
						loading={isEmployeeServicesLoading}
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
	    	</ScrollTabs> 
			
		</div>
	)
}

export default EmployeeDetailPage
