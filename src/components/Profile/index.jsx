import './styles.scss'
import { Divider } from '@mui/material'
import { useState } from 'react'
import ButtonOutline from '../ButtonOutline'
import ProfileForm from 'src/containers/Home/ProfileForm'
import AttachEmailIcon from '@mui/icons-material/AttachEmail'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import TransgenderIcon from '@mui/icons-material/Transgender'
import HandshakeIcon from '@mui/icons-material/Handshake'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CustomInput from '../CustomInput'

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState(false)

  const handleShow = () => {
    setIsUpdate(!isUpdate)
  }

  const Infor = () => {
    return (
      <>
        <h2 className="profile__name">Lê Duy Tường</h2>
        <p className="profile__username">box2k1</p>
        <ButtonOutline
          onClick={handleShow}
          bwidth="280px"
          bg="#F3F4F6"
          outline="1.5px solid #DEDEDE"
          name="Chỉnh sửa thông tin"
          color="#111111"
          fz="14px"
        />
      </>
    )
  }

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
              name="Chỉnh sửa"
              bg="#F3F4F6"
              outline="1.5px solid #DEDEDE"
              color="#111111"
              fz="12px"
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
              <h3 className="profile__infor-text">box2k1@gmail.com</h3>
            </div>
            <div className="profile__infor-item">
              <ContactPhoneIcon />
              <span>Phone number:</span>
              <h3 className="profile__infor-text">0964088473</h3>
            </div>
            <div className="profile__infor-item">
              <TransgenderIcon />
              <span> Giới tính:</span>
              <h3 className="profile__infor-text">Nam</h3>
            </div>
            <div className="profile__infor-item">
              <HandshakeIcon />
              <span> Vai trò:</span>
              <h3 className="profile__infor-text">Nhà tuyển dụng</h3>
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
  )
}

export default Profile
