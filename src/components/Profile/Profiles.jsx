import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Divider, Switch, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileByIdUser,
  getUserById,
} from "src/store/slices/Admin/user/userSlice";
import ButtonOutline from "../ButtonOutline";
import InfoUser from "./InfoUser";
import { Actions } from "./components";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Modal from "../Modal";
import InputFile from "../InputFile";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./data";
import './styles.scss'

const BASEURL = process.env.REACT_APP_API
export default function Profiles({ setOpen }) {
  const role = (id) => {
    let role = "";
    switch (id) {
      case 1:
        role = "Nhà tuyển dụng";
        break;
      case 2:
        role = "Quản trị viên";
        break;
      case 3:
        role = "Ứng viên";
        break;
      default:
        role = "Cộng tác viên";
        break;
    }
    return role;
  };
  const gender = (id) => {
    let gender = "";
    switch (id) {
      case 0:
        gender = "Nam";
        break;
      case 1:
        gender = "Nữ";
        break;
      default:
        gender = "Khác";
    }
    return gender;
  };
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.user);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };
  const userSessionStorage = JSON.parse(sessionStorage.getItem("userPresent"));
  const handleOpen = () => setOpen(true);
  const [openCV, setOpenCV] = useState(false);
  const [openChangeCV, setOpenChangeCV] = useState(false);
  useEffect(() => {
    dispatch(
      getProfileByIdUser([userSessionStorage?.idUser, userSessionStorage?.token])
    );
    dispatch(getUserById([userSessionStorage?.idUser, userSessionStorage?.token]));
  }, [userSessionStorage?.idUser, dispatch]);
  const handleClick = (number) => {
    switch (number) {
      case 1: {
        setOpenChangeCV(!openChangeCV)
        break
      }
      case 2: {
        setOpenCV(!openCV)
        break
      }
      default:
        break;
    }
  }
  const onSubmit = (data) => {
    console.log(data)
    const cv = {
      fileCV: data.cv,
    }
    console.log(cv)
  };
  return (
    <>
      {user?.role?.name?.includes("Role_Candidate") && (
        <div className="user_container">
          <div className="user_profile">
            <img className="user_avatar" src="https://cdn.dribbble.com/users/699610/avatars/normal/a49e77902498a4248634ae6d9d62c0cb.png?1646912207&compress=1&resize=200x200" alt="avatar" />
            <div className="user_name">
              <span className="user_username">Đang làm nhaaaaaaaaaaaaaa. mới làm . Giờ push code để về</span>
              <span className="user_link"></span>
            </div>
            <Button variant="contained" size="large">
              Edit Profile
            </Button>
          </div>
          <div className="user_content">
            <span className="content_span">Thông Tin CV</span>
            <div className="user_link_3">
              <div>
                <Tooltip title="Cập nhật CV">
                  <CachedRoundedIcon style={{ width: 48, height: 48, cursor: "pointer" }} onClick={() => handleClick(1)} />
                </Tooltip>
                <span>EDIT</span>
              </div>
              <Tooltip title="Xem CV">
                <RemoveRedEyeIcon style={{ width: 48, height: 48, cursor: "pointer" }} onClick={() => handleClick(2)} />
              </Tooltip>
              <a href={`${BASEURL}${profile.cv}`}>
                <Tooltip title="Tải CV">
                  <CloudDownloadRoundedIcon style={{ width: 48, height: 48, cursor: "pointer" }} onClick={() => handleClick(3)} />
                </Tooltip> </a>
            </div>
          </div>
          <div className="user_preferences">
            <div>
              <span className="content_span">Liên kết</span>
              <div className="content_page">
                <span>Cho phép nhà tuyển dụng tìm kiếm bạn</span>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
