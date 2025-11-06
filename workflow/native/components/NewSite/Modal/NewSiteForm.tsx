import type { FormikProps } from 'formik';
import { Formik } from 'formik';
import _ from 'lodash';
import { Input, Text, View } from 'native-base';
import type { FC } from 'react';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import type { DropDownPropsTypes } from '../../../../../react-native-dropdown';
import DropDownSearch from '../../../../../react-native-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BottomModal, { ModalContent } from 'react-native-modals';

import { dropdownStyle } from '../../../../native';
import { Colors, newSiteFormSchema, Strings } from '../../../../shared';
import { moderateScale, scale } from '../../../theme';
import { dropDownData, isIOS } from '../../../utils';
import type { NewSiteFormValuesType } from '../NewSiteComponentTypes';
import styles from './NewSiteFormStyles';
import type { dropdownInputType, InputProps, NewSiteFormModalType } from './NewSiteFormTypes';
import { newSiteFormInitialValues } from './NewSiteFormUtils';

const initialCountryValue = (countries: Record<string, string>): string => (countries ? Object.keys(countries)[0] : '');

const RenderInput: FC<InputProps> = ({ title, value, onChangeText, error, mandatory }: InputProps) => {
  return (
    <View marginTop={3}>
      <Text fontSize={scale(14)} fontWeight={'700'} mb={scale(2)}>
        {title}
        {mandatory && <Text color={Colors.error}>*</Text>}
      </Text>
      <Input
        value={value}
        style={styles.inputStyle}
        selectionColor={Colors.textLightGray}
        onChangeText={(text: string) => onChangeText && onChangeText(text)}
      />
      {!_.isEmpty(error) && <Text color={Colors.error}>{error}</Text>}
    </View>
  );
};

const DropdownInput: FC<dropdownInputType> = ({
  countries,
  isFocus,
  selectedCountry,
  setIsFocus,
  setSelectCountry
}: dropdownInputType) => {
  return (
    <>
      <Text fontSize={scale(14)} mt={3} fontWeight={'700'} mb={scale(2)}>
        {Strings.country}
      </Text>
      <DropDownSearch
        style={[dropdownStyle.dropdown, isFocus ? dropdownStyle.focusStyle : dropdownStyle.inputTextStyle]}
        placeholderStyle={dropdownStyle.placeholderStyle}
        selectedTextStyle={dropdownStyle.selectedTextStyle}
        iconStyle={dropdownStyle.iconStyle}
        data={dropDownData(countries ?? {})}
        containerStyle={dropdownStyle.containerStyle}
        labelField="label"
        maxHeight={scale(300)}
        valueField="value"
        dropdownPosition={'bottom'}
        placeholder={Strings.selectState}
        value={selectedCountry}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: DropDownPropsTypes) => {
          setSelectCountry(item.value);
        }}
      />
    </>
  );
};

const NewSiteFormModal: FC<NewSiteFormModalType> = ({ isOpen, onCancel, render, onSubmit }: NewSiteFormModalType) => {
  const [selectedCountry, setSelectCountry] = useState<string>(initialCountryValue(render?.countries ?? {}));
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onFormSubmit = (values: NewSiteFormValuesType) => {
    const {
      site_name,
      building_name,
      street_line_1,
      street_line_2,
      city,
      post_code,
      state,
      latitude,
      longitude,
      contact_phone,
      contact_email,
      contact_name,
      site_code
    } = values;

    onSubmit({
      site_name,
      building_name,
      street_line_1,
      street_line_2,
      city,
      post_code,
      state,
      latitude,
      longitude,
      contact_phone,
      contact_email,
      contact_name,
      site_code,
      country: selectedCountry
    });
  };

  return (
    <BottomModal
      rounded={false}
      visible={isOpen}
      height={0.9}
      width={1}
      style={styles.bottomModal}
      modalStyle={isIOS ? styles.modalStyle : styles.bottomModalStyle}
    >
      <ModalContent style={styles.modalContent}>
        <Formik
          validationSchema={newSiteFormSchema}
          initialValues={newSiteFormInitialValues(render)}
          onSubmit={(values: NewSiteFormValuesType) => onFormSubmit(values)}
        >
          {({ handleSubmit, ...params }: FormikProps<NewSiteFormValuesType>) => {
            return (
              <>
                <View
                  onStartShouldSetResponder={(): boolean => true}
                  style={[!isIOS && styles.modalContent, styles.modalContentView]}
                >
                  <View style={styles.indicatorView}>
                    <View style={styles.indicatorStyle} />
                  </View>
                  <View alignItems={'center'}>
                    <Text style={styles.textStyle} fontSize={moderateScale(15)} numberOfLines={1}>
                      {Strings.createNewSite}
                    </Text>
                  </View>
                  <View borderWidth={1} borderColor={Colors.borderGray} my={moderateScale(18)} />
                  <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle}>
                    <RenderInput
                      error={params?.touched?.site_name ? params?.errors?.site_name : ''}
                      onChangeText={params.handleChange('site_name')}
                      onBlur={() => params.setFieldTouched('site_name')}
                      value={params?.values?.site_name}
                      title={Strings.siteName}
                      mandatory={render?.siteNameRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.building_name ? params?.errors?.building_name : ''}
                      onChangeText={params.handleChange('building_name')}
                      onBlur={() => params.setFieldTouched('building_name')}
                      value={params?.values?.building_name}
                      title={Strings.buildingName}
                      mandatory={render?.buildingNameRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.street_line_1 ? params?.errors?.street_line_1 : ''}
                      onChangeText={params.handleChange('street_line_1')}
                      onBlur={() => params.setFieldTouched('street_line_1')}
                      value={params?.values?.street_line_1}
                      title={Strings.streetLine1}
                      mandatory={render?.streetLine1Required === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.street_line_2 ? params?.errors?.street_line_2 : ''}
                      onChangeText={params.handleChange('street_line_2')}
                      value={params?.values?.street_line_2}
                      title={Strings.streetLine2}
                      mandatory={render?.streetLine2Required === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.city ? params?.errors?.city : ''}
                      onChangeText={params.handleChange('city')}
                      value={params?.values?.city}
                      title={Strings.city}
                      mandatory={render?.cityRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.post_code ? params?.errors?.post_code : ''}
                      onChangeText={params.handleChange('post_code')}
                      value={params?.values?.post_code}
                      title={Strings.postCodeAndZipCode}
                      mandatory={render?.postCodeRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.state ? params?.errors?.state : ''}
                      onChangeText={params.handleChange('state')}
                      value={params?.values?.state}
                      title={Strings.stateAndCountry}
                      mandatory={render?.stateRequired === '1' ? true : false}
                    />
                    <DropdownInput
                      countries={render?.countries ?? {}}
                      isFocus={isFocus}
                      selectedCountry={selectedCountry}
                      setIsFocus={(value: boolean) => setIsFocus(value)}
                      setSelectCountry={(value: string) => setSelectCountry(value)}
                    />
                    <RenderInput
                      error={params?.touched?.latitude ? params?.errors?.latitude : ''}
                      onChangeText={params.handleChange('latitude')}
                      value={params?.values?.latitude}
                      title={Strings.latitude}
                      mandatory={render?.latitudeRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.longitude ? params?.errors?.longitude : ''}
                      onChangeText={params.handleChange('longitude')}
                      value={params?.values?.longitude}
                      title={Strings.longitude}
                      mandatory={render?.longitudeRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.contact_phone ? params?.errors?.contact_phone : ''}
                      onChangeText={params.handleChange('contact_phone')}
                      value={params?.values?.contact_phone}
                      title={Strings.contactPhoneNumber}
                      mandatory={render?.contactNumberRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.contact_email ? params?.errors?.contact_email : ''}
                      onChangeText={params.handleChange('contact_email')}
                      value={params?.values?.contact_email}
                      title={Strings.contactEmail}
                      mandatory={render?.contactEmailRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.contact_name ? params?.errors?.contact_name : ''}
                      onChangeText={params.handleChange('contact_name')}
                      value={params?.values?.contact_name}
                      title={Strings.contactName}
                      mandatory={render?.contactNameRequired === '1' ? true : false}
                    />
                    <RenderInput
                      error={params?.touched?.site_code ? params?.errors?.site_code : ''}
                      onChangeText={params.handleChange('site_code')}
                      value={params?.values?.site_code}
                      title={Strings.siteCode}
                      mandatory={render?.siteCodeRequired === '1' ? true : false}
                    />
                    <View
                      flexDirection={'row'}
                      justifyContent={'space-between'}
                      height={'10%'}
                      style={styles.footerStyle}
                    >
                      <TouchableOpacity style={styles.buttonView} onPress={() => handleSubmit()}>
                        <Text color={Colors.white} fontSize={moderateScale(15)} style={styles.textStyle}>
                          {Strings.submit}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.buttonView, styles.cancelButtonView]} onPress={onCancel}>
                        <Text fontSize={moderateScale(15)} style={styles.textStyle} color={Colors.primary}>
                          {Strings.cancel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAwareScrollView>
                </View>
              </>
            );
          }}
        </Formik>
      </ModalContent>
    </BottomModal>
  );
};

export default NewSiteFormModal;
