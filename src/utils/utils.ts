import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ServiceType } from './enums/serviceType.enum';
import { eachYearOfInterval, format as formatdeteFns, isValid, parseISO, format, parse } from 'date-fns';
import { DATE_FORMAT, DATE_TIME_FORMAT, DEFAULT_LOCALE } from './constants/constants';
import { format as tzFormat, toZonedTime } from 'date-fns-tz';

const knownFormats = [
  'MM-yyyy',
  'yyyy-MM',
  'yyyy-MM-dd',
  'MM/dd/yyyy',
  'dd/MM/yyyy',
  'MM-dd-yyyy',
  'yyyy/MM/dd',
  'MMM dd, yyyy',
  'dd MMM yyyy',
];

export function parseUnknownFormatDate(dateString: string) {
  let parsedDate;

  // Try to parse as ISO format first
  parsedDate = parseISO(dateString);
  if (isValid(parsedDate)) {
    return format(parsedDate, 'yyyy-MM-dd');
  }

  // Try to parse with known formats
  for (const formatStr of knownFormats) {
    parsedDate = parse(dateString, formatStr, new Date());
    if (isValid(parsedDate)) {
      return format(parsedDate, 'yyyy-MM-dd');
    }
  }

  // Handle invalid date by returning an empty string or a default value
  return '';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToTimeZone(dateTime: string, format = DATE_TIME_FORMAT, timeZone: string) {
  if (timeZone && dateTime && isValid(parseISO(dateTime))) {
    const zonedDate = toZonedTime(dateTime, timeZone);
    return tzFormat(zonedDate, format, { timeZone: timeZone });
  }
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
  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num?.toString() : Number(num?.toFixed(2));
  };
  if (total >= 1000000) {
    return `${(total / 1000000).toFixed(2)}M`;
  }
  if (total >= 1000) {
    return `${(total / 1000).toFixed(2)}k`;
  }
  return formatNumber(total);
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
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

export const serviceOptions: { id: number; label: string }[] = [
  { id: 14, label: capitalize('Billing') },
  { id: 15, label: capitalize('CCaaS') },
  { id: 1, label: capitalize('Fixed voice') },
  { id: 2, label: capitalize('Mobile') },
  { id: 3, label: capitalize('Fixed data') },
  { id: 4, label: capitalize('Data circuit') },
  { id: 5, label: capitalize('PBX') },
  { id: 6, label: capitalize('Conferencing') },
  { id: 16, label: capitalize('UCaaS') },
  { id: 7, label: capitalize('Unknown') },
  { id: 8, label: capitalize('Sub account') },
  { id: 9, label: capitalize('Public cCloud') },
  { id: 10, label: capitalize('Service management') },
  { id: 11, label: capitalize('Microsoft365') },
  { id: 12, label: capitalize('Data centre') },
  { id: 13, label: capitalize('Other') },
  { id: 17, label: capitalize('Virtual fax') },
  { id: 18, label: capitalize('Cable tv') },
];

// replacer all
export function stringFindAndReplaceAll(str: string, find: string, replace: string, position: number = 0) {
  const replaceData = typeof str === 'string' ? str.split(find) : null;
  return replaceData ? replaceData[position] : '';
}

// Create number formatter.
export const currencyFormatter = (value: number, currency: string | null = null) => {
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
  invoiceNumber: string,
) {
  const fileUrl = response?.data;
  const link = document.createElement('a');
  link.href = fileUrl;
  if (showInBrowser) {
    link.target = '_blank';
  } else {
    link.download = `invoice_${invoiceNumber}.${givenFileType}`;
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

export const makeAnyFileUrlFromBase64 = (base64String?: string | null, mimeType?: string, fileExtension?: string, fileName?: string) => {
  return base64String ? `data:${mimeType};base64,${base64String}` : '';
};
export const currencyList = [
  {
    label: 'Native',
    value: '0',
  },
  {
    label: 'British Pound',
    value: '1',
  },
  {
    label: 'United States Dollar',
    value: '2',
  },
  {
    label: 'Euro',
    value: '3',
  },
  {
    label: 'Austrailian Dollar',
    value: '4',
  },
  {
    label: 'Japanese Yen',
    value: '5',
  },
];

// switch for currency symbol, later we will write api for them.
/**
 * Function to find the currency symbol for a given currency code.
 * @param {string} currency - The ISO currency code (e.g., 'USD', 'EUR').
 * @returns {string} The currency symbol.
 */
// will change the default currency "USD" later
export const findCurrencySymbol = (currency: string = 'USD') => {
  const getCurrencySymbol = (locale: string, currency: string) =>
    (0)
      ?.toLocaleString(locale, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
      .replace(/\d/g, '')
      .trim();

  // Define a default locale to use for formatting.
  const defaultLocale = DEFAULT_LOCALE;

  // Get the currency symbol for the provided currency code.
  return getCurrencySymbol(defaultLocale, currency);
};

// Example usage
// findCurrencySymbol('USD'); // Output: $
// getting list of years till the current year

const startYear = 2000;
const currentYear = new Date().getFullYear();

const years = eachYearOfInterval({ start: new Date(startYear, 0, 1), end: new Date(currentYear, 11, 31) });

export const yearList = years
  .map((date) => {
    const year = date.getFullYear();
    return { label: `${year}`, value: `${year}` };
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

// make single digit to double digit
export const makeDoubleDigit = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

// digit formter
export const digitFormatter = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
