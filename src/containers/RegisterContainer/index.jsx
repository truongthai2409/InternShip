import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';

import Notification from '../../components/shared/Notification';

import { Link, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

export default function RegisterContainer({ Outlet }) {
  const { t } = useTranslation('registerFrom');

  const notification = useSelector((state) => state.notification);
  const location = useLocation();

  let title;
  switch (location.pathname) {
    case '/register/hr':
      title = t('registerforAnRecruiterAccountTL');
      break;
    case '/register/partner':
      title = t('registerForaSchoolPartnerAccountTL');
      break;
    case '/register/candidate':
      title = t('registerForaCandidateAccountTL');
      break;
    default:
      title = t('registerTL');
  }

  const roleID = useSelector((state) => state.register.user);
  return (
    <div className='register-container'>
      {/* <h1 className='register-container__title'>{title}</h1> */}
      <Outlet />

      <Notification notifyAlert={notification} />
    </div>
  );
}
