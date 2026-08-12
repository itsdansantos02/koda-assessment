import dayjs from 'dayjs';

const TimeFormat = (time?: string, format = 'hh:mm A'): string => {
  return time ? dayjs(time, 'HH:mm').format(format) : '';
};

export default TimeFormat;
