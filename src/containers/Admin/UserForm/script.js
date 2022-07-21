import * as yup from 'yup'
import { Link } from 'react-router-dom'

// yup validation for company table
export const schema = yup
  .object({
    // logo: yup.mixed().nullable().required("Bạn phải chọn ảnh cho công ty"),
    // .test(
    //   "FILE_SIZE",
    //   "Uploaded file is too bid!",
    //   (value) => !value || (value && value.size <= 1024 * 1024)
    // ),
    tenDangNhap: yup
      .string()
      .required(' * Bạn phải nhập tên đăng nhập cho người dùng'),
    matKhau: yup
      .string()
      .required(' * Bạn phải nhập mật khẩu cho người dùng')
      .min(6, ' * Mật khẩu cần phải có ít nhất 6 ký tự')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
        'Vui lòng nhập lại mật khẩu'
      ),
    email: yup
      .string(' * email không hợp lệ.')
      // .email(" * Ban nhap email khong dung")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        ' * Email khong hop le'
      )
      .required(' * Bạn phải nhập email cho người dùng.'),
    sDT: yup
      .string()
      .required(' * Bạn phải nhập tên số điện thoại cho người dùng.')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        ' * Số điện thoại không đúng.'
      ),
    ten: yup.string().required(' * Bạn phải nhập tên.'),
    isAdmin: yup.boolean().required(' * Bạn phải chọn quyền cho người dùng.')
  })
  .required()

// controll action
const controlAction = [
  {
    id: 0,
    name: 'Quản lý bài đăng',
    to: '#'
  },
  {
    id: 1,
    name: 'Xem bài đăng',
    to: '#'
  },
  {
    id: 2,
    name: 'Thêm bài đăng',
    to: '#'
  }
]

// render control action
export const renderControlAction = () => {
  return controlAction.map(item => {
    return (
      <li key={item.id}>
        <Link to={item.to} className="link">
          {item.name}
        </Link>
      </li>
    )
  })
}

// role selectOptions
export const roleOptions = [
  {
    name: 'Quan Tri',
    value: true
  },
  {
    name: 'Khach Hang',
    value: false
  }
]
