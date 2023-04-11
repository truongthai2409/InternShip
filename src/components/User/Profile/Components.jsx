import { Divider, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUserCandidate } from 'src/store/slices/main/candidate/user/userCandidateSlice';

import avatarDefault from 'src/assets/img/avatar-default.png';
import { useTranslation } from 'react-i18next';
import { jobStatusThunk } from 'src/store/action/candidate/candidateAction';

const Components = ({ profile }) => {
  const dispatch = useDispatch();

  const [checkedFind, setCheckedFind] = useState(
    localStorage.getItem('checkedFind') === 'true'
  );

  const [checkedEmail, setCheckedEmail] = useState(false);
  const { t } = useTranslation('userInfo');

  const handleChangeFind = (event) => {
    const finded = event.target.checked;
    setCheckedFind(finded);
    dispatch(jobStatusThunk({ id: profile?.id, status: finded })).then(
      (res) => {
        setCheckedFind(res.payload.jobStatus);
        localStorage.setItem('checkedFind', res.payload.jobStatus);
      }
    );
  };

  const handleCheckEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('checkedFind');
    if (storedValue !== null) {
      setCheckedFind(JSON.parse(storedValue));
    }
  }, []);

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
          {profile?.roleDTO?.id === 3 ? (
            <div className='profile_click'>
              <div className='profile_check'>
                <div className='profile_check__items'>
                  <Typography
                    sx={{
                      marginTop: 0.7,
                      width: '320px',
                      color: '#00b074',
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
                        backgroundColor: checkedFind ? '#00b074' : '#fff',
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: checkedFind ? '#00b074' : '#7d7d7d',
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
                  sx={{
                    marginTop: 0.7,
                    width: '320px',
                    color: '#00b074',
                  }}
                  variant='overline'
                  display='block'
                  gutterBottom
                >
                  {t('emailNoti')}
                </Typography>
                <Switch
                  sx={{
                    marginBottom: 1,
                    '& .MuiSwitch-thumb': {
                      backgroundColor: checkedEmail ? '#00b074' : '#fff',
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: checkedEmail ? '#00b074' : '#7d7d7d',
                    },
                  }}
                  color={checkedEmail ? 'success' : 'error'}
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
