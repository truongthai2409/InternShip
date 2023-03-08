import React from 'react';
import SearchResultHome from 'src/components/Home/SearchResultHome';
import './styles.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from 'src/components/shared/Button';

const DetailHome = () => {
  return (
    <div className='detailJob'>
      <SearchResultHome />
      <div className='wrapper'>
        <div className='wrapper__title'>
          <div className='wrapper__title__left'>
            <div className='up'>
              <img
                src='https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
                alt=''
              />
              <div className='info'>
                <h2>Thực tập Reactjs</h2>
                <p className='name'>Công ty R2S</p>
                <div className='city'>
                  <LocationOnIcon sx={{ color: '#00b074' }} />
                  <p>Hồ Chí Minh</p>
                </div>
              </div>
            </div>
            <div className='down'>
              <p>Front end</p>
              <p>Full time</p>
              <p>Part time</p>
              <p>Khoa học máy tính</p>
            </div>
          </div>
          <div className='wrapper__title__right'>
            <Button
              name={'Ứng tuyển ngay'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='#00B074'
            ></Button>
            <Button
              name={'Lưu tin'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='white'
              color= '#7D7D7D'
            ></Button>
          </div>
        </div>
        <div className='wrapper__detail'></div>
      </div>
    </div>
  );
};

export default DetailHome;
