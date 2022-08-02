import React, { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Box from "@mui/material/Box";
import { Icon } from "@mui/material";
import "./styles.scss";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateIdJobActive } from "src/store/slices/main/home/job/jobSlice";

const JobCandidate = ({ job, idJob }) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(updateIdJobActive(idJob));
  };
  return (
    <div
      style={{
        marginRight: "15px",
      }}
    >
      <Link
        to={`/detail_job`}
        onClick={handleClick}
        className="link__job-detail"
      >
        <Box
          sx={{
            width: 220,
            minHeight: 160,
            border: 1,
            borderColor: "#DEDEDE",
            borderRadius: 2,
            pd: 0,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "DEDEDE",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <div className="job__candidate">
            <h4
              id="job__candidate-infor-name"
              className="job__candidate-infor job__candidate-infor-name-job"
            >
              {job.name}
            </h4>
            <div className="job__candidate-infor job__candidate-infor-time">
              <Icon className="job__candidate-info-item-icon">
                <AccessTimeIcon fontSize="small" />
              </Icon>
              <h6 className="card-content-job-candidate">
                {moment(job.timeStartStr).format("DD/MM/YYYY")} -{" "}
                {moment(job.timeEndStr).format("DD/MM/YYYY")}
              </h6>
            </div>
            <div className="job__candidate-infor">
              <Icon className="job__candidate-info-item-icon">
                <WorkIcon fontSize="small" />
              </Icon>
              <h6 className="card-content-job-candidate">{job.jobType.name}</h6>
            </div>
            <div className="job__candidate-infor">
              <Icon className="job__candidate-info-item-icon">
                <CurrencyExchangeIcon fontSize="small" />
              </Icon>

              <h6 className="card-content-job-candidate">{job.salaryMin} $</h6>
            </div>
            <div className="job__candidate-infor">
              <Icon className="job__candidate-info-item-icon">
                <AddLocationIcon fontSize="small" />
              </Icon>
              <h6 className="card-content-job-candidate">
                {job.locationjob.address}
              </h6>
            </div>
          </div>
        </Box>
      </Link>
    </div>
  );
};

JobCandidate.propTypes = {};

export default JobCandidate;
