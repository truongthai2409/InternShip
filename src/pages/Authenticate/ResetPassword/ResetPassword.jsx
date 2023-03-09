import React from 'react';
import Footer from 'src/components/Footer';
import HeaderContainer from 'src/components/HeaderContainer';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from 'src/components/shared/CustomInput';
import { useForm } from 'react-hook-form';
import { resetPasswordThunk } from 'src/store/action/authenticate/authenticateAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function ResetPassword() {
  TabTitle('Thay đổi mật khẩu');
  const schema = yup.object().shape({
    password: yup
      .string()
      .required('* Bạn phải nhập mật khẩu')
      .matches(/^[^\W_]/, '* Yêu cầu một chữ cái không dấu hoặc số đứng đầu.')
      .matches(
        /[a-zA-Z0-9.\_$@*!]$/,
        '* Không được chứa khoảng trắng và ký tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .'
      )
      .matches(
        /[a-zA-Z0-9\w]*$/,
        '* Không được chứa ký tự đặc biệt ngoại trừ gạch dưới, gạch ngang và dấu chấm .'
      )
      .matches(
        /^(?!.*?[._]{2})/,
        '* Không được phép lặp lại 2 lần ký tự đặc biệt.'
      )
      .min(6, '* Tối thiểu 6 ký tự.')
      .matches(/[^\W_]$/, '* Không đúng định dạng.')
      .matches(/[A-Z]/, '* Ít nhất 1 chữ in hoa.')
      .matches(/[0-9]/, '* Ít nhất 1 số.')
      .max(32, '* Tối đa 32 ký tự.'),
    confirmPassword: yup
      .string()
      .required('* Bạn phải nhập lại mật khẩu.')
      .min(6, '* Tối thiểu 6 ký tự.')
      .max(32, '* Tối đa 32 ký tự.')
      .oneOf([yup.ref('password'), null], '* Mật khẩu chưa khớp.'),
  });
  const token = window.location.href
    ? window.location.href.split('?')[1].split('=')[1]
    : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const formData = {
      token: token,
      newPassword: data.password,
    };
    dispatch(resetPasswordThunk(formData))
      .then((res) => {
        if (res.payload.httpCode === 200 || res.payload.httpCode === 201) {
          toast.success('Thay đổi mật khẩu thành công');
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  // console.log(errors);
  return (
    <>
      <HeaderContainer />
      <div className='forgotpassword__wrapper'>
        <div className='forgotpassword__modal'>
          <h2>
            <strong>Đổi mật khẩu mới</strong>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label='Nhập mật khẩu mới'
              id='password'
              type='password'
              name='password'
              placeholder='Vui lòng nhập mật khẩu mới...'
              register={register}
              visibility={true}
            >
              {errors.password?.message}
            </CustomInput>

            <CustomInput
              label='Nhập lại mật khẩu'
              id='confirmPassword'
              type='password'
              name='confirmPassword'
              placeholder='Vui lòng nhập lại mật khẩu ...'
              register={register}
              visibility={true}
            >
              {errors.confirmPassword?.message}
            </CustomInput>
            <button
              onClick={handleSubmit(onSubmit)}
              className='forgotpassword__modal-btn'
            >
              Xác nhận
            </button>
          </form>
          <Link to='/login' className='forgotpassword__modal-link'>
            Quay về trang đăng nhập
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
