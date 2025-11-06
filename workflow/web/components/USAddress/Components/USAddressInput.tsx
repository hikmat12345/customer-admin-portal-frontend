import InputComponent from '../../../components/common/input'
import React from 'react'
export default function USAddressInput({
  value = '',
  onChange,
  placeholder = '',
  type = 'text',
  className = '',
  label = '',
  isMandatory = false
}: { value: string, onChange: (e: any) => void, placeholder?: string, type?: string, style?: any, className?: string, label?: string, isMandatory?: boolean }) {
  return (
    <div className='my-3'>
      <label className="font-[600]  text-[0.875rem] text-[#575757] leading-[1.085rem] flex-1" htmlFor={label}>
      {label}
        {isMandatory && label && <span className="text-error"style={{color: 'red'}}>*</span>}
  </label>
      <InputComponent
          name={label}
          type={type}
           placeholder={placeholder ?? `Enter ${placeholder}`}
          className={` mt-1 ${className ?? ''}`}
          value={value}
          onChange={onChange}
        /> 
    </div>
  )
}