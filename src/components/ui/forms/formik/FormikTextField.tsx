import React from 'react'
import { Input } from '../../input'
import { FieldProps } from 'formik'

interface FormikTextFieldProps extends FieldProps {
	error: boolean
	helperText: string
	label: string
	placeholder: string
}

const FormikTextField = (props: FormikTextFieldProps) => {
	const {
		form: { setFieldValue, touched, errors, values },
		field: { name },
		field,
		error,
		helperText,
		label,
		placeholder,
		...rest
	} = props

	return (
		<div className="flex flex-col gap-2">
			<span className="text-[14px] font-semibold text-[#575757]">{label}</span>
			<Input type="text" placeholder={placeholder} {...rest} />
		</div>
	)
}

export default FormikTextField
