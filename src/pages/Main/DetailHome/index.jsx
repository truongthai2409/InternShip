import React, { useState } from 'react';
import SearchResultHome from 'src/components/Home/SearchResultHome';
import './styles.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from 'src/components/shared/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DetailInfo from './DetailInfo';
import OverallCompany from './OverallCompany';
import Modal from 'src/components/shared/Modal';
import FormModal from './FormModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const DetailHome = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleClick = () => {
    setOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='detailJob'>
      <SearchResultHome />
      <div className='wrapperDetail'>
        <div className='wrapperDetail__title'>
          <div className='wrapperDetail__title__left'>
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
          <div className='wrapperDetail__title__right'>
            <Button
              name={'Ứng tuyển ngay'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='#00B074'
              fz='17px'
              onClick={() => handleClick()}
            ></Button>
            <Button
              name={'Lưu tin'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='white'
              color='#7D7D7D'
              fz='17px'
            ></Button>
          </div>
        </div>
        <div className='wrapperDetail__detail'>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
              >
                <Tab label='Chi tiết' />
                <Tab label='Tổng quan công ty' />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <DetailInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OverallCompany />
            </TabPanel>
          </Box>
        </div>
      </div>

      <Modal
        iconClose={true}
        modalTitle={'Nộp hồ sơ ứng tuyển Thực tập Reactjs'}
        open={open}
        setOpen={setOpen}
        children={<FormModal />}
      />
    </div>
  );
};

export default DetailHome;
