import CommonDialog from '@/components/ui/CommonDialog';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Frequency, getFrequencyOptions, getFrequencyValue, getMonthDays, getWeekDays } from '../../scheduleReports';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import FormikSelectComponent from '@/components/ui/forms/formik/FormikSelectComponent';
import FormikDatePicker from '@/components/ui/forms/formik/FormikDatePicker';
import * as Yup from 'yup';
import FormikToggleComponent from '@/components/ui/forms/formik/FormikToggleComponent';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';
import { useGetReportByCode, usePostScheduleReport } from '@/hooks/useGetReportData';
import FormikTextField from '@/components/ui/forms/formik/FormikTextField';
import { serviceOptions } from '@/utils/utils';
import { format } from 'date-fns';
import { FORMAT_DDMMYYYY, FORMAT_YYYYMMDD } from '@/utils/constants/constants';
import { useGetVendors } from '@/hooks/useTickets';

const ScheduleReportModal = ({
  initialValues: defaultValues,
  reportLabel,
  open,
  setOpen,
}: {
  initialValues: any;
  reportLabel: string;
  open: boolean;
  setOpen: any;
}) => {
  const [scheduleReportFrequencyType, setScheduleReportFrequencyType] = useState('');
  const initialValues = { ...defaultValues };
  const initialValidationSchema = {
    frequency: Yup.string().required(`Frequency is required`),
    reportName: Yup.string().required(`Report name is required`),
  };

  const [validationSchema, setValidationSchema] = useState<any>(initialValidationSchema);

  const { data: reportData } = useGetReportByCode(reportLabel);
  const { data: vendorAccounts } = useGetVendors();

  const { mutate: postDownloadReport, isPending } = usePostScheduleReport({
    onSuccess: (data) => {
      toast.success('Report scheduled successfully.');
      setOpen(false);
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to schedule report.');
    },
  });

  useEffect(() => {
    if (!open) setScheduleReportFrequencyType('');
  }, [open]);

  useEffect(() => {
    let schema: any = { ...initialValidationSchema };
    if (scheduleReportFrequencyType)
      schema[`reportRunDate${scheduleReportFrequencyType}`] = Yup.string().required(`Report run date is required`);
    setValidationSchema(schema);
  }, [scheduleReportFrequencyType]);

  const getConfig = (values: any) => {
    if (!Object.keys(values).length) return {};
    const config: any = {};
    switch (reportLabel.toLowerCase()) {
      case 'f-7':
        if (values.serviceType.length == serviceOptions.length) config.serviceType = '0';
        else config.serviceType = values.serviceType.map((service: any) => service.toString());

        if (values.accounts.length == vendorAccounts.length) config.accounts = ['0'];
        else config.accounts = values.accounts.map((account: any) => account.toString());

        config.from = format(values.From, FORMAT_DDMMYYYY);
        config.to = format(values.To, FORMAT_DDMMYYYY);
        config.currency = values.currency;
        break;
      case 'f-12':
        config.currencyId = values.currency;
        config.year = values.year;
        delete config.currency;
        break;
      case 'i-7':
        config.includeTerminated = values.includeTerminated.toString();
        config.invoiceCost = values.invoiceCost.toString();
        config.veroxosCost = values.veroxosCost.toString();
        if (values.serviceType.length == serviceOptions.length) config.serviceType = '0';
        else config.serviceType = values.serviceType.map((service: any) => service.toString());
        break;
      default:
        config.from = format(values.From, FORMAT_DDMMYYYY);
        config.to = format(values.To, FORMAT_DDMMYYYY);
    }
    return config;
  };

  const handleScheduleReportSubmit = (values: Record<string, string>) => {
    let frequency = values.frequency;
    let reportRunDate =
      scheduleReportFrequencyType == '0'
        ? format(values[`reportRunDate${scheduleReportFrequencyType}`], FORMAT_YYYYMMDD)
        : values[`reportRunDate${scheduleReportFrequencyType}`];
    let sendEmail = values.sendEmail;

    if (frequency == Frequency.Monthly && reportRunDate == '31') reportRunDate = '30';

    const postBody = {
      frequencyType: getFrequencyValue(frequency as Frequency),
      frequencyDay: reportRunDate,
      sendEmail: sendEmail ?? false,
      reportId: reportData?.data?.id,
      reportType: reportData?.data?.shortCode.replace(/-/g, ''),
      reportName: values.reportName,
      config: JSON.stringify(getConfig(defaultValues)),
    };

    postDownloadReport(postBody);
  };

  const handleFrequencyChange = (name: string, value: any) => {
    setScheduleReportFrequencyType(value);
  };

  const getReportRunDateComponent = () => {
    switch (scheduleReportFrequencyType) {
      case Frequency.OneOff:
        return (
          <Field
            name={`reportRunDate${Frequency.OneOff}`}
            component={FormikDatePicker}
            label={'Report Run Date'}
            placeholder={'Select run date'}
            className={'w-full'}
            isScheduled={true}
          />
        );
      case Frequency.Weekly:
        return (
          <Field
            name={`reportRunDate${Frequency.Weekly}`}
            component={FormikSelectComponent}
            label={'Weekly Day to Run Report On'}
            placeholder={'Select run date'}
            options={getWeekDays()}
          />
        );
      case Frequency.Monthly:
        return (
          <Field
            name={`reportRunDate${Frequency.Monthly}`}
            component={FormikSelectComponent}
            label={'Monthly Day to Run Report On'}
            placeholder={'Select run date'}
            options={getMonthDays()}
            isMultiSelect={false}
          />
        );
    }
  };

  const scheduleDialogContent = (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={handleScheduleReportSubmit}
    >
      {({ touched, errors }) => {
        return (
          <Form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Field
                className="h-9"
                name={'reportName'}
                component={FormikTextField}
                label={'Report Name'}
                placeholder={'Enter name'}
              />
              <Field
                name={'frequency'}
                component={FormikSelectComponent}
                label={'Frequency'}
                placeholder={'Select frequency'}
                options={getFrequencyOptions()}
                onChange={handleFrequencyChange}
              />
              {getReportRunDateComponent()}
            </div>
            <Separator className="mt-2 bg-[#D6D6D6]" />

            <Field name={'sendEmail'} component={FormikToggleComponent} label={'Send Email Notifications'} />

            <div className="flex items-center justify-center gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button loading={isPending} type="submit" className="bg-custom-blue text-custom-white animate-in">
                Apply
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );

  return (
    <CommonDialog
      open={open}
      onClose={() => {
        setScheduleReportFrequencyType('');
        setOpen(false);
      }}
      title={
        <div className="mb-2 text-[26px] font-semibold">
          <span className="text-custom-blue">Schedule</span> Report
        </div>
      }
      size="medium"
      content={scheduleDialogContent}
    />
  );
};

export default ScheduleReportModal;
