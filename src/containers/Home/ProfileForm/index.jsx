import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/shared/Button';
import CustomInput from 'src/components/shared/CustomInput';
import InputFile from 'src/components/shared/InputFile';
import SelectCustom from 'src/components/shared/Select';
import { updateUser } from 'src/store/slices/main/user/userSlice';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { getDistrictList } from 'src/store/slices/location/locationSlice';
import SelectMulti from 'src/components/shared/SelectMulti';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Modal from 'src/components/shared/Modal';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import './styles.scss';
import { genderList, listWorkingFormat, schema } from './validateForm';
import { getUniversityList } from 'src/store/slices/Admin/university/unversitySlice';

const ProfileForm = ({ profile: user }) => {
  const { t } = useTranslation('userInfo');
  const [showInput, setShowInput] = useState(false);
  const [opens, setOpens] = useState(false);
  const [open, setOpen] = useState(false);

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const { role } = useSelector((state) => state.profile);
  const { provinceList, districtList } = useSelector((state) => state.location);
  const { universityList } = useSelector((state) => state.university);
  const { jobPosition } = useSelector((state) => state.job);
  const { majorList } = useSelector((state) => state.major);
  const userStorage =
    JSON.parse(sessionStorage.getItem('userPresent')) ||
    JSON.parse(localStorage.getItem('userPresent'));
  const dispatch = useDispatch();

  useEffect(() => {
    setValue('firstName', user?.user?.firstName || user?.userDTO?.firstName);
    setValue('lastName', user?.user?.lastName || user?.userDTO?.lastName);
    setValue('email', user?.user?.email || user?.userDTO?.email);
    setValue('phone', user?.user?.phone || user?.userDTO?.phone);
    setValue('gender', user?.user?.gender);
    setValue('province', user?.provinceId);
    setValue('district', user?.districtId);
    setValue('address', user?.address);
  }, [user, setValue]);

  const handleEditClick = () => {
    setShowInput(!showInput);
  };

  useEffect(() => {
    dispatch(getUniversityList([1, 20]));
  }, []);

  const getDistrict = (id) => {
    dispatch(getDistrictList(id));
  };
  const onSubmit = (data) => {
    const userPost = {
      userStorage,
      role,
    };
    switch (role) {
      case 'Role_HR': {
        const profileData = {
          hr: JSON.stringify({
            user: {
              username: user?.user?.username,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
              firstName: data.firstName,
              lastName: data.lastName,
              role: user?.user?.role,
            },
            position: user?.position,
            company: { id: user?.company?.id },
          }),
          fileAvatar: data.avatar,
        };
        dispatch(updateUser([userPost, profileData, user.id]));
        break;
      }
      case 'Role_Candidate': {
        const profileData = {
          candidate: JSON.stringify({
            createUser: {
              id: parseInt(user?.user.id),
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
            },
            major: {
              id: user?.major.id,
            },
          }),
          fileAvatar: data.avatar,
          fileCV: user?.cv,
        };
        dispatch(updateUser([userPost, profileData]));
        break;
      }
      case 'Role_Partner': {
        const profileData = {
          avatar: data.avatar,
          partner: JSON.stringify({
            id: parseInt(user.id),
            position: user?.position,
            userCreationDTO: {
              // username: user?.user.username,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
            },
          }),
        };
        dispatch(updateUser([userPost, profileData]));
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <form className='profile-form__wrapper' autoComplete='off'>
        <Typography paragraph={true} className='profile-form__header'>
          {t('changePro')}
          {showInput ? (
            <IconButton onClick={handleEditClick}>
              <EditIcon sx={{ color: '#fff' }} />
            </IconButton>
          ) : (
            ''
          )}
        </Typography>
        <div className='profile-form__content'>
          <div className='profile-form__content-item'>
            <CustomInput
              register={register}
              setValue={setValue}
              id='lastName'
              label={t('lastname')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.lastName?.message}
            </CustomInput>
            <CustomInput
              register={register}
              setValue={setValue}
              id='firstName'
              label={t('firstname')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.firstName?.message}
            </CustomInput>
          </div>
          <div className='profile-form__content-item'>
            <CustomInput
              register={register}
              setValue={setValue}
              id='email'
              label={t('email')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.email?.message}
            </CustomInput>
            <>sadasdas</>
          </div>
          <div className='profile-form__content-item'>
            <CustomInput
              register={register}
              setValue={setValue}
              id='phone'
              type='text'
              label={t('phoneNum')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.phone?.message}
            </CustomInput>
            <SelectCustom
              setValue={setValue}
              id='gender'
              register={register}
              label={t('gender')}
              defaultValue={user?.user?.gender}
              options={genderList}
              placeholder={t('placeholder')}
            >
              {errors.gender?.message}
            </SelectCustom>
          </div>
          <div className='profile-form__content-item'>
            <SelectCustom
              setValue={setValue}
              id='province'
              register={register}
              label={t('province')}
              options={provinceList}
              placeholder={t('placeholder')}
              onChange={(id) => getDistrict(id)}
            >
              {errors.province?.message}
            </SelectCustom>
            <SelectCustom
              setValue={setValue}
              id='district'
              register={register}
              label={t('district')}
              options={districtList}
              placeholder={t('placeholder')}
            >
              {errors.district?.message}
            </SelectCustom>
          </div>
          <div className='profile-form__content-item'>
            <CustomInput
              register={register}
              setValue={setValue}
              id='address'
              type='text'
              label={t('address')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.address?.message}
            </CustomInput>
          </div>
          <div className='profile-form__content-item'>
            <SelectCustom
              setValue={setValue}
              id='school'
              register={register}
              label={t('school')}
              requirementField={false}
              options={universityList}
              placeholder={t('placeholder')}
            />
          </div>
        </div>
        <div className='profile-form__action'>
          <Button
            name={t('update')}
            bheight={44}
            onClick={handleSubmit(onSubmit)}
            fz='14px'
            outline='1.5px solid #DEDEDE'
            className='profile-form__action-btn'
          />
          <Button
            name={t('cancel')}
            bheight={44}
            onClick={handleEditClick}
            fz='14px'
            outline='1.5px solid #DEDEDE'
            className='profile-form__action-btn__cancel'
          />
        </div>
      </form>
      <form className='profile-form__wrapper job' autoComplete='off'>
        <Typography paragraph={true} className='profile-form__header'>
          {t('jobInformation')}
          {showInput ? (
            <IconButton onClick={handleEditClick}>
              <EditIcon sx={{ color: '#fff' }} />
            </IconButton>
          ) : (
            ''
          )}
        </Typography>
        <div className='profile-form__content'>
          <div className='profile-form__content-item'>
            <CustomInput
              register={register}
              setValue={setValue}
              id='desiredJob'
              label={t('desiredJob')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.desiredJob?.message}
            </CustomInput>
          </div>
          <div className='profile-form__content-item'>
            <SelectCustom
              setValue={setValue}
              id='jobPosition'
              register={register}
              label={t('jobPosition')}
              options={jobPosition}
              placeholder={t('placeholder')}
            >
              {errors.jobPosition?.message}
            </SelectCustom>
          </div>
          <div className='profile-form__content-item'>
            <SelectCustom
              setValue={setValue}
              id='major'
              register={register}
              label={t('major')}
              options={majorList}
              placeholder={t('placeholder')}
            >
              {errors.major?.message}
            </SelectCustom>
          </div>
          <div className='profile-form__content-item'>
            <SelectMulti
              id='jobType'
              arrList={listWorkingFormat}
              register={register}
              placeholder={t('placeholder')}
              label={t('jobType')}
            >
              {errors.jobType?.message}
            </SelectMulti>
          </div>
          <div className='profile-form__content-item'>
            <SelectCustom
              setValue={setValue}
              id='workLocation'
              register={register}
              label={t('workLocation')}
              options={provinceList}
              placeholder={t('placeholder')}
            >
              {errors.workLocation?.message}
            </SelectCustom>
          </div>
          <div className='profile-form__content-item'>
            <CustomInput
              register={register}
              setValue={setValue}
              id='desiredJob'
              label={t('desiredJob')}
              className='profile-form__input'
              radius='2px'
              height='45px'
              border='1px solid #777777'
            >
              {errors.desiredJob?.message}
            </CustomInput>
            <Tooltip title={t('changeCV')}>
              <div
                className='profile_children_handle__item'
                onClick={() => handleClick(1)}
              >
                <CloudUploadIcon className='icon-action' />
                <span>{t('changeCV')}</span>
              </div>
            </Tooltip>
            <Modal
              modalTitle={t('changeCV')}
              open={opens}
              setOpen={setOpens}
              children={
                <form
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
              name={t('changeCV')}
              iconClose={<SyncAltIcon />}
            />
          </div>
          <div className='profile-form__content-item'>
            <div>
              <InputLabel
                htmlFor='coverLetter'
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: '10px',
                }}
              >
                {t('coverLetter')}
              </InputLabel>
              <TextareaAutosize
                id='coverLetter'
                style={{ width: '841px', height: '200px', padding: '20px' }}
                placeholder={t('placeholderCover')}
                {...register('coverLetter')}
              />
            </div>
          </div>
        </div>
        <div className='profile-form__action'>
          <Button
            name={t('update')}
            bheight={44}
            onClick={handleSubmit(onSubmit)}
            fz='14px'
            outline='1.5px solid #DEDEDE'
            className='profile-form__action-btn'
          />
          <Button
            name={t('cancel')}
            bheight={44}
            onClick={handleEditClick}
            fz='14px'
            outline='1.5px solid #DEDEDE'
            className='profile-form__action-btn__cancel'
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
