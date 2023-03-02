import AddCardIcon from '@mui/icons-material/AddCard';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Select from '@mui/material/Select';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  indexFilterChange,
  pageFilterChange,
} from 'src/store/slices/main/home/filter/filterSlices';
import './responsive.scss';
import './styles.scss';

const HeaderWithHR = (props) => {
  const { t } = useTranslation('headerFooter');
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(indexFilterChange(0));
    dispatch(pageFilterChange(1));
  };

  return (
    <div className='header__hr'>
      <div className='header__hr-item'>
        <ManageAccountsIcon sx={{ color: '#04bf8a' }}></ManageAccountsIcon>
        <span>Quản lý đối tác</span>
        <Select className='header__hr-dropmenu'>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            to='/hr/post'
            className={
              pathUrl === '/hr/post'
                ? 'header__hr-post active'
                : 'header__hr-post'
            }
          >
            <AddCardIcon sx={{ color: '#04bf8a' }}></AddCardIcon>
            <span className='header__hr-post-post'>{t('postAJobTL')}</span>
          </Link>
          <Link
            onClick={() => handleClick()}
            to='/hr/list'
            className={
              pathUrl === '/hr/list'
                ? 'header__hr-post active'
                : 'header__hr-post'
            }
          >
            <FormatAlignJustifyIcon
              sx={{ color: '#04bf8a' }}
            ></FormatAlignJustifyIcon>
            <span className='header__hr-post-post'>{t('jobOpeningsTL')}</span>
          </Link>
        </Select>
      </div>
      <div className='header__hr-item'>
        <PersonSearchIcon sx={{ color: '#04bf8a' }}></PersonSearchIcon>
        <span>Tìm kiếm ứng viên</span>
        <Select className='header__hr-dropmenu'>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            to='/hr/post'
            className={
              pathUrl === '/hr/post'
                ? 'header__hr-post active'
                : 'header__hr-post'
            }
          >
            <AddCardIcon sx={{ color: '#04bf8a' }}></AddCardIcon>
            <span className='header__hr-post-post'>{t('postAJobTL')}</span>
          </Link>
          <Link
            onClick={() => handleClick()}
            to='/hr/list'
            className={
              pathUrl === '/hr/list'
                ? 'header__hr-post active'
                : 'header__hr-post'
            }
          >
            <FormatAlignJustifyIcon
              sx={{ color: '#04bf8a' }}
            ></FormatAlignJustifyIcon>
            <span className='header__hr-post-post'>{t('jobOpeningsTL')}</span>
          </Link>
        </Select>
      </div>
      <div className='header__hr-item'>
        <PlaylistAddCheckIcon sx={{ color: '#04bf8a' }}></PlaylistAddCheckIcon>
        <span>Quản lý việc làm</span>
        <Select className='header__hr-dropmenu'>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }}
            to='/hr/post'
            className={
              pathUrl === '/hr/post'
                ? 'header__hr-post active'
                : 'header__hr-post'
            }
          >
            <AddCardIcon sx={{ color: '#04bf8a' }}></AddCardIcon>
            <span className='header__hr-post-post'>{t('postAJobTL')}</span>
          </Link>
          <Link
            onClick={() => handleClick()}
            to='/hr/list'
            className={
              pathUrl === '/hr/list'
                ? 'header__hr-post active'
                : 'header__hr-post'
            }
          >
            <FormatAlignJustifyIcon
              sx={{ color: '#04bf8a' }}
            ></FormatAlignJustifyIcon>
            <span className='header__hr-post-post'>{t('jobOpeningsTL')}</span>
          </Link>
        </Select>
      </div>

      {/* Version 2 . 🌹 Not Delete it*/}
      {/* <Link
      onClick={()=>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }}
        to="candidatemanagement"
        className={
          pathUrl === "/hr/candidatemanagement"
            ? "header__hr-post active"
            : "header__hr-post"
        }
      >
        <BookmarksIcon sx={{ color: "#04bf8a" }} />
        <span className="header__hr-post-post">Ứng viên ưa thích</span>
      </Link> */}
    </div>
  );
};

HeaderWithHR.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithHR;
