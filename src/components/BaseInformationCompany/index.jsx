import React, { useEffect } from 'react'
import Rating from '@mui/material/Rating'
import './styles.scss'
import JobCandidate from '../Job'
import Grid from '@mui/material/Grid'
import Button from '../Button'
import { useSelector, useDispatch } from 'react-redux'
import { getRatingCompany } from 'src/store/slices/main/home/rating/rating'
import { Link } from 'react-router-dom'
import { getJobByCompany } from 'src/store/slices/main/home/job/jobSlice'
import { Typography } from '@mui/material'

function BaseInformationCompany(props) {
  const dispatch = useDispatch()
  // const { rating } = useSelector(state => state.rating)
  const { jobListCompany } = useSelector(state => state.job)
  const idCompany = props.jobDetail?.hr?.company.id
  const jobDetail = props.jobDetail
  useEffect(() => {
    dispatch(getRatingCompany(idCompany))
    dispatch(getJobByCompany(idCompany))
  }, [idCompany, dispatch])
  return (
    <div className="">
      <div className="base__information">
        <h3 className="company-name">{}</h3>
        <div className="base__information-card">
          <img
            className="img-logo"
            alt=""
            src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
          />
          <div className="base__information-card-detail">
            <div className="">
              <h5>Mã số thuế: </h5>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: '400',
                  transform: 'translate(5px,5px)'
                }}
              >
                {jobDetail?.hr?.company.tax}
              </Typography>
            </div>
            <div className="">
              <h5>Số điện thoại: </h5>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 17,
                  fontWeight: '400',
                  transform: 'translate(5px,5px)'
                }}
              >
                {jobDetail?.hr?.company.phone}
              </Typography>
            </div>
            <div className="">
              <h5>
                Email:
                <a href={jobDetail?.hr?.company.email} className="fix-fontSize">
                  {jobDetail?.hr?.company.email}
                </a>
              </h5>
            </div>
            <div className="detail-website">
              <h5>
                Website:
                <a
                  href={jobDetail?.hr?.company.website}
                  className="fix-fontSize"
                >
                  {jobDetail?.hr?.company.website}
                </a>
              </h5>

              <div className=" base__information-card-detail-location">
                <h5 className="">Địa điểm:</h5>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: '400',
                    transform: 'translate(5px,5px)'
                  }}
                >
                  {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                </Typography>
              </div>
            </div>

            {props.information ? (
              <div>
                <Rating
                  name="read-only"
                  precision={0.5}
                  readOnly
                  defaultValue={jobDetail?.hr?.company.rates.length}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: '400',
                    transform: 'translate(5px,5px)'
                  }}
                >
                  5.0 trong 48 lượt đánh giá
                </Typography>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="intro__company">
          <h5 className="intro__company-title">Giới thiệu về công ty</h5>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 17,
              fontWeight: '400',
              transform: 'translate(5px,5px)'
            }}
          >
            {jobDetail?.hr?.company.description}
          </Typography>
        </div>
        <div className="job-applying-container">
          <h5 className="intro__company-title">Việc làm đang tuyển</h5>
          <Grid
            container
            spacing={3}
            sx={{
              paddingLeft: `${props.pl}px`,
              paddingRight: `${props.pr}px`,
              marginLeft: `${props.ml}px`
            }}
          >
            {/* {jobListCompany.map((job, index) => {
              <Grid key={job.id} item lg="auto" md="auto" xs={6}>
                <JobCandidate job={job} />
              </Grid>;
            })} */}
            {jobListCompany?.map(job => (
              <Grid item lg="auto" md="auto" sm="auto" xs="auto">
                <JobCandidate job={job} key={job.id} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="button-card">
          <Link to="/candidate/information_company">
            <Button name="Xem thêm"></Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

BaseInformationCompany.propTypes = {}

export default BaseInformationCompany
