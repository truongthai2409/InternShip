import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAllUserCandidate } from 'src/store/slices/main/candidate/user/userCandidateSlice';
import { updateUser } from 'src/store/slices/main/user/userSlice';
import { schema } from './dataCV';
import UserInfo from './UserInfo';
import avatarDefault from 'src/assets/img/avatar-default.png';
import { useTranslation } from 'react-i18next';

const BASEURL = process.env.REACT_APP_API;
const Components = ({ profile }) => {
  console.log('🚀 ~ file: Components.jsx:15 ~ Components ~ profile:', profile);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [opens, setOpens] = useState(false);
  const [checkedFind, setCheckedFind] = useState(true);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('userInfo');

  const handleChangeFind = (event) => {
    setCheckedFind(event.target.checked);
    if (event.target.checked) {
      const userSessionStorage =
        JSON.parse(sessionStorage.getItem('userPresent')) ||
        JSON.parse(localStorage.getItem('userPresent'));
      const profileData = {
        candidate: JSON.stringify({
          userCreationDTO: {
            id: parseInt(profile?.id),
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            gender: parseInt(profile?.gender),
            phone: profile?.phone,
            email: profile?.email,
            birthday: profile?.birthday.toLocaleDateString(),
          },
          major: {
            id: profile?.major?.id,
          },
        }),
        fileAvatar: profile?.avatar || null,
        fileCV: profile?.cv,
      };
      const headerUser = {
        token: userSessionStorage.token,
        role: profile?.user?.role?.name,
      };
      dispatch(updateUser([headerUser, profileData]));
    }
  };
  const handleCheckEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };
  const onSubmit = async (data) => {
    const userSessionStorage =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    const profileData = {
      candidate: JSON.stringify({
        createUser: {
          id: parseInt(profile?.userDetailsDTO?.id),
          firstName: profile?.userDetailsDTO?.firstName,
          lastName: profile?.userDetailsDTO?.lastName,
          gender: parseInt(profile?.userDetailsDTO?.gender),
          phone: profile?.userDetailsDTO?.phone,
          email: profile?.userDetailsDTO?.email,
        },
        major: {
          id: profile?.major?.id,
        },
      }),
      fileAvatar: profile?.user?.avatar || null,
      fileCV: data.cv,
    };
    const headerUser = {
      token: userSessionStorage.token,
      role: profile?.user?.role?.name,
    };
    await dispatch(updateUser([headerUser, profileData])).then(() => {
      setOpens(!opens);
    });
  };
  useEffect(() => {
    dispatch(getAllUserCandidate());
  }, [dispatch]);

  return (
    <div className='profiles'>
      <div className='profile_header'>
        <img
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '1px solid #00b074',
          }}
          src={`${profile?.avatar}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.onerror = undefined;
            currentTarget.src = `${avatarDefault}`;
          }}
          alt='avatar'
        ></img>
      </div>
      <div className='profile_footer'>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <div className='profile_name'>
            <Typography
              variant='h6'
              sx={{
                color: '#00b074',
                fontSize: '25px',
                fontWeight: 'bold',
              }}
            >
              {profile?.lastName} {profile?.firstName}
            </Typography>
          </div>
          <Divider style={{ margin: '40px 3rem' }} />
        </div>
        <div>
          {profile?.role?.id === 3 ? (
            <div className='profile_click'>
              <div className='profile_check'>
                <div className='profile_check__items'>
                  <Typography
                    sx={{
                      marginTop: 0.7,
                      color: checkedFind ? '#00b074' : 'red',
                    }}
                    variant='overline'
                    display='block'
                    gutterBottom
                  >
                    {t('allowContact')}
                  </Typography>
                  <Switch
                    checked={checkedFind}
                    onChange={handleChangeFind}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color={checkedFind ? 'success' : 'error'}
                    sx={{
                      '& .MuiSwitch-thumb': {
                        backgroundColor: checkedFind ? '#00b074' : 'red',
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: checkedFind ? '#00b074' : 'red',
                      },
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#7d7d7d',
                    fontStyle: 'italic',
                  }}
                >
                  {t('allowContactContent')}
                </p>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className='profile_click'>
            <div className='profile_check'>
              <div className='profile_check__items'>
                <Typography
                  sx={{ marginTop: 0.7 }}
                  variant='overline'
                  display='block'
                  gutterBottom
                >
                  {t('emailNoti')}
                </Typography>
                <Switch
                  sx={{
                    marginBottom: 1,
                  }}
                  checked={checkedEmail}
                  onChange={handleCheckEmail}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#7d7d7d',
                  fontStyle: 'italic',
                  marginTop: '-10px',
                }}
              >
                {t('emailNotiContent')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
