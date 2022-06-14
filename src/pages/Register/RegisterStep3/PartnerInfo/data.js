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
    {
        id: 2,
        name: "Khác"
    }
]

export const schoolList = [
    {
        id:100,
        name: "Khác"
    }
]

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
    avatar: yup.mixed().nullable(),
    school: yup.string().required("* Bạn phải chọn chuyên ngành"),
    postion: yup.string()
  })
  .required();