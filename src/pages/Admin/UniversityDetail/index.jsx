import React from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.scss";
// import companyLogo from "../../../assets/img/camera.png";
// import CustomInput from "../../../components/CustomInput";
import UniversityForm from "../../../containers/Admin/UniversityForm";

const CompanyDetail = () => {
  return (
    <div className="company-detail">
      <Paper className="company-detail__title-container">
        <div className="company-detail__title">
          <h2>Quản lý trường</h2>
        </div>
      </Paper>
      <Paper className="company-detail__content-container">
        <h2>Thông tin chi tiết trường</h2>
        <UniversityForm isAdd={false} />
      </Paper>
    </div>
  );
};

export default CompanyDetail;
