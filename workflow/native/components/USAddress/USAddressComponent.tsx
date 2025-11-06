import { Input, Stack, Text, View } from 'native-base';
import { CloseIcon } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';
import type { TAutocompleteDropdownItem } from '../../../../react-native-dropdown';
import DropDownSearch, { AutocompleteDropdown } from '../../../../react-native-dropdown';

import { dropdownStyle } from '../../../native';
import type { WorkflowDataType } from '../../../shared';
import { Colors, fetchLocation, Strings, SuperUSAddress } from '../../../shared';
import { scale, windowHeight } from '../../theme';
import { USAddressDropDownData } from '../../utils';
import styles from './USAddressComponentStyle';
import type { StateDataType, USAddressItemType } from './USAddressComponentTypes';

class USAddressComponent extends SuperUSAddress<WorkflowDataType> {
  controllerRef: any;
  constructor(props: WorkflowDataType) {
    super(props);
    this.controllerRef = React.createRef();
  }

  handleChangeText(value: string, key: string): void {
    this.setState((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  onChangeStreetLine1 = async (value: string) => {
    const { id, workflowId, token } = this.props;
    if (value.length > 3) {
      this.setState({ loading: true });
      if (this.controllerRef.current) {
        this.setState({ loading: false });
        this.controllerRef.current.abort();
      }
      this.controllerRef.current = new AbortController();

      fetchLocation(
        token,
        'POST',
        { targetBlock: id, data: { [id]: value } },
        workflowId,
        this.controllerRef.current?.signal
      ).then((response: any) => {
        let streetLine1Data: Array<USAddressItemType> = [];
        if (response?.data?.suggestions) {
          streetLine1Data = response?.data?.suggestions?.map((item: Record<string, string>, index: number) => {
            return { ...item, id: index.toString() };
          });
        }
        this.setState(
          {
            streetLine1Data: streetLine1Data ?? [],
            value,
            loading: false
          },
          () => this.forceUpdate()
        );
        this.controllerRef.current = null;
      });
    } else {
      this.setState({ value, streetLine1Data: [] });
    }
  };

  onClearUsAddress = () => {
    this.setState({ streetLine1: '', streetLine2: '', city: '', zip: '', state: '' });
  };

  onChangeItem = (item: TAutocompleteDropdownItem) => {
    const { answer } = this.props;
    if (item && item?.value !== answer?.value?.streetLine1) {
      this.setState({
        streetLine1: item.value,
        streetLine2: item.line2,
        city: item.city,
        zip: item.postCode,
        state: item.state
      });
    }
  };

  render(): ReactNode {
    const { render, title, mandatory } = this.props;
    const {
      loading,
      streetLine2,
      city,
      zip,
      state,
      isFocus,
      streetLine1Error,
      cityError,
      stateError,
      streetLine1Data,
      streetLine1
    } = this.state;

    return (
      <Stack mt={4}>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={2}>
          {title}
        </Text>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={2}>
          {Strings.streetLine1}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        <View style={styles.autoCompleteMainView} mb={5}>
          <AutocompleteDropdown
            direction={'down'}
            dataSet={streetLine1Data}
            onChangeText={this.onChangeStreetLine1}
            onSelectItem={(item: TAutocompleteDropdownItem) => this.onChangeItem(item)}
            onClear={this.onClearUsAddress}
            loading={loading}
            debounce={1000}
            initialValue={streetLine1}
            suggestionsListMaxHeight={windowHeight * 0.35}
            useFilter={false}
            textInputProps={{
              autoCorrect: false,
              autoCapitalize: 'none'
            }}
            ClearIconComponent={<CloseIcon size={14} />}
            clearOnFocus={false}
            inputContainerStyle={styles.inputContainerStyle}
            renderItem={(item: TAutocompleteDropdownItem) => <Text p={15}>{item.value}</Text>}
            inputHeight={50}
            showChevron={false}
            closeOnBlur={false}
          />
        </View>
        {streetLine1Error !== '' && <Text color={Colors.error}>{streetLine1Error}</Text>}

        <Text fontSize={scale(14)} fontWeight={'700'} mt={2} mb={scale(2)}>
          {Strings.streetLine2}
        </Text>
        <Input
          style={styles.inputStyle}
          value={streetLine2}
          selectionColor={Colors.textLightGray}
          onChangeText={(text) => this.handleChangeText(text, 'streetLine2')}
        />

        <Text fontSize={scale(14)} mt={2} fontWeight={'700'} mb={scale(2)}>
          {Strings.city}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        <Input
          style={styles.inputStyle}
          value={city}
          selectionColor={Colors.textLightGray}
          onChangeText={(text) => this.handleChangeText(text, 'city')}
        />
        {cityError !== '' && <Text color={Colors.error}>{cityError}</Text>}

        <Text fontSize={scale(14)} mt={2} fontWeight={'700'} mb={scale(2)}>
          {Strings.zip}
        </Text>
        <Input
          style={styles.inputStyle}
          value={zip}
          keyboardType={'number-pad'}
          selectionColor={Colors.textLightGray}
          onChangeText={(text) => this.handleChangeText(text, 'zip')}
        />
        <Text fontSize={scale(14)} mt={2} fontWeight={'700'} mb={scale(2)}>
          {Strings.state}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        <DropDownSearch
          style={[dropdownStyle.dropdown, isFocus ? dropdownStyle.focusStyle : dropdownStyle.inputTextStyle]}
          placeholderStyle={dropdownStyle.placeholderStyle}
          selectedTextStyle={dropdownStyle.selectedTextStyle}
          iconStyle={dropdownStyle.iconStyle}
          data={USAddressDropDownData(render.states ?? [])}
          containerStyle={dropdownStyle.containerStyle}
          labelField="value"
          maxHeight={scale(300)}
          valueField="value"
          placeholder={Strings.selectState}
          value={state}
          onFocus={() => this.setState({ isFocus: true })}
          onBlur={() => this.setState({ isFocus: false })}
          onChange={(item: StateDataType) => {
            this.setState({ isFocus: false, state: item.value });
          }}
        />
        {stateError !== '' && <Text color={Colors.error}>{stateError}</Text>}
      </Stack>
    );
  }
}

export default USAddressComponent;
