import * as yup from "yup";

// yup validate form post job form
export const schema = yup
  .object({
    name: yup.string().required(" * Bạn phải điền chức danh."),
    major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
    jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
    timeStart: yup.string().required(" * Bạn phải chọn ngày bắt đầu tuyển."),
    jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
    amount: yup
      .number()
      .typeError(
        " * Số lượng ứng viên không được để trống hoặc không phải là số."
      )
      .min(1, " * Số lượng ứng viên phải lớn hơn 0. ")
      .integer(" * Số lượng ứng viên phải là số nguyên. "),
    timeEnd: yup.string().required(" * Bạn phải chọn ngày hết hạn tuyển."),
    jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    // jobRequirement: yup.string().required(' * Bạn phải nhập mô tả công việc.'),
    // otherInfo: yup.string(),
    fileSV: yup
      .mixed()
      .nullable()
      .required("* Bạn phải gửi danh sách sinh viên"),
  })
  .required();
