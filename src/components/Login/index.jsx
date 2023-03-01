import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountMenu from '../Home/AccountMenu';
import { MenuDropDown } from './components';
import './styles.scss';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { user, role } = useSelector((state) => state.profile);
  const { t } = useTranslation('login');

  if (role) {
    return (
      <div className='login--already'>
        <div
          className='responsive-login__icon'
          style={{
            borderRadius: '50px',
            backgroundColor: '#FFFFFF',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '12px',
            height: '40px',
          }}
        >
          <h4 className='name' style={{ fontSize: '14px' }}>
            {' '}
            {user?.user?.lastName} {user?.user?.firstName}{' '}
          </h4>

          <AccountMenu
            linkImg={
              user?.user?.avatar
                ? `${user?.user?.avatar}`
                : 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
            }
          />
        </div>
      </div>
    );
  }
  return (
    <div className='login--not-yet'>
      <Link to='/login'>
        <span className='login__home-sign-in'>{t('loginTL')}</span>
      </Link>
      <MenuDropDown />
    </div>
  );
}
