export interface ReportField {
  type: 'text' | 'select' | 'datePicker' | 'checkbox' | '';
  name: string;
  label?: string;
  placeholder?: string;
  options?: any[];
}

export interface Report {
  label: string;
  reportName: string;
  description: string;
  title: string;
  fields: ReportField[];
}

export interface ReportCategory {
  categoryName: string;
  value: string;
  reports: Report[];
}

export interface CategoryReports {
  financeReports: ReportCategory;
  inventoryReports: ReportCategory;
  serviceManagementReports: ReportCategory;
}

export interface RecentReports {
  recentReports: ReportCategory;
}

export interface AllReports extends CategoryReports, RecentReports {}

interface ReportType {
  id: number;
  name: string;
  shortCode: string;
  description: string;
}
