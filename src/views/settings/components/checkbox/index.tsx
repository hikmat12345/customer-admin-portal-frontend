import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

interface IProps {
  isChecked?: boolean;
}

function CheckBox(props: IProps) {
  const { isChecked } = props;

  return (
    <div>
      <Checkbox checked={isChecked} className="" />
    </div>
  );
}

export default CheckBox;
