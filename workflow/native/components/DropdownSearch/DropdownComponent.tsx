import _ from 'lodash';
import { CloseIcon, Stack, Text, View } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import DropDownSearch, { MultiSelect } from '../../../../react-native-dropdown';

import type { WorkflowDataType } from '../../../shared';
import { Colors, SuperDropdown } from '../../../shared';
import { Strings } from '../../../shared/constants';
import { moderateScale, scale } from '../../theme';
import { dropDownData } from '../../utils';
import styles from './DropdownComponentStyle';
import type { DropDownItemType } from './DropdownComponentType';

class DropdownComponent extends SuperDropdown<WorkflowDataType> {
  getLabelValue = (values: Array<string>) => {
    const displayValues: Array<string> = [];
    const { render } = this.props;
    if (values) {
      _.map(values, (item: string) => {
        displayValues.push(_.get(render.items ?? {}, item));
      });
      this.setState({ multiSelectLabelValue: displayValues });
    }
  };
  render(): ReactNode {
    const { render, title, mandatory, id, handleRefreshOn, refreshOn } = this.props;
    const { isFocus, error, multiSelectValue, value, data } = this.state;
    const dropDownItem: Record<string, string> | undefined = Object.keys(render.items ?? {}).length
      ? render.items
      : data ?? {};
    return (
      <Stack mt={2}>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={moderateScale(2)}>
          {title}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>

        <>
          {render.allowMultiple ? (
            <MultiSelect
              search
              style={[styles.dropdown, isFocus ? styles.focusStyle : styles.inputTextStyle]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropDownData(render.items ?? {})}
              containerStyle={styles.containerStyle}
              labelField="label"
              maxHeight={scale(300)}
              valueField="value"
              placeholder={Strings.dropDownPlaceholder}
              searchPlaceholder={Strings.search}
              value={multiSelectValue}
              onFocus={() => this.setState({ isFocus: true })}
              onBlur={() => this.setState({ isFocus: false })}
              onChange={(item: Array<string>) => {
                this.getLabelValue(item);
                this.setState({ multiSelectValue: item, isFocus: false });
                handleRefreshOn(refreshOn, { itemId: id, value: item });
              }}
              renderSelectedItem={(item: DropDownItemType, unSelect) => {
                return (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>{item.label}</Text>
                      <CloseIcon size={2} />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <DropDownSearch
              search
              style={[styles.dropdown, isFocus ? styles.focusStyle : styles.inputTextStyle]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropDownData(dropDownItem ?? {})}
              containerStyle={styles.containerStyle}
              labelField="label"
              maxHeight={scale(300)}
              valueField="value"
              placeholder={Strings.dropDownPlaceholder}
              searchPlaceholder={Strings.search}
              value={value}
              onFocus={() => this.setState({ isFocus: true })}
              onBlur={() => this.setState({ isFocus: false })}
              onChange={(item) => {
                this.setState({ isFocus: false, value: item?.value, labelValue: item?.label });
                handleRefreshOn(refreshOn, { itemId: id, value: item?.value });
              }}
            />
          )}
        </>
        {error !== '' && <Text color={Colors.error}>{error}</Text>}
      </Stack>
    );
  }
}

export default DropdownComponent;
