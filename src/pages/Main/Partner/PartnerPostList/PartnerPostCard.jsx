import './styles.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DoorFrontIcon from '@mui/icons-material/DoorFront'
import PostStatus from 'src/components/PostStatus'
import ButtonAction from 'src/components/ButtonAction'
import moment from 'moment'

const PartnerPostCard = ({ status, jobName, schoolName, address, amount, timeCreated, timeStart, timeEnd }) => {
  return (
    <div className="card-post__container">
      <PostStatus status={status?.id} />
      <h3 className="card-post__job-name">{jobName}</h3>
      <div className="card-post__company-info-detail">
        <img
          className="company-info-detail__img"
          src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
          alt="Ảnh của công ty"
        />
        <div className="company-info-detail__content">
          <p className="company__name">{schoolName}</p>
          <p className="company__location">{address}</p>
        </div>
      </div>
      <p className="card-post__amount">Số lượng: {amount}</p>
      <p className="card-post__time">
        <b>Thời gian tuyển dụng:</b>{' '}
        {moment(timeStart).format('DD/MM/YYYY')} -{' '}
        {moment(timeEnd).format('DD/MM/YYYY')}
      </p>
      <p className="card-post__created">
        <b>Ngày đăng:</b> {moment(timeCreated).format('DD/MM/YYYY')}
      </p>
      <div className="card-post__action">
        <ButtonAction
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<PersonOutlineIcon></PersonOutlineIcon>}
          color="#111"
          name="Ứng viên"
          fontSize="13px"
        />
        <ButtonAction
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<ModeEditOutlineIcon></ModeEditOutlineIcon>}
          color="#111"
          name="Chỉnh sửa"
          fontSize="13px"
        />
        <ButtonAction
          height="50px"
          width="33.33%"
          border="0.5px solid #DEDEDE"
          icon={<DoorFrontIcon></DoorFrontIcon>}
          color="#111"
          name="Đóng việc"
          fontSize="13px"
        />
      </div>
    </div>
  )
}

export default PartnerPostCard
