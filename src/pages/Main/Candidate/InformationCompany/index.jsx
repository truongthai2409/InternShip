import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BaseInformationCompany from "src/components/BaseInformationCompany";
import Button from "src/components/Button";
import Appreciate from "src/components/Appreciate";
import { useSelector, useDispatch } from "react-redux";
import { getJobByName } from "src/store/slices/main/home/job/jobSlice";
import './styles.scss';

function CandidateInformationCompany(props) {
  const dispatch = useDispatch();

  // get global state from redux store
  const { jobDetail } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJobByName(""));
  }, [dispatch]);
  return (
    <div className="information-company__container">
      <BaseInformationCompany jobDetail={jobDetail} information pl={6} pr={6} ml={50} />
      <div className="appreciate">
        <h5 style={{marginTop : '0px',}} className="intro__company-title">Đánh giá về công ty* </h5>
        <Button name="Tạo đánh giá"></Button>
      </div>
      <div>
        <Appreciate />
        <Appreciate />
      </div>
    </div>
  );
}
CandidateInformationCompany.propTypes = {};

export default CandidateInformationCompany;
