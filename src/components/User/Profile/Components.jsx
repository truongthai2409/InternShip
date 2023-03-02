import { yupResolver } from '@hookform/resolvers/yup';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Divider, Switch, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAllUserCandidate } from 'src/store/slices/main/candidate/user/userCandidateSlice';
import { updateUser } from 'src/store/slices/main/user/userSlice';
import Button from '../../shared/Button';
import InputFile from '../../shared/InputFile';
import Modal from '../../shared/Modal';
import { schema } from './dataCV';
import UserInfo from './UserInfo';
import avatarDefault from 'src/assets/img/avatar-default.png';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';

const BASEURL = process.env.REACT_APP_API;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const Components = ({ profile }) => {
  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
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
  const handleChange = (e) => {};
  const [checkedFind, setCheckedFind] = useState(true);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [allowContact, setAllowContact] = useState(true);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('userInfo');

  const handleChangeFind = (event) => {
    setCheckedFind(event.target.checked);
    setAllowContact(event.target.checked);
  };
  const handleCheckEmail = (event) => {
    setCheckedEmail(event.target.checked);
  };

  const handleClick = (number) => {
    switch (number) {
      case 1: {
        return setOpens(!opens);
      }
      case 2: {
        return setOpen(!open);
      }
      default:
        break;
    }
  };

  const onSubmit = async (data) => {
    const userSessionStorage =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    const profileData = {
      candidate: JSON.stringify({
        createUser: {
          id: parseInt(profile?.user?.id),
          firstName: profile?.user?.firstName,
          lastName: profile?.user?.lastName,
          gender: parseInt(profile?.user?.gender),
          phone: profile?.user?.phone,
          email: profile?.user?.email,
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
      <div
        className='profile_header'
        style={{
          backgroundImage: `url(${
            profile?.user?.avatar || 'https://i.stack.imgur.com/SvWWN.png'
          })`,
        }}
      >
        <img
          style={{ width: 150, height: 150, borderRadius: '50%' }}
          src={`${profile?.user?.avatar}`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.onerror = undefined;
            currentTarget.src = `${avatarDefault}`;
          }}
          alt='avatar'
        ></img>
      </div>
      <div className='profile_footer'>
        <div style={{ textAlign: 'center' }}>
          <div className='profile_name'>
            <Typography variant='h6'>
              {profile?.user?.lastName} {profile?.user?.firstName}
            </Typography>
          </div>
          <div className='profile_username'>
            <h3>@{profile?.user?.username}</h3>
          </div>
          <Divider style={{ padding: 8 }} />
          {profile?.user?.role?.id === 3 ? (
            <div
              className='profile_handle'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 8,
              }}
            >
              <div className='profile_children_handle'>
                <Tooltip title={t('changeCV')}>
                  <div className='profile_children_handle__item'>
                    <CachedRoundedIcon
                      className='icon-action'
                      onClick={() => handleClick(1)}
                    />
                    <span>{t('changeCV')}</span>
                  </div>
                </Tooltip>
                <Modal
                  modalTitle={t('change_cv')}
                  open={opens}
                  setOpen={setOpens}
                  children={
                    <form
                      onChange={handleChange}
                      style={{
                        width: 300,
                        height: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <InputFile
                        label='CV'
                        requirementField={false}
                        id='cv'
                        format='pdf'
                        setValue={setValue}
                        register={register}
                      >
                        {errors?.cv?.message}
                      </InputFile>
                      <Button onClick={handleSubmit(onSubmit)}>
                        {t('change')}
                      </Button>
                    </form>
                  }
                  name={t('change_cv')}
                  iconClose={<SyncAltIcon />}
                />
              </div>
              <div
                className='profile_children_handle'
                style={{ padding: '0 2rem' }}
              >
                <Tooltip title={t('viewCV')}>
                  <div className='profile_children_handle__item'>
                    <RemoveRedEyeIcon onClick={() => handleClick(2)} />
                    <span>{t('viewCV')}</span>
                  </div>
                </Tooltip>
                <Modal
                  iconClose={true}
                  modalTitle={t('view_cv')}
                  open={open}
                  setOpen={setOpen}
                  children={
                    <div>
                      <Document
                        file={profile.cv}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                          />
                        ))}
                      </Document>
                    </div>
                  }
                />
              </div>
              <div className='profile_children_handle'>
                <Tooltip title={t('downloadCV')}>
                  <a
                    id='downloadLink'
                    href={`${profile?.cv}`}
                    target='_blank'
                    type='application/octet-stream'
                    // download={`${profile?.cv}`}
                    download
                    rel='noreferrer'
                    className='profile_children_handle__item'
                  >
                    <CloudDownloadRoundedIcon />
                    <span>{t('downloadCV')}</span>
                  </a>
                </Tooltip>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          {profile?.user?.role?.id === 3 ? (
            <div className='profile_click'>
              <div className='profile_check'>
                <Typography
                  sx={{
                    marginTop: 0.7,
                    color: allowContact ? '#00DA6F' : 'red',
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
                  color={allowContact ? 'success' : 'error'}
                  sx={{
                    '& .MuiSwitch-thumb': {
                      backgroundColor: allowContact ? '#00DA6F' : 'red',
                    },
                    '& .MuiSwitch-track': {
                      backgroundColor: allowContact ? '#00DA6F' : 'red',
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            ''
          )}

          <div className='profile_click'>
            <div className='profile_check'>
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
          </div>

          <div className='profile_check'></div>
        </div>
        <div className='profile_check'></div>
        <div className='profile_info'>
          <UserInfo name='Email' profile={profile?.user?.email} />
          <UserInfo name={t('phoneNum')} profile={profile?.user?.phone} />
          <UserInfo
            name={t('role')}
            profile={
              profile?.user?.role?.name === 'Role_Candidate'
                ? t('candidate')
                : profile?.user?.role?.name === 'Role_HR'
                ? t('HR')
                : t('partner')
            }
          />
          <UserInfo
            name={t('gender')}
            profile={
              profile?.user?.gender === 1
                ? t('female')
                : profile?.user?.gender === 0
                ? t('male')
                : t('other')
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Components;
