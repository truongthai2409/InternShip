import React from 'react'
import './styles.scss'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import WorkOffOutlinedIcon from '@mui/icons-material/WorkOffOutlined'
import Button from '../../../../components/Button/index';

const PostCard = ({
  jobPosition,
  logo,
  nameSchool,
  address,
  dateStartStr,
  dateEndStr,
  candidateAmount,
}) => {
  return (
    <div className="post-card__container">
      <div className="post-card__jobPosition">
        <h2>{jobPosition}</h2>
      </div>
      <div className="post-card__content">
        <div className="post-card__info">
          <div className="post-card__info-header">
            <div className="post-card__logo">{logo}</div>
            <div className="post-card__school-info">
              <div className="post-card__school-info__name">{nameSchool}</div>
              <div className="post-card__school-info__address">{address}</div>
            </div>
          </div>

          <div className="post-card-date">
            <p className="post-card-start-to-end">
              {`${dateStartStr} - ${dateEndStr}`}
            </p>
          </div>
          <div className="post-card-btns">
            <Button bwidth="33%" backgroundColor="white" className="post-card-btn__user btn">
              <PersonOutlineOutlinedIcon />
              <span className='post-card-span-text'>{`${candidateAmount} ứng viên`}</span>
            </Button>
            <Button bwidth="33%" backgroundColor="white" className="post-card-btn__update btn">
              <EditOutlinedIcon />
              <span className='post-card-span-text'>Chỉnh sửa</span>
            </Button>
            <Button bwidth="33%" backgroundColor="white" className="post-card-btn__close-work btn">
              <WorkOffOutlinedIcon />
              <span className='post-card-span-text'>Đóng việc</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
