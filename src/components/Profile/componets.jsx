import "./styles.scss";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonOutline from "../ButtonOutline";

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
    return (
        <div className="company-infor__wrapper">
            <h3 className="company-infor__name">Về công ty</h3>
        </div>
    )
}


export const UniversityInfo = () => {
    return (
        <>
            <h4>Về công ty</h4>

        </>
    )
}
