import { View } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';

import type { WorkflowDataType } from '../../../shared';
import { SuperSpacer } from '../../../shared';
import { moderateScale } from '../../theme';

class SpacerComponent extends SuperSpacer<WorkflowDataType> {
  render(): ReactNode {
    const { render } = this.props;
    return <View height={render?.heightPX ? parseInt(render?.heightPX, 10) : moderateScale(12)} />;
  }
}

export default SpacerComponent;
