import * as yup from "yup";
import { Link } from "react-router-dom";

// yup validate form post job form
export const schema = yup
    .object({
        name: yup.string().required(" * Bạn phải điền chức danh."),
        jobType: yup.string().required(" * Bạn phải chọn hình thức làm việc."),
        major: yup.string().required(" * Bạn phải chọn chuyên ngành."),
        jobPosition: yup.string().required(" * Bạn phải chọn vị trí công việc."),
        amount: yup
            .string()
            .required(" * Bạn phải nhập số ứng viên cần tuyển."),
        timeStart: yup.string().required(" * Bạn phải chọn ngày bắt đầu tuyển."),
        timeEnd: yup.string().required(" * Bạn phải chọn ngày hết hạn tuyển."),
        district: yup.string().required(" * Bạn phải chọn quận/huyện."),
        province: yup.string().required(" * Bạn phải chọn tỉnh/thành phố."),
        country: yup.string().required(" * Bạn phải chọn quốc gia."),
        address: yup.string().required(" * Bạn phải nhập chi tiết địa chỉ."),
        jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
        jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
        benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
        salaryMin: yup.string().required(" * Bạn phải nhập mức lương tối thiểu."),
        salaryMax: yup.string().required(" * Bạn phải nhập mức lương tối đa."),
    })
    .required();