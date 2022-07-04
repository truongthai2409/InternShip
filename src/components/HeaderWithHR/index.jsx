import React from "react";
import { Link } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PropTypes from "prop-types";
import Logo from "../Logo";
import "./styles.scss";
import ButtonMark from "../ButtonMark";

function HeaderWithHR(props) {
  return (
    <div className="container header__hr">
      <Logo id={4} />
      <div className="header__hr-post">
        <Link to="/" className="header__hr-post">
          <AddCardIcon></AddCardIcon>
          <span className="header__hr-post-post">Đăng bài</span>
        </Link>
        <div className="header__hr-post">
          <Link to="/">
            <FormatAlignJustifyIcon></FormatAlignJustifyIcon>
            <span className="header__hr-post-post">Danh sách bài đăng</span>
          </Link>
        </div>
      </div>
      <div className="header__hr-icon">
        <div className="header__hr-icon-config">
          <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
        </div>
        <div className="header__hr-icon-config">
          <AddAlertOutlinedIcon></AddAlertOutlinedIcon>
        </div>
        <div className="header__hr-icon-config">
          <SettingsIcon></SettingsIcon>
        </div>
        <div>
          <AccountCircleIcon></AccountCircleIcon>
        </div>
      </div>
    </div>
  );
}

HeaderWithHR.propTypes = {};

export default HeaderWithHR;
