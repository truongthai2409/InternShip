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

const Setting = () => {
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
  };
  return (
    <div className='change-password__wrapper'>
      <form action='' className='change-password__container'>
        <h1 className='change-password__title'>Đổi mật khẩu</h1>
        <CustomInput
          id='oldPassword'
          type='password'
          label='Mật khẩu hiện hành'
          placeholder='Nhập mật khẩu'
          visibility={true}
          register={register}
        >
          {errors.oldPassword?.message}
        </CustomInput>
        <CustomInput
          id='newPassword'
          type='password'
          label='Mật khẩu mới'
          placeholder='Nhập mật khẩu'
          visibility={true}
          register={register}
          subtitle='(6-32 ký tự, chứa ít nhất 1 chữ hoa và 1 số)'
        >
          {errors.newPassword?.message}
        </CustomInput>
        <CustomInput
          id='confirmNewPassword'
          type='password'
          label='Nhập lại mật khẩu mới'
          placeholder='Nhập mật khẩu...'
          visibility={true}
          register={register}
        >
          {errors.confirmNewPassword?.message}
        </CustomInput>
        <div className='change-password__actions'>
          <Button onClick={handleSubmit(onSubmit)} bwidth='60%'>
            Thay đổi
          </Button>
          <Button
            onClick={handleClear}
            bg='#f3f4f6'
            color='#111'
            bwidth='40%'
            border='none'
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
