import * as Yup from 'yup';
import { ReportField } from '../reports';

export const generateValidationSchema = (fields: ReportField[]) => {
  const shape: any = {};

  fields.forEach((field) => {
    switch (field.type) {
      case 'text':
      case 'select':
        if (field.name === 'accounts') {
          shape[field.name] = Yup.array()
            .of(Yup.string())
            .required(`${field.label || field.name} is required`);
        } else if (field.name === 'serviceType') {
          shape[field.name] = Yup.array()
            .of(Yup.number())
            .required(`${field.label || field.name} is required`);
        } else {
          shape[field.name] = Yup.string().required(`${field.label || field.name} is required`);
        }
        break;
      case 'datePicker':
        shape[field.name] = Yup.date().required(`${field.label || field.name} is required`);
        break;
      default:
        break;
    }
  });

  return Yup.object().shape(shape);
};
