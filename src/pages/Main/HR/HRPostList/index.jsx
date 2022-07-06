import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import BlindsClosedOutlinedIcon from "@mui/icons-material/BlindsClosedOutlined";
import Button from "../../../../components/Button";
import Logo from "../../../../components/Logo";
import "./styles.scss";
const HRPostList = (props) => {
  return (
    <div className="hrpost__list">
      <div className="hrpost__list-bt">
        <Button name="Đăng bài"></Button>
      </div>
      <div className="hrpost__list-info">
        <div className="hrpost__list-info-detail">
          <Button name="Đang đăng tuyển"></Button>
        </div>
        <h3 className="hrpost__list-info-detail">ReactJS Intern</h3>
        <div className="hrpost__list-info-detail">
          <Logo></Logo>
          <div className="hrpost__list-info-detail-detail">
            <h4>Công ty R2S</h4>
            <p>1164 Phạm Văn Đồng, TP Thủ Đức, TPHCM</p>
          </div>
        </div>
        <h4 className="hrpost__list-info-detail">Số lượng: 100</h4>
        <p className="hrpost__list-info-detail">05/06/2022 - 30/06/2022</p>
        <Grid className="wrapper " container spacing={0}>
          <Grid item lg={4} md={2} sm={2} xs={12} className="line">
            <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
            <span className="hrpost__list-info-detail-candidate">
              10 Ứng viên
            </span>
          </Grid>
          <Grid item lg={4} md={10} sm={10} xs={12} className="line">
            <HandymanOutlinedIcon></HandymanOutlinedIcon>
            <span className="hrpost__list-info-detail-candidate">
              Chỉnh sửa
            </span>
          </Grid>
          <Grid item lg={4} className="">
            <BlindsClosedOutlinedIcon></BlindsClosedOutlinedIcon>
            <span className="hrpost__list-info-detail-candidate">
              Đóng việc
            </span>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

HRPostList.propTypes = {};

export default HRPostList;
