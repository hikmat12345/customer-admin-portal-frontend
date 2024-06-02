import { ReportField } from '../reports'
import * as Yup from 'yup'

export const generateValidationSchema = (fields: ReportField[]) => {
	const shape: any = {}

	fields.forEach((field) => {
		switch (field.type) {
			case 'text':
				shape[field.name] = Yup.string().required(`${field.label || field.name} is required`)
				break
			case 'select':
				shape[field.name] = Yup.string().required(`${field.label || field.name} is required`)
				break
			case 'datePicker':
				shape[field.name] = Yup.date().required(`${field.label || field.name} is required`)
				break
			default:
				break
		}
	})

	return Yup.object().shape(shape)
}
