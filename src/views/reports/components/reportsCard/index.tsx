import React, { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import CommonDialog from '@/components/ui/CommonDialog';
import FormFieldElement from '@/components/ui/forms';
import {
  usePostF12Report,
  usePostF15Report,
  usePostF1Report,
  usePostF3Report,
  usePostF4Report,
  usePostF5Report,
  usePostF6Report,
  usePostF7Report,
  usePostI10Report,
  usePostI11Report,
  usePostI2Report,
  usePostI4Report,
  usePostI5Report,
  usePostI8Report,
  usePostI7Report,
  usePostS1Report,
  usePostS2Report,
  usePostS4Report,
  usePostS5Report,
  usePostS6Report,
} from '@/hooks/useGetReportData';
import { format } from 'date-fns';
import { DATE_FORMAT_YYYY_MM_DD, MONTH_AND_YEAR_FORMAT } from '@/utils/constants/dateFormat.constants';
import { generateValidationSchema } from '../../validationSchema';
import useUserStore from '@/stores/useUserStore';
import { convertToTimeZone } from '@/utils/utils';
import ScheduleReportModal from '../scheduleReportModal';
import { ReportField } from '@/types/reports/types';

type ReportKey =
  | 'F1'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F12'
  | 'F15'
  | 'I8'
  | 'I7'
  | 'I10'
  | 'I11'
  | 'I4'
  | 'S1'
  | 'S2'
  | 'S4'
  | 'S5'
  | 'S6'
  | 'I5'
  | 'I2';

const reportHooks = {
  F1: usePostF1Report,
  F3: usePostF3Report,
  F4: usePostF4Report,
  F5: usePostF5Report,
  F6: usePostF6Report,
  F7: usePostF7Report,
  F12: usePostF12Report,
  F15: usePostF15Report,
  I8: usePostI8Report,
  I7: usePostI7Report,
  I10: usePostI10Report,
  I11: usePostI11Report,
  I2: usePostI2Report,
  I4: usePostI4Report,
  I5: usePostI5Report,
  S1: usePostS1Report,
  S2: usePostS2Report,
  S4: usePostS4Report,
  S5: usePostS5Report,
  S6: usePostS6Report,
};

function ReportsCard({
  label,
  reportName,
  description,
  fieldTypes,
}: {
  label: string;
  reportName: string;
  description: string;
  fieldTypes: ReportField[];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openedReportLabel, setOpenedReportLabel] = useState('');
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [scheduleReportInitialValues, setScheduleReportInitialValues] = useState<any>();
  const dialogOpenRef = useRef<{ [key in ReportKey]?: boolean }>({});

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);
  const handleViewDialog = (reportLabel: string) => {
    const transformedLabel = reportLabel.replace(/-/g, '') as ReportKey;
    setOpenDialog(true);
    setOpenedReportLabel(reportLabel);
    dialogOpenRef.current[transformedLabel] = true;
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const { loggedInUser } = useUserStore((state: any) => ({ loggedInUser: state.user }));

  const validationSchema = generateValidationSchema(fieldTypes);

  const initialValues = fieldTypes.reduce(
    (acc, field) => {
      acc[field.name] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  const useReportMutation = (key: ReportKey) => {
    const { mutate, isPending } = reportHooks[key]({
      onSuccess: () => {
        toast.success(`${key} Report downloaded successfully`);
        handleCloseDialog();
      },
      onError: () => {
        toast.error(`Error in downloading ${key} report`);
      },
    });
    return { mutate, isPending };
  };

  const reportMutations = {
    F1: useReportMutation('F1'),
    F3: useReportMutation('F3'),
    F4: useReportMutation('F4'),
    F5: useReportMutation('F5'),
    F6: useReportMutation('F6'),
    F7: useReportMutation('F7'),
    F12: useReportMutation('F12'),
    F15: useReportMutation('F15'),
    I8: useReportMutation('I8'),
    I7: useReportMutation('I7'),
    I10: useReportMutation('I10'),
    I11: useReportMutation('I11'),
    I2: useReportMutation('I2'),
    I4: useReportMutation('I4'),
    I5: useReportMutation('I5'),
    S1: useReportMutation('S1'),
    S2: useReportMutation('S2'),
    S4: useReportMutation('S4'),
    S5: useReportMutation('S5'),
    S6: useReportMutation('S6'),
  };

  const handleSubmit = (values: Record<string, string>) => {
    const i7ReportBody = {
      serviceType: values.serviceType,
      includeTerminated: values.includeTerminated,
      invoiceCost: values.invoiceCost,
      veroxosCost: values.veroxosCost,
    };
    const fromDate = values.From ? new Date(values.From) : null;
    const toDate = values.To ? new Date(values.To) : null;
    const currency = values.currency || null;
    const year = values.year || null;
    const serviceType = values.serviceType || null;
    const accounts = values.accounts;

    const formattedFromDate = fromDate ? `${`0${fromDate.getMonth() + 1}`.slice(-2)}-${fromDate.getFullYear()}` : '';
    const formattedToDate = toDate ? `${`0${toDate.getMonth() + 1}`.slice(-2)}-${toDate.getFullYear()}` : '';

    // Convert to MM-DD-YYYY format for service management reports

    const formattedFromDateYYYYMM = fromDate && format(fromDate, DATE_FORMAT_YYYY_MM_DD);
    const formattedToDateYYYYMM = toDate && format(toDate, DATE_FORMAT_YYYY_MM_DD);

    const formattedStartDate = fromDate ? format(fromDate, MONTH_AND_YEAR_FORMAT) : '';
    const formattedEndDate = toDate ? format(toDate, MONTH_AND_YEAR_FORMAT) : '';
    const postBody = { from: formattedFromDate, to: formattedToDate };

    const toastId = toast.loading('Loading report...');

    Object.keys(dialogOpenRef.current).forEach((key) => {
      const reportKey = key as ReportKey;
      if (dialogOpenRef.current[reportKey]) {
        if (reportKey === 'F7') {
          reportMutations[reportKey].mutate(
            { ...postBody, accounts, currency, serviceType },
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else if (reportKey === 'F12') {
          reportMutations[reportKey].mutate(
            { currency, year },
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else if (reportKey === 'F15') {
          reportMutations[reportKey].mutate(
            { from: formattedStartDate, to: formattedEndDate },
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else if (
          reportKey === 'I8' ||
          reportKey === 'I10' ||
          reportKey === 'I4' ||
          reportKey === 'S1' ||
          reportKey === 'S2' ||
          reportKey === 'I11' ||
          reportKey === 'I5' ||
          reportKey === 'I2'
        ) {
          reportMutations[reportKey].mutate(
            {},
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else if (reportKey === 'I7') {
          reportMutations[reportKey].mutate(
            { ...i7ReportBody },
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else if (reportKey === 'S5') {
          reportMutations[reportKey].mutate(
            {
              from: convertToTimeZone(
                `${formattedFromDateYYYYMM}T00:00:00.000Z`,
                "yyyy-MM-dd'T'HH:mm:ss.SSSX",
                loggedInUser?.timezone?.name,
              )?.replace(/([-+]\d{2}:\d{2}|[-+]\d{2})$/, 'Z'),
              to: convertToTimeZone(
                `${formattedToDateYYYYMM}T00:00:00.000Z`,
                "yyyy-MM-dd'T'HH:mm:ss.SSSX",
                loggedInUser?.timezone?.name,
              )?.replace(/([-+]\d{2}:\d{2}|[-+]\d{2})$/, 'Z'),
            },
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else if (reportKey === 'S4' || reportKey === 'S6') {
          reportMutations[reportKey].mutate(
            { from: formattedFromDateYYYYMM, to: formattedToDateYYYYMM },
            {
              onSettled: () => toast.dismiss(toastId),
            },
          );
        } else {
          reportMutations[reportKey].mutate(postBody, {
            onSettled: () => toast.dismiss(toastId),
          });
        }
      }
    });
  };

  const reportsLoading = Object.values(reportMutations).some((hook) => hook.isPending);

  const handleSchedule = async (validateForm: any, values: any) => {
    const errors = await validateForm();
    setScheduleReportInitialValues(values);
    if (!Object.keys(errors).length) {
      handleCloseDialog();
      setOpenScheduleDialog(true);
    }
  };

  const dialogContent = (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ touched, errors, validateForm, values }) => {
        return (
          <Form className="flex flex-col gap-4">
            {fieldTypes.length === 0 ? (
              <div className="mb-4 flex justify-center">
                <Image src="/svg/excelIconMedium.svg" width={80} height={80} alt="Excel icon" />
              </div>
            ) : (
              <>
                {fieldTypes.some((field) => field.type === 'datePicker') && (
                  <div className="flex gap-2">
                    {fieldTypes
                      .filter((field) => field.type === 'datePicker')
                      .map((field, index) => (
                        <div className="flex w-[48.993333%] flex-col gap-3" key={index}>
                          <FormFieldElement
                            type={field.type}
                            name={field.name}
                            errors={errors}
                            touched={touched}
                            options={field.options}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
            <div className="flex w-[100%] flex-wrap gap-2">
              {fieldTypes
                .filter((field) => field.type !== 'datePicker')
                .map((field, index) => {
                  return (
                    <div
                      className={`${
                        fieldTypes.filter((field: any) => field.type !== 'datePicker' || field.type === 'select')
                          .length === 1
                          ? 'w-full'
                          : 'w-[48.993333%]'
                      } mb-2 mt-1`}
                      key={index}
                    >
                      <FormFieldElement
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        label={field.label}
                        options={field.options}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" onClick={() => handleSchedule(validateForm, values)}>
                Schedule
              </Button>
              <Button disabled={reportsLoading} type="submit" className="bg-custom-blue text-custom-white animate-in">
                Download
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
  return (
    <>
      <div className="lg:w-11.50/12 flex max-h-[330px] w-full flex-col justify-between rounded-lg border border-custom-aluminum xl:w-11.75/12">
        <div className="flex flex-col justify-start gap-6 p-7">
          <h1 className="lg:text-2xl/2 text-lg font-semibold text-custom-blue xl:text-3xl">{label}</h1>
          <div className="mt-3 flex flex-col gap-4">
            <h1 className="text-lg font-semibold text-[#575757] lg:text-2xl xl:text-3xl">{reportName}</h1>
            <h4 className="truncate text-sm text-[#575757] md:overflow-visible md:whitespace-normal md:text-base lg:text-xs xl:text-lg">
              {description}
            </h4>
          </div>
        </div>

        <Button
          variant="null"
          className="group flex h-[50px] w-full items-center justify-center gap-4 rounded-none rounded-b-md bg-[#1D46F31A] text-custom-blue transition duration-300 ease-in-out hover:bg-custom-blue hover:text-white"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={() => handleViewDialog(label)}
        >
          View
          <Image
            src="/svg/reports/reportsViewArrow.svg"
            width={30}
            height={30}
            alt="Reports View Arrows"
            className={`${isHovered && 'brightness-[0%] grayscale invert filter'}`}
          />
        </Button>
      </div>

      {openDialog && (
        <CommonDialog
          open={openDialog}
          onClose={reportsLoading ? () => {} : handleCloseDialog} // while reports are loading dialog will not be closed even on backdrop
          title={
            <div className="mb-2 text-[26px] font-semibold">
              <span className="text-custom-blue">{label}</span> {reportName}
            </div>
          }
          size="medium"
          content={dialogContent}
        />
      )}
      <ScheduleReportModal
        initialValues={scheduleReportInitialValues}
        reportLabel={openedReportLabel}
        open={openScheduleDialog}
        setOpen={setOpenScheduleDialog}
      />
    </>
  );
}

export default ReportsCard;
