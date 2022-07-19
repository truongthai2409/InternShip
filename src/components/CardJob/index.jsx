import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

import ButtonOutline from "../ButtonOutline";
import "./styles.scss";

const CardJob = ({ jobCare }) => {
  const formatSalary = (salary = "") => {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="card-job__container">
      <div className="card-job__info">
        <div className="card-job__title">
          <h3 className="card-job__name">{jobCare.jobCare.name}</h3>
        </div>
        <div className="card-job__content">
          <div className="card-job__img">
            <img src={jobCare.jobCare.company.logo} alt="logo-company" />
          </div>
          <div className="card-job__content-detail">
            <h5 className="card-job__company-name">
              {jobCare.jobCare.company.name}
            </h5>
            <div className="card-job__company-work-time">
              <WorkIcon />
              <span className="card-job-text">{jobCare.jobCare.jobType}</span>
            </div>
            <div className="card-job__company-salary">
              <PaymentsIcon />
              <span className="card-job-text">
                {" "}
                {formatSalary(jobCare.jobCare.salaryMin)} -{" "}
                {formatSalary(jobCare.jobCare.salaryMax)}
              </span>
            </div>
            <div className="card-job__company-location">
              <LocationOnIcon />
              <span className="card-job-text">
                {jobCare.jobCare.locationjob}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-job__detail">
        <div className="card-job__deadline">
          <AccessTimeIcon />
          <span>
            {moment(jobCare.jobCare.timeStartStr).format("DD/MM/YYYY")} -{" "}
            {moment(jobCare.jobCare.timeEndStr).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="card-job__send-cv">
          <ButtonOutline name="Nộp CV" width="200px" />
        </div>
      </div>
    </div>
  );
};

export default CardJob;
