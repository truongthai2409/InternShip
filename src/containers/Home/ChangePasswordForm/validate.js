import * as yup from 'yup';

export const schema = yup
  .object({
    oldPassword: yup
      .string()
      .required('* Vui lòng nhập mật khẩu hiện tại')
      .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
      .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
      .matches(/^(?=.*[A-Z]).+$/, '* Vui lòng nhập ít nhất 1 chữ in hoa')
      .matches(/^(?=.*\d).+$/, '* Vui lòng nhập ít nhất 1 số')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        ' * Vui lòng nhập đúng định dạng'
      ),
    newPassword: yup
      .string()
      .required('* Vui lòng nhập mật khẩu mới')
      .min(6, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
      .max(32, '* Mật khẩu phải có độ dài từ 6 đến 32 ký tự')
      .matches(/^(?=.*[A-Z]).+$/, '* Vui lòng nhập ít nhất 1 chữ in hoa')
      .matches(/^(?=.*\d).+$/, '* Vui lòng nhập ít nhất 1 số')
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        ' * Vui lòng nhập đúng định dạng'
      )
      .notOneOf(
        [yup.ref('oldPassword')],
        ' * Mật khẩu mới không thể trùng với mật khẩu cũ'
      ),
    confirmNewPassword: yup
      .string()
      .required('* Vui lòng xác nhận lại mật khẩu mới')
      .oneOf([yup.ref('newPassword'), null], ' * Mật khẩu chưa khớp'),
  })
  .required();
