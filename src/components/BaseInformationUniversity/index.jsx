import React, { useEffect, useState } from "react";
import "./styles.scss";
import Grid from "@mui/material/Grid";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";

const currentPage = 1;
const limit = 5;

const BaseInformationUniversity = ({
  demandDetail,
  demandListUni,
  pl,
  pr,
  ml,
  mt,
  pdLeft,
  pdRight,
  pdTop,
  pdBottom,
  mgLeft,
}) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { demandListUniversity } = useSelector((state) => state.demand);
  const uniId = demandDetail?.universityDTO?.id;
  console.log(demandDetail);

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [dispatch, uniId]);


  return (
    <div className="">
      <div>
        <div>
          {demandDetail && (
            <div className="base__information">
              <div className="base__information-card">
                <img
                  className="img-logo"
                  alt=""
                  src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
                />
                <div className="base__information-card-detail">
                  <h3 className="company-name">
                    {demandDetail?.company.name}
                  </h3>
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
                      {demandDetail?.company.tax}
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
                      {demandDetail?.company.phone}
                    </Typography>
                  </div>
                  <div className="">
                    <h5>
                      Email:
                      <a
                        href={demandDetail?.company.email}
                        className="fix-fontSize"
                      >
                        {demandDetail?.company.email}
                      </a>
                    </h5>
                  </div>
                  <div className="detail-website">
                    <h5>
                      Website:
                      <a
                        href={demandDetail?.company.website}
                        className="fix-fontSize"
                      >
                        {demandDetail?.company.website}
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
                        {`${demandDetail?.locationjob}`}
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
                  {demandDetail?.company.description}
                </Typography>
              </div>

              {pathUrl !== "/information_company" ? (
                <div className="button-card">
                  <Link
                    to={`/partner/information_school/${demandDetail?.universityDTO.id}`}
                  >
                    <Button
                      name="Xem thêm"
                      bwidth="130px"
                      bheight="40px"
                    ></Button>
                  </Link>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BaseInformationUniversity.propTypes = {};

export default BaseInformationUniversity;
