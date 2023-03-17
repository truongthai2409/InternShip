import React, { useReducer } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import CardHome from 'src/components/Card/CardHome';
import moment from 'moment';
import ListCardJobHome from 'src/components/Home/ListCardJobHome';
import { useDispatch, useSelector } from 'react-redux';
import { indexFilterChange } from 'src/store/slices/main/home/filter/filterSlices';
import { getDemandList } from 'src/store/slices/main/home/demand/demandSlice';
const OverallCompany = (props) => {
  const { index, id, jobPage, jobFilter } = useSelector(
    (state) => state.filter
  );
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
  const name = [
    props.company.hrDTO.companyDTO.website,
    props.company.hrDTO.companyDTO.email,
  ];
  const myArray = Array.from({ length: 3 }, (_, i) => i + 1);
  return (
    <div>
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

      <div className='detailInfo__listJob'>
        <h2 className='detailInfo__listJob__title'>Việc làm khác đang tuyển</h2>
        <ListCardJobHome
          jobList={props.listJobOfCompany}
          // indexCardActive={index}
          jobListHavePages={jobPage}
          onChange={getValuePageAndHandle}
          reload={reload}
          viewCV = {false}
        />
      </div>
    </div>
  );
};

export default OverallCompany;
