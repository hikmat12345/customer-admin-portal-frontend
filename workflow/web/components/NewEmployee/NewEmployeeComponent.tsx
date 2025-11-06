import React from 'react';

import { getCatalogApiCall, Strings, SuperNewEmployee, WorkflowDataType } from '../../../shared';
import { NewEmployeeForm } from './Modal';
import Icons from '../common/icons';

class NewEmployeeComponent extends SuperNewEmployee<WorkflowDataType> {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  onSubmit = (values : any) => {
    const { id, token, workflowId } = this.props;
    getCatalogApiCall({ targetBlock: id, data: { [id]: values } }, token, workflowId).then(() => {
      this.toggleModal();
    });
  };

  render() {
    const { title, render } = this.props;
    console.log("render ...", render);
    const { isOpen } = this.state;

    return (
      <div className='w-[100%]'>
        <div className='flex justify-between w-[100%]'>
        <h6 className='text-[1.125rem] font-[600] leading-[2.5rem] text-[##222222]'>
          {title}
        </h6>
        <button className='font-[400] text-[0.875rem] leading-[1.085rem] text-[#575757]' onClick={this.toggleModal}>
        <div className='flex items-center gap-1'>
        <Icons.plusIcon className="h-5 w-5 text-[#1D46F3]" /> <p>{Strings.createNewEmployee}</p>
        </div>
        </button>
        </div>
        {isOpen && <NewEmployeeForm
          render={render}
          isOpen={isOpen}
          title={title}
          onCancel={this.toggleModal}
          onSubmit={this.onSubmit}
        />}
      </div>
    );
  }
}

export default NewEmployeeComponent;
