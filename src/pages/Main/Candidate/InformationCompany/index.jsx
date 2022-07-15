import React, { useEffect } from "react";
import PropTypes from "prop-types";
import BaseInformationCompany from "src/components/BaseInformationCompany";
import Button from "src/components/Button";
import Appreciate from "src/components/Appreciate";
import { useSelector, useDispatch } from "react-redux";
import { getJobByName } from "src/store/slices/main/home/job/jobSlice";

function CandidateInformationCompany(props) {
  const dispatch = useDispatch();

  // get global state from redux store
  const { jobDetail } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJobByName(""));
  }, []);
  return (
    <div>
      <BaseInformationCompany jobDetail={jobDetail} information pl={6} pr={6} />
      <div className="appreciate">
        <h5 className="intro__company-title">Đánh giá về công ty* </h5>
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
