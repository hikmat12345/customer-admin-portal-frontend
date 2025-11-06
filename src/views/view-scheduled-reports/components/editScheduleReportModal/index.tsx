import CommonDialog from '@/components/ui/CommonDialog';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import TabsList from '@veroxos/design-system/dist/ui/TabsList/tabsList';
import TabsTrigger from '@veroxos/design-system/dist/ui/TabsTrigger/tabsTrigger';
import Tabs from '@veroxos/design-system/dist/ui/Tabs/tabs';
import FormikSelectComponent from '@/components/ui/forms/formik/FormikSelectComponent';
import FormikDatePicker from '@/components/ui/forms/formik/FormikDatePicker';
import * as Yup from 'yup';
import FormikToggleComponent from '@/components/ui/forms/formik/FormikToggleComponent';
import toast from 'react-hot-toast';
import {
  useGetReportResults,
  usePostScheduledReportDownloadUrl,
  useUpdateScheduleReport,
} from '@/hooks/useGetReportData';
import {
  Frequency,
  getFrequencyOptions,
  getFrequencyValue,
  getMonthDays,
  getWeekDays,
} from '@/views/reports/scheduleReports';
import ReportResultsTable from '../report-result-table';
import ScheduledReportDetailsTable from './components/table';
import { format } from 'date-fns';
import { FORMAT_YYYYMMDD } from '@/utils/constants/constants';

const EditScheduleReportModal = ({
  reportData,
  open,
  setOpen,
  refetchScheduledReports,
}: {
  reportData: any;
  open: boolean;
  setOpen: any;
  refetchScheduledReports: any;
}) => {
  const [scheduleReportFrequencyType, setScheduleReportFrequencyType] = useState(reportData?.frequencyType);
  const [activeTab, setActiveTab] = useState('general');

  const initialValues = {
    'active': reportData?.active ? true : false,
    'sendEmail': reportData?.sendEmail ? true : false,
    'frequency': reportData?.frequencyType?.toString(),
    [`reportRunDate${reportData?.frequencyType}`]: `${reportData?.frequencyType == 0 ? reportData?.frequencyOneOffDate : reportData?.frequencyDay}`,
  };

  const [validationSchema, setValidationSchema] = useState<any>({
    frequency: Yup.string().required(`Frequency is required`),
  });

  const { data: reportResults } = useGetReportResults(reportData?.id);

  const { mutate: updateScheduleReport, isPending } = useUpdateScheduleReport({
    onSuccess: (data) => {
      toast.success('Report updated successfully.');
      setOpen(false);
      refetchScheduledReports();
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to update report.');
    },
  });

  const { mutate: postDownloadReport } = usePostScheduledReportDownloadUrl({
    onSuccess: (data) => {
      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">No Download History</p>
                  <p className="mt-1 text-sm text-gray-500">
                    The report that you're trying to download has no download history.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Failed to start report download.');
    },
  });

  useEffect(() => {
    if (!open) setScheduleReportFrequencyType('');
    else setScheduleReportFrequencyType(reportData?.frequencyType);
  }, [open]);

  useEffect(() => {
    let schema: any = { frequency: Yup.string().required(`Frequency is required`) };
    if (scheduleReportFrequencyType)
      schema[`reportRunDate${scheduleReportFrequencyType}`] = Yup.string().required(`Report run date is required`);
    setValidationSchema(schema);
  }, [scheduleReportFrequencyType]);

  const handleScheduleReportSubmit = (values: Record<string, string>) => {
    let frequency = values.frequency;
    let reportRunDate =
      scheduleReportFrequencyType == '0'
        ? format(values[`reportRunDate${scheduleReportFrequencyType}`], FORMAT_YYYYMMDD)
        : values[`reportRunDate${scheduleReportFrequencyType}`];
    let sendEmail = values.sendEmail;
    let active = values.active;

    if (frequency == Frequency.Monthly && reportRunDate == '31') reportRunDate = '30';

    const reqBody: any = {
      frequencyType: getFrequencyValue(frequency as Frequency),
      frequencyDay: reportRunDate,
      sendEmail: sendEmail ? true : false,
      active,
    };
    updateScheduleReport({ reportId: reportData.id, data: reqBody });
  };

  const handleFrequencyChange = (name: string, value: any) => {
    setScheduleReportFrequencyType(value);
  };

  const getReportRunDateComponent = () => {
    switch (`${scheduleReportFrequencyType}`) {
      case Frequency.OneOff:
        return (
          <Field
            name={`reportRunDate${Frequency.OneOff}`}
            component={FormikDatePicker}
            label={'Report Run Date'}
            placeholder={'Select run date'}
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
          <div className="relative flex justify-start">
            <Tabs className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
              <div className="mb-6 flex gap-2">
                <TabsList className="flex w-full justify-start gap-2">
                  <TabsTrigger
                    value="general"
                    className="px-3 data-[state=active]:bg-[#1D46F333] data-[state=active]:text-custom-blue data-[state=active]:shadow"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger value="history" className="px-3">
                    Report History
                  </TabsTrigger>
                </TabsList>
              </div>
              {activeTab == 'general' && (
                <Form className="flex flex-col gap-4">
                  <Field name={'active'} component={FormikToggleComponent} label={'Active'} />

                  <div className="grid grid-cols-2 gap-2">
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

                  <Field name={'sendEmail'} component={FormikToggleComponent} label={'Send Email Notifications'} />

                  <ScheduledReportDetailsTable reportData={reportData} />

                  <div className="flex items-center justify-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => postDownloadReport({ id: reportData?.resultId })}
                    >
                      Download
                    </Button>
                    <Button loading={isPending} type="submit" className="bg-custom-blue text-custom-white animate-in">
                      Apply
                    </Button>
                  </div>
                </Form>
              )}

              {activeTab == 'history' && <ReportResultsTable reportResults={reportResults} />}
            </Tabs>
          </div>
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
          {activeTab == 'general' && (
            <>
              {' '}
              <span className="text-custom-blue">Edit</span> Report
            </>
          )}
          {activeTab == 'history' && (
            <>
              {' '}
              <span className="text-custom-blue">Report</span> Results
            </>
          )}
        </div>
      }
      size="medium"
      content={scheduleDialogContent}
    />
  );
};

export default EditScheduleReportModal;
