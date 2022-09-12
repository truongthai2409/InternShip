import * as yup from "yup";
import moment from "moment";

const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const CV_FORMATS = ["application/pdf"];

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

export const genderList = [
  {
    id: 0,
    name: "Nam",
  },
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Khác",
  },
];

export const schema = yup.object({
  //Container
  username: yup //
    .string()
    .required('* Bạn phải nhập tài khoản.')
    .min(6, 'Tối thiểu 6 kí tự.')
    .max(32, 'Tối đa 32 kí tự.'),
  email: yup //
    .string()
    .required('* Bạn phải nhập email.')
    .min(6, 'Tối thiểu 6 kí tự.')
    .max(64, 'Tối đa 64 kí tự.')
    .matches(EMAIL_REGEX, 'Bạn đã nhập email không đúng.'),
  password: yup //
    .string()
    .min(6, "* Mật khẩu cần phải có ít nhất 6 ký tự bao gồm chữ hoa và số.")
    .max(32, "* Tối đa 32 kí tự.")
    .required("* Bạn phải nhập mật khẩu.")
    .matches(PASSWORD_REGEX, "Mật khẩu không đúng định dạng."),
  confirmPassword: yup //
    .string()
    .required("* Bạn phải nhập lại password.")
    .min(6, "* Tối thiểu 6 kí tự.")
    .max(32, "* Tối đa 32 kí tự.")
    .oneOf([yup.ref("password"), null], "* Mật khẩu chưa khớp."),
  lastname: yup //
    .string()
    .required('* Bạn phải nhập họ.')
    .min(2, 'Tối thiểu 2 kí tự.')
    .max(32, 'Tối đa 32 kí tự.'),
  firstname: yup //
    .string()
    .required('* Bạn phải nhập tên.')
    .min(2, 'Tối thiểu 2 kí tự.')
    .max(32, 'Tối đa 32 kí tự.'),
  phone: yup //
    .string()
    .required('* Bạn phải nhập số điện thoại.')
    .min(8, 'Tối thiểu 8 kí tự.')
    .max(11, 'Tối đa 11 kí tự.')
    .matches(PHONE_REGEX, 'Bạn đã nhập số điện thoại không đúng.'),
  gender: yup //
    .string()
    .required('* Bạn phải chọn giới tính.')
    .max(7, 'Tối đa 7 kí tự.'),
  avatar: yup //
    .mixed()
    .test("type", '* Chỉ hỗ trợ định dạng: jpeg, jpg, png, gif, bmp', (value) => {
      if (value?.type) {
        return IMAGE_FORMATS.includes(value?.type);
      } else {
        return true;
      }
    })
    .test("fileSize", '*Kích thước tối đa là 512Kb.', (value) => {
      if (value?.size) {
        return value?.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
  //END Conatiner
  role : yup
    .string()
    .required('* Bạn phải chọn vai trò.'),

})
