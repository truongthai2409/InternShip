import * as yup from "yup";

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

export const schema = yup
    .object({
        lastName: yup.string().required(" * Họ của bạn không được để trống."),
        firstName: yup.string().required(" * Tên của bạn không được để trống."),
        phone: yup.string().required(" * Số điện thoại của bạn không được để trống."),
        gender: yup.string().required(),
        
    })