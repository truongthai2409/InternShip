import moment from 'moment';

import {
  DATE_TIME_FORMAT,
  DATE_FORMAT,
  LOCAL_DATE_FORMAT,
  LOCAL_DATE_TIME_FORMAT,
  DATE_TIME_STYLE,
} from '../config/constant/dateTimeConstant';

const changeTimeLocale = (time, timeStyle = DATE_TIME_STYLE.SHORT) => {
  const date = new Date(time);

  return date.toLocaleTimeString(navigator.language, {
    timeStyle,
  });
};

const changeDateLocale = (date, dateStyle = DATE_TIME_STYLE.SHORT) => {
  const format = 'DD/MM/YYYY';
  const dateData = new Date(moment(date, format));
  const locale = localStorage.getItem('lang');

  if (locale === 'en') {
    return dateData.toLocaleDateString('en-US');
  }
  return dateData.toLocaleDateString('vi-VN', {
    dateStyle,
  });
};

const changeDateTimeLocale = (
  dateTime,
  dateStyle = DATE_TIME_STYLE.SHORT,
  timeStyle = DATE_TIME_STYLE.SHORT
) => {
  const date = new Date(dateTime);
  return date.toLocaleString(navigator.language, {
    dateStyle,
    timeStyle,
  });
};

export const dateTimeHelper = {
  changeDateTimeLocale,
  changeTimeLocale,
  changeDateLocale,
};
