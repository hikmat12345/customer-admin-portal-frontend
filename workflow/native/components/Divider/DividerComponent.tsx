import type { ReactNode } from 'react';
import React from 'react';
import { View } from 'react-native';

import { SuperDivider } from '../../../shared';
import dividerComponentStyle from './DividerComponentStyle';
import type { DividerPropsType } from './DividerComponentTypes';

class DividerComponent extends SuperDivider<DividerPropsType> {
  render(): ReactNode {
    return <View style={dividerComponentStyle.viewStyle} />;
  }
}

export default DividerComponent;
