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
import { Colors, newEmployeeFormSchema, Strings } from '../../../../shared';
import { moderateScale, scale } from '../../../theme';
import { dropDownData, isIOS } from '../../../utils';
import type { NewEmployeeFormValuesType } from '../NewEmployeeComponentTypes';
import styles from './NewEmployeeFormStyles';
import type { DropdownInputType, InputProps, NewEmployeeFormModalType } from './NewEmployeeFormTypes';
import { newEmployeeFormInitialValues } from './NewEmployeeFormUtils';

const RenderInput: FC<InputProps> = ({ title, value, onChangeText, error, mandatory }: InputProps) => {
  return (
    <View mt={3}>
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

const RenderDropdown: FC<DropdownInputType> = ({
  countries,
  selectedDataCenter,
  setSelectedDataCentre
}: DropdownInputType) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <>
      <Text fontSize={scale(14)} mt={3} fontWeight={'700'} mb={scale(2)}>
        {Strings.dateCentre}
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
        dropdownPosition={'bottom'}
        valueField="value"
        placeholder={Strings.selectDataCenter}
        value={selectedDataCenter}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: DropDownPropsTypes) => {
          setSelectedDataCentre(item.value);
        }}
      />
    </>
  );
};

const NewEmployeeForm: FC<NewEmployeeFormModalType> = ({
  isOpen,
  onCancel,
  render,
  onSubmit
}: NewEmployeeFormModalType) => {
  const [selectedDataCenter, setSelectedDataCentre] = useState<string>('');

  const onFormSubmit = (values: NewEmployeeFormValuesType) => {
    const { first_name, last_name, email, employee_ID } = values;

    onSubmit({
      first_name,
      last_name,
      email,
      employee_ID,
      data_center: selectedDataCenter
    });
  };

  return (
    <BottomModal
      visible={isOpen}
      height={0.9}
      width={1}
      rounded={false}
      style={isIOS && styles.bottomModal}
      modalStyle={isIOS ? styles.modalStyle : styles.bottomModalStyle}
    >
      <ModalContent style={styles.modalContent}>
        <Formik
          validationSchema={newEmployeeFormSchema}
          initialValues={newEmployeeFormInitialValues}
          onSubmit={(values: NewEmployeeFormValuesType) => onFormSubmit(values)}
        >
          {({ handleSubmit, handleChange, values, touched, ...params }: FormikProps<NewEmployeeFormValuesType>) => {
            return (
              <>
                <View onStartShouldSetResponder={(): boolean => true} style={!isIOS && styles.modalContent}>
                  <View style={styles.indicatorView}>
                    <View style={styles.indicatorStyle} />
                  </View>
                  <View alignItems={'center'}>
                    <Text style={styles.textStyle} fontSize={moderateScale(15)} numberOfLines={1}>
                      {Strings.createNewEmployee}
                    </Text>
                  </View>
                  <View borderWidth={1} borderColor={Colors.borderGray} my={moderateScale(18)} />
                  <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle}>
                    <RenderInput
                      error={touched?.first_name ? params?.errors?.first_name : ''}
                      onChangeText={handleChange('first_name')}
                      value={values?.first_name}
                      title={Strings.firstName}
                      mandatory={render?.firstNameRequired === '1' ?true : false}
                    />
                    <RenderInput
                      error={touched?.last_name ? params?.errors?.last_name : ''}
                      onChangeText={handleChange('last_name')}
                      value={values?.last_name}
                      title={Strings.lastName}
                      mandatory={render?.lastNameRequired === '1' ?true : false}
                    />
                    <RenderInput
                      error={touched?.email ? params?.errors?.email : ''}
                      onChangeText={handleChange('email')}
                      value={values?.email}
                      title={Strings.email}
                      mandatory={render?.emailRequired === '1' ?true : false}
                    />
                    <RenderDropdown
                      countries={render?.dataCentre ?? {}}
                      selectedDataCenter={selectedDataCenter}
                      setSelectedDataCentre={(value: string) => setSelectedDataCentre(value)}
                    />
                    <RenderInput
                      error={touched?.employee_ID ? params?.errors?.employee_ID : ''}
                      onChangeText={handleChange('employee_ID')}
                      value={values?.employee_ID}
                      title={Strings.employeeID}
                      mandatory={render?.employeeIdRequired === '1' ?true : false}
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

export default NewEmployeeForm;
