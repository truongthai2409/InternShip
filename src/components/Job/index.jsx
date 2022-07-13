import React from "react";
import PropTypes from "prop-types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import WorkIcon from "@mui/icons-material/Work";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Box from "@mui/material/Box";
import { Icon } from "@mui/material";
import "./styles.scss";
const JobCandidate = (props) => {
  return (
    <Box
      sx={{
        width: 256,
        height: 147,
        border: 1,
        borderColor: "#DEDEDE",
        borderRadius: 2,
        mt: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "DEDEDE",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div className="job__candidate">
        <h4 className="job__candidate-infor job__candidate-infor-name-job">
          Thực tập Java
        </h4>
        <div className="job__candidate-infor job__candidate-infor-time">
          <Icon className="job__candidate-info-item-icon">
            <AccessTimeIcon fontSize="small" />
          </Icon>
          <p>09/06/2022-09/08/2022</p>
        </div>

        <div className="job__candidate-infor">
          <Icon className="job__candidate-info-item-icon">
            <WorkIcon fontSize="small" />
          </Icon>
          <h6>Full time / Part time </h6>
        </div>
        <div className="job__candidate-infor">
          <Icon className="job__candidate-info-item-icon">
            <CurrencyExchangeIcon fontSize="small" />
          </Icon>

          <h6>5,000,000 VNĐ </h6>
        </div>
        <div className="job__candidate-infor">
          <Icon className="job__candidate-info-item-icon">
            <AddLocationIcon fontSize="small" />
          </Icon>
          <h6>Thủ Đức, Hồ Chí Minh</h6>
        </div>
      </div>
    </Box>
  );
};

JobCandidate.propTypes = {};

export default JobCandidate;
