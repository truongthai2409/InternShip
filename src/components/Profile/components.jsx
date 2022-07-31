import "./styles.scss";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonOutline from "../ButtonOutline";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileByIdUser, getUserById } from "src/store/slices/Admin/user/userSlice";

export const role = (id) => {
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

export const gender = (id) => {
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

export const Actions = () => {
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

export const CompanyInfo = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  return (
    <div className="company-infor__wrapper">
      <h2 className="company-infor__title">Công ty</h2>
      <Divider />
      <div className="company-infor__content">
        <div className="company-infor__col-1">
          <img
            className="company-infor__logo"
            alt="Ảnh của công ty"
            src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
          />
          <p className="company-infor__name">{profile?.company?.name}</p>
        </div>
        <div className="company-infor__col-2">
          <div className="company-infor__profile">
            <div className="company-infor__row">
              <p className="company-infor__item">
                <span>Email:</span>
                {profile?.company?.email}
              </p>
              <p className="company-infor__item">
                <span>Số điện thoại:</span>
                {profile?.company?.phone}
              </p>
            </div>
            <div className="company-infor__row">
              <p className="company-infor__item">
                <span>Website:</span>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={profile?.company?.website}
                  target="_blank"
                >
                  {profile?.company?.website}
                </a>
              </p>
              <p className="company-infor__item">
                <span>Mã số thuế:</span>
                {profile?.company?.tax}
              </p>
            </div>
            <p className="company-infor__des-company">
              <span>Mô tả công ty:</span>
              <br />
              {profile?.company?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UniversityInfo = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);


  const {user, universityDTO} = profile;

  console.log(user, universityDTO);

  useEffect(() => {
    const idUser = JSON.parse(localStorage.getItem("userPresent")).idUser;
    dispatch(getProfileByIdUser(idUser));
  }, []);
  return (
    <div className="company-infor__wrapper">
      <h2 className="company-infor__title">{universityDTO?.name}</h2>
      <Divider />
      <div className="company-infor__content">
        <div className="company-infor__col-1">
          <img
            className="company-infor__logo"
            alt="Ảnh của trường"
            src="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
          />
          <p className="company-infor__name"></p>
        </div>
        <div className="company-infor__col-2">
          <div className="company-infor__profile">
            <div className="company-infor__row">
              <p className="company-infor__item">
                <span>Email:</span>
                {universityDTO?.email}
              </p>
              <p className="company-infor__item">
                <span>Số điện thoại:</span>
                {universityDTO?.phone}
              </p>
            </div>
            <div className="company-infor__row">
              <p className="company-infor__item">
                <span>Website:</span>
                <a
                  style={{ textDecoration: "underline", color: "blue" }}
                  href={universityDTO?.website}
                  target="_blank"
                >
                  {universityDTO?.website}
                </a>
              </p>
              <p className="company-infor__item">
                <span>Tên viết tắc:</span>
                {universityDTO?.shortName}
              </p>
            </div>
            <p className="company-infor__des-company">
              <span>Mô tả công ty:</span>
              <br />
              {universityDTO?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
