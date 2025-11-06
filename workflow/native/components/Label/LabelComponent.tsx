import { Text } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';

import { SuperLabel } from '../../../shared';
import styles from './LabelComponentStyle';
import type { LabelPropsType } from './LabelComponentType';

class LabelComponent extends SuperLabel<LabelPropsType> {
  render(): ReactNode {
    const { title } = this.props;
    return <Text style={styles.labelStyle}>{title}</Text>;
  }
}

export default LabelComponent;
