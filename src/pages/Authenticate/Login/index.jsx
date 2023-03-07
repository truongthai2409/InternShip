import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserById } from 'src/store/slices/main/user/userSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import Button from '../../../components/shared/Button/index';
import CustomCheckbox from '../../../components/shared/CustomCheckbox';
import CustomInput from '../../../components/shared/CustomInput/index';
import { loginUser } from '../../../store/slices/main/login/loginSlice';
import './styles.scss';
import { schema } from './validate';

import { Link } from 'react-router-dom';

const Login = () => {
  const { t: t1 } = useTranslation('title');
  TabTitle(`${t1('loginTL')}`);
  const { t } = useTranslation('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await dispatch(loginUser(userData));
      if (res.payload.token) {
        await dispatch(
          getUserById(
            JSON.stringify({ role: res.payload.role, ids: res.payload.idUser })
          )
        );
        if (isCheck) {
          localStorage.setItem(
            'userPresent',
            JSON.stringify({
              token: res.payload.token,
              ids: res.payload.idUser,
            })
          );
        }
        const role = res.payload.role;
        switch (role) {
          case 'Role_Partner':
            navigate(`/partner`, { replace: true });
            break;
          case 'Role_HR':
            navigate(`/hr`, { replace: true });
            break;
          case 'Role_Candidate':
            navigate(`/candidate`, { replace: true });
            break;
          default:
            navigate('/', { replace: true });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleSaveLogin = (e) => {
    setIsCheck(!isCheck);
  };

  return (
    <div className='login-form__container'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <CustomInput
          label={t('AccountTL')}
          id='username'
          type='text'
          placeholder={t('AccountTL')}
          setValue={setValue}
          register={register}
          requirementField={false}
          className={isCheck ? 'bgcIsCheck' : ''}
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
          className={isCheck ? 'bgcIsCheck' : ''}
        >
          {errors.password?.message}
        </CustomInput>
        <div className='login-form__save-pass' onChange={handleSaveLogin}>
          <CustomCheckbox
            checked={isCheck}
            className='checkSavelogin'
            label={t('saveLoginTL')}
          />
          <Link to='/forgot-password' className='forgotPasswordLink'>
            {t('forgotPasswordTL')}
          </Link>
        </div>
        {/* <div className="register-container__footer">
        </div> */}
        <div className='login-form__btn'>
          <Button
            onClick={handleSubmit(onSubmit)}
            className='login-from-button'
          >
            {t('loginTL')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
