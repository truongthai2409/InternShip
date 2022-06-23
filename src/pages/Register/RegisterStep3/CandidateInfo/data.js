import * as yup from "yup"

export const genderList = [
    {
        id: 0,
        name: "Nam"
    },
    {
        id: 1,
        name: "Nữ"
    },
]

const IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const CV_FORMATS = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export const schema = yup
  .object({
    firstname: yup.string().required("* Bạn phải nhập tên"),
    lastname: yup.string().required("* Bạn phải nhập họ"),
    phone: yup.string()
        .required(" * Bạn phải nhập tên số điện thoại.")
        .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Số điện thoại không đúng."),
    gender: yup.string().required("* Bạn phải chọn giới tính"),
    avatar: yup.mixed()
        .test("type", "Ảnh phải có đuôi là: .jpeg, .jpg, .png, .gif", (value) => {
            return value && IMAGE_FORMATS.includes(value[0].type)
        })
        .test("fileSize", "Ảnh vượt quá kích thước 128kb", (value) => {
            return value && value[0].size <= 131072;
        })
        .required("Bạn phải tải avatar"),
    major: yup.string().required("* Bạn phải chọn chuyên ngành"),
    cv: yup.mixed()
        .test("type", "CV phải là: .jpeg, .jpg, .png, .pdf", (value) => {
            return value && CV_FORMATS.includes(value[0].type)
        })
        .test("fileSize", "CV vượt quá kích thước 500kb", (value) => {
            return value && value[0].size <= 512000;
        })
        .required("Bạn phải tải CV lên"),
  })
  .required();