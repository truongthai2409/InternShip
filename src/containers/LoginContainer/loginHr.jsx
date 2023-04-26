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
import Divider from '@mui/material/Divider';
import { Helmet } from 'react-helmet';

const LoginHrContainer = () => {
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
      style: { color: '#00B074', backgroundColor: '#DEF2ED' },
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
      <div>
        <h2 className='login-container__description'>
          {t('recruiterTL')}/ {t('partnerTL')}
        </h2>
      </div>
      <Login />
      <div className='register-container__footerRegister'>
        <p className='register-container__footerRegister-p'>
          {t('doNotHaveAnAccountTL')}
        </p>
        <MenuDropDown />
      </div>
    </div>
  );
};

export default LoginHrContainer;
