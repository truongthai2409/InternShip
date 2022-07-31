import React from "react";
import PropTypes from "prop-types";

// import Button from "../Button";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Icon } from "@mui/material";
import moment from "moment";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// const formatSalary = (salary = "") => {
//   return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

const baseURL = process.env.REACT_APP_API;

const InformationUniversity = ({ jobDetail }) => {
  const { profile } = useSelector((state) => state.authentication);
  //   const { candidateInfoByUsername } = useSelector(state => state.infoCandidate)
  const dispatch = useDispatch();

  return (
    <div>
      <div className="detail__card-3-partner">
        <Typography variant="span">
          <Typography
            variant="span"
            sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
          >
            Bản tin tuyển dụng:
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ fontSize: 17, fontWeight: "400" }}
          >
            {jobDetail.desciption}
          </Typography>
        </Typography>
        <div className="detail__card-3-item-partner">
          <Typography variant="span">
            <Typography variant="span" sx={{ fontSize: 16, fontWeight: "700" }}>
              Thời hạn ứng tuyển:
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontSize: 16, fontWeight: "400" }}
            >
              {moment(jobDetail.createDate).format("DD/MM/YYYY")} -{" "}
              {moment(jobDetail.end).format("DD/MM/YYYY")}
            </Typography>
          </Typography>

          <Typography variant="span">
            <Typography
              variant="div"
              sx={{ fontSize: 16, color: "black", fontWeight: "700" }}
            >
              <div className="detail__card-list-students-link">
                <a className="list-students-file" href={`${baseURL}${jobDetail?.students}`} target="_blank">
                  Danh sách sinh viên
                </a>
              </div>
            </Typography>
          </Typography>
        </div>
      </div>
      <div className="line"></div>
      <div className="detail__card-4">
        {/* <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <CurrencyExchangeIcon />
          </Icon>
          <Typography variant="h6" gutterBottom component="div" >
            {formatSalary(jobDetail.salaryMin)} -{" "}
            {formatSalary(jobDetail.salaryMax)}
          </Typography>
        </div> */}
        <div className="detail__card-4-item" sx={{ display: "flex" }}>
          <Icon className="detail__card-4-item-icon">
            <LocalPhoneIcon />
          </Icon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 14,
              fontWeight: "400",
              transform: "translate(5px,5px)",
            }}
          >
            {jobDetail?.universityDTO?.phone || "Không có"}
          </Typography>
        </div>
        <div className="detail__card-4-item" sx={{ display: "flex" }}>
          <Icon className="detail__card-4-item-icon">
            <EmailOutlinedIcon />
          </Icon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 14,
              fontWeight: "400",
              transform: "translate(5px,5px)",
            }}
          >
            {jobDetail?.universityDTO?.email || "Không có"}
          </Typography>
        </div>
        <div className="detail__card-4-item">
          <AddLocationIcon className="detail__card-4-item-icon"></AddLocationIcon>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 14,
              fontWeight: "400",
              transform: "translate(5px,5px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {jobDetail?.universityDTO?.address || "Không có"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

InformationUniversity.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InformationUniversity;
