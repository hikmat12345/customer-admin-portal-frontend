'use client'

import { getIn, FieldProps } from 'formik'
import * as React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import { cn } from '@/utils/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '../../DatePicker/calendar'

interface FormikDatePickerProps extends FieldProps {
	error: boolean
	helperText: string
	label: string
}

const FormikDatePicker = (props: FormikDatePickerProps) => {
	const {
		form: { setFieldValue, touched, errors, values },
		field: { name },
		field,
		error,
		helperText,
		label,
		...rest
	} = props

	const isTouched = getIn(touched, name)
	const errorMessage = getIn(errors, name)

	const [date, setDate] = React.useState<Date>()

	return (
		<div className="flex flex-col gap-2">
			<span className="text-[14px] font-semibold text-[#575757]">{name}</span>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default FormikDatePicker
