import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';

const OverallCompany = () => {
  return (
    <div className='detailInfoHome'>
      <div className='detailInfoHome__left'>
        <div className='detailInfoHome__left__info'>
          <h2>Giới thiệu về công ty R2S</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            neque aperiam, impedit possimus maxime, tempora rem ducimus earum
            vitae sunt vel necessitatibus molestiae sapiente tenetur
            reprehenderit debitis, ea non qui?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
            magnam velit, numquam repudiandae totam enim cumque quae. Aliquam
            fuga adipisci placeat, nam velit perspiciatis exercitationem
            incidunt voluptate eaque, repellendus iste!
          </p>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Địa điểm làm việc</h2>
          <p className='location'>
            <LocationOnIcon />
            <p>1164 đường Phạm Văn Đồng, P.Linh Đông, TP Thủ Đức, TPHCM</p>
          </p>
        </div>
      </div>
      <div className='detailInfoHome__right'>
        <div className='detailInfoHome__right__img'>
          <img
            src='https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
            alt=''
          />
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallCompany;
