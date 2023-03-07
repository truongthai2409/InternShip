import React from 'react';
// import PropTypes from "prop-types";
import DetailCard from '../../../components/Card/DetailCard';
import CardVisit from '../../../components/Card/CardVisit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid } from '@mui/material';
import './styles.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getJobById,
  getJobFilterByUser,
} from '../../../store/slices/main/home/job/jobSlice';
import ArrowButton from 'src/components/shared/ArrowButton';
import { useTranslation } from 'react-i18next';
import { TabTitle } from 'src/utils/GeneralFunctions';


const DetailHome = (props) => {
  const { t } = useTranslation('title')
  TabTitle(`${t("detailJobTL")}`);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { keyword } = useParams();

  const { jobDetailById } = useSelector((state) => state.job);

  useEffect(() => {
    const dataFilter = {
      type: '',
      order: 'oldest',
      position: '',
      name: '',
      province: '',
      major: '',
      no: 0,
      limit: 5,
    };
    dispatch(getJobFilterByUser(dataFilter));
    dispatch(getJobById(keyword));
  }, [dispatch, keyword]);
  const handleBackClick = () => {
    navigate(-1, { replace: true });
  };
  return (
    <div>
      <Grid
        className='wrapper'
        container
        spacing={4}
        sx={{
          padding: 0,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <Grid item md={8} sm={12} xs={12}>
          <div className=''>
            <DetailCard
              logo='https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png'
              jobDetailById={jobDetailById}
            />
            <div className=' hide-on-table' style={{ padding: '0px 0 12px 0' }}>
              <div className='' onClick={handleBackClick}>
                <ArrowButton direction='left' text='Trở lại' />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <CardVisit
            logo='https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png'
            jobDetailById={jobDetailById}
          />
        </Grid>
        <div className='config__arow-back hide-on-desktop '>
          <Link to='/' className='config__arow-back'>
            <ArrowBackIcon></ArrowBackIcon>
            Trở lại
          </Link>
        </div>
      </Grid>
    </div>
  );
};

DetailHome.propTypes = {};

export default DetailHome;
