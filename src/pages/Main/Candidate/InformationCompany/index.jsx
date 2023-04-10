import React, { useEffect } from 'react';
import BaseInformationCompany from 'src/components/BaseInformationCompany';
import { useSelector, useDispatch } from 'react-redux';
import {
  getJobById,
  getJobList,
} from 'src/store/slices/main/home/job/jobSlice';
import { getJobByCompanyThunk } from 'src/store/action/company/companyAction';
import './styles.scss';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { getAppreciateByCompany } from 'src/store/slices/main/candidate/appreciate/appreciateSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CandidateInformationCompany = () => {
  const { t } = useTranslation('title');
  TabTitle(t('companyInformationTL'));
  const location = useLocation();
  const idCompany = parseInt(
    location.pathname.replace('/information_company/', '')
  );
  const { appreciateList, appreciateListHasvePage } = useSelector(
    (state) => state.appreciate
  );
  const { jobDetailById, jobListCompany } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getJobById(keyword));
    dispatch(getJobByCompanyThunk(idCompany));
  }, [dispatch, idCompany, keyword]);
  useEffect(() => {
    const values = {
      idCompany: idCompany,
      no: 0,
      limit: 10,
    };
    dispatch(getAppreciateByCompany(values));
  }, [dispatch, idCompany]);

  useEffect(() => {
    dispatch(getJobList([1, 10]));
  }, [keyword, dispatch]);
  const handleChange = (value) => {
    const values = {
      idCompany: idCompany,
      no: 0,
      limit: 10,
    };
    dispatch(getAppreciateByCompany(values));
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <div className='information-company__container'>
      <BaseInformationCompany
        jobDetail={jobDetailById}
        information
        pl={0}
        pr={0}
        ml={0}
        pdLeft='130px'
        pdRight='130px'
        pdTop='3x'
        pdBottom='3px'
        idCompany={idCompany}
        appreciateList={appreciateList}
        jobListCompany={jobListCompany}
        appreciateListHasvePage={appreciateListHasvePage}
        onChange={handleChange}
      />
    </div>
  );
};

export default CandidateInformationCompany;
