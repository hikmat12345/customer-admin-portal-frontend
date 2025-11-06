import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import type { FC } from 'react';
import React, { useState } from 'react';
import { newSiteFormSchema, Strings } from '../../../../shared';
import type { NewSiteFormValuesType } from '../NewSiteComponentTypes';
import { newSiteFormInitialValues } from './NewSiteFormUtils';
import { dropDownData } from '../../../utils';
import InputComponent from '../../../components/common/input';
import DialogComponent from '../../../components/common/dialog';
import { ButtonComponent } from '../../../components/common/button';

const initialCountryValue = (countries: Record<string, string>): string => (countries ? Object.keys(countries)[0] : '');

const RenderInput = ({ name, title, value, error, mandatory, placeholder, className, onChange } : any) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <label className="font-[600] text-[0.875rem] text-[#575757] leading-[1.085rem] flex-1" htmlFor={name}>
        {title} {mandatory && <span className="text-rose-500"> *</span>}
      </label>
      <div>
        <InputComponent
          name={name}
          type="text"
          placeholder={placeholder ?? `Enter ${title.toLowerCase()}`}
          className={`${className ?? ''} ${error ? 'border-2 border-rose-500' : ''}`}
          value={value}
          onChange={onChange}
        />
        {error && <span className="text-[0.75rem] text-rose-500">{error}</span>}
      </div>
    </div>
  );
};

const DropdownInput = ({
  countries,
  selectedCountry,
  setIsFocus,
  setSelectCountry
}: any) => {
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  return (
    <>
      <label style={{ fontSize: '14px', marginTop: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
        {Strings.country}
      </label>
      <select
        style={{
          width: '100%',
          padding: '8px'
        }}
        value={selectedCountry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e: any) => setSelectCountry(e.target.value)}
      >
        <option value="" disabled>{Strings.selectState}</option>
        {dropDownData(countries ?? {}).map((item: any, index: any) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};


const NewSiteFormModal: FC<any> = ({ isOpen, render, onSubmit }: any) => {
  const [selectedCountry, setSelectCountry] = useState<string>(initialCountryValue(render?.countries ?? {}));
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(isOpen);

  const onFormSubmit = (values: NewSiteFormValuesType) => {
    const {
      siteName,
      buildingName,
      streetLine1,
      streetLine2,
      city,
      postCode,
      state,
      latitude,
      longitude,
      contactPhoneNumber,
      contactEmail,
      contactName,
      siteCode
    } = values;

    onSubmit({
      tagId: 0,
      siteName,
      buildingName,
      streetLine1,
      streetLine2,
      city,
      postCode,
      state,
      latitude,
      longitude,
      contactPhoneNumber,
      contactEmail,
      contactName,
      siteCode,
      country: parseInt(selectedCountry)
    });
  };

  if (!isOpen) return null;

  return (
    <DialogComponent
      open={open}
      content={
        <div className='p-4 m-2'>
        <Formik
          validationSchema={newSiteFormSchema}
          initialValues={newSiteFormInitialValues(render)}
          onSubmit={(values: NewSiteFormValuesType) => onFormSubmit(values)}
        >
          {({ handleChange, handleBlur, values, errors, touched }: FormikProps<NewSiteFormValuesType>) => (
              <Form>
                 <div className='flex flex-col gap-4' style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                <RenderInput
                  error={touched.siteName ? errors.siteName : ''}
                  onChange={handleChange('siteName')}
                  onBlur={() => handleBlur('siteName')}
                  value={values.siteName}
                  title={Strings.siteName}
                  mandatory={render?.siteNameRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.buildingName ? errors.buildingName : ''}
                  onChange={handleChange('buildingName')}
                  // onBlur={() => handleBlur('buildingName')}
                  value={values.buildingName}
                  title={Strings.buildingName}
                  mandatory={render?.buildingNameRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.streetLine1 ? errors.streetLine1 : ''}
                  onChange={handleChange('streetLine1')}
                  // onBlur={() => handleBlur('streetLine1')}
                  value={values.streetLine1}
                  title={Strings.streetLine1}
                  mandatory={render?.streetLine1Required === '1' ? true : false}
                />
                <RenderInput
                  error={touched.streetLine2 ? errors.streetLine2 : ''}
                  onChange={handleChange('streetLine2')}
                  // onBlur={() => handleBlur('streetLine2')}
                  value={values.streetLine2}
                  title={Strings.streetLine2}
                  mandatory={render?.streetLine2Required === '1' ? true : false}
                />
                <RenderInput
                  error={touched.city ? errors.city : ''}
                  onChange={handleChange('city')}
                  // onBlur={() => handleBlur('city')}
                  value={values.city}
                  title={Strings.city}
                  mandatory={render?.cityRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.postCode ? errors.postCode : ''}
                  onChange={handleChange('postCode')}
                  // onBlur={() => handleBlur('postCode')}
                  value={values.postCode}
                  title={Strings.postCodeAndZipCode}
                  mandatory={render?.postCodeRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.state ? errors.state : ''}
                  onChange={handleChange('state')}
                  // onBlur={() => handleBlur('state')}
                  value={values.state}
                  title={Strings.stateAndCountry}
                  mandatory={render?.stateRequired === '1' ? true : false}
                />
                <DropdownInput
                  countries={render?.countries ?? {}}
                  isFocus={isFocus}
                  selectedCountry={selectedCountry}
                  setIsFocus={setIsFocus}
                  setSelectCountry={setSelectCountry}
                />
                <RenderInput
                  error={touched.latitude ? errors.latitude : ''}
                  onChange={handleChange('latitude')}
                  // onBlur={() => handleBlur('latitude')}
                  value={values.latitude}
                  title={Strings.latitude}
                  mandatory={render?.latitudeRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.longitude ? errors.longitude : ''}
                  onChange={handleChange('longitude')}
                  // onBlur={() => handleBlur('longitude')}
                  value={values.longitude}
                  title={Strings.longitude}
                  mandatory={render?.longitudeRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.contactPhoneNumber ? errors.contactPhoneNumber : ''}
                  onChange={handleChange('contactPhoneNumber')}
                  // onBlur={() => handleBlur('contactPhoneNumber')}
                  value={values.contactPhoneNumber}
                  title={Strings.contactPhoneNumber}
                  mandatory={render?.contactNumberRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.contactEmail ? errors.contactEmail : ''}
                  onChange={handleChange('contactEmail')}
                  // onBlur={() => handleBlur('contactEmail')}
                  value={values.contactEmail}
                  title={Strings.contactEmail}
                  mandatory={render?.contactEmailRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.contactName ? errors.contactName : ''}
                  onChange={handleChange('contactName')}
                  // onBlur={() => handleBlur('contactName')}
                  value={values.contactName}
                  title={Strings.contactName}
                  mandatory={render?.contactNameRequired === '1' ? true : false}
                />
                <RenderInput
                  error={touched.siteCode ? errors.siteCode : ''}
                  onChange={handleChange('siteCode')}
                  // onBlur={() => handleBlur('siteCode')}
                  value={values.siteCode}
                  title={Strings.siteCode}
                  mandatory={render?.siteCodeRequired === '1' ? true : false}
                />
                </div>
                <div className='w-[100%] flex flex-row justify-center pt-4 mt-4'>
          <ButtonComponent className='w-[9.375rem]' variant={'primary'} type='submit'>
                  {Strings.submit}
          </ButtonComponent>
        </div>
                </Form>
          )}
        </Formik>
      </div>
      }
      description=""
      onClose={() => setOpen(false)}
      size="large"
      className="sm:max-w-[38.5rem]"
      title="Create new site"
    />
  );
};

export default NewSiteFormModal;
