import React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Action = () => {
  return (
    <div className='action'>
      <div className='action__icon'>
        <CreateIcon /> Chỉnh sửa
      </div>
      <div className='action__icon'>
        <HighlightOffIcon /> Đóng tin
      </div>
      <div className='action__icon'>
        <ContentCopyIcon /> Nhân bản
      </div>
      <div className='action__icon'>
        <DeleteOutlineIcon /> Xoá tin
      </div>
    </div>
  );
};

export default Action;
