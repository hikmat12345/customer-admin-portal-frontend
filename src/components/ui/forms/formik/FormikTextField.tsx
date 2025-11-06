import React from 'react';
import { FieldProps, getIn } from 'formik';
import { Input } from '../../input';

interface FormikTextFieldProps extends FieldProps {
  error: boolean;
  helperText: string;
  label: string;
  placeholder: string;
  className: string;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { touched, errors },
  field,
  label,
  placeholder,
  className,
  ...rest
}) => {
  const error = getIn(errors, field.name);
  const isTouched = getIn(touched, field.name);
  return (
    <div className={'flex flex-col gap-2'}>
      <label className="text-[0.875rem] font-semibold text-[#575757]">
        {label} <span className="text-rose-500"> *</span>
      </label>
      <div>
        <Input
          type="text"
          placeholder={placeholder}
          {...field}
          {...rest}
          className={`${className ?? ''} ${error ? 'border-2 border-rose-500' : ''}`}
        />
        {error && <span className="text-[0.75rem] text-rose-500">{error}</span>}
      </div>
    </div>
  );
};

export default FormikTextField;
