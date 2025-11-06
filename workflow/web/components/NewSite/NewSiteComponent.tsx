import type { ReactNode } from 'react';
import React from 'react';
import type { WorkflowDataType } from '../../../shared';
import { getCatalogApiCall, Strings } from '../../../shared';
import { SuperNewSite } from '../../../shared';
import { NewSiteForm } from './Modal';
import type { NewSiteDataType } from './NewSiteComponentTypes';
import Icons from '../common/icons';

class NewSiteComponent extends SuperNewSite<WorkflowDataType> {
  toggleModal = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onSubmit = (values: NewSiteDataType) => {
    const { id, token, workflowId } = this.props;
    getCatalogApiCall({ targetBlock: id, data: { [id]: values } }, token, workflowId).then(() => {
      this.toggleModal();
    });
  };
  render(): ReactNode {
    const { title, render } = this.props;
    const { isOpen } = this.state;
    return (
     <div className='w-[100%]'>
        <div className='flex justify-between w-[100%]'>
        <h6 className='text-[1.125rem] font-[600] leading-[2.5rem] text-[##222222]'>
          {title}
        </h6>
        <button className='font-[400] text-[0.875rem] leading-[1.085rem] text-[#575757]' onClick={this.toggleModal}>
        <div className='flex items-center gap-1'>
        <Icons.plusIcon className="h-5 w-5 text-[#1D46F3]" /> <p>{Strings.createNewSite}</p>
        </div>
        </button>
        </div>
        {isOpen && (
          <NewSiteForm
            render={render}
            isOpen={isOpen}
            title={title}
            onCancel={this.toggleModal}
            onSubmit={this.onSubmit}
          />
        )}
      </div>
    );
  }
}

export default NewSiteComponent;
