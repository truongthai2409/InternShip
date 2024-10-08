import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';
import CustomInput from 'src/components/shared/CustomInput';
import Button from 'src/components/shared/Button';
import {
  changePassword,
  updateStatusForgotPassword,
} from 'src/store/slices/Admin/user/userSlice';
import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { useNavigate } from 'react-router';

const Password = () => {
  const { t } = useTranslation('title');
  TabTitle(`${t('forgotPasswordTL1')}`);
  const { statusForgotPassword } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (statusForgotPassword === 'success') {
      dispatch(updateStatusForgotPassword('fail'));
      reset();
    }
  }, [statusForgotPassword]);

  const onSubmit = async (data) => {
    const dataSubmit = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    dispatch(
      changePassword({
        dataChangePassword: dataSubmit,
        token:
          JSON.parse(sessionStorage.getItem('userPresent'))?.token ||
          JSON.parse(localStorage.getItem('userPresent'))?.token,
      })
    );
  };
  const handleClear = (e) => {
    e.preventDefault();
    reset();
    navigate('/candidate/profile');
  };

  return (
    <>
      <div className='change-password__wrapper'>
        <form action='' className='change-password__container'>
          <h1 className='change-password__title'>Đổi mật khẩu</h1>
          <CustomInput
            id='oldPassword'
            type='password'
            label='Mật khẩu hiện tại'
            placeholder='Nhập mật khẩu hiện tại'
            visibility={true}
            register={register}
            subtitle='Nhập mật khẩu hiện tại'
          >
            {errors.oldPassword?.message}
          </CustomInput>
          <CustomInput
            id='newPassword'
            type='password'
            label='Mật khẩu mới'
            placeholder='Nhập mật khẩu mới'
            visibility={true}
            register={register}
            subtitle='6 - 32 ký tự, chứa ít nhất một ký tự và một số'
          >
            {errors.newPassword?.message}
          </CustomInput>
          <CustomInput
            id='confirmNewPassword'
            type='password'
            label='Nhập lại mật khẩu mới'
            placeholder='Nhập lại mật khẩu mới'
            visibility={true}
            register={register}
            subtitle='Xác nhận mật khẩu phải trùng với mật khẩu mới vừa nhập'
          >
            {errors.confirmNewPassword?.message}
          </CustomInput>
          <div className='change-password__actions'>
            <Button onClick={handleSubmit(onSubmit)} bwidth='30%'>
              Thay đổi
            </Button>
            <Button
              onClick={handleClear}
              bg='#f3f4f6'
              color='#111'
              bwidth='30%'
              border='none'
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Password;
