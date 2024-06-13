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
  usePostI4Report,
  usePostI8Report,
  usePostS1Report,
  usePostS2Report,
  usePostS4Report,
  usePostS5Report,
} from '@/hooks/useGetReportData';
import { format } from 'date-fns';
import { MONTH_AND_YEAR_FORMAT } from '@/utils/constants/dateFormat.constants';
import { ReportField } from '../../reports';
import { generateValidationSchema } from '../../validationSchema';

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
  | 'I10'
  | 'I4'
  | 'S1'
  | 'S2'
  | 'S4'
  | 'S5';

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
  I10: usePostI10Report,
  I4: usePostI4Report,
  S1: usePostS1Report,
  S2: usePostS2Report,
  S4: usePostS4Report,
  S5: usePostS5Report,
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
  const dialogOpenRef = useRef<{ [key in ReportKey]?: boolean }>({});

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);
  const handleViewDialog = (reportLabel: string) => {
    const transformedLabel = reportLabel.replace(/-/g, '') as ReportKey;
    setOpenDialog(true);
    dialogOpenRef.current[transformedLabel] = true;
  };
  const handleCloseDialog = () => setOpenDialog(false);

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
    I10: useReportMutation('I10'),
    I4: useReportMutation('I4'),
    S1: useReportMutation('S1'),
    S2: useReportMutation('S2'),
    S4: useReportMutation('S4'),
    S5: useReportMutation('S5'),
  };

  const handleSubmit = (values: Record<string, string>) => {
    const fromDate = values.From ? new Date(values.From) : null;
    const toDate = values.To ? new Date(values.To) : null;
    const currency = values.currency || null;
    const year = values.year || null;
    const serviceType = values.serviceType || null;

    const formattedFromDate = fromDate ? `${`0${fromDate.getMonth() + 1}`.slice(-2)}-${fromDate.getFullYear()}` : '';
    const formattedToDate = toDate ? `${`0${toDate.getMonth() + 1}`.slice(-2)}-${toDate.getFullYear()}` : '';

    const formattedStartDate = fromDate ? format(fromDate, MONTH_AND_YEAR_FORMAT) : '';
    const formattedEndDate = toDate ? format(toDate, MONTH_AND_YEAR_FORMAT) : '';
    const postBody = { from: formattedFromDate, to: formattedToDate };

    Object.keys(dialogOpenRef.current).forEach((key) => {
      const reportKey = key as ReportKey;
      if (dialogOpenRef.current[reportKey]) {
        if (reportKey === 'F7') {
          reportMutations[reportKey].mutate({ ...postBody, currency, serviceType });
        } else if (reportKey === 'F12') {
          reportMutations[reportKey].mutate({ currency, year });
        } else if (reportKey === 'F15') {
          reportMutations[reportKey].mutate({ from: formattedStartDate, to: formattedEndDate });
        } else if (reportKey === 'I8' || reportKey === 'I10' || reportKey === 'I4') {
          reportMutations[reportKey].mutate({});
        } else {
          reportMutations[reportKey].mutate(postBody);
        }
      }
    });
  };

  const reportsLoading = Object.values(reportMutations).some((hook) => hook.isPending);

  const dialogContent = (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ touched, errors }) => (
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
              .map((field, index) => (
                <div
                  className={`${
                    fieldTypes.filter((field) => field.type !== 'datePicker').length === 1 ? 'w-full' : 'w-[48.993333%]'
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
              ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" type="submit" disabled>
              Schedule
            </Button>
            <Button disabled={reportsLoading} type="submit" className="bg-custom-blue text-custom-white animate-in">
              Download
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <>
      <div className="lg:w-11.50/12 flex max-h-[100%] w-full flex-col justify-between rounded-lg border border-custom-aluminum xl:w-11.75/12">
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
    </>
  );
}

export default ReportsCard;
