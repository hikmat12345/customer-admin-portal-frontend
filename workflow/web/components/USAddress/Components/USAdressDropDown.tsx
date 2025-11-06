import React from 'react'
export default function USAdressDropDown({
  value = '',
  onChange,
  className = 'dropdown',
  render = { states: [] },
  label = '',
  isMandatory = false
}: { value: string, onChange: (e: any) => void, style?: any, className?: string, render: { states: Array<any> }, label?: string, isMandatory?: boolean }) {
  return (
    <div style={{ margin: "5px",   }}>
     <label className="font-[600]  text-[0.875rem] text-[#575757] leading-[1.085rem] flex-1" htmlFor={label}>
      {label}
      {isMandatory && label && <span className="text-error"style={{color: 'red'}}>*</span>}
      </label>
      <select
        style={{
          width: '100%',
          padding: '8px',}}
         value={value}
        className={`${className} h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background `}
        onChange={(event: any) => onChange(event.target.value)}>
        {render?.states?.map((item: any, index: number) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div >
  )
}
