import React from 'react';
import { FieldProps, getIn } from 'formik';
import { Input } from '../../input';

interface FormikTextFieldProps extends FieldProps {
  error: boolean;
  helperText: string;
  label: string;
  placeholder: string;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { touched, errors },
  field,
  label,
  placeholder,
  ...rest
}) => {
  const error = getIn(errors, field.name);
  const isTouched = getIn(touched, field.name);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-semibold text-[#575757]">
        {label} <span className="text-rose-500"> *</span>
      </label>
      <div>
        <Input
          type="text"
          placeholder={placeholder}
          {...field}
          {...rest}
          className={isTouched && error ? 'border-2 border-rose-500' : ''}
        />
        {isTouched && error && <span className="text-[12px] text-rose-500">{error}</span>}
      </div>
    </div>
  );
};

export default FormikTextField;
