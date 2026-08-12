import { format as dateFormat } from 'date-fns';

const DateFormat = (date?: string, format = 'dd MMM yyyy'): string => {
  return date ? dateFormat(new Date(date), format) : '';
};

export default DateFormat;
