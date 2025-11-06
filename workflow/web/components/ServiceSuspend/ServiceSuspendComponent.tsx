import type { ReactNode } from 'react';
import React from 'react';

import { SuperServiceSuspend, WorkflowDataType } from '../../../shared';
import SelectComponent from '../common/select';

class ServiceSuspendComponent extends SuperServiceSuspend<WorkflowDataType> {
  
  handleChange(event: any): void {
    const option = JSON.parse(event);
    const { id, title } = this.props;
    this.setState({ value : event });
    sessionStorage.setItem(id, JSON.stringify({title : title, value : option.value, displayValue : option.label}));
  }

  render(): ReactNode {
    const { render, title, mandatory} = this.props;
    const { value } = this.state;
    return (
    <div className="flex flex-col gap-2">
      <p className="green-text">
        {title}
        {mandatory ? '*' : ''}
      </p>
      <SelectComponent 
      value={value}
      name={title} 
      className='h-12'
      onChange={this.handleChange.bind(this)}
      options={Object.entries(render.items ?? {}).map(([value, key]) => {
        return { label: key, value: value };
      })} />
      
    </div>
  );

  }
}

export default ServiceSuspendComponent;
