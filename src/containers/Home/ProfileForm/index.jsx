import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import moment from 'moment';
import ProfileDetail from './ProfileDetail';
import InfoJob from './InfoJob';
import DatePickerWithLabel from 'src/components/shared/CustomDatePicker/CustomDatePicker';
import './styles.scss';

const ProfileForm = ({ profile: user }) => {
  console.log('🚀 ~ file: index.jsx:25 ~ ProfileForm ~ user:', user);
  const { t } = useTranslation('userInfo');
  const [showInput, setShowInput] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { others, role } = useSelector((state) => state.profile);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectChange = (selected) => {
    setSelectedItems(selected);
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      lastName: user?.lastName,
      firstName: user?.firstName,
      email: user?.email,
      phone: user?.phone,
      gender: others?.userDetails?.gender,
      address: others?.locationDTO?.address,
    },
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
    setValue('gender', others?.userDetails?.gender);

    setValue('address', others?.locationDTO?.address);
    setValue2('desiredJob', others?.desiredJob);

    setValue2('coverLetter', others?.letter);
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    dispatch(getUniversityList([1, 20]));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
            userCreationDTO: {
              id: parseInt(user?.id),
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.email,
              birthday: moment(data.birthday).format('DD-MM-yyyy'),
            },
            locationDTO: {
              districtDTO: {
                id: parseInt(data.district),
                provinceDTO: { id: parseInt(data.province) },
              },
              address: data.address,
            },
            jobPositionDTOs: [
              {
                id: others.jobPositionDTOs[0]?.id,
              },
            ],
            desiredJob: others?.desiredJob,
            workProvinceDTO: { id: others.workProvinceDTO?.id },
            letter: others?.letter,
            universityDTO: { id: data.school },
          }),
          fileCV: user?.cv,
          fileAvatar: data.avatar,
        };

        dispatch(updateUser([userPost, profileData])).then(
          setShowForm(!showForm),
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
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
    console.log('🚀 ~ file: index.jsx:198 ~ onSubmitJobForm ~ data:', data);
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
            birthday: user?.birthday,
          },
          locationDTO: {
            districtDTO: {
              id: parseInt(others?.locationDTO?.districtDTO?.id),
              provinceDTO: {
                id: parseInt(others?.locationDTO?.districtDTO?.provinceDTO?.id),
              },
            },
            address: others?.locationDTO?.address,
          },
          majorDTOs: [
            {
              id: data.major,
            },
          ],
          jobTypeDTOs: [
            {
              id: data.jobType[0].id,
            },
          ],
          jobPositionDTOs: [{ id: data.jobPosition }],
          desiredJob: data.desiredJob,
          workProvinceDTO: { id: data.workLocation },
          letter: data.coverLetter,
          universityDTO: { id: others?.universityDTO?.id },
        }),
        fileAvatar: user?.avatar,
        fileCV: data.cv,
      };
      console.log(
        '🚀 ~ file: index.jsx:244 ~ onSubmitJobForm ~ profileData:',
        profileData
      );

      dispatch(updateUser([userPost, profileData])).then(
        setShowInput(!showInput),
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      );
    }
  };
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
            <InputFile
              label='Ảnh đại diện'
              requirementField={true}
              id='avatar'
              format='image'
              className='avatar-input'
              setValue={setValue}
              register={register}
            >
              {errors.avatar?.message}
            </InputFile>
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
                // check={true}
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
                // check={true}
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
                defaultValue={user?.email}
                check={true}
              >
                {errors.email?.message}
              </CustomInput>
              <Controller
                id='birthday'
                name='birthday'
                control={control}
                rules={{ required: true }}
                style={{ width: '100%' }}
                render={({ field }) => (
                  <DatePickerWithLabel
                    className='profile-form__input'
                    label={'Ngày sinh'}
                    onChange={(date) => {
                      field.onChange(date);
                      handleDateChange(date);
                    }}
                    // value={field.value}
                    selectedDate={field.value}
                    format='dd-MM-yyyy'
                  />
                )}
              />
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
                // check={true}
              >
                {errors.phone?.message}
              </CustomInput>
              <SelectCustom
                setValue={setValue}
                id='gender'
                register={register}
                label={t('gender')}
                defaultValue={genderList.map((value) => {
                  if (value.id === user?.gender) {
                    const genderName = value.name;
                    return genderName ? genderName : '';
                  }
                })}
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
                dispatch={dispatch}
                action={getDistrictList}
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
                defaultValue={others?.universityDTO?.id}
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
                defaultValue={others.jobPositionDTOs[0].id}
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
                defaultValue={others.majorDTOs[0].id}
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
                onChange={handleSelectChange}
                defaultValue={others.jobTypeDTOs[0].id}
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
                defaultValue={others.workProvinceDTO.id}
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
                format='cv'
              />
            </div>
            <div className='profile-form__content-item'>
              <div style={{ width: '100%' }}>
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
                  sx={{
                    resize: 'none',
                    '&::-webkit-resizer': {
                      display: 'none',
                    },
                  }}
                  style={{ width: '100%', height: '200px', padding: '20px' }}
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
