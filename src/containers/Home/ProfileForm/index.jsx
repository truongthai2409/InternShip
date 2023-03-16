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
import SelectMulti from 'src/components/shared/SelectMulti';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { updateUser } from 'src/store/slices/main/user/userSlice';
import { getDistrictList } from 'src/store/slices/location/locationSlice';
import { getUniversityList } from 'src/store/slices/Admin/university/unversitySlice';
import { genderList, listWorkingFormat, schema, schema2 } from './validateForm';
import ProfileDetail from './ProfileDetail';
import InfoJob from './InfoJob';
import DatePicker from 'react-datepicker';
import DatePickerWithLabel from 'src/components/shared/CustomDatePicker/CustomDatePicker';
import './styles.scss';

const ProfileForm = ({ profile: user }) => {
  const { t } = useTranslation('userInfo');
  const [showInput, setShowInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { errors: errors2 },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema2),
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
    setValue('firstName', user?.firstName || user?.userDTO?.firstName);
    setValue('lastName', user?.lastName || user?.userDTO?.lastName);
    setValue('email', user?.email || user?.userDTO?.email);
    setValue('phone', user?.phone || user?.userDTO?.phone);
    setValue('gender', user?.gender);
    setValue('province', user?.provinceId);
    setValue('district', user?.districtId);
    setValue('address', user?.address);
  }, [user, setValue]);

  const handleEditClick = () => {
    setShowInput(!showInput);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleEdit = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    dispatch(getUniversityList([1, 20]));
  }, []);

  const handleDateChange = (date) => {
    console.log('🚀 ~ file: index.jsx:85 ~ handleDateChange ~ date:', date);
    setSelectedDate(date);
  };
  const getDistrict = (id) => {
    dispatch(getDistrictList(id));
  };
  const onSubmit = (data) => {
    console.log('run please', { role, data });
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
        console.log('run ne');
        console.log('data', {
          data,
          user,
        });
        const profileData = {
          candidate: JSON.stringify({
            userCreationDTO: {
              id: parseInt(user?.id),
              firstName: user?.firstName,
              lastName: user?.lastName,
              gender: parseInt(data.gender),
              phone: user?.phone,
              email: user?.email,
              // birthday: data.birthday,
            },
            major: {
              id: user?.major?.id,
            },
          }),
          fileAvatar: data.avatar,
          fileCV: data.cv,
          location: data.address,
        };
        console.log(profileData, 'profiledata');
        dispatch(updateUser([userPost, profileData])).then(
          setShowForm(!showForm)
        );
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

  const onSubmitJobForm = (data) => {
    const userPost = {
      userStorage,
      role,
    };

    if (role === 'Role_Candidate') {
      const profileData = {
        candidate: JSON.stringify({
          userCreationDTO: {
            id: parseInt(user?.id),
            firstName: user?.firstName,
            lastName: user?.lastName,
            gender: parseInt(user?.gender),
            phone: user?.phone,
            email: user?.email,
            // birthday: data.birthday,
          },
          majors: {
            id: data.major.id,
          },
          jobTypes: {
            id: data.jobType.id,
          },
        }),
        fileAvatar: user?.avatar,
        fileCV: data.cv,
        location: user?.address,
        desiredJob: data.desiredJob,
        letter: data.coverLetter,
        provinceId: data.workLocation,
      };
      console.log(profileData, 'profiledata');
      dispatch(updateUser([userPost, profileData])).then(
        setShowInput(!showInput)
      );
    }
  };
  console.log(errors, 'ererere');
  return (
    <>
      {!showForm && <ProfileDetail setShowForm={setShowForm} />}
      {showForm && (
        <form
          className='profile-form__wrapper'
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography paragraph={true} className='profile-form__header'>
            {t('changePro')}
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
                check={true}
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
                check={true}
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
                check={true}
              >
                {errors.email?.message}
              </CustomInput>
              {/* <DatePickerWithLabel
                // onChange={handleDateChange}
                onChange={(date) => {
                  console.log(date);
                  setSelectedDate(date);
                }}
                selectedDate={selectedDate}
                label='Ngày sinh'
                className='profile-form__input custom-input'
                id='birthday'
                dateFormat='dd/MM/yyyy'
                {...register('birthday')}
              /> */}
              {/* <DatePicker
                // selected={startDate}
                format='dd/MM/yyyy'
                selected={selectedDate}
                label='Ngày sinh'
                className='profile-form__input custom-input'
                id='birthday'
                register={register}
                onChange={(date) => {
                  console.log(date);
                  setSelectedDate(date);
                }}
              /> */}
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
                check={true}
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
              onClick={handleEdit}
              fz='14px'
              outline='1.5px solid #DEDEDE'
              className='profile-form__action-btn__cancel'
            />
          </div>
        </form>
      )}
      {!showInput && <InfoJob setShowInput={setShowInput} />}
      {showInput && (
        <form
          className='profile-form__wrapper job'
          autoComplete='off'
          onSubmit={onSubmitJobForm}
        >
          <Typography paragraph={true} className='profile-form__header'>
            {t('jobInformation')}
          </Typography>
          <div className='profile-form__content'>
            <div className='profile-form__content-item'>
              <CustomInput
                register={register2}
                setValue={setValue}
                id='desiredJob'
                label={t('desiredJob')}
                className='profile-form__input'
                radius='2px'
                height='45px'
                border='1px solid #777777'
              >
                {errors2.desiredJob?.message}
              </CustomInput>
            </div>
            <div className='profile-form__content-item'>
              <SelectCustom
                setValue={setValue}
                id='jobPosition'
                register={register2}
                label={t('jobPosition')}
                options={jobPosition}
                placeholder={t('placeholder')}
              >
                {errors2.jobPosition?.message}
              </SelectCustom>
            </div>
            <div className='profile-form__content-item'>
              <SelectCustom
                setValue={setValue}
                id='major'
                register={register2}
                label={t('major')}
                options={majorList}
                placeholder={t('placeholder')}
              >
                {errors2.major?.message}
              </SelectCustom>
            </div>
            <div className='profile-form__content-item'>
              <SelectMulti
                id='jobType'
                arrList={listWorkingFormat}
                register={register2}
                placeholder={t('placeholder')}
                label={t('jobType')}
              >
                {errors2.jobType?.message}
              </SelectMulti>
            </div>
            <div className='profile-form__content-item'>
              <SelectCustom
                setValue={setValue}
                id='workLocation'
                register={register2}
                label={t('workLocation')}
                options={provinceList}
                placeholder={t('placeholder')}
              >
                {errors2.workLocation?.message}
              </SelectCustom>
            </div>
            <div className='profile-form__content-item'>
              <InputFile
                label='CV đính kèm'
                setValue={setValue}
                register={register2}
                id='cv'
                requirementField={true}
                accept='.docx, .pdf, .xlsx'
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
                  {...register2('coverLetter')}
                />
              </div>
            </div>
          </div>
          <div className='profile-form__action'>
            <Button
              name={t('update')}
              bheight={44}
              onClick={handleSubmit2(onSubmitJobForm)}
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
      )}
    </>
  );
};

export default ProfileForm;
