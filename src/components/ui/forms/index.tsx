import { Field } from 'formik';
import FormikDatePicker from './formik/FormikDatePicker';
import FormikSelectComponent from './formik/FormikSelectComponent';
import FormikTextField from './formik/FormikTextField';
import { useGetVendors } from '@/hooks/useTickets';
import { VendorAccount } from '@/types/tickets/types';

interface IProps {
  id?: number;
  name?: string;
  type?: string;
  value?: string;
  required?: boolean;
  options?: any;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
  multiLine?: boolean;
  children?: any;
  menuItems?: any;
  isLoading?: boolean;
  values?: any;
  errors?: any;
  enabled?: boolean;
  touched?: any;
}

const GetFieldComponent = (props: IProps) => {
  const { data: vendorAccounts } = useGetVendors();

  const filterVendorAccounts = vendorAccounts?.map((item: VendorAccount) => ({
    value: item?.account_no,
    label: item?.displayName,
  }));
  const {
    type,
    name,
    label,
    children,
    options,
    menuItems = [],
    isLoading = false,
    values,
    enabled = true,
    errors,
    touched,
    placeholder,
    ...rest
  } = props;

  switch (type) {
    case 'text':
      return <Field name={name} component={FormikTextField} label={label} {...rest} />;
    case 'password':
      return;
    case 'number':
    case 'datePicker':
      return (
        <div className="w-[100%]">
          <Field name={name} component={FormikDatePicker} label={label} size="small" {...rest} />
        </div>
      );

    case 'select':
      return (
        <Field
          name={name}
          component={FormikSelectComponent}
          label={label}
          placeholder={placeholder}
          options={name === 'accounts' ? filterVendorAccounts : options}
          reportValue={name}
          {...rest}
        />
      );

    default:
  }
};

const FormFieldElement: React.FC<IProps> = (props: IProps) => GetFieldComponent(props);

export default FormFieldElement;
