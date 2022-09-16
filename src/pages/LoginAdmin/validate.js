import * as yup from "yup";

export const schema = yup
  .object({
    username: yup
      .string()
      .required('* Bạn phải nhập tài khoản.')
      .matches(/^[^\W_]/, "* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.")
      .matches(/[a-zA-Z0-9.\-_$@*!]$/, "* Không được chứa khoảng trắng và kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .")

      .matches(/[a-zA-Z0-9\w]*$/, "* Không được chứa kí tự đặc biệt ngoại trừ gạch dưới gạch ngang và dấu chấm.")
      .matches(/^(?!.*?[._]{2})/, "* Không được phép lặp lại 2 lần kí tự đặc biệt.")
      .min(6, '* Tối thiểu 6 kí tự.')
      .matches(/[^\W_]$/, "* Không đúng định dạng.")
      .max(32, '* Tối đa 32 kí tự.'),
    password: yup
      .string()
      .required('* Bạn phải nhập mật khẩu.')
      .matches(/^[^\W_]/, "* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.")
      .matches(/[a-zA-Z0-9.\-_$@*!]$/, "* Không được chứa khoảng trắng và kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .")

      .matches(/[a-zA-Z0-9\w]*$/, "* Không được chứa kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .")
      .matches(/^(?!.*?[._]{2})/, "* Không được phép lặp lại 2 lần kí tự đặc biệt.")
      .min(6, '* Tối thiểu 6 kí tự.')
      .matches(/[^\W_]$/, "* Không đúng định dạng.")
      .matches(/[A-Z]/, "* ít nhất 1 chữ in hoa.")
      .matches(/[0-9]/, "* Ít nhất 1 số.")
      .max(32, '* Tối đa 32 kí tự.'),
  })
