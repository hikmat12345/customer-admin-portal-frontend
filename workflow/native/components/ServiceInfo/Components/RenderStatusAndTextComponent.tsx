import { Text, View } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import { Colors, DEFAULT_SERVICE_INFO_VALUE } from '../../../../shared';
import { moderateScale, verticalScale } from '../../../theme';
import styles from '../ServiceInfoComponentStyle';
import type { TextComponentType } from '../ServiceInfoComponentType';

const RenderStatusAndTextComponent: FC<TextComponentType> = ({ value, title, isMargin, status }: TextComponentType) => {
  const textMarginTop: number = verticalScale(isMargin ? verticalScale(10) : 0);
  return (
    <View style={{ marginTop: textMarginTop }}>
      <Text color={Colors.disableGray}>{title}</Text>
      <View flexDirection={'row'} alignItems={'center'}>
        <View style={styles.statusView} backgroundColor={status ? Colors.error : Colors.parrot} />
        <Text pl={moderateScale(5)} color={Colors.black}>
          {value ? value : DEFAULT_SERVICE_INFO_VALUE}
        </Text>
      </View>
    </View>
  );
};

export default RenderStatusAndTextComponent;
