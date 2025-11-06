import { Text, View } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';
import RenderHtml from 'react-native-render-html';

import type { WorkflowDataType } from '../../../shared';
import { Colors, SuperHtml } from '../../../shared';
import { moderateScale } from '../../theme';

class HtmlComponent extends SuperHtml<WorkflowDataType> {
  render(): ReactNode {
    const {
      title,
      render: { html }
    } = this.props;
    return (
      <View height={150}>
        <Text fontWeight={600} color={Colors.black} fontSize={moderateScale(14)}>
          {title}
        </Text>
        <RenderHtml
          source={{
            html: html ?? ''
          }}
        />
      </View>
    );
  }
}

export default HtmlComponent;
