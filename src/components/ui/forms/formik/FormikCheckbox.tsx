import { FieldProps } from 'formik';
import React from 'react';

interface FormikCheckboxProps extends FieldProps {
  error: boolean;
  helperText: string;
  reportValue?: string;
  label: string;
  placeholder?: string;
  options: any[];
}
export default function FormikCheckbox(props: FormikCheckboxProps) {
  const {
    form: { setFieldValue, touched, errors, values },
    field: { name },
    field,
    helperText,
    reportValue,
    label,
    placeholder,
    options,
    ...rest
  } = props;
  const onChange = (optionValue: any) => {
    const currentValue = optionValue.target.checked;
    setFieldValue(name, currentValue === true ? 1 : 0);
  };
  return (
    <div className="flex w-full items-center space-x-2">
      <div className="flex items-center space-x-2">
        <input type="checkbox" className="h-4 w-4" name={name} onChange={onChange} checked={field.value} />
        <div>{label}</div>
      </div>
    </div>
  );
}
