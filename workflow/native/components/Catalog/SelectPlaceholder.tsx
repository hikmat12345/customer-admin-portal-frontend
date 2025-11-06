import { Text } from 'native-base';
import type { FC } from 'react';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { Colors, Strings } from '../../../shared';
import { Images } from '../../assets';
import { moderateScale } from '../../theme';
import type { SelectPlaceholderType } from './CatalogTypes';
import { selectPlaceholderStyle } from './styles';

const SelectPlaceholder: FC<SelectPlaceholderType> = ({ onClickSelectPlaceholder }: SelectPlaceholderType) => {
  return (
    <TouchableOpacity onPress={() => onClickSelectPlaceholder()} style={selectPlaceholderStyle.selectPlaceholderView}>
      <Image source={Images.plus} style={selectPlaceholderStyle.imageStyle} />
      <Text fontWeight={'700'} color={Colors.silver} fontSize={moderateScale(12)}>
        {Strings.selectPlaceholder}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectPlaceholder;
