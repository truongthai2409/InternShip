import { useState } from "react";
import ProfileForm from "src/containers/Home/ProfileForm";
import Modal from "../Modal";
import Profiles from "./Profiles";
import ProfileHR from "./ProfileHR";
import ProfilePartner from "./ProfilePartner";
import "./reponsive.scss";
import "./styles.scss";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const roleUser = JSON.parse(sessionStorage.getItem("userPresent"))?.role;
  let RelatedInfor = "";
  switch (roleUser) {
    case "Role_HR":
      RelatedInfor = <ProfileHR />;
      break;
    case "Role_Partner":
      RelatedInfor = <ProfilePartner />;
      break;
    case "Role_Candidate":
      RelatedInfor = null;
      break;
    default:
      RelatedInfor = null;
  }
  return (
    <>
      <div className="profile__wrapper">
       <Profiles open={open} setOpen={setOpen} /> 
          {RelatedInfor}
      </div>
      <Modal
        modalTitle="Chỉnh sửa thông tin cá nhân"
        children={<ProfileForm handleClose={handleClose} />}
        open={open}
        setOpen={setOpen}
        name="profile"
      />
    </>
  );
};

export default Profile;
