import React from "react";
import PropTypes from "prop-types";
import BaseInformationCompany from "src/components/BaseInformationCompany";
import Button from "src/components/Button";
import Appreciate from "src/components/Appreciate";
function CandidateInformationCompany(props) {
  return (
    <div>
      <BaseInformationCompany information pl={6} pr={6} />
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
