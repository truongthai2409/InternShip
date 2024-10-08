import * as yup from 'yup';

const IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im;
const uni = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;

const regexName = (str) => {
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
export const containerSchema = yup.object().shape({
  //Container
  username: yup
    .string()
    // .required('* Bạn phải nhập tài khoản')
    // .matches(/^[^\W_]/, "* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.")
    .test(
      '* Validate space',
      '* Tên tài khoản không được chứa dấu cách',
      (value) => {
        return !/\s/g.test(value);
      }
    )
    .matches(/^[A-Za-z0-9_. ]+$/, '* Tên tài khoản không đúng định dạng')
    .matches(/[^\W_]$/, '* Không đúng định dạng')
    .min(6, '* Tối thiểu 6 ký tự')
    .matches(/[a-zA-Z]/, '* Tên tài khoản phải có ít nhất 1 ký tự chữ')
    .max(32, '* Tối đa 32 ký tự'),
  email: yup
    .string()
    .required('* Vui lòng nhập địa chỉ email')
    .min(6, '* Vui lòng nhập tối thiểu 6 ký tự')
    .max(64, '* Vui lòng nhập tối đa 256 ký tự')
    .matches(EMAIL_REGEX, '* Địa chỉ email không đúng'),
  password: yup
    .string()
    .required('* Vui lòng nhập mật khẩu')
    .matches(/^[^\W_]/, '* Yêu cầu một chữ cái không dấu hoặc số đứng đầu')
    // .matches(
    //   /[a-zA-Z0-9.\_$@*!]$/,
    //   '* Không được chứa khoảng trắng và ký tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm '
    // )
    // .matches(
    //   /[a-zA-Z0-9\w]*$/,
    //   '* Không được chứa ký tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm '
    // )
    .matches(
      /^(?!.*?[._]{2})/,
      '* Không được phép lặp lại 2 lần ký tự đặc biệt'
    )
    .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
    .matches(/^\S+$/, '* Vui lòng không được nhập khoảng trắng')
    .matches(/[A-Z]/, '* Vui lòng nhập ít nhất 1 chữ in hoa')
    .matches(/[0-9]/, '* Vui lòng nhập ít nhất 1 số')
    .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự'),
  confirmPassword: yup
    .string()
    .required('* Vui lòng xác nhận lại mật khẩu')
    .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
    .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
    .oneOf([yup.ref('password'), null], '* Mật khẩu chưa khớp'),
  lastName: yup
    .string()
    .required('* Vui lòng nhập họ và tên lót')
    .min(2, '* Họ và tên lót phải có độ dài từ 2 đến 32 ký tự')
    .max(32, '* Họ và tên lót phải có độ dài từ 2 đến 32 ký tự')
    .test('* Validate Tên', '* Họ không hợp lệ', (value) => {
      return uni.test(regexName(value));
    }),
  firstName: yup
    .string()
    .required('* Vui lòng nhập tên')
    .min(2, '* Tên phải có độ dài từ 2 đến 32 ký tự')
    .max(32, '* Tên phải có độ dài từ 2 đến 32 ký tự')
    .test('* Validate Họ', '* Tên không hợp lệ', (value) => {
      return uni.test(regexName(value));
    }),
  phone: yup
    .string()
    .required('* Vui lòng nhập số điện thoại')
    .min(8, '* Số điện thoại phải có độ dài từ 8 đến 13 ký tự')
    .max(13, '* Số điện thoại phải có độ dài từ 8 đến 13 ký tự')
    .matches(PHONE_REGEX, '* Bạn đã nhập số điện thoại không đúng'),
  gender: yup
    .string()
    // .required('* Bạn phải chọn giới tính')
    .max(7, '* Tối đa 7 ký tự'),
  avatar: yup
    .mixed()
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
  //END Conatiner
});
