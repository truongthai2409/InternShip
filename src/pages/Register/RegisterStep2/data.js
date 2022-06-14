import * as yup from "yup"

export const schema = yup
  .object({
    username: yup
      .string()
      .required("Bạn phải nhập tài khoản")
      .min(6, "Tài khoản cần phải có ít nhất 6 ký tự"),
    email: yup
      .string()
      .required("Bạn phải nhập email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Vui lòng nhập lại email"
      ),
    password: yup
      .string()
      .required("Bạn phải nhập password")
      .min(6, "Mật khẩu cần phải có ít nhất 6 ký tự")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        "Vui lòng nhập lại mật khẩu"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Mật khẩu chưa khớp"),
  })
  .required();