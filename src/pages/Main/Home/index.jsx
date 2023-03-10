import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid, Hidden } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TemporaryDrawer from 'src/components/shared/Drawer';
import {
  changeFilterChange,
  majorFilterChange,
  nameFilterChange,
} from 'src/store/slices/main/candidate/user/userCandidateSlice';
import { getDemandList } from 'src/store/slices/main/home/demand/demandSlice';
import {
  indexFilterChange,
  jobFilters,
  pageFilterChange,
} from 'src/store/slices/main/home/filter/filterSlices';
import DetailCard from '../../../components/Card/DetailCard';
import ListCardJobHome from '../../../components/Home/ListCardJobHome';
import SearchResultHome from '../../../components/Home/SearchResultHome';
import SideBarHomeList from '../../../components/Home/SideBarHomeList';
import { getJobPositionList } from '../../../store/slices/main/home/job/jobSlice';
import { getJobByCompanyThunk } from 'src/store/action/company/companyAction';
import './styles.scss';
const initialState = {
  type: [],
  position: [],
  major: [],
  no: 0,
  order: 'newest',
  name: '',
  province: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'no':
      return { ...state, no: action.payload };
    case 'province':
      return { ...state, province: action.payload };
    case 'type':
      if (action.payload.length === 0) {
        return { ...state, type: '' };
      }
      return { ...state, type: action.payload };
    case 'position':
      if (action.payload.length === 0) {
        return { ...state, position: '' };
      }
      return { ...state, position: action.payload };
    case 'major':
      if (action.payload.length === 0) {
        return { ...state, major: '' };
      }
      return { ...state, major: action.payload };
    case 'reset': {
      return {
        ...state,
        type: [],
        position: [],
        major: [],
        no: 0,
        order: 'oldest',
        name: '',
        province: '',
      };
    }
    default:
      return { ...state };
  }
}
const image_notFound = require('src/assets/img/notfound.png');

const Home = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.profile);
  const { index, id, jobPage, jobFilter } = useSelector(
    (state) => state.filter
  );
  const { jobPosition, jobListCompany } = useSelector((state) => state.job);

  const [state, dispatcher] = useReducer(reducer, initialState);
  const listPositionWorkingFormat = jobPosition?.map((item) => {
    return item;
  });
  const { majorList } = useSelector((state) => state.major);
  const [valueLocation, setValueLocation] = useState('');
  const [jobs, setJob] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const listWorkingFormat = [
    { name: 'Fulltime', id: 1 },
    { name: 'Parttime', id: 2 },
    { name: 'Remote', id: 3 },
  ];

  const handleSearch = (value) => {
    dispatch(nameFilterChange(value));
    dispatch(indexFilterChange(0));
    dispatcher({ type: 'name', payload: value });
    dispatcher({ type: 'no', payload: 0 });
    dispatcher({ type: 'province', payload: valueLocation });
    dispatch(changeFilterChange(false));
    dispatch(pageFilterChange(1));
  };
  const getValueLocationAndHandle = (value) => {
    dispatch(majorFilterChange(value));
    setValueLocation(value);
  };
  const getValuePageAndHandle = (value) => {
    const userPartner =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    if (userPartner && userPartner.role === 'Role_HR') {
      dispatch(indexFilterChange(0));
      window.scroll(0, 0);
      return dispatch(getDemandList({ currentPage: value, limit: 5 }));
    }
    dispatcher({ type: 'no', payload: value - 1 });
    dispatch(indexFilterChange(0));
  };
  const handleCheck = (value) => {
    dispatch(indexFilterChange(0));
    dispatch(changeFilterChange(false));
    let tempType = [];
    let tempPosition = [];
    let tempMajor = [];
    tempType = value.filter((sp) =>
      listWorkingFormat
        .map((items) => {
          return items.name;
        })
        .includes(sp)
    );
    if (role == 'Role_HR') {
      value.map((item) => {
        listPositionWorkingFormat.map((item_list) => {
          if (item == item_list.name) {
            tempPosition.push(item_list.id);
          }
        });
      });

      value.map((item) => {
        majorList.map((item_list) => {
          if (item == item_list.name) {
            tempMajor.push(item_list.id);
          }
        });
      });
    } else {
      value.map((item) => {
        listPositionWorkingFormat.map((item_list) => {
          if (item == item_list.name) {
            tempPosition.push(item_list.name);
          }
        });
      });

      value.map((item) => {
        majorList.map((item_list) => {
          if (item == item_list.name) {
            tempMajor.push(item_list.name);
          }
        });
      });
    }
    dispatcher({ type: 'type', payload: tempType });
    dispatcher({ type: 'position', payload: tempPosition });
    dispatcher({ type: 'major', payload: tempMajor });
    dispatcher({ type: 'no', payload: 0 });
    dispatch(pageFilterChange(1));
  };

  useEffect(() => {
    const dataFilter = [
      {
        type: state.type + '',
        order: state.order,
        position: state.position + '',
        name: state.name,
        province: state.province,
        major: state.major + '',
        no: state.no,
        limit: 5,
      },
      { link: props.linkFilter },
    ];
    dispatch(jobFilters(dataFilter));
  }, [state, dispatch, props.linkFilter]);
  useEffect(() => {
    setJob(jobFilter);
    jobFilter && setJobDetail(jobFilter[index]);
  }, [jobFilter, dispatch, index]);

  useEffect(() => {
    dispatch(getJobByCompanyThunk(id));
    dispatch(getJobPositionList());
  }, [dispatch, id]);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.userCandidate) {
      navigate('finduser');
    }
  }, [dispatch, navigate, props.userCandidate]);

  return (
    <Grid
      className='wrapper'
      sx={{ padding: '0rem 0rem 0rem 0rem', position: 'relative' }}
      spacing={{ xs: 3 }}
      container
    >
      <Hidden lgDown>
        <Grid item xs={4} sm={2} md={3} lg={3} xl={3}>
          <SideBarHomeList
            onChange={handleCheck}
            slideBarHome__wrapper={true}
          />
        </Grid>
      </Hidden>
      {role === 'Role_HR' ? (
        <>
          {jobs[0]?.universityDTO ? (
            <>
              {jobs?.length === 0 ? (
                <Grid item xs={9}>
                  <Grid container spacing={{ xs: 1 }}>
                    <Grid item xs={12}>
                      <div className='none__res'>
                        <SearchResultHome
                          onClick={handleSearch}
                          onChange={getValueLocationAndHandle}
                          candidate_home_width='960px'
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} style={{ textAlignLast: 'center' }}>
                      <div>
                        <img
                          src={image_notFound}
                          alt='notfound'
                          width={'25%'}
                        />
                        <p>
                          Rất tiếc, hiện tại không có công việc phù hợp được tìm
                          thấy
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <div className='none__res'>
                        <SearchResultHome
                          onClick={handleSearch}
                          onChange={getValueLocationAndHandle}
                          candidate_home_width='960px'
                        />
                      </div>
                    </Grid>

                    <div className='home__container'>
                      <div className='home__containerCard'>
                        <ListCardJobHome
                          jobList={jobs}
                          // indexCardActive={index}
                          jobListHavePages={jobPage}
                          onChange={getValuePageAndHandle}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Hidden lgUp>
                    <div className='HomePageMenu'>
                      <TemporaryDrawer
                        children={
                          <SideBarHomeList
                            onChange={handleCheck}
                            slideBarHome__wrapper={true}
                          />
                        }
                        position='left'
                        name={<AddCircleIcon />}
                      />
                    </div>
                  </Hidden>
                </Grid>
              )}
            </>
          ) : (
            <>
              <Grid item xs={9}>
                <Grid container spacing={{ xs: 1 }}>
                  <Grid item xs={12}>
                    <div className='none__res'>
                      <SearchResultHome
                        onClick={handleSearch}
                        onChange={getValueLocationAndHandle}
                        candidate_home_width='960px'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{ textAlignLast: 'center' }}>
                    <div>
                      <img src={image_notFound} alt='notfound' width={'25%'} />
                      <p>
                        Rất tiếc, hiện tại không có công việc phù hợp được tìm
                        thấy
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </>
      ) : (
        <>
          {jobs?.length === 0 ? (
            <Grid item xs={9}>
              <Grid container spacing={{ xs: 1 }}>
                <Grid item xs={12}>
                  <div className='none__res'>
                    <SearchResultHome
                      onClick={handleSearch}
                      onChange={getValueLocationAndHandle}
                      candidate_home_width='960px'
                    />
                  </div>
                </Grid>
                <Grid item xs={12} style={{ textAlignLast: 'center' }}>
                  <div>
                    <img src={image_notFound} alt='notfound' width={'25%'} />
                    <p>
                      Rất tiếc, hiện tại không có công việc phù hợp được tìm
                      thấy
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <div className='none__res'>
                    <SearchResultHome
                      onClick={handleSearch}
                      onChange={getValueLocationAndHandle}
                      candidate_home_width='960px'
                    />
                  </div>
                </Grid>

                <div className='home__container'>
                  <div className='home__containerCard'>
                    <ListCardJobHome
                      jobList={jobs}
                      // indexCardActive={index}
                      jobListHavePages={jobPage}
                      onChange={getValuePageAndHandle}
                    />
                  </div>
                </div>
              </Grid>
              <Hidden lgUp>
                <div className='HomePageMenu'>
                  <TemporaryDrawer
                    children={
                      <SideBarHomeList
                        onChange={handleCheck}
                        slideBarHome__wrapper={true}
                      />
                    }
                    position='left'
                    name={<AddCircleIcon />}
                  />
                </div>
              </Hidden>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};

export default Home;
