import React, { useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import CommonDialog from '@/components/ui/CommonDialog'
import FormFieldElement from '@/components/ui/forms'
import { ReportField } from '../../reports'
import { generateValidationSchema } from '../../validationSchema'
import {
	usePostF12Report,
	usePostF15Report,
	usePostF1Report,
	usePostF3Report,
	usePostF4Report,
	usePostF5Report,
	usePostF6Report,
	usePostF7Report,
} from '@/hooks/useGetReportData'
import { format } from 'date-fns'

type ReportKey = 'F1' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F12' | 'F15'

const reportHooks = {
	F1: usePostF1Report,
	F3: usePostF3Report,
	F4: usePostF4Report,
	F5: usePostF5Report,
	F6: usePostF6Report,
	F7: usePostF7Report,
	F12: usePostF12Report,
	F15: usePostF15Report,
}

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
	const dialogOpenRef = useRef<{ [key in ReportKey]?: boolean }>({})

	const handleMouseOver = () => setIsHovered(true)
	const handleMouseOut = () => setIsHovered(false)
	const handleViewDialog = (reportLabel: string) => {
		const transformedLabel = reportLabel.replace(/-/g, '') as ReportKey
		setOpenDialog(true)
		dialogOpenRef.current[transformedLabel] = true
	}
	const handleCloseDialog = () => setOpenDialog(false)

	const validationSchema = generateValidationSchema(fieldTypes)

	const initialValues = fieldTypes.reduce((acc, field) => {
		acc[field.name] = ''
		return acc
	}, {} as Record<string, string>)

	const useReportMutation = (key: ReportKey) => {
		const { mutate, isPending } = reportHooks[key]({
			onSuccess: () => {
				toast.success(`${key} Report downloaded successfully`)
				handleCloseDialog()
			},
			onError: () => {
				toast.error(`Error in downloading ${key} report`)
			},
		})
		return { mutate, isPending }
	}

	const reportMutations = {
		F1: useReportMutation('F1'),
		F3: useReportMutation('F3'),
		F4: useReportMutation('F4'),
		F5: useReportMutation('F5'),
		F6: useReportMutation('F6'),
		F7: useReportMutation('F7'),
		F12: useReportMutation('F12'),
		F15: useReportMutation('F15'),
	}

	const handleSubmit = (values: Record<string, string>) => {
		const fromDate = values.From ? new Date(values.From) : null
		const toDate = values.To ? new Date(values.To) : null
		const currency = values.currency || null
		const year = values.year || null
		const serviceType = values.serviceType || null

		const formattedFromDate = fromDate ? `${('0' + (fromDate.getMonth() + 1)).slice(-2)}-${fromDate.getFullYear()}` : ''
		const formattedToDate = toDate ? `${('0' + (toDate.getMonth() + 1)).slice(-2)}-${toDate.getFullYear()}` : ''

		const formattedStartDate = fromDate ? format(fromDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") : ''
		const formattedEndDate = toDate ? format(toDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") : ''
		const postBody = { from: formattedFromDate, to: formattedToDate }

		Object.keys(dialogOpenRef.current).forEach((key) => {
			const reportKey = key as ReportKey
			if (dialogOpenRef.current[reportKey]) {
				if (reportKey === 'F7') {
					reportMutations[reportKey].mutate({ ...postBody, currency, serviceType })
				} else if (reportKey === 'F12') {
					reportMutations[reportKey].mutate({ currency, year })
				} else if (reportKey === 'F15') {
					reportMutations[reportKey].mutate({ from: formattedStartDate, to: formattedEndDate })
				} else {
					reportMutations[reportKey].mutate(postBody)
				}
			}
		})
	}

	const reportsLoading = Object.values(reportMutations).some((hook) => hook.isPending)

	const dialogContent = (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({ touched, errors }) => (
				<Form className="flex flex-col gap-4">
					{fieldTypes.some((field) => field.type === 'datePicker') && (
						<div className="flex gap-2">
							{fieldTypes
								.filter((field) => field.type === 'datePicker')
								.map((field, index) => (
									<div className="flex flex-col gap-3 w-[48.993333%]" key={index}>
										<FormFieldElement
											type={field.type}
											name={field.name}
											errors={errors}
											touched={touched}
											options={field.options}
										/>
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
										options={field.options}
									/>
								</div>
							))}
					</div>
					<div className="flex items-center justify-center gap-3">
						<Button variant="outline" type="submit" disabled>
							Schedule
						</Button>
						<Button loading={reportsLoading} type="submit" className="animate-in">
							Download
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	)

	return (
		<>
			<div className="max-h-[100%] w-full lg:w-11.50/12 xl:w-11.75/12 border border-[#D6D6D6] rounded-lg flex flex-col justify-between">
				<div className="flex flex-col justify-start p-7 gap-6">
					<h1 className="font-semibold text-lg lg:text-2xl xl:text-3xl text-[#1D46F3]">{label}</h1>
					<div className="flex flex-col gap-4 mt-3">
						<h1 className="font-semibold text-lg lg:text-2xl xl:text-3xl text-[#575757]">{reportName}</h1>
						<h4 className="text-sm md:text-base lg:text-xs xl:text-lg text-[#575757] truncate md:overflow-visible md:whitespace-normal">
							{description}
						</h4>
					</div>
				</div>

				<Button
					variant="null"
					className="h-[50px] w-full bg-[#1D46F31A] text-[#1D46F3] flex items-center justify-center rounded-none rounded-b-md hover:bg-[#1D46F3] hover:text-white gap-4 group transition duration-300 ease-in-out"
					onMouseOver={handleMouseOver}
					onMouseOut={handleMouseOut}
					onClick={() => handleViewDialog(label)}
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
					onClose={reportsLoading ? () => {} : handleCloseDialog}      // while reports are loading dialog will not be closed even on backdrop
					title={
						<div className="text-[26px] font-semibold mb-2">
							<span className="text-[#1D46F3]">{label}</span> {reportName}
						</div>
					}
					size="medium"
					content={dialogContent}
				/>
			)}
		</>
	)
}

export default ReportsCard
