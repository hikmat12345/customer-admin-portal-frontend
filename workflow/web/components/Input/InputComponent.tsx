import React, { ReactNode } from 'react';
import { Colors, SuperInput } from '../../../shared';
import type { InputPropsType } from './InputComponentType';
import { Textarea } from "../../ui/textarea";
import InputComponent from '../common/input';

class Input extends SuperInput<InputPropsType> {
    render(): ReactNode {
    const { render, title, mandatory, handleRefreshOn, refreshOn, id } = this.props;
    const { value, error } = this.state;

    const handleBlur = () => {
      handleRefreshOn(refreshOn, { itemId: id, value: value });
      sessionStorage.setItem(id, JSON.stringify({title : title, value : value, displayValue : value}));
    }

    return (
      <div className=' pb-3'>
        <div className={'flex flex-col gap-2'}>
      <label className="font-[600] mb-2 ml-1 text-[0.875rem] text-[#575757] leading-[1.085rem] flex-1" htmlFor={title}>
        {title} {mandatory && <span className="text-rose-500"> *</span>}
      </label>
      </div>
        <div>
        {render?.multipleLine ? (
          <Textarea 
          required={mandatory} 
          placeholder={render?.placeHolder} 
          className={`${error ? 'border-2 border-rose-500' : ''}`}
          value={value}
          onChange={(e) => this.setState({...this.state, value : e.target.value})}
          name={title}
          onBlur={() => handleBlur()} />
        ) : (
          <InputComponent
          name={title}
          type="text"
          placeholder={render.placeholder ?? `Enter ${title.toLowerCase()}`}
          className={`${error ? 'border-2 border-rose-500' : 'h-12'}`}
          value={value}
          onChange={(e) => this.setState({...this.state, value : e.target.value})}
          onBlur={handleBlur}
        />
        )}
        {error && <div style={{ color: Colors.error }}>{error}</div>}
      </div>
      </div>
    );
  }
}

export default Input;
