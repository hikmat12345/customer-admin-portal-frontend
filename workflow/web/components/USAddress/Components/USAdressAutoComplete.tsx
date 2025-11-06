 
  import InputComponent from '../../../components/common/input';
import React, { useState, useEffect } from 'react';

export default function USAddressAutoComplete({
  listAddress= [],
  className = 'dropdown',
  label = '',
  isMandatory = false,
  onChangeText,
  onSelectItem,
  onClear,
  suggestionsListMaxHeight = 150,
  textInputProps = {},
  ClearIconComponent = null,
  clearOnFocus = false,
  inputContainerStyle = {},
  inputHeight = 50,
  style = {},
}: { 
value?: string, 
listAddress?: Array<any>,
onChange?: (e: any) => void, 
style?: any, 
className?: string, 
render?: { states: Array<any> }, 
label?: string, 
isMandatory?: boolean,
onChangeText?: any,
onSelectItem?: any,
onClear?: () => void,
loading?: boolean,
debounce?: number,
initialValue?: string,
suggestionsListMaxHeight?: number,
useFilter?: boolean,
textInputProps?: any,
ClearIconComponent?: any,
clearOnFocus?: boolean,
inputContainerStyle?: any,
renderItem?: any,
inputHeight?: number,
showChevron?: boolean,
closeOnBlur?: boolean, 
}) {
  const [streatLineOneInput, setStreatLineOneInput] = useState<any>("");
  const [getAddressList, setGetAddressList] = useState<any>(listAddress);
  useEffect(() => {
    setGetAddressList(listAddress);
  }, [listAddress]);

  const handleKeyDown = () => {
     onClear && onClear();
   };
   const handleClear = () => {
      setStreatLineOneInput("");
      onClear && onClear();
    }

  const inputStyle = {
    height: `${inputHeight}px`,
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    ...inputContainerStyle,
  };
  
  return (
    <div className='my-3'>
      {label && (
        <label className="font-[600] text-[0.875rem] text-[#575757] leading-[1.085rem] flex-1" htmlFor={label}>
         {label} {isMandatory &&  <span className="text-rose-500"> *</span>}
      </label> 
      )}
       <InputComponent
          name={label}
           type={"search"}
          placeholder={ `Enter Street Line 1`}
          className={`${className ?? ''}`}
          value={streatLineOneInput}
          onChange={(e)=>{ setStreatLineOneInput(e.target.value) ; onChangeText(e.target.value)}}
          onKeyDown={handleKeyDown}  
          onFocus={() => clearOnFocus}
          /> 
       
      {ClearIconComponent && streatLineOneInput && (
        <span onClick={handleClear} style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer' }}>
          {ClearIconComponent}
        </span>
      )}
      { getAddressList?.length > 0 && (
        <ul
          className=" w-full rounded-md z-10 shadow border border-slate-100" >
          {getAddressList.map((adress: any, index:number) => (
            <li
              key={index}
              className='p-2 cursor-pointer hover:bg-gray-100'
              onClick={() =>{setGetAddressList([]);; setStreatLineOneInput(adress?.data?.streetLine1); onSelectItem(adress?.data)}}>
                {adress?.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
