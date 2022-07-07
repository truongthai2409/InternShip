import React from "react";
import { Link } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PropTypes from "prop-types";
import Logo from "../Logo";
import "./styles.scss";
import { Tooltip, IconButton, Badge, Hidden } from "@mui/material";

import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
function HeaderWithHR(props) {
  return (
    <div className="container-header__hr header__hr config">
      <Logo id={1} />
      <Hidden mdUp>
        <div className="admin-navbar_show">
          <Tooltip title="Show sidebar">
            <ViewQuiltOutlinedIcon />
          </Tooltip>
        </div>
      </Hidden>
      <div className="header__hr-post">
        <Link to="/hr" className="header__hr-post">
          <AddCardIcon></AddCardIcon>
          <span className="header__hr-post-post">Đăng bài</span>
        </Link>
        <Link to="/hr/post/list" className="header__hr-post">
          <FormatAlignJustifyIcon></FormatAlignJustifyIcon>
          <span className="header__hr-post-post">Danh sách bài đăng</span>
        </Link>
      </div>
      <div className="header__hr-icon">
        <div className="header__hr-icon-config">
          <Link to="/hr">
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            {props.idMark ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__hr-icon-config">
          <AddAlertOutlinedIcon></AddAlertOutlinedIcon>
          <Link to="/hr">
            {props.idNoti ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__hr-icon-config">
          <Link to="/hr">
            <SettingsIcon></SettingsIcon>
          </Link>
        </div>
        <div>
          <Link to="/hr">
            <AccountCircleIcon></AccountCircleIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}

HeaderWithHR.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithHR;
