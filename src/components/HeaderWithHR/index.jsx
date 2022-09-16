import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import AddCardIcon from "@mui/icons-material/AddCard";
import PropTypes from "prop-types";
import Logo from "../Logo";
import "./styles.scss";
import "./responsive.scss";
import SearchResultHome from "../SearchResultHome";
import AccountMenu from "../AccountMenu";
import { getProfileByIdUser } from "src/store/slices/Admin/user/userSlice";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import Login from "../Login";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const HeaderWithHR = (props) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    const idUser = JSON.parse(sessionStorage.getItem("userPresent"))?.idUser;
    dispatch(getProfileByIdUser(idUser));
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="container-header__hr header__hr config">
      <div onClick={() => { }} className="responsive-menu">
        <MenuIcon />
      </div>
      <Logo />
      {profile?.user?.role?.name.includes("Role_HR") ?
        <div className="header__hr">
          <Link
            to="post"
            className={
              pathUrl === "/hr/post"
                ? "header__hr-post active"
                : "header__hr-post"
            }
          >
            <AddCardIcon sx={{ color: "#04bf8a" }}></AddCardIcon>
            <span className="header__hr-post-post">Đăng tuyển</span>
          </Link>
          <Link
            to="list"
            className={
              pathUrl === "/hr/list"
                ? "header__hr-post active"
                : "header__hr-post"
            }
          >
            <FormatAlignJustifyIcon
              sx={{ color: "#04bf8a" }}
            ></FormatAlignJustifyIcon>
            <span className="header__hr-post-post">Công việc đang tuyển</span>
          </Link>
          <Link
            to="candidatemanagement"
            className={
              pathUrl === "/hr/candidatemanagement"
                ? "header__hr-post active"
                : "header__hr-post"
            }
          >
            <BookmarksIcon />
            <span className="header__hr-post-post">Ứng viên ưa thích</span>
          </Link>
        </div> : null}
      {profile?.user?.role?.name.includes("Role_Candidate") ? (
        <div className="header__hr">
          <Link to="/candidate/view-list-apply" className="header__hr-post">
            <PlaylistAddCheckOutlinedIcon fontSize="large" />
            <span className="header__hr-post-post">Công việc đã ứng tuyển</span>
          </Link>
          <Link to="/candidate/view-list-care" className="header__hr-post">
            <FormatAlignJustifyIcon />
            <span className="header__hr-post-post">Công việc đã quan tâm</span>
          </Link>
        </div>
      ) : null}
      <div className="header__hr-icon">
        <Login />
      </div>
    </div>
  );
};

HeaderWithHR.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithHR;
