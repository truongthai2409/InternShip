import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import WorkIcon from '@mui/icons-material/Work'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import Rating from '@mui/material/Rating'
import { Icon } from '@mui/material'
import moment from 'moment'
import { Typography } from '@mui/material'
const formatSalary = (salary = '') => {
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const InformationCompany = ({ jobDetail }) => {
  return (
    <div>
      <div className="detail__card-3">
        <div className="detail__card-3-item">
          <Typography
            variant="span"
            sx={{ fontSize: 16, color: 'black', fontWeight: '700' }}
          >
            Mô tả công việc:
          </Typography>
          <p>{jobDetail.desciption}</p>
        </div>
        <div className="detail__card-3-item">
          <Typography variant="span" sx={{ fontSize: 16, fontWeight: '700' }}>
            Yêu cầu công việc:
          </Typography>
          <p>{jobDetail.requirement}</p>
        </div>
        <div className="detail__card-3-item">
          <Typography variant="span" sx={{ fontSize: 16, fontWeight: '700' }}>
            Thời hạn ứng tuyển:
          </Typography>
          <p>
            {moment(jobDetail.timeStartStr).format('DD/MM/YYYY')} -{' '}
            {moment(jobDetail.timeEndStr).format('DD/MM/YYYY')}
          </p>
        </div>
      </div>
      <div className="line"></div>
      <div className="detail__card-4">
        <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <CurrencyExchangeIcon />
          </Icon>
          <h6 className="detail__card-4-item-info">
            {formatSalary(jobDetail.salaryMin)} -{' '}
            {formatSalary(jobDetail.salaryMax)}
          </h6>
        </div>
        <div className="detail__card-4-item">
          <Icon className="detail__card-4-item-icon">
            <WorkIcon />
          </Icon>
          <h6 className="detail__card-4-item-info">{jobDetail.jobType.name}</h6>
        </div>
        <div className="detail__card-4-item">
          <AddLocationIcon className="detail__card-4-item-icon">
            <WorkIcon />
          </AddLocationIcon>
          <h6 className="detail__card-4-item-info">{`${jobDetail.locationjob?.address},${jobDetail.locationjob?.district?.name},${jobDetail.locationjob?.district?.province?.name}`}</h6>
        </div>
      </div>
      <div className="detail__card-5">
        <div>
          <p>{jobDetail.company?.rates?.length}</p>
          <Rating
            name="read-only"
            precision={0.5}
            readOnly
            defaultValue={jobDetail.company?.rates?.length}
          />
        </div>
        <Button name="Ứng tuyển"></Button>
      </div>
    </div>
  )
}

InformationCompany.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default InformationCompany
