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

// const changeDateLocaleFomat = (date, dateStyle = DATE_TIME_STYLE.SHORT) => {
//   console.log("test date", date);
//   const momentDate = moment(date, 'YYYY-MM-DD');
//   const formattedDate = momentDate.format('DD-MM-YYYY');
//   console.log("formattedDate", formattedDate);
//   const format = 'DD/MM/YYYY';
//   const dateData = new Date(moment(formattedDate, format));
//   const locale = localStorage.getItem('lang');
//   console.log("run2");
//   if (locale === 'en') {
//     console.log("3run");
//     return dateData.toLocaleDateString('en-US');
//   }
//   console.log("run4");
//   return dateData.toLocaleDateString('vi-VN', {
//     dateStyle
//   })
// }

// const changeDateLocale = (date, dateStyle = DATE_TIME_STYLE.SHORT) => {
//   console.log("1", date);
//   const format = 'DD/MM/YYYY';
//   const isValidFormat = new Date(moment(date, format)) === date;
//   if (isValidFormat === true) {
//     const dateData = new Date(moment(date, format))
//     console.log("dateData", dateData);
//     const locale = localStorage.getItem('lang');
//     console.log("run");
//     if (locale === 'en') {

//       return dateData.toLocaleDateString('en-US');
//     }
//     return dateData.toLocaleDateString('vi-VN', {
//       dateStyle,
//     });
//   } else {
//     changeDateLocaleFomat(date, dateStyle = DATE_TIME_STYLE.SHORT)
//   }
// };
const changeDateLocale = (date, dateStyle = DATE_TIME_STYLE.SHORT) => {
  const format = 'DD/MM/YYYY';
  const dateData = new Date(moment(date, format));
  // console.log("dateData", dateData);
  const locale = localStorage.getItem('lang');
  // console.log("run");
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
