import * as yup from "yup";
import { Link } from "react-router-dom";

// yup validate form post job form
export const schema = yup
    .object({
        name: yup.string().required(" * Bạn phải điền chức danh!"),
        workingFormat: yup.string().required("Bạn phải chọn hình thúc làm việc!"),
        amount: yup
            .number()
            .nullable(),
        jobDescription: yup.string().required(" * Bạn phải nhập mô tả công việc."),
        jobRequirement: yup.string().required(" * Bạn phải nhập mô tả công việc."),
        benefits: yup.string().required(" * Bạn phải nhập quyền lợi của ứng viên."),
    })
    .required();