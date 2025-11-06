import * as Yup from 'yup';

import { Strings } from '../constants';
export const newSiteFormSchema = Yup.object().shape({
  isValidateSite_name: Yup.boolean(),
  site_name: Yup.string().when('isValidateSite_name', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateBuilding_name: Yup.boolean(),
  building_name: Yup.string().when('isValidateBuilding_name', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateStreet_line_1: Yup.boolean(),
  street_line_1: Yup.string().when('isValidateStreet_line_1', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateStreet_line_2: Yup.boolean(),
  street_line_2: Yup.string().when('isValidateStreet_line_2', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateCity: Yup.boolean(),
  city: Yup.string().when('isValidateCity', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidatePost_code: Yup.boolean(),
  post_code: Yup.string().when('isValidatePost_code', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateState: Yup.boolean(),
  state: Yup.string().when('isValidateState', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateLatitude: Yup.boolean(),
  latitude: Yup.string().when('isValidateLatitude', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateLongitude: Yup.boolean(),
  longitude: Yup.string().when('isValidateLongitude', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateContact_phone: Yup.boolean(),
  contact_phone: Yup.string().when('isValidateContact_phone', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateContact_email: Yup.boolean(),
  contact_email: Yup.string().when('isValidateContact_email', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateContact_name: Yup.boolean(),
  contact_name: Yup.string().when('isValidateContact_name', {
    is: true,
    then: Yup.string().required(Strings.required)
  }),
  isValidateSite_code: Yup.boolean(),
  site_code: Yup.string().when('isValidateSite_code', {
    is: true,
    then: Yup.string().required(Strings.required)
  })
});

export const newEmployeeFormSchema = Yup.object().shape({
  first_name: Yup.string().required(Strings.required),
  last_name: Yup.string().required(Strings.required)
});

export const addUsAddressFormSchema = Yup.object().shape({
  streetLine1: Yup.string().required(Strings.required),
  city: Yup.string().required(Strings.required),
  state: Yup.string().required(Strings.required)
});
