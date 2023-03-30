import React, { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import { Modal } from '@mui/material';
import { Document, Page } from 'react-pdf';
import iconCV from 'src/assets/img/view-file.svg';
import Grid from '@mui/material/Grid';

import './styles.scss';
import { useSelector } from 'react-redux';

const DetailInfoCandidate = (props) => {
  const title = [
    'Email',
    'Số điện thoại',
    'Ngày sinh',
    'Giới tính',
    'Địa chỉ',
    'Trường học',
  ];
  const icon = [
    <EmailIcon />,
    <PermPhoneMsgIcon />,
    <CalendarMonthIcon />,
    <PeopleAltIcon />,
    <HomeIcon />,
    <SchoolIcon />,
  ];
  const name = [
    'nguyenhoa123@gmail.com',
    '0982151558',
    '20/10/2000',
    'Nữ',
    '200 ABC, đường G, chung cư Bình Khánh, phường Bình Khánh, quận 4, TP.HCM',
    'Đại học Tôn Đức Thắng',
  ];
  const myArray = Array.from({ length: 6 }, (_, i) => i + 1);
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [numberCV, setNumberCV] = useState([]);
  const viewProfileCV = (info) => {
    setOpen(!open);
    setNumberCV(info.cv);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const renderCV = () => {
    return (
      <Modal
        iconClose={true}
        modalTitle={'View CV'}
        open={open}
        setOpen={setOpen}
        children={
          <div>
            <Document
              file={numberCV}
              onLoadSuccess={onDocumentLoadSuccess}
              wrap={false}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  wrap={false}
                />
              ))}
            </Document>
          </div>
        }
      />
    );
  };
  return (
    <div className='detailInfoCandidate'>
      <div className='detailInfoCandidate__left'>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>Công việc mong muốn</h2>
          </Grid>
          <Grid item xs={9}>
            <p className='detailInfoCandidate__left__info__item'>
              Thực tập sinh Business Analyst, thực tập sinh Tester
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>Vị trí làm việc</h2>
          </Grid>
          <Grid item xs={9}>
            <p className='detailInfoCandidate__left__info__item'>
              Business Analyst/ Tester
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>Chuyên ngành</h2>
          </Grid>
          <Grid item xs={9}>
            <p className='detailInfoCandidate__left__info__item'>
              Khoa học máy tính/ Trí tuệ nhân tạo
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>Hình thức làm việc</h2>
          </Grid>
          <Grid item xs={9}>
            <p className='detailInfoCandidate__left__info__item'>
              Part time/ Full time/ Remote
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>Địa điểm làm việc</h2>
          </Grid>
          <Grid item xs={9}>
            <p className='detailInfoCandidate__left__info__item'>TP.HCM</p>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>CV đính kèm</h2>
          </Grid>
          <Grid item xs={9}>
            <p
              className='view-CV  detailInfoCandidate__left__info__item'
              onClick={() => viewProfileCV(user)}
            >
              <img src={iconCV} alt='xem CV' />
              <span>Xem CV</span>
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='detailInfoCandidate__left__info'>
          <Grid item xs={3}>
            <h2>Thư xin việc</h2>
          </Grid>
          <Grid item xs={9}>
            <p className='detailInfoCandidate__left__info__item'>
              Dear employer,
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              porttitor dolor sit amet urna euismod bibendum. Aliquam elit enim,
              congue quis massa nec, tempus rhoncus massa. Vivamus pulvinar, est
              in rutrum varius, quam urna mollis dolor, vitae gravida neque
              lacus sed ligula. Integer pretium lobortis lacus at dictum.
              <br />
              Fusce nec mauris felis. Integer a placerat purus. Curabitur sem
              dolor, fermentum non hendrerit et, facilisis auctor est. Etiam
              pharetra diam a tortor scelerisque rutrum.
              <br /> Vivamus pulvinar, est in rutrum varius, quam urna mollis
              dolor, vitae gravida neque lacus sed ligula. Integer pretium
              lobortis lacus at dictum. Fusce nec mauris felis. Integer a
              placerat purus. Curabitur sem dolor, fermentum non hendrerit et,
              facilisis auctor est. Etiam pharetra diam a tortor scelerisque
              rutrum. Scelerisque rutrum,
              <br />
              Hoa Nguyen.
            </p>
          </Grid>
        </Grid>
      </div>
      <div className='detailInfoCandidate__right'>
        {myArray.map((item, index) => {
          return (
            <div className='detailInfoCandidate__right__item'>
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

export default DetailInfoCandidate;
