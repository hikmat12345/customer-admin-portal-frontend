import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import { Strings } from '../../../../shared';
import { newEmployeeFormInitialValues } from './NewEmployeeFormUtils';
import * as Yup from 'yup';
import InputComponent from '../../common/input';
import { ButtonComponent } from '../../common/button';
import DialogComponent from '../../common/dialog';


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

const NewEmployeeForm = ({ onSubmit, isOpen } : any) => {

  const [open, setOpen] = useState<boolean>(isOpen);
  const onFormSubmit = (values : any) => {
    const { firstName, lastName, email, employeeId } = values;

    onSubmit({
      tagId: 0,
      currency: 1,
      language: 1,
      status: 1,
      vip: 0,
      firstName,
      lastName,
      email,
      employeeId,
    });
  };

const newEmployeeFormSchema = Yup.object().shape({
  firstName: Yup.string().required(Strings.required),
  lastName: Yup.string().required(Strings.required),
  email: Yup.string().email().required(Strings.required),
  employeeId : Yup.string().required(Strings.required),
});

  return (
    <DialogComponent
      open={open}
      content={
        <div className='p-4 m-2'>
        <Formik
          validationSchema={newEmployeeFormSchema}
          initialValues={newEmployeeFormInitialValues}
          onSubmit={onFormSubmit}
        >
          {({ handleChange, values, touched, errors }) => (
            <Form>
              <div className='flex flex-col gap-4' style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                <RenderInput
                  error={touched.firstName ? errors.firstName : ''}
                  onChange={handleChange('firstName')}
                  value={values.firstName}
                  title={Strings.firstName}
                  mandatory={true}
                />
                <RenderInput
                  error={touched.lastName ? errors.lastName : ''}
                  onChange={handleChange('lastName')}
                  value={values.lastName}
                  title={Strings.lastName}
                  mandatory={true}
                />
                <RenderInput
                  error={touched.email ? errors.email : ''}
                  onChange={handleChange('email')}
                  value={values.email}
                  title={Strings.email}
                  mandatory={true}
                />
                <RenderInput
                  error={touched.employeeId ? errors.employeeId : ''}
                  onChange={handleChange('employeeId')}
                  value={values.employeeId}
                  title={Strings.employeeID}
                  mandatory={true}
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
      title="Create new employee"
    />
      
  );
};


export default NewEmployeeForm;
