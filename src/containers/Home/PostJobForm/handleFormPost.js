import moment from "moment";
import * as yup from "yup";
import { mixed } from "yup/lib/locale";

const date = moment(Date.now()).format("MM-DD-YYYY").toString();
const dateNow = moment(Date.now()).format("DD-MM-YYYY").toString();
const tomorow = new Date();
const tomorowFormat = moment(tomorow.setDate(tomorow.getDate() + 1)).format(
  "MM-DD-YYYY"
);

export const schemaFormPost = yup.object({
  name: yup.string().required(" * Bạn điền trường này."),
  jobType: yup.string().required(" * Bạn điền trường này."),
  major: yup.string().required(" * Bạn điền trường này."),
  jobPosition: yup.string().required(" * Bạn điền trường này."),
  amount: yup
    .string()
    .required(" * Bạn nhập trường này.")
    .test(
      "Validate space",
      " * Giá trị bạn vừa nhập không hợp lệ.",
      (value) => {
        return value.indexOf(" ");
      }
    )
    .test("Validate type", " * Giá trị bạn vừa nhập không hợp lệ.", (value) => {
      return !isNaN(value);
    })
    .test(
      "Validate type",
      " * Giá trị bạn vừa nhập phải là số nguyên và lớn hơn 0.",
      (value) => {
        return Number.isInteger(Number(value)) && Number(value) > 0;
      }
    ),
  timeStart: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày bắt đầu tuyển dụng.")
    .min(`${date}`, ` * Bạn không thể chọn ngày bắt đầu tuyển ở quá khứ.`),
  timeEnd: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required(" * Bạn phải chọn ngày kết thúc tuyển dụng.")
    .min(yup.ref("timeStart"), " * Ngày hết hạn phải lớn hơn ngày bắt đầu."),
  district: yup.string().required(" * Bạn phải chọn quận/huyện."),
  province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
  country: yup.string().required(" * Bạn phải chọn quốc gia."),
  address: yup.string().required(" * Bạn phải nhập chi tiết địa chỉ."),
  jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
  jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
  benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
  salaryMin: yup
    .string()
    .nullable()
    .test("Validate type", " * Giá trị bạn vừa nhập không hợp lệ.", (value) => {
      return !isNaN(value);
    })
    .test(
      "validate min salary",
      " * Mức trợ cấp tối thiểu là 1000.",
      (value) => {
        return value ? Number(value) >= 1000 : true;
      }
    ),
  salaryMax: yup
    .string()
    .nullable()
    .test("Validate type", " * Giá trị bạn vừa nhập không hợp lệ.", (value) => {
      return !isNaN(value);
    })
    .test(
      "validate max salary",
      " * Mức trợ cấp tối đa phải lớn hơn mức trợ cấp tối thiểu.",
      (value, context) => {
        return value ? Number(value) > context.parent.salaryMin : true;
      }
    ),
});
