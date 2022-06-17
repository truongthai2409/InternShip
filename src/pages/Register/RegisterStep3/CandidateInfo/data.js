import * as yup from "yup"

export const majorList = [
        {
            id: 1,
            name: "Khoa học máy tính"
        },
        {
            id: 2,
            name: "Công nghệ phần mềm"
        },
        {
            id: 3,
            name: "Kỹ thuật máy tính"
        },
        {
            id: 4,
            name: "Trí tuệ nhân tạo"
        },
        {
            id: 5,
            name: "Kỹ thuật mạng"
        },
        {
            id: 6,
            name: "Hệ thống quản lý thông tin"
        }
    ]

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
    // avatar: yup.mixed().test('type', "Đây không phải file hình ảnh", value => validateImageType(value)),
    avatar: yup.mixed().test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
        return value && IMAGE_FORMATS.includes(value[0].type)
    }),
    major: yup.string().required("* Bạn phải chọn chuyên ngành"),
    // cv: yup.mixed().test('type', "Đây không phải file hình ảnh", value => validateImageType(value)),
    cv: yup.mixed().test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
        return value && CV_FORMATS.includes(value[0].type)
    }),
  })
  .required();