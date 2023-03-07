import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Components from './Components';

import ProfileForm from 'src/containers/Home/ProfileForm';
import ProfileContainer from './ProfileContainer';
import './styles.scss';
import './reponsive.scss';
import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';

const Profile = () => {
  const { t } = useTranslation('title')
  TabTitle(`${t("AccountInformationTL")}`);
  const { user, role } = useSelector((state) => state.profile);

  return (
    <div className='profile__wrapper'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4.5}>
          <Components profile={user} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={7.5}>
          <ProfileForm profile={user} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {role === 'Role_HR' ? (
            <ProfileContainer profile={user?.company} />
          ) : role === 'Role_Partner' ? (
            <ProfileContainer profile={user?.universityDTO} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
