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
import SearchResultHome from "../SearchResultHome";

function HeaderWithPartner(props) {
  return (
    <div className="container-header__partner header__partner config">
      {props.partner ? <Logo id={4} /> : <Logo id={3} />}
      {props.partner ? (
        <div className="header__partner">
          <Link to="/partner/post/" className="header__partner-post">
            <AddCardIcon></AddCardIcon>
            <span className="header__partner-post-post">Đăng bài</span>
          </Link>
          <Link to="/partner/post/list/" className="header__partner-post">
            <FormatAlignJustifyIcon></FormatAlignJustifyIcon>
            <span className="header__partner-post-post">Danh sách bài đăng</span>
          </Link>
        </div>
      ) : null}
      {props.search ? (
        <SearchResultHome
          bwidth="681px"
          bheight="33px"
          bwidthInput="fit-content"
          bheightInput="fit-content"
          mb="0"
          candidate_infomation={true}
        />
      ) : null}
      <div className="header__partner-icon">
        <div className="header__partner-icon-config">
          <Link to="/partner">
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            {props.idMark ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__partner-icon-config">
          <AddAlertOutlinedIcon></AddAlertOutlinedIcon>
          <Link to="/partner">
            {props.idNoti ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__partner-icon-config">
          <Link to="/partner">
            <SettingsIcon></SettingsIcon>
          </Link>
        </div>
        <div>
          <Link to="/partner">
            <AccountCircleIcon></AccountCircleIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}

HeaderWithPartner.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithPartner;
