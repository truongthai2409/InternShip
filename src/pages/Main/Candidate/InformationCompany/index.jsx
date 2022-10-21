import React, { useCallback, useEffect } from "react";
import BaseInformationCompany from "src/components/BaseInformationCompany";
import { useSelector, useDispatch } from "react-redux";
import {
  getJobByCompany,
  getJobById,
  getJobList,
} from "src/store/slices/main/home/job/jobSlice";
import "./styles.scss";
import { TabTitle } from "src/utils/GeneralFunctions";
import { getAppreciateByCompany } from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import { useParams } from "react-router-dom";

const CandidateInformationCompany = () => {
  TabTitle("Thông tin Công ty");

  const { appreciateList, appreciateListHasvePage } = useSelector(
    (state) => state.appreciate
  );
  const { jobDetailById, jobListCompany } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const idCompany = jobDetailById?.hr?.company.id;
  const valuePage = (no, limit) => {
    const values = {
      idCompany: idCompany,
      no: no,
      limit: limit,
    };
    return values;
  };
  useEffect(() => {
    dispatch(getJobById(keyword));
    dispatch(getJobByCompany(idCompany));
  }, [dispatch, keyword, idCompany]);
  useEffect(() => {
    dispatch(getAppreciateByCompany(valuePage(0,10)));
  }, [idCompany, dispatch]);

  useEffect(() => {
    dispatch(getJobList([1, 10]));
  }, [keyword, dispatch]);
  const handleChange = (value) => {
    dispatch(getAppreciateByCompany(valuePage(value -1,10)));
    window.scrollTo({ top : 0, left : 0, behavior : "smooth"})
  };
  return (
    <div className="information-company__container">
      <BaseInformationCompany
        jobDetail={jobDetailById}
        information
        pl={0}
        pr={0}
        ml={0}
        pdLeft="130px"
        pdRight="130px"
        pdTop="3x"
        pdBottom="3px"
        appreciateList={appreciateList}
        jobListCompany={jobListCompany}
        appreciateListHasvePage={appreciateListHasvePage}
        onChange={handleChange}
      />
    </div>
  );
};

export default CandidateInformationCompany;
