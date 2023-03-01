import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowButton from 'src/components/shared/ArrowButton/index';
import Button from 'src/components/shared/Button';
import CustomInput from 'src/components/shared/CustomInput/index';
import InputFile from 'src/components/shared/InputFile';
import SelectCustom from 'src/components/shared/Select';
import { TabTitle } from 'src/utils/GeneralFunctions';
import './styles.scss';
export default function Container({
  title,
  children,
  onClick,
  handleClick,
  err,
  setValue,
  register,
  errorMessage,
  genderList,
}) {
  const { t } = useTranslation('registerFrom');
  TabTitle(`${t('registerTL')} - ${title}`);

  return (
    <div className='register__container'>
      <p className='title-requirement'>
        (<span className='field-requirment'> * </span>){t('requiredFieldTL')}
      </p>
      <form
        onSubmit={handleClick}
        className='register__container__form'
        autoComplete='off'
        encType='multipart/form-data'
      >
        <div className='register__container__form--name'>
          <CustomInput
            label={t('registerTL')}
            id='username'
            type='text'
            placeholder={t('registerTL')}
            register={register}
            subtitle={t('accountNamingFormatTL')}
          >
            {err.username?.message}
            {errorMessage?.Username}
            {'.'}
          </CustomInput>
          <CustomInput
            label='Email'
            id='email'
            type='email'
            placeholder='Email...'
            register={register}
            subtitle={t('mailingFormatTL')}
          >
            {err.email?.message}
            {errorMessage?.Email}
          </CustomInput>
          <CustomInput
            className='custom_req_can'
            label={t('phoneNumberTL')}
            id='phone'
            type='phone'
            placeholder={t('phoneNumberTL')}
            register={register}
            subtitle={t('phoneNumberFormatTL')}
          >
            {err.phone?.message}
          </CustomInput>
        </div>
        <div className='register__container__form--name'>
          <CustomInput
            label={t('PasswordTL')}
            id='password'
            type='password'
            placeholder={t('PasswordTL')}
            register={register}
            visibility={true}
            subtitle={t('passwordFormatTL')}
          >
            {err.password?.message}
            {errorMessage?.Password}
            {'.'}
          </CustomInput>
          <CustomInput
            label={t('confirmPasswordTL')}
            id='confirmPassword'
            type='password'
            placeholder={t('confirmPasswordTL')}
            register={register}
            visibility={true}
            subtitle={t('passwordConfirmationFormatTL')}
          >
            {err.confirmPassword?.message}
          </CustomInput>
          <SelectCustom
            className='register__container__form--action'
            label={t('genderTL')}
            placeholder={t('pleaseSelectTL')}
            options={genderList}
            id='gender'
            register={register}
          >
            {err.gender?.message}
          </SelectCustom>
        </div>

        <Divider style={{ marginTop: '2rem' }} />
        <div className='register__container__form--name'>
          <CustomInput
            label={t('lastNameTL')}
            id='lastName'
            type='text'
            placeholder={t('lastNameTL')}
            register={register}
          >
            {err.lastName?.message}
          </CustomInput>
          <CustomInput
            label={t('firstNameTL')}
            id='firstName'
            type='text'
            placeholder={t('firstNameTL')}
            register={register}
          >
            {err.firstName?.message}
          </CustomInput>
        </div>
        <InputFile
          label={t('avatarTL')}
          requirementField={false}
          id='avatar'
          format='image'
          setValue={setValue}
          register={register}
        >
          {err.avatar?.message}
        </InputFile>
        {children}
        <div className='register__container__btns'>
          <div className='register__container__btns--item' onClick={onClick}>
            <ArrowButton fontSize='16px' text={t('backTL')} direction='left' />
          </div>
          <div className='register__container__btns--item'>
            <Button name={t('registerTL')} onClick={handleClick} />
          </div>
        </div>
      </form>
    </div>
  );
}
