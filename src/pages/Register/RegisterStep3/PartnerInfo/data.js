import * as yup from "yup";

const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

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
    name: "UIT",
  },
];

export const roleAtSchool = [
  {
    id: 1,
    name: "Quản lý",
  },
  {
    id: 2,
    name: "Cộng tác viên",
  },
  {
    id: 100,
    name: "Khác",
  },
];

export const typeSchoolList = [
  {
    id: 1,
    name: "Đại học"
  },
  {
    id: 2,
    name: "Cao đẳng"
  },
  {
    id: 3,
    name: "Trung cấp"
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
    firstName: yup.string().required("* Bạn phải nhập tên"),
    lastName: yup.string().required("* Bạn phải nhập họ"),
    phone: yup
      .string()
      .required(" * Bạn phải nhập số điện thoại.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Số điện thoại không đúng."
      ),
    gender: yup.string().required("* Bạn phải chọn giới tính"),
    position: yup.string().required("* Bạn phải nhập vai trò của bạn ở trường"),
    schoolName: yup.string().required("* Bạn phải nhập tên trường"),
    shortName: yup.string().required("* Bạn phải nhập tên viết tắt của trường"),
    emailSchool: yup
      .string()
      .required(" * Bạn phải nhập email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        " * Vui lòng nhập lại email"
      ),
    phoneSchool: yup
      .string()
      .required(" * Bạn phải nhập số điện thoại.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Số điện thoại không đúng."
      ),
    description: yup.string(),
    website: yup.string().required("* Website của trường là bắt buộc"),
    address: yup.string().required("* Bạn phải nhập địa chỉ trường"),
    note: yup.string(),
    avatar: yup
      .mixed()
      .test(
        "type",
        " * Ảnh phải là file có đuôi là: .jpeg, .jpg, .png, .gif",
        (value) => {
          return value && IMAGE_FORMATS.includes(value?.type);
        }
      )
      .test("fileSize", " * Ảnh vượt quá kích thước 512kb", (value) => {
        return value && value?.size <= 512 * 1024;
      })
      .required("Bạn phải tải avatar"),
    district: yup.string().required(" * Bạn phải chọn quận/huyện."),
    province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
    country: yup.string().required(" * Bạn phải chọn quốc gia."),
    typeSchool: yup.string().required(" * Bạn phải chọn loại hình."),
    logo: yup
      .mixed()
      .test(
        "type",
        " * Ảnh phải là file có đuôi là: .jpeg, .jpg, .png, .gif",
        (value) => {
          return value && IMAGE_FORMATS.includes(value?.type);
        }
      )
      .test("fileSize", " * Ảnh vượt quá kích thước 128kb", (value) => {
        return value && value?.size <= 512 * 1024;
      })
      .required("Bạn phải tải logo"),
  })
  .required();
