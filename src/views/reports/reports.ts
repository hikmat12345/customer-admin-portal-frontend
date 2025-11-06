'use client';

import { CategoryReports, RecentReports, ReportField } from '@/types/reports/types';
import { currencyList, serviceOptions, yearList } from '@/utils/utils';

const mapFields = (shortCode: string): ReportField[] => {
  const filterServiceType = serviceOptions?.map((item: { id: number; label: string }) => ({
    value: +item?.id,
    label: item?.label,
  }));

  switch (shortCode) {
    case 'F-1':
    case 'F-3':
    case 'F-4':
    case 'F-5':
    case 'F-6':
    case 'F-15':
      return [
        { type: 'datePicker', name: 'From' },
        { type: 'datePicker', name: 'To' },
      ];
    case 'F-7':
      return [
        { type: 'datePicker', name: 'From' },
        { type: 'datePicker', name: 'To' },
        { type: 'select', name: 'serviceType', label: 'Service type', options: filterServiceType },
        { type: 'select', name: 'currency', label: 'Currency', options: currencyList },
        { type: 'select', name: 'accounts', label: 'Accounts', options: [] },
      ];
    case 'F-12':
      return [
        { type: 'select', name: 'year', label: 'Year', options: yearList, placeholder: 'Search year...' },
        { type: 'select', name: 'currency', label: 'Currency', options: currencyList },
      ];
    case 'I-7':
      return [
        { type: 'checkbox', name: 'includeTerminated', label: 'Include Terminated Services' },
        { type: 'checkbox', name: 'invoiceCost', label: 'Include Last Available Rental Charge Column' },
        { type: 'checkbox', name: 'veroxosCost', label: 'Include Rental Contract Charge Column' },
        { type: 'select', name: 'serviceType', label: 'Service type', options: filterServiceType },
      ];
    case 'S-4':
    case 'S-5':
    case 'S-6':
      return [
        { type: 'datePicker', name: 'From' },
        { type: 'datePicker', name: 'To' },
      ];
    default:
      return [];
  }
};

const transformReports = (reports: CategoryReports): CategoryReports => {
  if (reports) {
    const selectedFinanceReports = ['F-1', 'F-3', 'F-4', 'F-5', 'F-6', 'F-7', 'F-12', 'F-15'];
    const selectedInventoryReports = ['I-2', 'I-4', 'I-5', 'I-7', 'I-8', 'I-10', 'I-11'];
    const selectedServiceManagementReports = ['S-1', 'S-2', 'S-4', 'S-5', 'S-6'];

    return {
      financeReports: {
        categoryName: reports.financeReports.categoryName,
        value: reports.financeReports.value,
        reports: reports.financeReports.reports
          .filter((report: any) => selectedFinanceReports.includes(report.shortCode))
          .map((report: any) => ({
            label: report.shortCode,
            reportName: report.name,
            description: report.description,
            title: `${report.shortCode} ${report.name}`,
            fields: mapFields(report.shortCode),
          })),
      },
      inventoryReports: {
        categoryName: reports.inventoryReports.categoryName,
        value: reports.inventoryReports.value,
        reports: reports.inventoryReports.reports
          .filter((report: any) => selectedInventoryReports.includes(report.shortCode))
          .map((report: any) => ({
            label: report.shortCode,
            reportName: report.name,
            description: report.description,
            title: `${report.shortCode} ${report.name}`,
            fields: mapFields(report.shortCode),
          })),
      },
      serviceManagementReports: {
        categoryName: reports.serviceManagementReports.categoryName,
        value: reports.serviceManagementReports.value,
        reports: reports.serviceManagementReports.reports
          .filter((report: any) => selectedServiceManagementReports.includes(report.shortCode))
          .map((report: any) => ({
            label: report.shortCode,
            reportName: report.name,
            description: report.description,
            title: `${report.shortCode} ${report.name}`,
            fields: mapFields(report.shortCode),
          })),
      },
    };
  }
  return {
    financeReports: { categoryName: '', value: '', reports: [] },
    inventoryReports: { categoryName: '', value: '', reports: [] },
    serviceManagementReports: { categoryName: '', value: '', reports: [] },
  };
};

const transformRecentReports = (reports: RecentReports): RecentReports => {
  if (reports) {
    return {
      recentReports: {
        categoryName: reports.recentReports.categoryName,
        value: reports.recentReports.value,
        reports: reports.recentReports.reports.map((report: any) => ({
          label: report.shortCode,
          reportName: report.name,
          description: report.description,
          title: `${report.shortCode} ${report.name}`,
          fields: mapFields(report.shortCode),
        })),
      },
    };
  }
  return {
    recentReports: { categoryName: '', value: '', reports: [] },
  };
};

const GetAllReports = async (reportsList: CategoryReports, recentReport: RecentReports) => {
  if (reportsList && recentReport) {
    const transformedReports = transformReports(reportsList);
    const transformedRecentReports = transformRecentReports(recentReport);

    const allReports = {
      financeReports: {
        categoryName: 'Finance Reports',
        value: 'finance',
        reports: transformedReports?.financeReports?.reports?.length > 0 ? transformedReports?.financeReports?.reports : [],
      },
      inventoryReports: {
        categoryName: 'Inventory Reports',
        value: 'inventory',
        reports: transformedReports?.inventoryReports?.reports.length > 0 ? transformedReports?.inventoryReports?.reports : [],
      },
      serviceManagementReports: {
        categoryName: 'Service Management Reports',
        value: 'service',
        reports:
          transformedReports?.serviceManagementReports?.reports.length > 0 ? transformedReports?.serviceManagementReports?.reports : [],
      },
      recentReports: {
        categoryName: 'Recent Reports',
        value: 'recent',
        reports: transformedRecentReports?.recentReports?.reports.length > 0 ? transformedRecentReports?.recentReports?.reports : [],
      },
    };
    return allReports;
  }
};

export default GetAllReports;
