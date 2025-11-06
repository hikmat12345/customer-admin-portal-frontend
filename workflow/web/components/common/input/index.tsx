import { Input,InputProps } from '../../../ui/input';
import React from 'react';

interface IProps extends  InputProps {
  name: string;
  type : string;
  placeholder : string;
  className : string;
  value?: string | number;
}

function InputComponent(props: IProps) {
  const { name, value, type, placeholder, className } = props;
  return (
     <Input
     {...props}
        name={name ?? ''}
        value={value ?? ''}
        type={type ?? 'text'}
        placeholder={placeholder ?? ''}
        className={className ?? ''}
      />
  );
}

export default InputComponent;
