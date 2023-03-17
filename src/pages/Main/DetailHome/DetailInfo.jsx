import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from 'src/components/shared/Button';
import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { dateTimeHelper } from 'src/helpers/dateTimeHelpers';
import { salaryHelpers } from 'src/helpers/salaryHelpers';

const DetailInfo = (props) => {
  const title = [
    'Vị trí làm việc',
    'Hình thức làm việc',
    'Số lượng cần tuyển',
    'Trợ cấp',
    'Ngày đăng tuyển',
    'Hạn nộp hồ sơ',
  ];
  const icon = [
    <PictureInPictureAltOutlinedIcon />,
    <BusinessCenterIcon />,
    <PersonIcon />,
    <PaidIcon />,
    <CalendarMonthIcon />,
    <ScheduleIcon />,
  ];
  const name = [
    props.detail.jobPosition,
    props.detail.jobType,
    props.detail.amount,
    salaryHelpers.changeSalary(props.detail.salaryMin) +
      'VND' +
      ' - ' +
      salaryHelpers.changeSalary(props.detail.salaryMax) +
      'VND',
    dateTimeHelper.changeDateLocale(props.detail.createdDate),
    dateTimeHelper.changeDateLocale(props.detail.endTime),
  ];
  const myArray = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <div className='detailInfoHome'>
      <div className='detailInfoHome__left'>
        <div className='detailInfoHome__left__info'>
          <h2>Mô tả công việc</h2>
          <ul>
            {props.detail.description.split('\n').map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Yêu cầu công việc</h2>
          <ul>
            {props.detail.requirement.split('\n').map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Chế độ phúc lợi</h2>
          <ul>
            {props.detail.otherInfo.split('\n').map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
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
        <div className='detailInfoHome__left__info'>
          <h2>Cách thức ứng tuyển</h2>
          <p>
            Ứng viên nộp hồ sơ trực tuyến bằng cách bấm nút{' '}
            <span>ỨNG TUYỂN NGAY</span> dưới đây
          </p>
          <div className='detailInfoHome__left__info__btn'>
            <Button
              name={'ỨNG TUYỂN NGAY'}
              bwidth='211px'
              bheight='46px'
              padding='0px 0px'
              bg='#00B074'
              fz='17px'
              onClick={(e) => props.onHandleApply(e)}
            ></Button>
            <Button
              name={props.isSave ? `ĐÃ LƯU` : 'LƯU TIN'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='white'
              color={props.isSave ? '#00B074' : '#7D7D7D'}
              fz='17px'
              onClick={(e) => props.onHandle(e)}
            ></Button>
          </div>
          <p className='deadline'>
            Hạn nộp hồ sơ:{' '}
            {dateTimeHelper.changeDateLocale(props.detail.endTime)}
          </p>
        </div>
      </div>
      <div className='detailInfoHome__right'>
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

export default DetailInfo;
