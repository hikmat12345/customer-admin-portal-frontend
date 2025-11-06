import type { ReactNode } from 'react';
import React from 'react';

import { SuperTextArea, WorkflowLayoutWebType } from '../../../shared';
import type { TextAreaPropsType } from './TextAreaType';
import { BlockModel } from '../../service/block/block-model';
import { Block } from '../../service/block/block';

class TextAreaComponent extends SuperTextArea<TextAreaPropsType> {
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
    const mandatory = block.readCustomFieldValue('MANDATORY_STATUS', '0') ? true : false;
    const { value } = this.state;
    return (
      <><p className="green-text margin-bottom-2">
          {model.getTitle()}
          {mandatory ? '*' : ''}
        </p>
        <textarea
          className="h-32"
          id={block.getDefaultValueFieldIdentifier()}
          placeholder={block.readCustomFieldValue('placerHolder', '')}
          required={mandatory} 
          style={{ paddingTop: '7px' }}
          value={value}
          onChange={this.handleChangeText.bind(this)} 
        ></textarea>
      </>

      // <div style={{marginTop: mtop, marginBottom: mbottom }}>
      //   <label htmlFor={data.id} style={{ paddingRight: '10px' }}>{title}</label>
      //   <textarea
      //     id={data.id}
      //     value={value}
      //     onChange={this.handleChangeText.bind(this)} 
      //     rows={4} // You can set the number of rows as per your requirement
      //     cols={50} // You can set the number of columns as per your requirement
      //     placeholder={placerHolderDisplay? placerHolderValue: ''}
      //     required={mandatory}
      //   />
        
      // </div>
    );
  }
}

export default TextAreaComponent;
