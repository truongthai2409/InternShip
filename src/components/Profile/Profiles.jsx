import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Divider, Tooltip } from "@mui/material";
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
    mode : "all",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { user, profile } = useSelector((state) => state.user);
  console.log(user)
  console.log(profile)
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
  const handleChange = (e) => {

  };
  return (
    <>
      {user?.role?.name?.includes("Role_Candidate") && (
        <div className="user-infor__wrapper">
          <div className="profile__avatar">
            <div>
              <img
                className="avatar__img"
                src={
                  profile?.user?.avatar
                    ? `${profile?.user?.avatar}`
                    : "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                }
                alt="Ảnh đại diện"
              />
            </div>
            <div className="profile_icon">
              <Modal
                modalTitle={"Thay đổi CV"}
                open={openChangeCV}
                setOpen={setOpenChangeCV}
                children={
                  <>
                  <form
                    onChange={handleChange}
                    style={{
                      width: 300,
                      height: 300,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <InputFile
                      label="CV"
                      requirementField={false}
                      id="cv"
                      format="pdf"
                      setValue={setValue}
                      register={register}
                    />
                    {errors.cv?.message}
                    <Button onClick={handleSubmit(onSubmit)}>Thay Đổi</Button>  
                  </form>
                  </>
                }
                name="Thay Đổi CV"
                iconClose={<SyncAltIcon />}
              />
              <Modal
                modalTitle={"Xem CV"}
                open={openCV}
                setOpen={setOpenCV}
                children={
                  <iframe src={`${BASEURL}/${profile.cv}`} width={1200} height={1200} title="CV">
                  </iframe>
                }
                name="CV"
                iconClose={<SyncAltIcon />}
              />

              <Tooltip title="Cập nhật CV">
                <CachedRoundedIcon style={{ width: 48, height: 48, cursor: "pointer" }} onClick={() => handleClick(1)} />
              </Tooltip>
              <Tooltip title="Xem CV">
                <RemoveRedEyeIcon style={{ width: 48, height: 48, cursor: "pointer" }} onClick={() => handleClick(2)} />
              </Tooltip>
              <a href={`${BASEURL}${profile.cv}`}>
                <Tooltip title="Tải CV">
                  <CloudDownloadRoundedIcon style={{ width: 48, height: 48, cursor: "pointer" }} onClick={() => handleClick(3)} />
                </Tooltip>
              </a>

            </div>
          </div>

          <div className="profile__infor">
            <h1 className="profile__infor-name">
              {`${profile?.user?.lastName} ${profile?.user?.firstName}`}
              <span className="profile__infor-location">
                <ButtonOutline
                  onClick={handleOpen}
                  icon={<EditIcon />}
                  outline="none"
                  color="#111111"
                  fz="14px"
                  radius="4px"
                  padding="0"
                />
              </span>
            </h1>
            <h4 className="profile__infor-username">
              @{profile?.user?.username}
            </h4>
            <Divider orientation="horizontal" width="90%" height="2px" />
            <br />
            <div className="profile__infor-item">
              <span>
                <EmailIcon /> Email:
              </span>
              <h3>{profile?.user?.email}</h3>
            </div>
            <div className="profile__infor-item">
              <span>
                <PhoneIcon /> Số điện thoại:
              </span>
              <h3>{profile?.user?.phone}</h3>
            </div>
            <div className="profile__infor-item">
              <span>
                <TransgenderIcon /> Giới tính:
              </span>
              <h3>{gender(profile?.user?.gender)}</h3>
            </div>
            <div className="profile__infor-item">
              <span>
                <PersonIcon /> Vai trò:
              </span>
              <h3>{role(profile?.user?.role?.id)}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
