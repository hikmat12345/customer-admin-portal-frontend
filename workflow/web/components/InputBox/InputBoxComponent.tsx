import type { ReactNode } from 'react';
import React from 'react';

import { SuperInputBox, WorkflowLayoutWebType } from '../../../shared';
import type { InputBoxPropsType } from './InputBoxComponentType';
import { BlockModel } from '../../service/block/block-model';
import { Block } from '../../service/block/block';

class InputBoxComponent extends SuperInputBox<InputBoxPropsType> {
  constructor(props: WorkflowLayoutWebType) {
      super(props);
      this.state = {
          value: props.value || '', // Set default value if provided
          error: props.error || ''
      };
  }
  
  handleChangeText(event: any): void {
    this.setState({ value: event.target.value });
  }

  render(): ReactNode {
    
    const model = new BlockModel();
    model.setValueFromArray(this.props);
    const block = new Block(model,'', '', '');
    const { value } = this.state;
    return (
    <>
      <p className='green-text margin-bottom-2'>
        {model.getTitle()}
        {block.readCustomFieldValue('MANDATORY_STATUS', '0') ? '*' : ''}
      </p>
      <input
        type='text'
        id={block.getDefaultValueFieldIdentifier()}
        placeholder={block.readCustomFieldValue('placerHolder', '')}
        required={block.readCustomFieldValue('MANDATORY_STATUS', '0')}
        value={value}
        onChange={this.handleChangeText.bind(this)}
      />
    </>
  );

  }
}

export default InputBoxComponent;
