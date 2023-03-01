import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomCheckbox from '../../../components/shared/CustomCheckbox';
import CustomInput from '../../../components/shared/CustomInput/index';
import Button from '../../../components/shared/Button/index';
import { loginAdmin } from '../../../store/slices/main/login/loginSlice';
import { schema } from './validate';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { toast } from 'react-toastify';
import { stringify } from 'query-string';

import { Link } from 'react-router-dom';

import Logo from '../../../components/shared/Logo';
import { useTranslation } from 'react-i18next';

const LoginAdmin = () => {
  TabTitle('Login - Admin');
  const { t } = useTranslation('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(
    localStorage.getItem('saveLogin') ? true : false
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isCheck) {
      setValue(
        'username',
        JSON.parse(localStorage.getItem('saveLogin')).username
      );
      setValue(
        'password',
        JSON.parse(localStorage.getItem('saveLogin')).password
      );
    }
  }, []);

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await dispatch(loginAdmin(userData));
      if (res.payload.token) {
        const role = res.payload.role;
        switch (role) {
          case 'Role_Admin':
            navigate(`/admin`, { replace: true });
            break;
          default:
        }
      }
    } catch (error) {
      toast.error(error);
    }
    if (isCheck) {
      const loginInfor = {
        username: data.username,
        password: data.password,
      };
      localStorage.setItem('saveLogin', JSON.stringify(loginInfor));
    } else {
      localStorage.removeItem('saveLogin');
    }
  };
  const handleSaveLogin = (e) => {
    setIsCheck(!isCheck);
  };

  return (
    <>
      <div className='logo-login-container'>
        <Logo />
      </div>
      <h1 className='login-container__title'>{t('loginTL')}</h1>

      <div className='login-admin-form__container'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <CustomInput
            label={t('accountTL')}
            id='username'
            type='text'
            placeholder={t('accountTL')}
            setValue={setValue}
            register={register}
            requirementField={false}
          >
            {errors.username?.message}
          </CustomInput>
          <CustomInput
            label={t('PasswordTL')}
            id='password'
            type='password'
            placeholder={t('PasswordTL')}
            setValue={setValue}
            register={register}
            visibility={true}
            requirementField={false}
          >
            {errors.password?.message}
          </CustomInput>
          <div className='login-admin-form__action'>
            <div
              className='login-admin-form__save-pass'
              onChange={handleSaveLogin}
            >
              <CustomCheckbox checked={isCheck} label={t('saveLoginTL')} />
            </div>
            <div className='login-admin-form__footer'>
              <Link to='/forgot-password'>{t('forgotPasswordTL')}</Link>
            </div>
          </div>
          <div className='login-admin-form__btn'>
            <Button
              name={t('loginTl')}
              onClick={handleSubmit(onSubmit)}
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginAdmin;
