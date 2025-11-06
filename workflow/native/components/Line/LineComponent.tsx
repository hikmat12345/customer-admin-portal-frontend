import { View } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';

import type { WorkflowDataType } from '../../../shared';
import { Colors, SuperSpacer } from '../../../shared';

class LineComponent extends SuperSpacer<WorkflowDataType> {
  render(): ReactNode {
    const {
      render: { marginTop = 0, marginBelow = 0, width = 1, color = Colors.borderGray, type }
    } = this.props;
    return (
      <View
        marginTop={marginTop}
        marginBottom={marginBelow}
        borderWidth={width}
        borderColor={color}
        borderStyle={type}
      />
    );
  }
}

export default LineComponent;
