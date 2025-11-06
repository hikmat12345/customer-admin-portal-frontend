import { FieldProps } from 'formik';
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface FormikToggleComponentProps extends FieldProps {
  error: boolean;
  helperText: string;
  reportValue?: string;
  label: string;
  placeholder?: string;
  options: any[];
}
export default function FormikToggleComponent(props: FormikToggleComponentProps) {
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

  const onChange = (optionValue: boolean) => {
    setFieldValue(name, optionValue);
  };
  return (
    <div className="flex w-full items-center space-x-2">
      <div className="flex items-center space-x-2">
        <div className="text-[0.875rem] font-semibold text-[#575757]">{label}</div>
        <Switch checked={field.value} onCheckedChange={onChange} className="data-[state=checked]:bg-custom-blue" />
      </div>
    </div>
  );
}
