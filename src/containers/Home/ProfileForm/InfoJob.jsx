import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import './styles.scss';

const InfoJob = (props) => {
  const { user } = useSelector((state) => state.profile);
  const { t } = useTranslation('userInfo');

  // const [showInput, setShowInput] = useState(true);

  const handleEditClick = () => {
    props.setShowInput(true);
  };
  return (
    <div className='profile-detail__wrapper'>
      <Typography paragraph={true} className='profile-detail__header'>
        {t('jobInformation')}
        <IconButton onClick={handleEditClick}>
          <EditIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Typography>

      <div className='profile-detail job-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Công việc mong muốn</Typography>
          <span>
            {user?.jobCareDTOs ? user?.jobCareDTOs : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
      <div className='profile-detail job-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Vị trí làm việc</Typography>
          <span>{user?.position ? user?.position : '(chưa có dữ liệu)'}</span>
        </div>
      </div>
      <div className='profile-detail job-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Chuyên ngành</Typography>
          <span>{user?.majorDTO ? user?.majorDTO : '(chưa có dữ liệu)'}</span>
        </div>
      </div>
      <div className='profile-detail job-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Hình thức làm việc</Typography>
          <span>{user?.type ? user?.type : '(chưa có dữ liệu)'}</span>
        </div>
      </div>
      <div className='profile-detail job-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>CV đính kèm</Typography>
          <span>{user?.cv ? user?.cv : '(chưa có dữ liệu)'}</span>
        </div>
      </div>
      <div className='profile-detail job-detail'>
        <div className='profile-detail-item'>
          <Typography variant='subtitle1'>Thư xin việc</Typography>
          <span>
            {user?.coverLetter ? user?.coverLetter : '(chưa có dữ liệu)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoJob;
