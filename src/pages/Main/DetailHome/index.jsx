import React, { useEffect, useState } from 'react';
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
import ModalNotify from './ModalNotify';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailJobByIdThunk } from 'src/store/action/job/jobAction';
import { getDetailCompanyByidThunk } from 'src/store/action/company/companyAction';

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
  const id =
    window.location.href.split('/')[window.location.href.split('/').length - 1];
  const [detailCompanyById, setDetailCompanyByid] = useState('');
  const [open, setOpen] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [value, setValue] = useState(0);
  const { user } = useSelector((state) => state.profile);
  const [detailJob, setDetailJob] = useState('');
  const [detailCompany, setDetailCompany] = useState('');
  const handleClick = () => {
    if (Object.keys(user).length == 0) {
      setOpenNotify(true);
    } else {
      setOpen(true);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailJobByIdThunk(id)).then((res) => {
      setDetailJob(res?.payload);
      dispatch(getDetailCompanyByidThunk(res?.payload?.companyDTO?.id)).then(
        (data) => {
          data?.payload.map((item) => {
            if (item.id == id) {
              setDetailCompanyByid(item);
            }
          });
          setDetailCompany(data?.payload);
        }
      );
    });
  }, []);
  return (
    <div className='detailJob'>
      <SearchResultHome />
      {detailJob == '' ? (
        <></>
      ) : (
        <>
          <div className='wrapperDetail'>
            <div className='wrapperDetail__title'>
              <div className='wrapperDetail__title__left'>
                <div className='up'>
                  <img
                    src={
                      detailJob?.companyDTO?.fileLogo
                        ? detailJob?.companyDTO?.fileLogo
                        : 'https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
                    }
                    alt=''
                  />
                  <div className='info'>
                    <h2>{detailJob?.name}</h2>
                    <p className='name'>{detailJob?.companyDTO.name}</p>
                    <div className='city'>
                      <LocationOnIcon sx={{ color: '#00b074' }} />
                      <p>
                        {
                          detailCompany[0]?.locationDTO?.districtDTO
                            ?.provinceDTO?.name
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className='down'>
                  <p>{detailJob?.jobPosition}</p>
                  <p>{detailJob?.jobType}</p>
                  {/* <p>Part time</p> */}
                  <p>{detailJob?.major}</p>
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
                  <DetailInfo detail={detailJob} company={detailCompanyById} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <OverallCompany
                    detail={detailJob}
                    company={detailCompanyById}
                  />
                </TabPanel>
              </Box>
            </div>
          </div>
        </>
      )}

      <Modal
        iconClose={true}
        modalTitle={'Nộp hồ sơ ứng tuyển Thực tập Reactjs'}
        open={open}
        setOpen={setOpen}
        children={<FormModal />}
      />

      <Modal
        iconClose={true}
        modalTitle={'Nộp hồ sơ ứng tuyển Thực tập Reactjs'}
        open={openNotify}
        setOpen={setOpenNotify}
        children={<ModalNotify />}
      />
    </div>
  );
};

export default DetailHome;
