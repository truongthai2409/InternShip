import "./styles.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import ButtonOutline from "../ButtonOutline";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "../Modal";
import ProfileForm from "src/containers/Home/ProfileForm";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EditIcon from "@mui/icons-material/Edit";

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

const Action = () => {
  return (
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
  );
};

const Profile = ({ actions = false }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <div className="profile__wrapper">
        <p className="profile__title">Profile picture</p>
        <img
          className="profile__avatar"
          alt="Ảnh đại diện"
          src={
            user?.avatar ||
            "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
          }
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
            icon={<EditIcon />}
          />
        </div>
        <h2 className="profile__name">{`${user.lastName} ${user.firstName}`}</h2>
        <p className="profile__username">{user.username}</p>
        <ButtonOutline
          onClick={handleOpen}
          width="280px"
          bg="#F3F4F6"
          outline="1.5px solid #DEDEDE"
          name="Chỉnh sửa thông tin"
          color="#111111"
          fz="14px"
        />
        <Modal
          modalTitle="Chỉnh sử thông tin cá nhân"
          children={<ProfileForm onClick={handleClose} />}
          open={open}
          setOpen={setOpen}
          name="profile"
        />
        <br />
        <div className="profile__infor">
          <div className="profile__infor-item">
            <AlternateEmailIcon />
            <span>Email:</span>
            <h3 className="profile__infor-text">{user.email}</h3>
          </div>
          <div className="profile__infor-item">
            <PermPhoneMsgIcon />
            <span>Phone number:</span>
            <h3 className="profile__infor-text">{user.phone}</h3>
          </div>
          <div className="profile__infor-item">
            <TransgenderIcon />
            <span> Giới tính:</span>
            <h3 className="profile__infor-text">{gender(user?.gender)}</h3>
          </div>
          <div className="profile__infor-item">
            <HandshakeIcon />
            <span> Vai trò:</span>
            <h3 className="profile__infor-text">{role(user.role?.id)}</h3>
          </div>
        </div>
        {actions && <Action />}
      </div>
    </>
  );
};

export default Profile;
