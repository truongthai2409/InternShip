import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TagName from "../TagName";
import ButtonMark from "../ButtonMark";
import Button from "../Button";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import { getJobList } from "../../store/slices/main/home/job/jobSlice";
import moment from "moment";

import "./styles.scss";
import { Icon } from "@mui/material";

const listMajors = ["HTML", "CSS", "JS", "ReactJS"];

const formatSalary = (salary = "") => {
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function DetailCard(props) {
  const dispatch = useDispatch();
  const jobDetail = props.jobDetail;
  // get global state from redux store
  //   const { jobDetail } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getJobList());
  }, []);

  return (
    <div>
      {props.jobListName.length > 0 ? (
        <div className="detail__card detail__card-ontablet containerDetailCard-home">
          <div className="detail__card-1">
            <div className="detail__card-intro">
              <img
                className="detail__card__logo"
                alt="detail-card-logo"
                src={props.logo}
              />
              <div>
                <h2>{jobDetail.name}</h2>
                <p className="name-company">{jobDetail.hr?.company?.name}</p>
              </div>
            </div>
            <ButtonMark></ButtonMark>
          </div>
          <div className="detail__card-2">
            <div className="tag-name">
              {listMajors.map((listMajor, index) => (
                <div className="tag-name__name" key={index}>
                  <TagName title={listMajor} />
                </div>
              ))}
            </div>
            <div className="button__candidate-onMobile">
              <Button name="Ứng Tuyển"></Button>
            </div>
          </div>
          <div className="detail__card-3">
            <div className="detail__card-3-item">
              <h4 className="detail__card-3-item-name">Mô tả công việc:</h4>
              <p>{jobDetail.desciption}</p>
            </div>
            <div className="detail__card-3-item">
              <h4 className="detail__card-3-item-name">Yêu cầu công việc:</h4>
              <p>{jobDetail.requirement}</p>
            </div>
            <div className="detail__card-3-item">
              <h4 className="detail__card-3-item-name">Thời hạn ứng tuyển:</h4>
              <p>
                {moment(jobDetail.timeStartStr).format("DD/MM/YYYY")} -{" "}
                {moment(jobDetail.timeEndStr).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
          <div className="line"></div>
          <div className="detail__card-4">
            <div className="detail__card-4-item">
              <Icon className="detail__card-4-item-icon">
                <CurrencyExchangeIcon />
              </Icon>
              <h6 className="detail__card-4-item-info">
                {formatSalary(jobDetail.salaryMin)} -{" "}
                {formatSalary(jobDetail.salaryMax)}
              </h6>
            </div>
            <div className="detail__card-4-item">
              <Icon className="detail__card-4-item-icon">
                <WorkIcon />
              </Icon>
              <h6 className="detail__card-4-item-info">Fulltime/Parttime</h6>
            </div>
            <div className="detail__card-4-item">
              <AddLocationIcon className="detail__card-4-item-icon">
                <WorkIcon />
              </AddLocationIcon>
              <h6 className="detail__card-4-item-info">{props.location}</h6>
            </div>
          </div>
          <div className="detail__card-5">
            <div>
              <p>{props.rating}</p>
              <Rating
                name="read-only"
                precision={0.5}
                readOnly
                defaultValue={props.star}
              />
            </div>
            <Button name="Ứng tuyển"></Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

DetailCard.propTypes = {
  logo: PropTypes.string.isRequired,
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nameMajor: PropTypes.string,
  nameCompany: PropTypes.string,
  detailJob: PropTypes.string,
  requireJob: PropTypes.string,
  timeJob: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DetailCard;
