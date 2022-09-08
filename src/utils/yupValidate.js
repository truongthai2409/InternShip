import * as yup from "yup";
import moment from "moment";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();
const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const CV_FORMATS = ["application/pdf"];

const urlRegExp =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/; //check : https://www.regextester.com/99895
const emailRegExp = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/gm; //ref: https://itforusblog.wordpress.com/2020/05/28/regex-email/
const phoneRegExp =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; //10 number if(fist number is 0 else 9 number ). It check all numberphone Vietnamese
const paassRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/;
const regexInteger = /[1-9][0-9]*/
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
const handleYup = (min, max, require, matches) => {
  return (
    yup
      .string()
      .required(`* Bạn phải ${require}`)
      .min(min, `Tối thiểu ${min} kí tự`)
      .max(max, `Tối đa ${max} kí tự`)
      .matches(matches, `Bạn đã ${require} không đúng.`)
  )
};
const handleFile = (format, maxSize, format2) => {
  return (
    yup
      .mixed()
      .test("type", `* Chỉ hỗ trợ định dạng ${format}`, (value) => {
        if (value?.type) {
          return format2.includes(value?.type);
        } else {
          return true;
        }
      })
      .test("fileSize", `*Kích thước tối đa là ${maxSize}Kb.`, (value) => {
        if (value?.size) {
          return value?.size <= maxSize * 1024;
        } else {
          return true;
        }
      })
  )
};
export const schema = yup.object().shape({
  //General
  firstname: handleYup(2, 32, "nhập tên", ""),
  lastname: handleYup(2, 32, "nhập họ", ""),
  username: handleYup(6, 32, "nhập tài khoản", ""),
  email: handleYup(6, 64, "nhập email", emailRegExp),
  phone: handleYup(9, 11, "nhập số điện thoại", phoneRegExp),
  password: yup
    .string()
    .min(6, "* Mật khẩu cần phải có ít nhất 6 ký tự bao gồm chữ hoa và số")
    .max(32, "* Tối đa 32 ksi tự")
    .required("* Bạn phải nhập mật khẩu")
    .matches(paassRegExp, "Mật khẩu không đúng định dạng"),
  confirmPassword: yup
    .string()
    .required("* Bạn phải nhập lại password")
    .min(6, "* Tối thiểu 6 kí tự")
    .max(32, "* Tối đa 32 kí tự")
    .oneOf([yup.ref("password"), null], "* Mật khẩu chưa khớp"),
  gender: handleYup("", 7, "chọn giới tính", ""),
  avatar: handleFile("jpeg, jpg, png, gif, bmp", 512, IMAGE_FORMATS),
  //HR && Partner
  amount: handleYup(1,10000000,"nhập số lượng ứng viên", regexInteger),
  salaryMin: yup
    .number()
    .typeError("* Vui lòng không nhập kí tự khác ngoài số")
    .required("* Bạn phải nhập mức lương tối thiểu")
    .min(100000, "* Số tiền trợ cấp phải lớn hơn 100000"),
  salaryMax: yup
    .number()
    .typeError("* Vui lòng không nhập kí tự khác ngoài số")
    .min(
      yup.ref("salaryMin"),
      "* Mức trợ cấp tối đa phải lớn hơn hoặc bằng mức tối thiểu"
    ),
  jobType: handleYup("", 7, "chọn hình thức làm việc", ""),
  jobPosition: handleYup("", 7, "chọn vị trí làm việc", ""),
  timeStart: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("* Bạn phải chọn ngày bắt đầu tuyển dụng")
    .min(`${date}`, "* Bạn không thể chọn ngày bắt đầu tuyển ở quá khứ"),
  timeEnd: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("* Bạn phải chọn ngày kết thúc tuyển dụng")
    .min(yup.ref("timeStart"), "* Ngày hết hạn phải lớn hơn ngày bắt đầu"),
  address: handleYup(6, 64, "nhập địa chỉ", ""),
  name: handleYup(2, 32, "nhập chức danh", ""),
  jobDescription: handleYup(6, 100000, "nhập mô tả công việc", ""),
  benefits: handleYup(6, 100000, "nhập quyền lợi ứng viên", ""),
  jobPosition: handleYup("", 7, "chọn vi trí công việc", ""),

  //Candidate
  title: yup.string(),
  major: handleYup("", 7, "chọn chuyên ngành", ""),
  comment: yup.string().required("* Trường này không để trống"),
  cv: handleFile("pdf", 512, CV_FORMATS),
  //Partner
  district: handleYup("", 7, "chọn quận/huyện", ""),
  province: handleYup("", 7, "chọn tỉnh/thành phố", ""),
  country: handleYup("", 7, "chọn quốc gia"),
  schoolName: handleYup(3, 64, "nhập tên trường", ""),
  shortName: handleYup(3, 64, "nhập tên viết tắt của trường", ""),
  website: handleYup(5, 128, "website trường", urlRegExp),
  typeSchool: handleYup("",7,"chọn loại hình",""),
  position: handleYup(2,64,"nhập vai trò",""),
  emailSchool : handleYup(3,64,"email của trường",emailRegExp),
  phoneSchool : handleYup(9,11,"số điện thoại trường",phoneRegExp),
  
  //HR
  company: handleYup("",7,"chọn công ty",""),
  position: handleYup(2, 64, "nhập vị trí làm việc", ""),
});
