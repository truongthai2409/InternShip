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
import {
  addJobCare,
  deleteJobCare,
  getJobCareByCandidateThunk,
} from 'src/store/slices/main/home/job/jobCandidateSlice';
import { toast } from 'react-toastify';
import NearMeIcon from '@mui/icons-material/NearMe';

const HeaderForm = ({ name }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <NearMeIcon /> Nộp hồ sơ ứng tuyển {name}
    </div>
  );
};

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
  const { jobCare, jobApplyList } = useSelector(
    (state) => state.jobCandidateSlice
  );
  const [isSave, setIsSave] = useState(false);
  // id post saved
  const [idSave, setIdSave] = useState('');

  const [isApply, setIsApply] = useState(false);

  const handleClick = () => {
    if (isApply == false) {
      if (Object.keys(user).length == 0) {
        setOpenNotify(true);
      } else {
        setOpen(true);
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    jobCare.map((item) => {
      if (item?.jobDTO?.id == id) {
        setIdSave(item.id);
        setIsSave(true);
      }
    });
    jobApplyList.map((item) => {
      if (item?.jobDTO?.id == id) {
        setIsApply(true);
      }
    });
    dispatch(getDetailJobByIdThunk(id)).then((res) => {
      setDetailJob(res?.payload);
      dispatch(getDetailCompanyByidThunk(res?.payload?.companyId)).then(
        (data) => {
          setDetailCompany(data?.payload);
        }
      );
    });
  }, [jobCare, id]);

  const handlePost = (e) => {
    if (Object.keys(user).length == 0) {
      setOpenNotify(true);
    } else {
      e.preventDefault();
      const userStorage =
        JSON.parse(sessionStorage.getItem('userPresent')) ||
        JSON.parse(localStorage.getItem('userPresent'));
      if (isSave == false) {
        const page = {
          user: user,
          token: userStorage?.token,
          page: {
            no: 0,
            limit: 5,
          },
        };

        const dataCareList = {
          candidateDTO: {
            id: user?.id,
          },
          jobDTO: {
            id: id,
          },
        };

        dispatch(addJobCare([dataCareList, userStorage?.token])).then((res) => {
          setIsSave(true);
          dispatch(getJobCareByCandidateThunk(page));
        });

        toast.success('Đã lưu việc làm thành công', {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        });
      } else {
        if (user?.roleDTO?.name === 'Role_Candidate') {
          const delJobCare = {
            id: idSave,
            token: userStorage?.token,
          };
          dispatch(deleteJobCare([delJobCare])).then(() => {
            const dispatchJobCare = {
              user: user,
              token: userStorage?.token,
              page: {
                no: 0,
                limit: 1000,
              },
            };
            const page = {
              user: user,
              token: userStorage?.token,
              page: {
                no: 0,
                limit: 5,
              },
            };
            setIsSave(false);
            toast.success('Đã hủy lưu việc làm ', {
              position: 'top-right',
              autoClose: 3000,
              style: { color: '#00B074', backgroundColor: '#DEF2ED' },
            });
            user?.roleDTO?.name === 'Role_Candidate' &&
              dispatch(getJobCareByCandidateThunk(page));
          });
        }
      }
    }
  };

  return (
    <div className='detailJob'>
      {/* <SearchResultHome /> */}
      {detailJob == '' || detailCompany == '' ? (
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
                    <p className='name'>{detailCompany?.name}</p>
                    <div className='city'>
                      <LocationOnIcon sx={{ color: '#00b074' }} />
                      <p>
                        {detailJob?.locationDTO?.districtDTO?.provinceDTO?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='down'>
                  <p>{detailJob?.jobPositionDTO?.name}</p>
                  <p>{detailJob?.jobTypeDTO?.name}</p>
                  <p>{detailJob?.majorDTO?.name}</p>
                </div>
              </div>
              <div className='wrapperDetail__title__right'>
                <Button
                  name={isApply ? 'ĐÃ ỨNG TUYỂN' : 'ỨNG TUYỂN NGAY'}
                  bwidth='211px'
                  bheight='46px'
                  padding='0px 0px'
                  bg={isApply ? '#B0B0B0' : '#00B074'}
                  fz='17px'
                  borderColor={isApply ? '#B0B0B0' : null}
                  onClick={() => handleClick()}
                ></Button>
                <Button
                  name={isSave ? `ĐÃ LƯU` : 'LƯU TIN'}
                  bwidth='211px'
                  bheight='46px'
                  padding='12px 32px'
                  bg='white'
                  color={isSave ? '#00B074' : '#7D7D7D'}
                  fz='17px'
                  onClick={(e) => handlePost(e)}
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
                <TabPanel value={value} index={0} sx={{ padding: '0px 24px' }}>
                  <DetailInfo
                    detail={detailJob}
                    company={detailCompany}
                    isSave={isSave}
                    isApply={isApply}
                    onHandle={(e) => handlePost(e)}
                    onHandleApply={(e) => handleClick(e)}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <OverallCompany detail={detailJob} company={detailCompany} />
                </TabPanel>
              </Box>
            </div>
          </div>
        </>
      )}

      <Modal
        iconClose={true}
        modalTitle={<HeaderForm name={detailJob?.name} />}
        open={open}
        setOpen={setOpen}
        children={
          <FormModal setOpen={setOpen} jobId={id} setIsApply={setIsApply} />
        }
      />

      <Modal
        iconClose={true}
        modalTitle={`Nộp hồ sơ ứng tuyển ${detailJob?.name}`}
        open={openNotify}
        setOpen={setOpenNotify}
        children={<ModalNotify />}
      />
    </div>
  );
};

export default DetailHome;
