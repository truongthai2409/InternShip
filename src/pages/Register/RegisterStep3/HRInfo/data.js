import * as yup from "yup";

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
const PHONE_REGEX = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;  //  good validate phone number
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

export const schema = yup.object({
  //Container
  username: yup
    .string()
    .required("* Bạn phải nhập tài khoản.")
    .matches(/^[^\W_]/, "* Không đúng định dạng.")
    .test(
      "Validate space",
      "* Tên tài khoản không được chứa dấu cách.",
      (value) => {
        return !/\s/g.test(value);
      }
    )
    .matches(/^[A-Za-z0-9_. ]+$/, "* Tên tài khoản không đúng định dạng")
    .matches(/[^\W_]$/, "* Không đúng định dạng.")
    .min(6, "* Tối thiểu 6 kí tự.")
    .matches(/[a-zA-Z]/, "* Tên tài khoản phải có ít nhất 1 kí tự chữ.")
    .max(32, "* Tối đa 32 kí tự."),
  email: yup
    .string()
    .required("* Bạn phải nhập email.")
    .min(6, "* Tối thiểu 6 kí tự.")
    .max(64, "* Tối đa 64 kí tự.")
    .matches(EMAIL_REGEX, "* Bạn đã nhập email không đúng định dạng."),
  password: yup
    .string()
    .required("* Bạn phải nhập mật khẩu.")
    .matches(/^[^\W_]/, "* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.")
    .matches(
      /[a-zA-Z0-9.\_$@*!]$/,
      "* Không được chứa khoảng trắng và kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm."
    )
    .matches(
      /[a-zA-Z0-9\w]*$/,
      "* Không được chứa kí tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm."
    )
    .matches(
      /^(?!.*?[._]{2})/,
      "* Không được phép lặp lại 2 lần kí tự đặc biệt."
    )
    .min(6, "* Tối thiểu 6 kí tự.")
    .matches(/[^\W_]$/, "* Không đúng định dạng.")
    .matches(/[A-Z]/, "* ít nhất 1 chữ in hoa.")
    .matches(/[0-9]/, "* Ít nhất 1 số.")
    .max(32, "* Tối đa 32 kí tự."),
  confirmPassword: yup
    .string()
    .required("* Bạn phải nhập lại mật khẩu.")
    .min(6, "* Tối thiểu 6 kí tự.")
    .max(32, "* Tối đa 32 kí tự.")
    .oneOf([yup.ref("password"), null], "* Mật khẩu chưa khớp."),
  lastname: yup
    .string()
    .required("* Bạn phải nhập họ.")
    .min(2, "* Tối thiểu 2 kí tự.")
    .max(32, "* Tối đa 32 kí tự."),
  firstname: yup
    .string()
    .required("* Bạn phải nhập tên.")
    .min(2, "* Tối thiểu 2 kí tự.")
    .max(32, "* Tối đa 32 kí tự."),
  phone: yup
    .string()
    .required("* Bạn phải nhập số điện thoại.")
    .max(12, "* Không đúng định dạng.")
    .matches(PHONE_REGEX, "* Không đúng định dạng."),
  gender: yup
    .string()
    .required("* Bạn phải chọn giới tính.")
    .max(7, "* Tối đa 7 kí tự."),
  avatar: yup
    .mixed()
    .test(
      "type",
      "* Chỉ hỗ trợ định dạng: jpeg, jpg, png, gif, bmp.",
      (value) => {
        if (value?.type) {
          return IMAGE_FORMATS.includes(value?.type);
        } else {
          return true;
        }
      }
    )
    .test("fileSize", "*Kích thước tối đa là 512Kb.", (value) => {
      if (value?.size) {
        return value?.size <= 512 * 1024;
      } else {
        return true;
      }
    }),
  //END Conatiner
  company: yup
    .string()
    .required("* Bạn phải chọn công ty.")
    .max(7, "* Tối đa 7 kí tự."),
  jobPosition: yup.string().nullable().max(64, "* Tối đa 64 kí tự."),
});
