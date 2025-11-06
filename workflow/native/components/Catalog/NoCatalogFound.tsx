import { Text, View } from 'native-base';
import type { FC } from 'react';
import React from 'react';
import { Image } from 'react-native';

import { Strings } from '../../../shared';
import { Images } from '../../assets';
import { moderateScale, scale } from '../../theme';
import { noCatalogFoundStyle } from './styles';

const NoCatalogFound: FC = () => {
  return (
    <View style={noCatalogFoundStyle.mainView} mb={2}>
      <Image source={Images.noDataAvailable} style={noCatalogFoundStyle.emptyDataImage} />
      <Text fontSize={moderateScale(15)} width={scale(220)} textAlign={'center'}>
        {Strings.noCatalog}
      </Text>
    </View>
  );
};

export default NoCatalogFound;
