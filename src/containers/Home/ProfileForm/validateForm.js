import * as yup from 'yup';

export const genderList = [
  {
    id: 0,
    name: 'Nam',
  },
  {
    id: 1,
    name: 'Nữ',
  },
  {
    id: 2,
    name: 'Khác',
  },
];

export const listWorkingFormat = [
  { name: 'Fulltime', id: 1 },
  { name: 'Parttime', id: 2 },
  { name: 'Remote', id: 3 },
];

const uni = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

const IMAGE_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/bmp',
];
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;

const regexName = (str) => {
  if (!str) return '';
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};
export const schema = yup.object({
  avatar: yup
    .mixed()
    .required('* Bạn phải chọn hình ảnh')
    .test(
      'type',
      '* Chỉ hỗ trợ định dạng: jpeg, jpg, png, gif, bmp',
      (value) => {
        if (value?.type) {
          return IMAGE_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      }
    )
    .test('fileSize', '*Kích thước tối đa là 512Kb', (value) => {
      if (value?.size) {
        return value?.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
  lastName: yup //
    .string()
    // .required('* Bạn phải nhập họ')
    .nullable()
    .min(2, 'Tối thiểu 2 kí tự')
    .max(32, 'Tối đa 32 kí tự'),
  firstName: yup //
    .string()
    .required('* Bạn phải nhập tên')
    .nullable()
    .min(2, 'Tối thiểu 2 kí tự')
    .max(32, 'Tối đa 32 kí tự'),
  phone: yup //
    .string()
    .required('* Bạn phải nhập số điện thoại')
    .min(8, 'Tối thiểu 8 kí tự')
    .max(11, 'Tối đa 11 kí tự')
    .matches(PHONE_REGEX, 'Bạn đã nhập số điện thoại không đúng'),
  email: yup
    .string()
    .nullable()
    // .required('* Bạn phải nhập email')
    .min(6, ' * Tối thiểu 6 ký tự')
    .max(64, ' * Tối đa 64 ký tự')
    .matches(EMAIL_REGEX, '* Bạn đã nhập email không đúng định dạng'),
  gender: yup
    .string()
    .required('* Bạn phải chọn giới tính')
    .max(7, '* Tối đa 7 ký tự'),
  province: yup.string().required(' * Bạn phải chọn tỉnh/thành phố'),
  district: yup.string().required(' * Bạn phải chọn quận/huyện'),
  address: yup.string().required(' * Bạn phải nhập địa chỉ'),

  birthday: yup.date().required(' * Bạn phải nhập ngày sinh'),
});

export const schema2 = yup.object({
  desiredJob: yup
    .string()
    .nullable()
    .required(' * Bạn phải nhập công việc mong muốn'),
  jobPosition: yup.string().required(' * Bạn phải chọn vị trí làm việc'),
  major: yup.string().required(' * Bạn phải chọn chuyên ngành'),
  jobType: yup
    .array()
    .nullable()
    .test('file', ' * Bạn phải chọn hình thức làm việc', (value) => {
      if (value && value.length >= 1) {
        return value;
      } else {
        return false;
      }
    }),
  workLocation: yup.string().required(' * Bạn phải chọn địa điểm làm việc'),
});
