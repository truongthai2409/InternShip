import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ButtonOutline from "../ButtonOutline";
import "./styles.scss";

const CardJob = () => {
  return (
    <div className="card-job__container">
      <div className="card-job__info">
        <div className="card-job__title">
          <h3 className="card-job__name">ReactJS Intern</h3>
        </div>
        <div className="card-job__content">
          <div className="card-job__img"></div>
          <div className="card-job__content-detail">
            <h5 className="card-job__company-name">Công ty R2S</h5>
            <div className="card-job__company-work-time">
              <WorkIcon />
              <span className="card-job-text">Fulltime / Part time</span>
            </div>
            <div className="card-job__company-salary">
              <PaymentsIcon />
              <span className="card-job-text">5.000.000 VND</span>
            </div>
            <div className="card-job__company-location">
              <LocationOnIcon />
              <span className="card-job-text">Thủ Đức, Hồ Chí Minh</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-job__detail">
        <div className="card-job__deadline">
            <AccessTimeIcon />
            <span>09/06/2022 Thời gian nộp</span>
        </div>
        <div className="card-job__send-cv">
            <ButtonOutline name="Nộp CV" width="200px"/>
        </div>
      </div>
    </div>
  );
};

export default CardJob;
