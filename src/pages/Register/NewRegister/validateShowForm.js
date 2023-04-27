/* eslint-disable no-useless-escape */

import * as yup from 'yup';

export const SchemaShowForm = () => {
  console.log('Schema1');
  return yup.object({
    password: yup
      .string()
      .required('* Vui lòng nhập mật khẩu')
      .matches(/^[^\W_]/, '* Yêu cầu một chữ cái không dấu hoặc số đứng đầu')
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
      .required('* Vui lòng xác nhận lại mật khẩu mới')
      .oneOf([yup.ref('password'), null], ' * Mật khẩu chưa khớp'),
    lastName: yup.string().required('* Bạn phải điền họ và tên lót'),
    firstName: yup.string().required('* Bạn phải điền tên'),
    phone: yup
      .string()
      .required('* Bạn phải nhập số điện thoại.')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        '* Số điện thoại không đúng.'
      ),
    companyDTOPhone: yup
      .string()
      .required('* Bạn phải nhập số điện thoại.')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        '* Số điện thoại không đúng.'
      ),
    position: yup.string().required('* Bạn phải nhập chức vụ của bạn'),
    email: yup
      .string()
      .required('* Bạn phải nhập email')
      .min(6, '* Tối thiểu 6 kí tự')
      .max(64, '* Tối đa 64 kí tự')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        '* Bạn đã nhập email không đúng'
      ),
    companyDTOEmail: yup
      .string()
      .required('* Bạn phải nhập email')
      .min(6, '* Tối thiểu 6 kí tự')
      .max(64, '* Tối đa 64 kí tự')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        '* Bạn đã nhập email không đúng'
      ),
    companyDTOTaxNew: yup
      .string()
      .required('* Vui lòng nhập mã số thuế công ty')
      .matches(/^[0-9]+$/, 'Mã thuế không đúng')
      .min(10, '* Nhập đủ mã số  thuế')
      .max(13, '* Nhập đủ mã số  thuế'),
    companyDTONameNew: yup.string().required('* Vui lòng nhập tên công ty'),
  });
};
