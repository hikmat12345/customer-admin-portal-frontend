import { useGetExcel } from '@/hooks/useGetCountries'
import httpClient from '@/services/httpClient'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import Image from 'next/image'
import React, { useState } from 'react'

const ReportsCard = ({
	label,
	reportName,
	description,
}: {
	label: string
	reportName: string
	description: string
}) => {
	const [isHovered, setIsHovered] = useState(false)
	// const {} = useGetExcel('2024-01', '2024-02')

	const handleMouseOver = () => {
		setIsHovered(true)
	}

	const handleMouseOut = () => {
		setIsHovered(false)
	}

	const handleDownload = async () => {
		try {
			const response = await httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/account-history/2024-01/2024-02`, {
				// respon: 'blob',
			})

			console.log('Response ', response.data)

			const blobData = response.data // The Blob object containing Excel file data

			// Create a URL for the Blob object
			const url = window.URL.createObjectURL(blobData)

			// Create a link element to trigger the download
			const link = document.createElement('a')
			link.href = url
			link.download = 'filename.xlsx' // Specify the desired filename
			document.body.appendChild(link)

			// Trigger the download
			link.click()

			// Clean up resources
			window.URL.revokeObjectURL(url)
			document.body.removeChild(link)
		} catch (error) {
			console.error('Error downloading Excel:', error)
			// Handle error
		}
	}

	return (
		<div className="max-h-[320px] xl:min-w-[470px] xl:max-h-[320px] border border-[#D6D6D6] rounded-lg flex flex-col justify-between">
			<div className="flex flex-col justify-start p-7 gap-6">
				<h1 className="font-semibold text-3xl text-[#1D46F3]">{label}</h1>
				<div className="flex flex-col gap-4 mt-3">
					<h1 className="font-semibold text-3xl text-[#575757]">{reportName}</h1>
					<h4 className="lg:text-base xl:text-lg text-[#575757]">{description}</h4>
				</div>
			</div>
			<Button
				variant="null"
				className="h-[50px] w-full bg-[#1D46F31A] text-[#1D46F3] flex items-center justify-center rounded-none rounded-b-md hover:bg-[#1D46F3] hover:text-white gap-4 group transition duration-300 ease-in-out"
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onClick={handleDownload}
			>
				View
				<Image
					src="/svg/reports/reportsViewArrow.svg"
					width={30}
					height={30}
					alt="Reports View Arrows"
					className={`${isHovered && 'filter grayscale invert brightness-[0%]'}`}
				/>
			</Button>
		</div>
	)
}

export default ReportsCard
