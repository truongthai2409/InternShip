import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import './styles.scss';

const ProfileDetail = () => {
  const { user } = useSelector((state) => state.profile);
  const { t } = useTranslation('userInfo');

  const [showInput, setShowInput] = useState(true);

  const handleEditClick = () => {
    setShowInput(!showInput);
  };
  return (
    <div className='profile-detail__wrapper'>
      <Typography paragraph={true} className='profile-detail__header'>
        {t('changePro')}
        {showInput ? (
          <IconButton onClick={handleEditClick}>
            <EditIcon sx={{ color: '#fff' }} />
          </IconButton>
        ) : (
          ''
        )}
      </Typography>

      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Họ và tên lót</Typography>
          <span>{user?.userDetailsDTO?.lastName}</span>
        </div>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Tên</Typography>
          <Typography>{user?.userDetailsDTO?.firstName}</Typography>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Email</Typography>
          <span>{user?.userDetailsDTO?.email}</span>
        </div>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Ngày sinh</Typography>
          <span>
            {user?.userDetailsDTO?.birthday
              ? user?.userDetailsDTO?.birthday
              : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Số điện thoại</Typography>
          <span>
            {user?.userDetailsDTO?.phone
              ? user?.userDetailsDTO?.phone
              : '(chưa có dữ liệu)'}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Giới tính</Typography>
          <span>
            {user?.userDetailsDTO?.gender
              ? user?.userDetailsDTO?.gender
              : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Tỉnh/ Thành phố</Typography>
          <span>
            {user?.nameProvince ? user?.nameProvince : '(chưa có dữ liệu)'}
          </span>
        </div>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Quận/ Huyện</Typography>
          <span>
            {user?.nameDistrict ? user?.nameDistrict : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Địa chỉ</Typography>
          <span>{user?.address ? user?.address : '(chưa có dữ liệu)'}</span>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Trường học</Typography>
          <span>{user?.school ? user?.school : '(chưa có dữ liệu)'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
