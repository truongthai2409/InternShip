import React from "react";
import { Link, useLocation } from "react-router-dom";
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

function HeaderWithHR(props) {
  const location = useLocation();
  const pathUrl = location.pathname;
  return (
    <div className="container-header__hr header__hr config">
      {props.hr ? <Logo id={1} /> : <Logo id={3} />}
      {props.hr ? (
        <div className="header__hr">
          <Link to="/hr/post/" className="header__hr-post">
            <AddCardIcon></AddCardIcon>
            <span className="header__hr-post-post">Đăng bài</span>
          </Link>
          <Link to="/hr/post/list/" className="header__hr-post">
            <FormatAlignJustifyIcon></FormatAlignJustifyIcon>
            <span className="header__hr-post-post">Danh sách bài đăng</span>
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
      <div className="header__hr-icon">
        <div className="header__hr-icon-config">
          <Link to={`${pathUrl}/view-list`}>
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            {props.isMark ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__hr-icon-config">
          <Link to={`${pathUrl}/`}>
            <AddAlertOutlinedIcon></AddAlertOutlinedIcon>
            {props.isNoti ? (
              <FiberManualRecordIcon
                fontSize="inherit"
                color="warning"
              ></FiberManualRecordIcon>
            ) : null}
          </Link>
        </div>
        <div className="header__hr-icon-config">
          <Link to={`${pathUrl}/`}>
            <SettingsIcon></SettingsIcon>
          </Link>
        </div>
        <div>
          <Link to={`${pathUrl}/`}>
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
