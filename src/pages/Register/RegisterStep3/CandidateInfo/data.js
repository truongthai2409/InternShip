import * as yup from "yup";

const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const CV_FORMATS = ["application/pdf"];

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im

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
  username: yup
    .string()
    .required('* Bạn phải nhập tài khoản.')
    .test(
      "Validate space",
      " * Tên tài khoản không đúng định dạng.",
      (value) => {
        return !(/\s/g.test(value));
      }
    )
    .matches(/[a-zA-Z0-9\_]$/, " * Tên tài khoản không đúng định dạng.")
    .min(6, '* Tối thiểu 6 kí tự.')
    .matches(/[a-zA-Z]/, "* Tên tài khoản phải có ít nhất 1 chữ hoặc chữ thường.")
    .max(32, '* Tối đa 32 kí tự.'),
  email: yup
    .string()
    .required('* Bạn phải nhập email.')
    .min(6, ' * Tối thiểu 6 kí tự.')
    .max(64, ' * Tối đa 64 kí tự.')
    .matches(EMAIL_REGEX, 'Bạn đã nhập email không đúng định dạng.'),
  password: yup
    .string()
    .required('* Bạn phải nhập mật khẩu.')
    .matches(/^[^\W_]/, "* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.")
    .matches(/[a-zA-Z0-9.\_$@*!]$/, "* Không được chứa khoảng trắng và kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .")
    .matches(/[a-zA-Z0-9\w]*$/, "* Không được chứa kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .")
    .matches(/^(?!.*?[._]{2})/, "* Không được phép lặp lại 2 lần kí tự đặc biệt.")
    .min(6, '* Tối thiểu 6 kí tự.')
    .matches(/[^\W_]$/, "* Kết thúc phải là chữ cái hoặc số.")
    .matches(/[A-Z]/, "* ít nhất 1 chữ in hoa.")
    .matches(/[0-9]/, "* Ít nhất 1 số.")
    .max(32, '* Tối đa 32 kí tự.'),
  confirmPassword: yup
    .string()
    .required("* Bạn phải nhập lại mật khẩu.")
    .min(6, "* Tối thiểu 6 kí tự.")
    .max(32, "* Tối đa 32 kí tự.")
    .oneOf([yup.ref("password"), null], "* Mật khẩu chưa khớp."),
  lastname: yup
    .string()
    .required('* Bạn phải nhập họ.')
    .matches(/^[A-Za-z]+$/, "* Bạn đã nhập sai họ.")
    .min(2, '* Tối thiểu 2 kí tự.')
    .max(32, '* Tối đa 32 kí tự.'),
  firstname: yup
    .string()
    .required('* Bạn phải nhập tên.')
    .matches(/^[A-Za-z]+$/, "* Bạn đã nhập sai tên.")
    .min(2, '* Tối thiểu 2 kí tự.')
    .max(32, 'Tối đa 32 kí tự.'),
  phone: yup
    .string()
    .required('* Bạn phải nhập số điện thoại.')
    .min(8, 'Tối thiểu 8 kí tự.')
    .max(11, 'Tối đa 11 kí tự.')
    .matches(PHONE_REGEX, 'Bạn đã nhập số điện thoại không đúng.'),
  gender: yup
    .string()
    .required('* Bạn phải chọn giới tính.')
    .max(7, 'Tối đa 7 kí tự.'),
  avatar: yup
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
  major: yup
    .string()
    .required('* Bạn phải chọn chuyên ngành.')
    .max(7, 'Tối đa 7 kí tự.'),
  cv: yup
    .mixed()
    .test("type", '* Chỉ hỗ trợ định dạng pdf', (value) => {
      if (value?.type) {
        return CV_FORMATS.includes(value?.type);
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
})
