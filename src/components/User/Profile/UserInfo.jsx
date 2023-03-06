import { Typography } from '@mui/material';
import React from 'react';

const UserInfo = (props) => {
  return (
    <div className='profile_content'>
      <div className='profile_content-title'>
        <span style={{ color: '#04BF8A' }}>{props.icon}</span>
        <Typography variant='subtitle2'>{props.name}</Typography>
      </div>
      <Typography variant='caption2'>{props.profile}</Typography>
    </div>
  );
};
export default UserInfo;
