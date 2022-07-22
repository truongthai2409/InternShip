import "./styles.scss";
import { Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonOutline from "../ButtonOutline";
import ProfileForm from "src/containers/Home/ProfileForm";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomInput from "../CustomInput";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { getUserById } from "src/store/slices/Admin/user/userSlice";

const role = (id) => {
  let role = "";
  switch (id) {
    case 1:
      role = "Nhà truyển dụng";
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

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShow = () => {
    setIsUpdate(!isUpdate);
  };

  useEffect(() => {
    const idUser = JSON.parse(localStorage.getItem("userPresent")).idUser;
    dispatch(getUserById(idUser));
  }, []);

  const Infor = () => {
    return (
      <>
        <h2 className="profile__name">{`${user.user?.lastName} ${user.user?.firstName}`}</h2>
        <p className="profile__username">{user.user?.username}</p>
        <ButtonOutline
          onClick={handleShow}
          width="280px"
          bg="#F3F4F6"
          outline="1.5px solid #DEDEDE"
          name="Chỉnh sửa thông tin"
          color="#111111"
          fz="14px"
        />
      </>
    );
  };

  return (
    <>
      <div className="profile__wrapper">
        <div className="profile__col-1">
          <p className="profile__title">Profile picture</p>
          <img
            className="profile__avatar"
            alt="Ảnh đại diện"
            src="https://avatars.githubusercontent.com/u/93117817?v=4"
          />
          <div className="profile__edit-img">
            <ButtonOutline
              className="profile__edit-btn"
              bg="#F3F4F6"
              outline="1.5px solid #DEDEDE"
              color="#111111"
              fz="12px"
              radius="50%"
              height="45px"
              width="45px"
              icon={<DriveFileRenameOutlineIcon />}
            />
          </div>
          {isUpdate ? <ProfileForm onClick={handleShow} /> : <Infor />}
          <br />
          <Divider />
        </div>
        <div className="profile__col-2">
          <div className="profile__infor">
            <div className="profile__infor-item">
              <AttachEmailIcon />
              <span>Email:</span>
              <h3 className="profile__infor-text">{user.user?.email}</h3>
            </div>
            <div className="profile__infor-item">
              <ContactPhoneIcon />
              <span>Phone number:</span>
              <h3 className="profile__infor-text">{user.user?.phone}</h3>
            </div>
            <div className="profile__infor-item">
              <TransgenderIcon />
              <span> Giới tính:</span>
              <h3 className="profile__infor-text">{gender(user.user?.gender)}</h3>
            </div>
            <div className="profile__infor-item">
              <HandshakeIcon />
              <span> Vai trò:</span>
              <h3 className="profile__infor-text">{role(user.user?.role?.id)}</h3>
            </div>
          </div>
          <div className="profile__actions">
            <ButtonOutline
              className="profile__actions-item"
              name="Cập nhật CV"
              icon={<SyncAltIcon />}
              outline="1.5px solid #DEDEDE"
              bg="#FFFFFF"
            />
            <ButtonOutline
              className="profile__actions-item"
              name="Xem CV"
              icon={<RemoveRedEyeIcon />}
              outline="1.5px solid #DEDEDE"
              bg="#FFFFFF"
            />
            <ButtonOutline
              className="profile__actions-item"
              name="Tải CV"
              icon={<FileDownloadIcon />}
              outline="1.5px solid #DEDEDE"
              bg="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
