import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
const OverallCompany = (props) => {
  const title = ['Website', 'Email', 'Quy mô'];
  const icon = [<LanguageIcon />, <EmailIcon />, <GroupIcon />];
  const name = [
    props.company.hrDTO.companyDTO.website,
    props.company.hrDTO.companyDTO.email,
  ];
  const myArray = Array.from({ length: 3 }, (_, i) => i + 1);
  return (
    <div className='detailInfoHome'>
      <div className='detailInfoHome__left'>
        <div className='detailInfoHome__left__info'>
          <h2>Giới thiệu về {props?.detail?.companyDTO?.name}</h2>
          {props.company?.description.split('\n').map((item) => {
            return <p>{item}</p>;
          })}
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Địa điểm làm việc</h2>
          <p className='location'>
            <LocationOnIcon />
            <p>
              {props?.company?.locationDTO?.address},{' '}
              {props?.company?.locationDTO?.districtDTO?.name},{' '}
              {props?.company?.locationDTO?.districtDTO?.provinceDTO?.name}
            </p>
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
        {myArray.map((item, index) => {
          return (
            <div className='detailInfoHome__right__item'>
              {icon[index]}
              <div>
                <p>{title[index]}</p>
                <p>{name[index]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverallCompany;
