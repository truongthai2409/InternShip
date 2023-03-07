import React from 'react';
// import { Link } from 'react-router-dom';
import './styles.scss';
import './responsive.scss';
import Login from '../../pages/Authenticate/Login';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/shared/Button';
import { updateRole } from 'src/store/slices/main/user/userSlice';
import { toast } from 'react-toastify';
import { MenuDropDown } from '../../components/Login/components';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const LoginContainer = () => {
  const { t } = useTranslation('login');
  const { role } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem('userPresent');
    localStorage.removeItem('userPresent');
    dispatch(updateRole());
    toast.warning(t('youHaveJustLoggedOutTL'), {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
  };
  if (role) {
    return (
      <div className='login-container'>
        <h1 className='login-container__title'>{t('notificationTL')}</h1>
        <span>{t('youHaveLoggedInTL')}</span>
        <div className='register-container__footer'>
          <Button name={t('logOutTL')} onClick={handleLogout} />
        </div>
      </div>
    );
  }
  return (
    <div className='login-container'>
      <Helmet>
        <title>{t('loginTL')}</title>
      </Helmet>
      <h1 className='login-container__title'>{t('loginTL')}</h1>
      <Login />
      <div className='loginWith'>
        <p className='loginWith-p'>{t('orLoginWithTL')}</p>
        <button className='loginWith-button'>
          <a
            href='http://localhost:8085/oauth2/authorization/google'
            className='loginWith-button__link'
          >
            <i class='fa-brands fa-google-plus-g'></i> Google
          </a>
        </button>
      </div>
      <div className='register-container__footerRegister'>
        <p className='register-container__footerRegister-p'>
          {t('doNotHaveAnAccountTL')}
        </p>
        <MenuDropDown />
      </div>
    </div>
  );
};

export default LoginContainer;
