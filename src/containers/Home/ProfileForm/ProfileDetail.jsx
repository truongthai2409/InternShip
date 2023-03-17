import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { genderList } from './validateForm';
import './styles.scss';

const ProfileDetail = (props) => {
  const { others } = useSelector((state) => state.profile);
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

      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Họ và tên lót
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetails?.lastName}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Tên
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetails?.firstName}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Email
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetails?.email}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Ngày sinh
          </Typography>
          <span className={'profile-detail-value'}>
            {others?.userDetails?.birthday
              ? others?.userDetails?.birthday
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
            {others?.userDetails?.phone
              ? others?.userDetails?.phone
              : '(chưa có dữ liệu)'}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Giới tính
          </Typography>
          <span className={'profile-detail-value'}>
            {genderList.map((value) => {
              if (value.id === others?.userDetails?.gender) {
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
            {others?.location?.districtDTO?.provinceDTO?.name
              ? others?.location?.districtDTO?.provinceDTO?.name
              : '(chưa có dữ liệu)'}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography className='profile-detail-label' variant='subtitle1'>
            Quận/ Huyện
          </Typography>
          <span className='profile-detail-value'>
            {others?.location?.districtDTO?.name
              ? others?.location?.districtDTO?.name
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
            {others?.location?.address
              ? others?.location?.address
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
