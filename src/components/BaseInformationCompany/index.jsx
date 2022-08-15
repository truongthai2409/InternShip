import React, { useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./styles.scss";
import JobCandidate from "../Job";
import Grid from "@mui/material/Grid";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { getRatingCompany } from "src/store/slices/main/home/rating/rating";
import { Link, useLocation } from "react-router-dom";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";
import { Typography } from "@mui/material";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";
import DemandPartner from "../Demand";

const currentPage = 1
const limit = 5
function BaseInformationCompany({
  jobDetail,
  jobDetailById,
  information,
  pl,
  pr,
  ml,
  mt,
  rating,
  appreciateList,
  isPartner = false,
}) {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  // const { rating } = useSelector((state) => state.rating);
  const { jobListCompany } = useSelector((state) => state.job);
  const { demandListUniversity } = useSelector((state) => state.demand);
  const idCompany = jobDetail?.hr?.company.id;
  const uniId = jobDetail?.universityDTO?.id;
  console.log(uniId, demandListUniversity);
  useEffect(() => {
    dispatch(getRatingCompany(idCompany));
    dispatch(getJobByCompany(idCompany));
  }, [idCompany]);

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }))
  }, [uniId])
  return (
    <div className="">
      {!isPartner ? (
        <div
          className={`base__information`}
          style={{
            marginTop: mt ? `${mt}` : "",
            // border: '1px solid black'
          }}
        >
          <div className="base__information-card">
            <div
              style={{
                marginRight: "16px",
              }}
            >
              <img
                className="img-logo"
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
              />
              {information ? (
                <div>
                  <Rating
                    name="read-only"
                    precision={0.5}
                    readOnly
                    value={Number(rating)}
                  />
                  {/* <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  sx={{ fontSize: 24 }}
                /> */}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 17,
                      fontWeight: "400",
                      transform: "translate(5px,5px)",
                    }}
                  >
                    {`${rating} trong ${appreciateList?.length} lượt đánh giá`}
                  </Typography>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="base__information-card-detail">
              <h3 className="company-name">{jobDetail?.hr?.company.name}</h3>
              <div className="">
                <h5>Mã số thuế: </h5>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
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
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                  }}
                >
                  {jobDetail?.hr?.company.phone}
                </Typography>
              </div>
              <div className="fix__margin">
                <h5>
                  Email:
                  <a
                    href={`mailto:${jobDetail?.hr?.company.email}`}
                    className="fix-fontSize fix__margin"
                  >
                    {jobDetail?.hr?.company.email}
                  </a>
                </h5>
              </div>
              <div className="detail-website">
                <h5 className="fix__margin">
                  Website:
                  <a
                    href={jobDetail?.hr?.company.website}
                    className="fix-fontSize "
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
                      fontWeight: "400",
                      transform: "translate(5px,5px)",
                    }}
                  >
                    {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="intro__company">
            <h5 className="intro__company-title">Giới thiệu về công ty</h5>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: 17,
                fontWeight: "400",
                transform: "translate(5px,5px)",
              }}
            >
              {jobDetail?.hr?.company.description}
            </Typography>
          </div>
          <div className="job-applying-container">
            <h5 className="intro__company-title intro__company-title-appling">
              Việc làm đang tuyển
            </h5>
            <Grid
              container
              spacing={3}
              // sx={{
              //   paddingLeft: `${pl}px`,
              //   paddingRight: `${pr}px`,
              //   marginLeft: `${ml}px`,
              // }}
            >
              {jobListCompany.length > 0 &&
                jobListCompany?.map((job) => (
                  <Grid
                    item
                    lg="auto"
                    md="auto"
                    sm="auto"
                    xs="auto"
                    key={job.id}
                    sx={
                      {
                        // paddingLeft: `0px`,
                      }
                    }
                  >
                    <JobCandidate job={job} key={job.id} idJob={job.id} />
                  </Grid>
                ))}
            </Grid>
          </div>
          {pathUrl !== "/information_company" ? (
            <div className="button-card">
              <Link to={`/candidate/information_company/${jobDetail?.id}`}>
                <Button name="Xem thêm" bwidth="130px" bheight="40px"></Button>
              </Link>
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className={`base__information`}
          style={{
            marginTop: mt ? `${mt}` : "",
            // border: '1px solid black'
          }}
        >
          <div className="base__information-card">
            <div
              style={{
                marginRight: "16px",
              }}
            >
              <img
                className="img-logo"
                alt=""
                src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
              />
              {information ? (
                <div>
                  <Rating
                    name="read-only"
                    precision={0.5}
                    readOnly
                    value={Number(rating)}
                  />
                  {/* <Rating
                  name="text-feedback"
                  value={value}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  sx={{ fontSize: 24 }}
                /> */}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 17,
                      fontWeight: "400",
                      transform: "translate(5px,5px)",
                    }}
                  >
                    {`${rating} trong ${appreciateList?.length} lượt đánh giá`}
                  </Typography>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="base__information-card-detail">
              <h3 className="company-name">{jobDetail?.universityDTO.name}</h3>
              <div className="">
                <h5>Số điện thoại: </h5>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                  }}
                >
                  {jobDetail?.universityDTO?.phone}
                </Typography>
              </div>
              <div className="fix__margin">
                <h5>
                  Email:
                  <a
                    href={`mailto:${jobDetail?.hr?.company.email}`}
                    className="fix-fontSize fix__margin"
                  >
                    {jobDetail?.universityDTO?.email}
                  </a>
                </h5>
              </div>
              <div className="detail-website">
                <h5 className="fix__margin">
                  Website:
                  <a
                    href={jobDetail?.universityDTO.website}
                    className="fix-fontSize "
                  >
                    {jobDetail?.universityDTO.website}
                  </a>
                </h5>

                <div className=" base__information-card-detail-location">
                  <h5 className="">Địa điểm:</h5>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 17,
                      fontWeight: "400",
                      transform: "translate(5px,5px)",
                    }}
                  >
                    {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="intro__company">
            <h5 className="intro__company-title">Giới thiệu về Trường</h5>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: 17,
                fontWeight: "400",
                transform: "translate(5px,5px)",
              }}
            >
              {jobDetail?.universityDTO.description}
            </Typography>
          </div>
          <div className="job-applying-container">
            <h5 className="intro__company-title intro__company-title-appling">
              Danh sách các đợt thực tập đang mở
            </h5>
            <Grid
              container
              spacing={3}
              // sx={{
              //   paddingLeft: `${pl}px`,
              //   paddingRight: `${pr}px`,
              //   marginLeft: `${ml}px`,
              // }}
            >
              {demandListUniversity?.contents?.length > 0 &&
                demandListUniversity?.contents.map((demand) => (
                  <Grid
                    item
                    lg="auto"
                    md="auto"
                    sm="auto"
                    xs="auto"
                    key={demand.id}
                    sx={
                      {
                        // paddingLeft: `0px`,
                      }
                    }
                  >
                    <DemandPartner demand={demand} key={demand.id} idDemand={demand.id} />
                  </Grid>
                ))}
            </Grid>
          </div>
          {pathUrl !== "/information_company" ? (
            <div className="button-card">
              <Link to={`/partner/information_school/${jobDetail?.universityDTO.id}`}>
                <Button name="Xem thêm" bwidth="130px" bheight="40px"></Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
      {jobDetailById && (
        <div className="base__information">
          <div className="base__information-card">
            <img
              className="img-logo"
              alt=""
              src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
            />
            <div className="base__information-card-detail">
              <h3 className="company-name">{jobDetailById?.company.name}</h3>
              <div className="">
                <h5>Mã số thuế: </h5>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                  }}
                >
                  {jobDetailById?.company.tax}
                </Typography>
              </div>
              <div className="">
                <h5>Số điện thoại: </h5>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                  }}
                >
                  {jobDetailById?.company.phone}
                </Typography>
              </div>
              <div className="">
                <h5>
                  Email:
                  <a
                    href={jobDetailById?.company.email}
                    className="fix-fontSize"
                  >
                    {jobDetailById?.company.email}
                  </a>
                </h5>
              </div>
              <div className="detail-website">
                <h5>
                  Website:
                  <a
                    href={jobDetailById?.company.website}
                    className="fix-fontSize"
                  >
                    {jobDetailById?.company.website}
                  </a>
                </h5>

                <div className=" base__information-card-detail-location">
                  <h5 className="">Địa điểm:</h5>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: 17,
                      fontWeight: "400",
                      transform: "translate(5px,5px)",
                    }}
                  >
                    {`${jobDetailById?.locationjob}`}
                  </Typography>
                </div>
              </div>
            </div>
            {information ? (
              <div>
                <Rating
                  name="read-only"
                  precision={0.5}
                  readOnly
                  defaultValue={jobDetailById?.company.rates.length}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                  }}
                >
                  {/* 5.0 trong 48 lượt đánh giá */}
                </Typography>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="intro__company">
            <h5 className="intro__company-title">Giới thiệu về công ty</h5>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: 17,
                fontWeight: "400",
                transform: "translate(5px,5px)",
              }}
            >
              {jobDetailById?.company.description}
            </Typography>
          </div>
          <div className="job-applying-container">
            <h5 className="intro__company-title">Việc làm đang tuyển</h5>
          </div>
          {pathUrl !== "/information_company" ? (
            <div className="button-card">
              <Link to="/candidate/information_company">
                <Button name="Xem thêm" bwidth="130px" bheight="40px"></Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

BaseInformationCompany.propTypes = {};

export default BaseInformationCompany;
