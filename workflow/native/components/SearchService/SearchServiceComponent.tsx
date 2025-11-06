import _ from 'lodash';
import { CloseIcon, Text, View } from 'native-base';
import type { ReactNode } from 'react';
import React from 'react';
import type { TAutocompleteDropdownItem } from '../../../../react-native-dropdown';
import DropDownSearch, { AutocompleteDropdown } from '../../../../react-native-dropdown';

import type { WorkflowDataType } from '../../../shared';
import { Colors, fetchLocation, SEARCH_SERVICE_DATA, Strings, SuperSearchService } from '../../../shared';
import { moderateScale, scale } from '../../theme';
import styles from './SearchServiceComponentStyle';
import type { SearchDropDownItemType } from './SearchServiceTypes';

class SearchServiceComponent extends SuperSearchService<WorkflowDataType> {
  controllerRef: any;
  constructor(props: WorkflowDataType) {
    super(props);
    this.controllerRef = React.createRef();
  }
  onClearUsAddress = () => {
    this.setState({ searchService: '', initialValue: '' });
  };

  onChangeSearchService = async (value: string) => {
    const { id, workflowId, token } = this.props;
    const { searchService } = this.state;
    if (value.length > 3) {
      if (this.controllerRef.current) {
        this.setState({ loading: false });
        this.controllerRef.current.abort();
      }
      this.setState({ loading: true });
      this.controllerRef.current = new AbortController();
      fetchLocation(
        token,
        'POST',
        { targetBlock: id, data: { [id]: { query: value, searchType: searchService } } },
        workflowId,
        this.controllerRef.current?.signal
      ).then((response: any) => {
        const { data } = response;
        let searchServices: Array<TAutocompleteDropdownItem> = [];
        if (data?.suggestions && data?.suggestions.length > 0) {
          const {
            data: { suggestions }
          } = response;

          searchServices = suggestions.map((item: TAutocompleteDropdownItem, index: number) => {
            return {
              ...item,
              line1: item.value,
              value: item.data,
              data: item.value,
              id: index.toString()
            };
          });
        }
        this.setState({ filterSitesData: searchServices, loading: false, searchValue: value });
        this.controllerRef.current = null;
      });
    } else {
      this.setState({ loading: false, filterSitesData: [], searchValue: value });
    }
  };

  render(): ReactNode {
    const { title, mandatory } = this.props;
    const { searchService, isFocus, error, filterSitesData, loading, initialValue } = this.state;
    return (
      <View style={styles.container} mt={2}>
        <Text fontSize={scale(14)} fontWeight={'700'} mb={scale(2)}>
          {title}
          {mandatory && <Text color={Colors.error}>*</Text>}
        </Text>
        <View flexDirection={'row'} justifyContent={'space-between'}>
          <DropDownSearch
            style={[styles.dropdown, isFocus ? styles.focusStyle : styles.inputTextStyle]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={SEARCH_SERVICE_DATA}
            containerStyle={styles.containerStyle}
            labelField="label"
            maxHeight={scale(300)}
            valueField="value"
            placeholder={Strings.dropDownPlaceholder}
            searchPlaceholder={Strings.search}
            value={searchService}
            onFocus={() => this.setState({ isFocus: true })}
            onBlur={() => this.setState({ isFocus: false })}
            onChange={(item: SearchDropDownItemType) => {
              this.setState({ searchService: item?.value });
            }}
          />
          <AutocompleteDropdown
            dataSet={filterSitesData}
            onClear={this.onClearUsAddress}
            suggestionsListMaxHeight={scale(150)}
            useFilter={false}
            textInputProps={{
              autoCorrect: false,
              autoCapitalize: 'none',
              placeholder: Strings.search
            }}
            initialValue={_.toString(initialValue ?? '')}
            loading={loading}
            containerStyle={styles.searchSiteContainer}
            ClearIconComponent={<CloseIcon style={styles.closeIconStyle} />}
            clearOnFocus={false}
            inputContainerStyle={styles.inputContainerStyle}
            renderItem={(item: TAutocompleteDropdownItem) => <Text style={styles.searchSiteText}>{item.line1}</Text>}
            inputHeight={moderateScale(50)}
            showChevron={false}
            closeOnBlur={false}
            onChangeText={this.onChangeSearchService}
            onSelectItem={(item: TAutocompleteDropdownItem) => this.setState({ value: item?.value })}
          />
        </View>
        {error !== '' && <Text color={Colors.error}>{error}</Text>}
      </View>
    );
  }
}

export default SearchServiceComponent;
