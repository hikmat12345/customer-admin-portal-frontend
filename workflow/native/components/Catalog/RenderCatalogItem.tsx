import CheckBox from '@react-native-community/checkbox';
import { Text, View } from 'native-base';
import type { FC } from 'react';
import React from 'react';
import { Image, Pressable } from 'react-native';

import { Colors, Strings } from '../../../shared';
import { moderateScale } from '../../theme';
import type { RenderCatalogItemType } from './CatalogTypes';
import { catalogStyle } from './styles';

const RenderCatalogItem: FC<RenderCatalogItemType> = ({
  item,
  index,
  selectedValue,
  onCheckUncheckCatalog
}: RenderCatalogItemType) => {
  return (
    <Pressable
      onPress={() => {
        onCheckUncheckCatalog(item?.id);
      }}
      key={index}
      style={catalogStyle.selectItemView}
    >
      <View flexDirection={'column'}>
        <View style={catalogStyle.imageView}>
          <Image style={catalogStyle.imageStyle} source={{ uri: item?.image }} />
        </View>

        <View my={3} style={catalogStyle.checkboxView}>
          <CheckBox
            value={selectedValue.includes(item?.id.toString())}
            style={catalogStyle.checkboxStyle}
            disabled={false}
            boxType={'square'}
            tintColor={Colors.primary}
            tintColors={{ true: Colors.primary, false: Colors.checkboxBorder }}
            onChange={() => {
              onCheckUncheckCatalog(item?.id);
            }}
          />
        </View>

        <View mb={moderateScale(10)}>
          <View width={150}>
            <Text fontSize={moderateScale(12)} px={2} style={catalogStyle.textStyle} textAlign={'center'}>
              {`${item?.name},${item?.memory ? ' ' + item?.memory + ',' : ''} ${
                item?.colour ? item?.colour + ',' : ''
              } ${item?.price} ${item?.currency}`}
            </Text>
            {item?.outOfStock && (
              <Text pt={1} color={Colors.error} fontSize={moderateScale(16)} textAlign={'center'}>
                {Strings.outOfStock}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RenderCatalogItem;
