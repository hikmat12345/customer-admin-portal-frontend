import { Stack, Text, TextArea } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';

import { Colors, SuperTextArea } from '../../../shared';
import { scale, verticalScale } from '../../theme';
import textAreaComponentStyle from './TextAreaComponentStyle';
import type { TextAreaPropsType } from './TextAreaType';

class TextAreaComponent extends SuperTextArea<TextAreaPropsType> {
  render(): ReactNode {
    const { title, mandatory, error } = this.props;
    return (
      <Stack>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={scale(2)}>
          {title}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        <TextArea style={textAreaComponentStyle.textAreaStyle} h={verticalScale(140)} fontSize={'sm'} />
        {error && <Text color={Colors.error}>{'error'}</Text>}
      </Stack>
    );
  }
}

export default TextAreaComponent;
