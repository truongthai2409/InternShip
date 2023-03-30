import React, { useEffect, useState } from 'react';
import './styles.scss';
import ListCollapse from '../../shared/ListCollapse';

import { useDispatch, useSelector } from 'react-redux';
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import { getJobPositionList } from '../../../store/slices/main/home/job/jobSlice';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const listWorkingFormat = [
  { name: 'Full time', id: 1 },
  { name: 'Part time', id: 2 },
  { name: 'Remote', id: 3 },
];

const SideBarHomeList = ({ onChange, slideBarHome__wrapper = false }) => {
  const { t } = useTranslation('navbar');
  const { role } = useSelector((state) => state.profile);
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  const [checkedType, setCheckedType] = useState([]);

  useEffect(() => {
    dispatch(getJobPositionList());
  }, []);

  const handleCheckType = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
  };

  const handleCheckPosition = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
  };

  const handleCheckMajor = (valueName, valueCheck) => {
    var updatedList = [...checkedType];
    if (valueCheck) {
      updatedList = [...checkedType, valueName];
    } else {
      updatedList.splice(checkedType.indexOf(valueName), 1);
    }
    setCheckedType(updatedList);
    onChange && onChange(updatedList);
  };
  return (
    <div className={slideBarHome__wrapper ? `slideBarHome__wrapper` : ''}>
      <ListCollapse
        title={t('jobPositionTL')}
        list={jobPosition}
        spacing={3}
        name='POSITIONJOBS'
        onChange={handleCheckPosition}
        checkedType={checkedType}
      />
      <ListCollapse
        title={t('majorTL')}
        list={majorList}
        spacing={3}
        name='MAJORJOBS'
        onChange={handleCheckMajor}
        checkedType={checkedType}
      />
      {role == 'Role_HR' && (path == '/hr' || path == '/hr/finduser') ? (
        <></>
      ) : (
        <ListCollapse
          title={t('workTL')}
          list={listWorkingFormat}
          spacing={3}
          onChange={handleCheckType}
          checkedType={checkedType}
        />
      )}
    </div>
  );
};

export default SideBarHomeList;
