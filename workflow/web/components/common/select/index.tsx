import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

interface Option {
  value: string;
  label: string;
}

interface IProps {
  name: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string | number) => void;
}

const SelectComponent: React.FC<IProps> = ({
  name,
  value,
  options,
  placeholder = "Select an option",
  className = "",
  onChange,
}) => {
    const handleValueChange = (selectedValue: string | number) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <Select name={name} value={value} onValueChange={handleValueChange}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={JSON.stringify(option)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
