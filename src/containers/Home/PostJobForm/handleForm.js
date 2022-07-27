import moment from "moment";
import * as yup from "yup";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();
const dateNow = moment(Date.now()).format("DD-MM-YYYY").toString();
const tomorow = new Date();
const tomorowFormat = moment(tomorow.setDate(tomorow.getDate() + 1)).format(
  "MM-DD-YYYY"
);
export const schema = yup
  .object({
    name: yup.string().required(" * Bạn phải điền chức danh."),
    jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
    major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
    jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
    amount: yup
      .number()
      .min(1, " * Số lượng ứng viên phải lớn hơn 0. ")
      .integer(" * Số lượng ứng viên phải là số nguyên. "),
    timeStart: yup
      .date()
      .min(`${date}`, ` * Bạn phải chọn ngày bắt đầu tuyển và sau ${dateNow}`)
      .required(),
    timeEnd: yup
      .date()
      .min(`${tomorowFormat}`, "Ngày hết hạn phải lớn hơn ngày bắt đầu")
      .required(),
    district: yup.string().required(" * Bạn phải chọn quận/huyện."),
    province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
    country: yup.string().required(" * Bạn phải chọn quốc gia."),
    address: yup.string().required(" * Bạn phải nhập chi tiết địa chỉ."),
    jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
    salaryMin: yup
      .number()
      .required(" * Bạn phải nhập mức lương tối thiểu.")
      .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
      .min(1000, " * Số tiền trợ cấp phải lớn hơn 1000."),
    salaryMax: yup
      .number()
      .required(" * Bạn phải nhập mức lương tối đa.")
      .typeError(" * Vui lòng không nhập kí tự khác ngoài số.")
      .min(1000, " * Số tiền trợ cấp phải lớn hơn 1000."),
  })
  .required();
