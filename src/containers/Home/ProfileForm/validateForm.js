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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object({
  lastName: yup.string().required(" * Họ của bạn không được để trống."),
  firstName: yup.string().required(" * Tên của bạn không được để trống."),
  phone: yup
    .string()
    .required(" * Số điện thoại của bạn không được để trống.")
    .matches(phoneRegExp, " * Số điện thoại không đúng."),
  gender: yup.string().required(),
});
