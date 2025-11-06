import { Input, Stack, Text, TextArea } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';

import { Colors, SuperInput } from '../../../shared';
import { scale, verticalScale } from '../../theme';
import styles from './InputComponentStyle';
import type { InputPropsType } from './InputComponentType';

class InputComponent extends SuperInput<InputPropsType> {
  handleChangeText(text: string): void {
    this.setState({ value: text });
  }

  render(): ReactNode {
    const { render, title, mandatory, handleRefreshOn, refreshOn, id } = this.props;
    const { value, error } = this.state;
    return (
      <Stack mt={2}>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={scale(2)}>
          {title}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        {render?.multipleLine ? (
          <TextArea
            placeholder={render?.placeHolder}
            value={value}
            onBlur={() => handleRefreshOn(refreshOn, { itemId: id, value: value })}
            onChangeText={this.handleChangeText.bind(this)}
            style={styles.textAreaStyle}
            h={verticalScale(140)}
            fontSize={'sm'}
          />
        ) : (
          <Input
            style={styles.inputStyle}
            placeholder={render?.placeHolder}
            value={value}
            selectionColor={Colors.textLightGray}
            onBlur={() => handleRefreshOn(refreshOn, { itemId: id, value: value })}
            onChangeText={this.handleChangeText.bind(this)}
          />
        )}
        {error !== '' && <Text color={Colors.error}>{error}</Text>}
      </Stack>
    );
  }
}

export default InputComponent;
