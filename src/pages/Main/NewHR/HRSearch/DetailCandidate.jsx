import { Box } from '@mui/material';
import React, { useState } from 'react';
import SearchResultHome from 'src/components/Home/SearchResultHome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from 'src/components/shared/Button';
import avtCandidate from 'src/assets/img/candidate.png';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import './styles.scss';
import DetailInfoCandidate from './Detail';

const DetailCandidate = () => {
  const [isSave, setIsSave] = useState(false);

  const handlePost = (e) => {};

  return (
    <div className='detailJob'>
      <SearchResultHome />
      <div className='wrapperDetail'>
        <div className='wrapperDetail__title'>
          <div className='wrapperDetail__title__left'>
            <div className='up'>
              <img src={avtCandidate} alt='' />
              <div className='info'>
                <h2>{'Hoa Nguyễn'}</h2>
                <p className='name'>
                  {'Thực tập sinh Business Analyst, thực tập sinh Tester'}
                </p>
                <div className='time'>
                  <AccessTimeIcon sx={{ color: '#00b074' }} />
                  <p>{'Cập nhật hồ sơ: 02/03/2023'}</p>
                </div>
              </div>
            </div>
            <div className='down'>
              <p>{'Business Analyst'}</p>
              <p>{'Tester'}</p>
              <p>{'Remote'}</p>
              <p>{'Full time'}</p>
              <p>{'Khoa học máy tính'}</p>
              <p>{'Trí tuệ nhân tạo'}</p>
            </div>
          </div>
          <div className='wrapperDetail__title__right'>
            <Button
              name={isSave ? `ĐÃ LƯU` : 'LƯU HỒ SƠ'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='white'
              color={isSave ? '#00B074' : '#7D7D7D'}
              IconBtnMui={isSave ? BookmarkIcon : BookmarkBorderIcon}
              fz='17px'
              onClick={(e) => handlePost(e)}
            ></Button>
          </div>
        </div>
        <div className='wrapperDetail__detail'>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
          </Box>
          <h2 className='wrapperDetail__detail__title'>
            Thông tin việc muốn ứng tuyển
          </h2>
          <DetailInfoCandidate />
        </div>
      </div>
    </div>
  );
};

export default DetailCandidate;
