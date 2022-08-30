import * as yup from "yup";

export const schema = yup
  .object({
    oldPassword: yup
      .string()
      .required(" * Bạn phải nhập password cũ")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự  ")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu"
      ),
    newPassword: yup
      .string()
      .required(" * Bạn phải nhập password mới")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự ")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Vui lòng nhập lại mật khẩu"
      ),
    // .matches([yup.ref("oldPassword"), null], " * Mật khẩu mới không được trùng với mật khẩu cũ."),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], " * Mật khẩu chưa khớp."),
  })
  .required();
