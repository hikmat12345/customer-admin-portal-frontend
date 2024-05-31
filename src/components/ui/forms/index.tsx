import { Field } from 'formik'
import FormikDatePicker from './formik/FormikDatePicker'
import FormikSelectComponent from './formik/FormikSelectComponent'
import FormikTextField from './formik/FormikTextField'

interface IProps {
	id?: number
	name?: string
	type?: string
	value?: string
	required?: boolean
	options?: any
	placeholder?: string
	label?: string
	disabled?: boolean
	multiple?: boolean
	multiLine?: boolean
	children?: any
	menuItems?: any
	isLoading?: boolean
	values?: any
	enabled?: boolean
}

const getFieldComponent = (props: IProps) => {
	const {
		type,
		name,
		label,
		children,
		options = {},
		menuItems = [],
		isLoading = false,
		values,
		enabled = true,
		...rest
	} = props

	switch (type) {
		case 'text':
			return <Field name={name} component={FormikTextField} label={label} {...rest} />
		case 'password':
			return
		case 'number':
			return
		case 'datePicker':
			return (
				<div className="w-[100%]">
					<Field name={name} component={FormikDatePicker} label={label} size="small" {...rest} />
				</div>
			)

		case 'select':
			return <Field name={name} component={FormikSelectComponent} label={label} {...rest} />

		default:
			return
	}
}

const FormFieldElement: React.FC<IProps> = (props: IProps) => getFieldComponent(props)

export default FormFieldElement
