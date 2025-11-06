import type { ReactNode } from 'react';
import React from 'react';
import type { WorkflowDataType } from '../../../shared';
import { SuperSpacer } from '../../../shared';

class SpacerComponent extends SuperSpacer<WorkflowDataType> {
  render(): ReactNode {
    const { render } = this.props;
    const height = render?.heightPX ? parseInt(render?.heightPX, 10) : 12;

    return (
      <div style={{ height: `${height}px` }} />
    );
  }
}

export default SpacerComponent;
