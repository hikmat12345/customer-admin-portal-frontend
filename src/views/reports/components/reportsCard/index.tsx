import CommonDialog from '@/components/ui/CommonDialog'
import FormFieldElement from '@/components/ui/forms'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import { Formik, Form } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import { ReportField } from '../../reports'

const ReportsCard = ({
	label,
	reportName,
	description,
	fieldTypes,
}: {
	label: string
	reportName: string
	description: string
	fieldTypes: ReportField[]
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)

	const handleMouseOver = () => {
		setIsHovered(true)
	}

	const handleMouseOut = () => {
		setIsHovered(false)
	}

	const handleViewDialog = () => {
		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
	}

	const dialogContent = (
		<Formik
			enableReinitialize
			onSubmit={() => {}}
			initialValues={{
				description: '',
			}}
		>
			<Form className="flex flex-col gap-4">
				{fieldTypes.some((field) => field.type === 'datePicker') && (
					<div className="flex gap-2">
						{fieldTypes
							.filter((field) => field.type === 'datePicker')
							.map((field, index) => (
								<div className="flex flex-col gap-3 w-[48.993333%]" key={index}>
									<FormFieldElement type={field.type} name={field.name} />
								</div>
							))}
					</div>
				)}
				<div className="flex flex-wrap w-[100%] gap-2">
					{fieldTypes
						.filter((field) => field.type !== 'datePicker')
						.map((field, index) => (
							<div
								className={`${
									fieldTypes.filter((field) => field.type !== 'datePicker').length === 1 ? 'w-full' : 'w-[48.993333%]'
								} mb-2 mt-1`}
								key={index}
							>
								<FormFieldElement
									type={field.type}
									name={field.name}
									placeholder={field.placeholder}
									label={field.label}
								/>
							</div>
						))}
				</div>
			</Form>
		</Formik>
	)

	return (
		<>
			<div className="max-h-[100%] w-full lg:w-11.50/12 xl:w-11.75/12 border border-[#D6D6D6] rounded-lg flex flex-col justify-between">
				<div className="flex flex-col justify-start p-7 gap-6">
					<h1 className="font-semibold text-lg lg:text-2xl/2 xl:text-3xl text-[#1D46F3]">{label}</h1>
					<div className="flex flex-col gap-4 mt-3">
						<h1 className="font-semibold text-lg lg:text-2xl xl:text-3xl/2 text-[#575757]">{reportName}</h1>
						<h4 className="text-sm md:text-base 1100:text-base lg:text-xs xl:text-lg text-[#575757] truncate md:overflow-visible md:whitespace-normal">
							{description}
						</h4>
					</div>
				</div>

				<Button
					variant="null"
					className="h-[50px] w-full bg-[#1D46F31A] text-[#1D46F3] flex items-center justify-center rounded-none rounded-b-md hover:bg-[#1D46F3] hover:text-white gap-4 group transition duration-300 ease-in-out"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
					onClick={handleViewDialog}
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

			{openDialog && (
				<CommonDialog
					open={openDialog}
					onClose={handleCloseDialog}
					title={
						<div className="text-[26px] font-semibold mb-2">
							<span className="text-[#1D46F3]">{label}</span> {reportName}
						</div>
					}
					size="medium"
					content={dialogContent}
					actions={
						<>
							<Button disabled variant="outline" onClick={() => {}}>
								Schedule
							</Button>
							<Button onClick={() => {}}>Download</Button>
						</>
					}
				/>
			)}
		</>
	)
}

export default ReportsCard
