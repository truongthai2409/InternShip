import React from 'react';
import Footer from 'src/components/Footer';
import HeaderContainer from 'src/components/HeaderContainer';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from 'src/components/shared/CustomInput';
// import { schema } from '../ForgotPassword/validateForm';
import { schema } from 'src/pages/Authenticate/ForgotPassword/validateForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { resetPasswordThunk } from 'src/store/action/authenticate/authenticateAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TabTitle } from 'src/utils/GeneralFunctions';

function ResetPassword() {
  TabTitle('Thay đổi mật khẩu');
  const token = window.location.href
    ? window.location.href.split('?')[1].split('=')[1]
    : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = {
      token: token,
      newPassword: data.password,
    };
    dispatch(resetPasswordThunk(formData))
      .then((res) => {
        console.log(res);
        if (res.payload.httpCode === 200 || res.payload.httpCode === 201) {
          toast.success('Thay đổi mật khẩu thành công');
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  // console.log(register);
  return (
    <>
      <HeaderContainer />
      <div className='forgotpassword__wrapper'>
        <div className='forgotpassword__modal'>
          <h2>
            <strong>Đổi mật khẩu mới</strong>
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // autoComplete='off'
            // encType='multipart/form-data'
          >
            <CustomInput
              label='Nhập mật khẩu mới'
              id='password'
              type='password'
              name='password'
              placeholder='Vui lòng nhập mật khẩu mới...'
              register={register}
              visibility={true}
            >
              {/* {errors.password?.message} */}
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
              {/* {errors.confirmPassword?.message} */}
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
