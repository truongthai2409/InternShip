import * as yup from "yup";

// yup validate form post job form
export const schema = yup
  .object({
    name: yup.string().required(" * Bạn phải điền chức danh."),
    major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
    jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
    timeStart: yup.string().required(" * Bạn phải chọn ngày bắt đầu tuyển."),
    timeEnd: yup.string().required(" * Bạn phải chọn ngày hết hạn tuyển."),
    jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
    otherInfo: yup.string(),
    fileSV: yup
      .mixed()
      .nullable()
  })
  .required();
