import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ServiceType } from './enums/serviceType.enum';
import { eachYearOfInterval, format as formatdeteFns, isValid, parseISO } from 'date-fns';
import { DATE_FORMAT, DATE_TIME_FORMAT } from './constants/constants';
import { format as tzFormat, toZonedTime, fromZonedTime } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToTimeZone(timeZone: string, dateTime: string, format = DATE_TIME_FORMAT) {
  // Convert the date to UTC first
  const utcDate = fromZonedTime(dateTime, 'UTC');
  // Convert the UTC date to the target time zone
  const zonedDate = toZonedTime(utcDate, timeZone);
  // Format the date in the target time zone
  return tzFormat(zonedDate, format, { timeZone });
}

export function getTimeDifference(updated: string): string {
  const updatedTime = new Date(updated).getTime();
  const currentTime = new Date().getTime();
  const differenceInSeconds = Math.floor((currentTime - updatedTime) / 1000);
  if (differenceInSeconds < 60) {
    return 'Just now';
  }
  if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  }
  if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(differenceInSeconds / 86400);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export const getFormattedTotal = (total: number) => {
  if (total >= 1000000) {
    return `${(total / 1000000).toFixed(2)}M`;
  }
  if (total >= 1000) {
    return `${(total / 1000).toFixed(2)}k`;
  }
  return total?.toString();
};

export function getServiceType(id: ServiceType): string {
  switch (id) {
    case ServiceType.BILLING:
      return 'Billing';
    case ServiceType.C_CAAS:
      return 'CCaaS';
    case ServiceType.FIXED_VOICE:
      return 'Voice';
    case ServiceType.MOBILE:
      return 'Mobile';
    case ServiceType.FIXED_DATA:
      return 'Fixed Data - Deprecated';
    case ServiceType.DATA_CIRCUIT:
      return 'Data Circuit';
    case ServiceType.PBX:
      return 'PBX Voice';
    case ServiceType.CONFERENCING:
      return 'Conferencing';
    case ServiceType.U_CAAS:
      return 'UCaaS';
    case ServiceType.UNKNOWN:
      return 'Unknown';
    case ServiceType.SUB_ACCOUNT:
      return 'Sub Account';
    case ServiceType.PUBLIC_CLOUD:
      return 'Public Cloud';
    case ServiceType.SERVICE_MANAGEMENT:
      return 'Service Management';
    case ServiceType.MICROSOFT365:
      return 'Microsoft 365 Services';
    case ServiceType.DATA_CENTRE:
      return 'Data Center';
    case ServiceType.OTHER:
      return 'Other';
    case ServiceType.VIRTUAL_FAX:
      return 'Virtual Fax';
    case ServiceType.CABLE_TV:
      return 'Cable TV';
    default:
      return '';
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const serviceOptions: { id: number; label: string }[] = Object.keys(ServiceType)
  .filter((key: string) => !isNaN(Number(ServiceType[key as keyof typeof ServiceType])))
  .map((key: string) => ({
    id: ServiceType[key as keyof typeof ServiceType],
    label: getServiceType(ServiceType[key as keyof typeof ServiceType]),
  }));

// replacer all
export function stringFindAndReplaceAll(str: string, find: string, replace: string, position: number = 0) {
  const replaceData = typeof str === 'string' ? str.split(find) : null;
  return replaceData ? replaceData[position] : '';
}

// Create number formatter.
export const moneyFormatter = (value: number, currency: string | null = null) => {
  if (isNaN(value)) {
    return '-';
  }

  const options: Intl.NumberFormatOptions = currency ? { style: 'currency', currency: currency } : {};
  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(value);
};

const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export function downloadFile(
  givenFileType: string,
  response: { data: string; filetype: string },
  invoice_id: string,
  showInBrowser: boolean = false,
) {
  let base64String: string | null = null;
  let mimeType: string | null = null;
  let fileExtension: string | null = null;

  if (givenFileType === 'pdf') {
    base64String = response?.data ? Buffer.from(response?.data).toString('base64') : null;
    mimeType = 'application/pdf';
    fileExtension = 'pdf';
  } else if (givenFileType === 'xls') {
    base64String = response?.data ? Buffer.from(response?.data).toString('base64') : null;
    mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    fileExtension = response?.filetype === 'xls' ? 'xls' : 'xlsx';
  } else if (givenFileType === 'docs') {
    base64String = response?.data ? Buffer.from(response?.data).toString('base64') : null;
    mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    fileExtension = 'csv';
  }

  if (base64String && mimeType && fileExtension) {
    const fileUrl = `data:${mimeType};base64,${base64String}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    if (showInBrowser) {
      const mimeType = 'application/pdf';
      const blob = base64ToBlob(base64String, mimeType);
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } else {
      link.download = `${invoice_id}_invoice.${fileExtension}`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Function to format a date in the specified format
export function formatDate(date: string | Date, format: string = 'MM dd, yyyy'): string {
  let parsedDate: Date;
  if (typeof date === 'string') {
    parsedDate = parseISO(date);
  } else {
    parsedDate = date;
  }

  if (!isValid(parsedDate)) {
    return date?.toString();
  }

  return formatdeteFns(parsedDate, format);
}

/**
 * Format a date and time as "Date & Time - MMM dd, yyyy hh:mm a"
 * @param date - The date to format
 * @returns The formatted date and time string or an empty string if the date is invalid
 */
export function formatDateTime(date: string | Date, format: string = DATE_TIME_FORMAT): string {
  let parsedDate: Date;
  if (typeof date === 'string') {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }

  if (!isValid(parsedDate)) {
    return 'Invalid date';
  }

  return formatdeteFns(parsedDate, format);
}

export default formatDate;

// this will be like Jun 27, 2025
export const formatSeperateDate = (date: Date): string => formatdeteFns(new Date(date), DATE_FORMAT);

export const getServiceTypeColor = (serviceType: number) => {
  switch (serviceType) {
    case 1:
      return 'bg-[#F45E09]';
    case 14:
      return 'bg-[#4D077C]';
    case 15:
      return 'bg-[#282692]';
    case 2:
      return 'bg-[#e48d5b]';
    case 3:
      return 'bg-[#8febf4]';
    case 4:
      return 'bg-[#47f166]';
    case 5:
      return 'bg-[#f7af15]';
    case 6:
      return 'bg-[#f74443]';
    case 16:
      return 'bg-[#555400]';
    case 7:
      return 'bg-[#c0b6a1]';
    case 8:
      return 'bg-[#a0f0d7]';
    case 9:
      return 'bg-[#e4b5f1]';
    case 10:
      return 'bg-[#fc7474]';
    case 11:
      return 'bg-[#48c6ce]';
    case 12:
      return 'bg-[#56cd34]';
    case 13:
      return 'bg-[#818073]';
    case 17:
      return 'bg-[#868686]';
    case 18:
      return 'bg-[#f7af15]';
    default:
      return 'bg-blue-700';
  }
};

export const getServiceTypeSubColor = (serviceType: number) => {
  switch (serviceType) {
    case 1:
      return 'bg-[#F7AF1659]';
    case 14:
      return 'bg-[#f6e9ffcf]';
    case 2:
      return 'bg-[#F7AF1659]';
    case 3:
      return 'bg-[#8febf459]';
    case 4:
      return 'bg-[#bbf1c559]';
    case 5:
      return 'bg-[#f7af1511]';
    case 6:
      return 'bg-[#f7444399]';
    case 16:
      return 'bg-[#5554000a]';
    case 7:
      return 'bg-[#c0b6a1]';
    case 8:
      return 'bg-[#a0f0d7]';
    case 9:
      return 'bg-[#b6b5f1]';
    case 10:
      return 'bg-[#f1c4c4]';
    case 11:
      return 'bg-[#affaff]';
    case 12:
      return 'bg-[#e1fada]';
    case 13:
      return 'bg-[#818073]';
    case 17:
      return 'bg-[#ababab]';
    case 18:
      return 'bg-[#f7af15]';
    default:
      return 'bg-[#D2DAFD]';
  }
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const makeFileUrlFromBase64 = (base64String?: string | null, mimeType?: string, fileExtension?: string, fileName?: string) =>
  base64String ? `data:image/png;base64,${base64String}` : '/device-image.png';

export const currencyList = [
  {
    label: 'Native',
    value: 'raw',
  },
  {
    label: 'British Pound',
    value: 'gbp',
  },
  {
    label: 'United States Dollar',
    value: 'usd',
  },
  {
    label: 'Euro',
    value: 'eur',
  },
  {
    label: 'Austrailian Dollar',
    value: 'aud',
  },
  {
    label: 'Japanese Yen',
    value: 'jpy',
  },
];

// getting list of years till the current year

const startYear = 2000;
const currentYear = new Date().getFullYear();

const years = eachYearOfInterval({ start: new Date(startYear, 0, 1), end: new Date(currentYear, 11, 31) });

export const yearList = years
  .map((date) => {
    const year = date.getFullYear();
    return { label: year, value: year };
  })
  .reverse();

export const sanitizeSearchQuery = (query: string) => {
  if (query === '') return '';
  // Remove single characters
  let sanitized = query.replace(/['"`;@=#]/g, '');
  // Remove SQL comment sequences
  sanitized = sanitized.replace(/--/g, '').replace(/\/\*/g, '').replace(/\*\//g, '');

  return sanitized;
};

export function getPreviousMonthYear(dateString: string) {
  // Parse the input date string
  const date = new Date(dateString);

  // Set the date to the first day of the current month
  date.setDate(1);

  // Subtract one month
  date.setMonth(date.getMonth() - 1);

  // Format the output as "Month YYYY"
  const options = { year: 'numeric', month: 'long' };
  const previousMonthYear = date.toLocaleDateString('en-US', options as any);

  return previousMonthYear;
}

export const serviceTypeDropdown = (showUnknown = false, subAccount = false, showDeprecated = false) => {
  return serviceOptions
    .filter((item) => {
      if (!showUnknown && item.id === ServiceType.UNKNOWN) {
        return false;
      }

      if (!subAccount && item.id === ServiceType.SUB_ACCOUNT) {
        return false;
      }

      if (!showDeprecated && item.id === ServiceType.FIXED_DATA) {
        return false;
      }

      return true;
    })
    .map((item) => ({
      value: item.id,
      label: item.label,
    }));
};
