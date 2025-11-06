export function getWeekDays() {
  const days = [
    { value: '1', label: '1-Monday' },
    { value: '2', label: '2-Tuesday' },
    { value: '3', label: '3-Wednesday' },
    { value: '4', label: '4-Thursday' },
    { value: '5', label: '5-Friday' },
    { value: '6', label: '6-Saturday' },
    { value: '7', label: '7-Sunday' },
  ];

  return days;
}

export function getMonthDays() {
  const days = [];

  for (let i = 1; i <= 31; i++) {
    days.push({ value: `${i}`, label: `${i}` });
  }

  return days;
}

export enum Frequency {
  OneOff = '0',
  Weekly = '1',
  Monthly = '2',
}

export const Frequencies = {
  [Frequency.OneOff]: {
    label: Frequency.OneOff,
    value: '0',
  },
  [Frequency.Weekly]: {
    label: Frequency.Weekly,
    value: '1',
  },
  [Frequency.Monthly]: {
    label: Frequency.Monthly,
    value: '2',
  },
};

export const getFrequencyValue = (frequency: Frequency) => {
  return Frequencies[frequency].value;
};

export function getFrequencyOptions() {
  return [
    { value: '0', label: 'One Off' },
    { value: '1', label: 'Weekly' },
    { value: '2', label: 'Monthly' },
  ];
}

export const scheduleReportFields: any[] = [
  { type: 'select', name: 'frequency', label: 'Frequency', options: getFrequencyOptions() },
  { type: 'datePicker', name: 'reportRunDate', label: 'Report Run Date', frequencyType: Frequency.OneOff },
  { type: 'select', name: 'reportRunDate', label: 'Weekly Day to Run Report On', frequencyType: Frequency.Weekly, options: getWeekDays() },
  {
    type: 'select',
    name: 'reportRunDate',
    label: 'Monthly Day to Run Report On',
    frequencyType: Frequency.Monthly,
    options: getMonthDays(),
  },
  { type: 'toggle', name: 'sendEmail', label: 'Send Email Notifications' },
];
