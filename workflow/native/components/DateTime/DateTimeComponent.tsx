import { Button, Stack, Text } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';
import DatePicker from 'react-native-date-picker';

import { Colors, DATE_FORMATS, dateTimeFormat, DEFAULT_DATE_FORMATE, SuperDateTime } from '../../../shared';
import { scale } from '../../theme';
import styles from './DateTimeStyle';
import type { DateTimePropsType } from './DateTimeType';

class DateTimeComponent extends SuperDateTime<DateTimePropsType> {
  handleChangeText(text: Date): void {
    this.setState({ value: text, open: false });
  }

  render(): ReactNode {
    const { mandatory, mode, title, render } = this.props;
    const { value, open, error } = this.state;
    return (
      <Stack mt={2}>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={scale(2)}>
          {title}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        <Button style={styles.dateTimeButton} onPress={() => this.setState({ open: true })}>
          <Text>{`${
            value ? dateTimeFormat(mode, value, render?.dateFormat ?? DEFAULT_DATE_FORMATE) : render?.placeHolder
          }`}</Text>
        </Button>
        <DatePicker
          modal
          mode={mode}
          open={open}
          locale={render?.dateFormat === DATE_FORMATS[1] ? 'en-US' : 'en-GB'}
          date={value === undefined ? new Date() : value}
          onConfirm={(dateValue: Date) => this.handleChangeText(dateValue)}
          onCancel={() => {
            this.setState({ open: false });
          }}
        />
        {error !== '' && <Text color={Colors.error}>{error}</Text>}
      </Stack>
    );
  }
}

export default DateTimeComponent;
