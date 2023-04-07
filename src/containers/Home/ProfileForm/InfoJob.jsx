import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'src/components/shared/Modal';
import { Document, Page, pdfjs } from 'react-pdf';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Grid from '@mui/material/Grid';
import './styles.scss';

const InfoJob = (props) => {
  const { user, others } = useSelector((state) => state.profile);
  const { t } = useTranslation('userInfo');
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

      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            Công việc mong muốn
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span className='job-detail-value'>
            {others?.desiredJob ? others?.desiredJob : '(chưa có dữ liệu)'}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            Vị trí làm việc
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span className='job-detail-value'>
            {others &&
              others?.jobPositionDTOs?.map((position, index) => {
                return (
                  <span>
                    {position.name ? position.name : '(chưa có dữ liệu)'}
                    {index !== others.jobPositionDTOs.length - 1 && '/ '}
                  </span>
                );
              })}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            Chuyên ngành
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span className='job-detail-value'>
            {others &&
              others?.majorDTOs?.map((major, index) => {
                return (
                  <span className='job-detail-value'>
                    {major.name ? major.name : '(chưa có dữ liệu)'}
                    {index !== others.majorDTOs.length - 1 && '/ '}
                  </span>
                );
              })}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            Hình thức làm việc
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span className='job-detail-value'>
            {others &&
              others?.jobTypeDTOs?.map((type, index) => {
                return (
                  <span key={type.id} className='job-detail-value'>
                    {type.name ? type.name : '(chưa có dữ liệu)'}
                    {index !== others.jobTypeDTOs.length - 1 && '/ '}
                  </span>
                );
              })}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            Địa điểm làm việc
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span className='job-detail-value'>
            {others?.workProvinceDTO?.name
              ? others?.workProvinceDTO?.name
              : '(chưa có dữ liệu)'}
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            CV đính kèm
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span
            className='job-detail-value'
            onClick={() => viewProfileCV(others)}
            style={{
              cursor: 'pointer',
              color: others?.originalNameCV ? '#00B074' : '',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AttachFileIcon sx={{ fontSize: 16 }} />
            {others?.originalNameCV
              ? others?.originalNameCV
              : '(chưa có dữ liệu)'}{' '}
            &#160;
            <span
              style={{
                color: '#7d7d7d',
                fontSize: 12,
              }}
            >
              (Click để xem)
            </span>
          </span>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={'job-detail-item '}>
        <Grid item xs={3}>
          <Typography className='job-detail-label' variant='subtitle1'>
            Thư xin việc
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <span className='job-detail-value'>
            {others?.letter ? others?.letter : '(chưa có dữ liệu)'}
          </span>
        </Grid>
      </Grid>
      {renderCV()}
    </div>
  );
};

export default InfoJob;
