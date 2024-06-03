import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../popover'
import { Button } from '@veroxos/design-system/dist/ui/Button/button'
import Image from 'next/image'
import { Command } from '../../command'
import CommandInput from '@veroxos/design-system/dist/ui/CommandInput/commandInput'
import CommandEmpty from '@veroxos/design-system/dist/ui/CommandEmpty/commandEmpty'
import CommandGroup from '@veroxos/design-system/dist/ui/CommandGroup/commandGroup'
import CommandList from '@veroxos/design-system/dist/ui/CommandList/commandList'
import CommandItem from '@veroxos/design-system/dist/ui/CommandItem/commandItem'
import { Check } from 'lucide-react'
import { cn } from '@/utils/utils'
import { FieldProps, getIn } from 'formik'

interface FormikSelectProps extends FieldProps {
	error: boolean
	helperText: string
	label: string
}

const FormikSelectComponent = (props: FormikSelectProps) => {
	const {
		form: { setFieldValue, touched, errors, values },
		field: { name },
		field,
		helperText,
		label,
		...rest
	} = props
	const [open, setOpen] = React.useState(false)

	const isTouched = getIn(touched, name)
	const error = getIn(errors, field.name)

	return (
		<React.Suspense>
			<div className="flex flex-col gap-1">
				<span className="text-[14px] font-semibold text-[#575757]">
					{label} <span className="text-rose-500"> *</span>
				</span>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild className="bg-[#F4F7FE] outline-none">
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className={`w-full justify-between ${((isTouched && error) || error) && 'border-2 border-rose-500'}
							`}
							value={12}
						>
							{label}
							<Image
								src={open ? '/svg/select/upChevron.svg' : '/svg/select/downChevron.svg'}
								alt="Chevron Icon"
								width={20}
								height={20}
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-[100%]">
						<Command>
							<>
								<CommandInput placeholder="Search account..." />
								<CommandEmpty>No data found</CommandEmpty>
							</>
							<CommandGroup>
								<CommandList>
									<CommandItem value={'1'} onSelect={(currentValue) => {}}>
										<Check className={cn('mr-2 h-4 w-4 opacity-100')} />
										123
									</CommandItem>
								</CommandList>
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
				{isTouched && error && <span className="text-[12px] text-rose-500">{error}</span>}
			</div>
		</React.Suspense>
	)
}

export default FormikSelectComponent
