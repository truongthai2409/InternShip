import { Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Button from 'src/components/shared/Button';
import CustomInput from 'src/components/shared/CustomInput/index';
import { Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { TabTitle } from 'src/utils/GeneralFunctions';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
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
  const location = useLocation();
  const path = location.pathname;
  console.log('🚀 ~ file: index.jsx:26 ~ path:', path);

  return (
    <div className='register__container'>
      <h1 className='register-container__title'>Đăng ký tài khoản {title}</h1>
      <p className='title-requirement'>
        (<span className='field-requirment'> * </span>)&nbsp;{' '}
        {t('requiredFieldTL')}
      </p>
      {path == '/register/candidate' ? (
        <>
          <div className='button-container'>
            <Button className='button-container__google'>
              <GoogleIcon sx={{ fontSize: '13px' }} />
              {'TIẾP TỤC VỚI GOOGLE'}
            </Button>
            <Button className='button-container__facebook'>
              <FacebookIcon sx={{ fontSize: '13px' }} />
              {'TIẾP TỤC VỚI FACEBOOK'}
            </Button>
          </div>
          <Divider
            style={{ marginTop: '2rem', color: '#CFD0D4', fontSize: '14px' }}
          >
            HOẶC
          </Divider>
        </>
      ) : (
        ''
      )}

      <form
        onSubmit={handleClick}
        className='register__container__form'
        autoComplete='off'
        encType='multipart/form-data'
      >
        {path == '/register/hr' ? (
          <>
            <h4 className='register__container__form--title'>
              Thông tin tài khoản
            </h4>
            <div className='register__container__form--name'>
              <CustomInput
                label='Email'
                id='email'
                type='email'
                placeholder='Email'
                register={register}
                subtitle={t('mailingFormatTL')}
              >
                {err.email?.message}
                {errorMessage?.Email}
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
            </div>
            <h4 className='register__container__form--title'>
              Thông tin liên hệ
            </h4>
          </>
        ) : (
          <>
            <div className='register__container__form--name'>
              <CustomInput
                label={t('lastNameTL')}
                id='lastName'
                type='text'
                placeholder={t('lastNameTL')}
                register={register}
                subtitle={t('lastName')}
              >
                {err.lastName?.message}
              </CustomInput>
              <CustomInput
                label={t('firstNameTL')}
                id='firstName'
                type='text'
                placeholder={t('firstNameTL')}
                register={register}
                subtitle={t('firstName')}
              >
                {err.firstName?.message}
              </CustomInput>
            </div>
            <div className='register__container__form--name'>
              <CustomInput
                label='Email'
                id='email'
                type='email'
                placeholder='Email'
                register={register}
                subtitle={t('mailingFormatTL')}
              >
                {err.email?.message}
                {errorMessage?.Email}
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
            </div>
            <div className='register__container__form--name'>
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
          </>
        )}

        {children}
        <div className='register-container__footer'>
          <p>
            Bằng việc ấn vào nút “Đăng ký”, tôi đồng ý với{' '}
            <span style={{ color: '#00B074' }}>Thỏa thuận sử dụng </span> và{' '}
            <span style={{ color: '#00B074' }}>Quy định bảo mật </span>
            của Jobsit.vn
          </p>
        </div>
        <div className='register__container__btns'>
          <div className='register__container__btns--item'>
            <Button
              name={t('registerTL')}
              type='submit'
              onClick={handleClick}
            />
          </div>
        </div>
        <div className='register-container__footer'>
          <Typography
            variant='h6'
            component='div'
            sx={{
              fontSize: 13,
              fontWeight: '400',
              transform: 'translate(5px,5px)',
            }}
          >
            {t('doYouAlreadyHaveAnAccountTL')}{' '}
            <Link to='/login' style={{ color: '#00B074', fontWeight: 'bold' }}>
              {t('loginTL')}
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
}
