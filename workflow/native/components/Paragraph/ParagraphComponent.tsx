import _ from 'lodash';
import { Stack, Text } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';

import { Colors, SuperParagraph } from '../../../shared';
import { moderateScale } from '../../theme';
import type { ParagraphPropsType } from './ParagraphComponentTypes';

class ParagraphComponent extends SuperParagraph<ParagraphPropsType> {
  render(): ReactNode {
    const { title, render } = this.props;

    return (
      <Stack
        borderWidth={moderateScale(1)}
        borderRadius={moderateScale(14)}
        borderColor={render?.borderHex ? render?.borderHex : Colors.primary}
        p={3}
        mt={2}
        background={render?.backgroundHex ? render?.backgroundHex : Colors.lightBlue}
      >
        <Text
          fontSize={moderateScale(render?.titleFontSize ?? 16)}
          color={render?.titleHexColour ? render?.titleHexColour : Colors.primary}
        >
          {title}
        </Text>
        {!_.isEmpty(render.text) && (
          <Text
            mt={3}
            fontSize={moderateScale(render?.textFontSize ? render?.textFontSize : 14)}
            color={render?.textHexColour ? render?.textHexColour : Colors.black}
          >
            {render?.text}
          </Text>
        )}
      </Stack>
    );
  }
}

export default ParagraphComponent;
