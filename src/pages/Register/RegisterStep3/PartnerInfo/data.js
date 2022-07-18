import * as yup from "yup";

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

export const schoolList = [
  {
    id: 1,
    name: "FPT",
  },
  {
    id: 2,
    name: "HCMUT",
  },
  {
    id: 3,
    name: "UIT"
  }
];

export const roleAtSchool = [
  {
    id: 100,
    name: "Khác",
  }
]

export const schema = yup
  .object({
    username: yup
      .string()
      .required(" * Bạn phải nhập tài khoản")
      .min(6, " * Tài khoản cần phải có ít nhất 6 ký tự"),
    email: yup
      .string()
      .required(" * Bạn phải nhập email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        " * Vui lòng nhập lại email"
      ),
    password: yup
      .string()
      .required(" * Bạn phải nhập password")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], " * Mật khẩu chưa khớp"),
    firstname: yup.string().required("* Bạn phải nhập tên"),
    lastname: yup.string().required("* Bạn phải nhập họ"),
    phone: yup
      .string()
      .required(" * Bạn phải nhập tên số điện thoại.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Số điện thoại không đúng."
      ),
    gender: yup.string().required("* Bạn phải chọn giới tính"),
    avatar: yup.mixed().nullable(),
    school: yup.string().required("* Bạn phải chọn chuyên ngành"),
    postion: yup.string(),
  })
  .required();
