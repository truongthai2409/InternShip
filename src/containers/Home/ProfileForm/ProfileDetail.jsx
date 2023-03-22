import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { genderList } from './validateForm';
import moment from 'moment';
import './styles.scss';

const ProfileDetail = (props) => {
  const { others } = useSelector((state) => state.profile);
  // console.log(
  //   '🚀 ~ file: ProfileDetail.jsx:12 ~ ProfileDetail ~ others:',
  //   moment(others?.userDetailsDTO?.birthday).format('DD/MM/YYYY')
  // );
  const { t } = useTranslation('userInfo');

  const handleEditClick = () => {
    props.setShowForm(true);
  };
  return (
    <div className='profile-detail__wrapper'>
      <Typography paragraph={true} className='profile-detail__header'>
        {t('changePro')}
        <IconButton onClick={handleEditClick}>
          <EditIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Typography>
      <div className='profile-detail__container'></div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Họ và tên lót
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetailsDTO?.lastName}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Tên
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetailsDTO?.firstName}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Email
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetailsDTO?.email}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Ngày sinh
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetailsDTO?.birthday
              ? others?.userDetailsDTO?.birthday
              : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Số điện thoại
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetailsDTO?.phone
              ? others?.userDetailsDTO?.phone
              : '(chưa có dữ liệu)'}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Giới tính
          </Typography>
          <span className={'profile-detail-value'}>
            {genderList.map((value) => {
              if (value.id === others?.userDetailsDTO?.gender) {
                const genderName = value.name;
                return genderName ? genderName : '(chưa có dữ liệu)';
              }
            })}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Tỉnh/ Thành phố
          </Typography>
          <span className='profile-detail-value'>
            {others?.locationDTO?.districtDTO?.provinceDTO?.name
              ? others?.locationDTO?.districtDTO?.provinceDTO?.name
              : '(chưa có dữ liệu)'}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Quận/ Huyện
          </Typography>
          <span className='profile-detail-value'>
            {others?.locationDTO?.districtDTO?.name
              ? others?.locationDTO?.districtDTO?.name
              : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Địa chỉ
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.locationDTO?.address
              ? others?.locationDTO?.address
              : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Trường học
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.school ? others?.school : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileDetail;
