import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

import ButtonOutline from "../ButtonOutline";
import "./styles.scss";
import ButtonMark from "../ButtonMark";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteMark } from "src/store/slices/main/mark/markSlice";

const CardJob = ({ jobCare }) => {
  const formatSalary = (salary = "") => {
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const dispatch = useDispatch();
  const handleDeleteJobCare = async (e) => {
    e.stopPropagation();
    dispatch(deleteMark(jobCare.id)).then(
      toast.success("Đã xóa mark thành công")
    );
  };
  return (
    <div className="card-job__container">
      <div className="card-job__info">
        <div className="card-job__title">
          <h3 className="card-job__name">{jobCare.jobCare?.name}</h3>
        </div>
        <div className="card-job__content">
          <div className="card-job__img">
            <img src={jobCare.jobCare.hr?.company?.logo} alt="logo-company" />
          </div>
          <div className="card-job__content-detail">
            <h5 className="card-job__company-name">
              {jobCare.jobCare.hr?.company?.name}
            </h5>
            <div className="card-job__company-work-time">
              <WorkIcon />
              <span className="card-job-text">
                {jobCare.jobCare?.jobType.name}
              </span>
            </div>
            <div className="card-job__company-salary">
              <PaymentsIcon />
              <span className="card-job-text">
                {" "}
                {/* {formatSalary(jobCare.jobCare?.salaryMin)} -{" "}
                {formatSalary(jobCare.jobCare?.salaryMax)} */}
              </span>
            </div>
            <div className="card-job__company-location">
              <LocationOnIcon />
              <span className="card-job-text">
                {jobCare.jobCare?.locationjob.address}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-job__detail">
        <div className="card-job__deadline">
          <AccessTimeIcon />
          <span>
            {moment(jobCare.jobCare?.timeStartStr).format("DD/MM/YYYY")} -{" "}
            {moment(jobCare.jobCare?.timeEndStr).format("DD/MM/YYYY")}
          </span>
          <Button
            name="Xóa đánh dấu"
            bwidth="150px"
            bheight="50px"
            onClick={handleDeleteJobCare}
          ></Button>
        </div>

        <div className="card-job__send-cv">
          <ButtonOutline name="Nộp CV" width="200px" />
        </div>
      </div>
    </div>
  );
};

export default CardJob;
