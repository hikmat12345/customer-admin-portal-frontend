import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Colors, SuperDropdown, WorkflowDataType } from '../../../shared';

class DropdownComponent extends SuperDropdown<WorkflowDataType> {

  // Fetch and set label values based on selected items
  getLabelValue = (values: Array<string>) => {
    const displayValues: Array<string> = [];
    const { render } = this.props;
    if (values) {
      _.map(values, (item: string) => {
        displayValues.push(_.get(render.items ?? {}, item, item)); // Fallback to item if not found
      });
      this.setState({ multiSelectLabelValue: displayValues });
    }
  };

  render(): ReactNode {
    const { render, title, mandatory, 
      // id, handleRefreshOn, refreshOn 
    } = this.props;
    const { error,
      //  multiSelectValue, value, 
      data } = this.state;
    
    // Render dropdown items dynamically based on the record
    const dropDownItems: Record<string, string> = render.items ?? data ?? {};


    return (
      <div className='min-w-[9rem]'>
        <div className='min-w-[9rem] flex gap-1 mb-2'>
          {title}
          {mandatory && <div className='text-red-500'>*</div>}
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(dropDownItems).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {error !== '' && <div color={Colors.error}>{error}</div>}
      </div>
    );
  }
}

export default DropdownComponent;
