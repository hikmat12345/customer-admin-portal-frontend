import React,{ ReactNode } from "react";
import { SuperLabel } from "workflow/shared";
 
export default class AdvanceText extends SuperLabel<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value || '', // Set default value if provided
      error: props.error || ''
    };
  }

  render(): ReactNode {
    const { render, title, 
      // type
     } = this.props;
    // const { value } = this.state;
    return (
      <>
        {title && <p className="text-14 font-700 mb-2"
          style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>{title} </p>}
        {/* <div>{ dander html  */}
        <div>{
          render?.advanceText &&
          <div dangerouslySetInnerHTML={{ __html: render?.advanceText }}></div>

        }</div>
      </>
    );
  }
}