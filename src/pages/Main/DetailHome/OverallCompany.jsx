import React, { useEffect, useReducer, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import ListCardJobHome from 'src/components/Home/ListCardJobHome';
import { useDispatch, useSelector } from 'react-redux';
import { indexFilterChange } from 'src/store/slices/main/home/filter/filterSlices';
import { getDemandList } from 'src/store/slices/main/home/demand/demandSlice';
import { getRelatedJobByCompanyIdThunk } from 'src/store/action/job/jobAction';
const OverallCompany = (props) => {
  console.log(props);
  const { jobPage } = useSelector((state) => state.filter);
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
  const initialState = {
    type: [],
    position: [],
    major: [],
    no: 0,
    order: 'newest',
    name: '',
    province: '',
  };
  const [state, dispatcher] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const reload = true;
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
  const title = ['Website', 'Email', 'Quy mô'];
  const icon = [<LanguageIcon />, <EmailIcon />, <GroupIcon />];
  const name = [props.company.website, props.company.email];
  const myArray = Array.from({ length: 3 }, (_, i) => i + 1);

  const [jobRelated, setJobRelated] = useState([]);
  useEffect(() => {
    dispatch(getRelatedJobByCompanyIdThunk(props.company.id)).then((res) => {
      setJobRelated(res?.payload);
    });
  }, []);
  return (
    <div>
      <div className='detailInfoHome'>
        <div className='detailInfoHome__left'>
          <div className='detailInfoHome__left__info'>
            <h2>Giới thiệu về {props?.company?.name}</h2>
            {props.company?.description.split('\n').map((item) => {
              return <p>{item}</p>;
            })}
          </div>
          <div className='detailInfoHome__left__info'>
            <h2>Địa điểm làm việc</h2>
            <p className='location'>
              <LocationOnIcon />
              <p>
                {props?.company?.companyLocationDTOs[0].locationDTO?.address},{' '}
                {
                  props?.company?.companyLocationDTOs[0].locationDTO
                    ?.districtDTO?.name
                }
                ,{' '}
                {
                  props?.company?.companyLocationDTOs[0].locationDTO
                    ?.districtDTO?.provinceDTO?.name
                }
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
                  {index == 0 ? (
                    <a href={name[index]} style={{ color: 'black' }}>
                      {name[index]}
                    </a>
                  ) : index == 1 ? (
                    <a
                      href={`mailto:${name[index]}`}
                      style={{ color: 'black' }}
                    >
                      {name[index]}
                    </a>
                  ) : (
                    <p>{name[index]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='detailInfo__listJob'>
        <h2 className='detailInfo__listJob__title'>Việc làm khác đang tuyển</h2>
        <ListCardJobHome
          jobList={jobRelated}
          jobListHavePages={jobPage}
          onChange={getValuePageAndHandle}
          reload={reload}
          viewCV={false}
        />
      </div>
    </div>
  );
};

export default OverallCompany;
