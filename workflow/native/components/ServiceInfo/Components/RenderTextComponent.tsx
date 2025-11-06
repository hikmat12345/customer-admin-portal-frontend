import { Text, View } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import { Colors, DEFAULT_SERVICE_INFO_VALUE } from '../../../../shared';
import { verticalScale } from '../../../theme';
import type { TextComponentType } from '../ServiceInfoComponentType';

const RenderTextComponent: FC<TextComponentType> = ({ value, title, isMargin }: TextComponentType) => {
  const textMarginTop: number = verticalScale(isMargin ? verticalScale(10) : 0);
  return (
    <View style={{ marginTop: textMarginTop }}>
      <Text color={Colors.disableGray}>{title}</Text>
      <Text color={Colors.black}>{value ? value : DEFAULT_SERVICE_INFO_VALUE}</Text>
    </View>
  );
};

export default RenderTextComponent;
