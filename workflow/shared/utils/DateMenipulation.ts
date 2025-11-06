import moment from 'moment';

import { DATE_FORMATS, DEFAULT_DATE_FORMATE, DEFAULT_TIME_FORMATE } from '../constants';

export const dateTimeFormat = (mode: string | undefined, value: Date | string, dateFormat: string) =>
  moment(value).format(
    mode === 'time' ? DEFAULT_TIME_FORMATE : dateFormat === DATE_FORMATS[1] ? 'MM/DD/YYYY' : DEFAULT_DATE_FORMATE
  );
