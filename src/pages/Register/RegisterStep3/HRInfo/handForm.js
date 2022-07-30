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

export const schema = yup
  .object({
    username: yup
      .string()
      .required(" * Bạn phải nhập tài khoản.")
      .min(6, " * Tài khoản cần phải có ít nhất 6 ký tự."),
    email: yup
      .string()
      .required(" * Bạn phải nhập email.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        " * Vui lòng nhập lại email."
      ),
    password: yup
      .string()
      .required(" * Bạn phải nhập password")
      .min(6, " * Mật khẩu cần phải có ít nhất 6 ký tự.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/,
        " * Mật khẩu chưa hợp lệ(Chứa ít nhất 1 chữ cái)."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], " * Mật khẩu chưa khớp."),
    firstname: yup.string().required(" * Bạn phải nhập tên."),
    lastname: yup.string().required(" * Bạn phải nhập họ."),
    phone: yup
      .string()
      .required(" * Bạn phải nhập tên số điện thoại.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Số điện thoại không đúng."
      ),
    avatar: yup
      .mixed()
      .test(
        "fileSize",
        " * Ảnh bạn chọn quá lớn. Kích thước tối đa là 512Kb.",
        (value) => {
          return value && value[0].size <= 512 * 1024;
        }
      )
      .test("type", " * Chỉ hỗ trợ jpeg, png.", (value) => {
        return (
          value &&
          (value[0].type === "image/jpeg" || value[0].type === "image/png")
        );
      }),
    gender: yup.string().required(" * Bạn phải chọn giới tính."),
    company: yup.string().required(" * Bạn phải chọn chuyên ngành."),
    position: yup.string().required(" * Bạn phải nhập vị trí làm việc."),
  })
  .required();
