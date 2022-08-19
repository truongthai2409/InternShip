import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import "./styles.scss";
import Grid from "@mui/material/Grid";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import { Tab, Tabs } from "@mui/material";
import ContentBaseInformation from "../ContentBaseInfomation";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Appreciate from "../Appreciate";

import StarIcon from "@mui/icons-material/Star";
import "./styles.scss";
import {
  addAppreciate,
  getAppreciateByCompany,
} from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import ArrowButton from "src/components/ArrowButton";
import Modal from "src/components/Modal";
import Textarea from "src/components/Textarea";
import { useForm } from "react-hook-form";
import CustomInput from "src/components/CustomInput";
import CustomCheckbox from "src/components/CustomCheckbox";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../Appreciate/validate";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";
import DemandPartner from "../Demand";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const currentPage = 1;
const limit = 5;

const BaseInformationCompany = ({
  jobDetail,
  jobDetailById,
  information,
  pl,
  pr,
  ml,
  mt,
  appreciateList,
  pdLeft,
  pdRight,
  pdTop,
  pdBottom,
  mgLeft,
  isPartner,
  jobListCompany,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const { profile } = useSelector((state) => state.authentication);
  var checked = false;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [valueTab, setValueTab] = useState(0);
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { demandListUniversity } = useSelector((state) => state.demand);
  const uniId = jobDetail?.universityDTO?.id;
  const idCompany = jobDetail?.hr?.company.id;

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [uniId]);

  const handleChange = (event, newValue) => setValueTab(newValue);

  let topAppreciate = [];
  for (let i = 0; i < 1; i++) {
    topAppreciate.push(appreciateList?.[i]);
  }
  const handleBackClick = () => {
    navigate(-1);
  };
  const data = [];
  for (let i = 0; i < appreciateList?.length; i++) {
    data.push(appreciateList[i].score);
  }

  const res = data?.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);
  const rating = (res / data?.length).toFixed(2);

  const handleOpen = () => {
    if (profile.token) {
      setOpen(true);
      reset();
    } else {
      toast.error("Bạn cần đăng nhập để đánh giá công ty", {
        // position: "top-center",
        // autoClose: 3000,
      });
    }
  };

  const onSubmit = async (data) => {
    const username = JSON.parse(localStorage.getItem("userPresent"))?.username;
    const avaluateData = {
      comment: data.comment,
      score: valueRating,
      company: {
        id: idCompany,
      },
      user: {
        username: username,
      },
      title: data.title,
      hide: checked,
    };

    try {
      const res = await dispatch(addAppreciate(avaluateData));
      await dispatch(getAppreciateByCompany(idCompany));
      if (res.payload.status === 200) {
        toast.success("Đã đăng đánh giá", {});
      } else {
        toast.error(
          "Có lỗi hoặc bạn đã từng đăng đánh giá, vui lòng kiểm tra lại"
        );
      }
    } catch (error) {
      if (error.status === 400) {
        for (const key in error.data) {
          setError(key, {
            type: "server",
            message: error.data[key],
          });
        }
      }
    }

    reset();
    setOpen(false);
  };

  const handleCheck = async (e) => {
    const check = e.target.checked;
    checked = check;
  };
  const handleChangeLink = (event, newValue) => {
    setValueTab(1);
  };
  const handleChangeLinkViewAvaluate = (event, newValue) => {
    setValueTab(1);
  };

  const handleChangeAvaluate = (event, newValue) => {
    setValueTab(1);
    setOpen(true);
  };
  return (
    <div className="">
      {jobDetailById && (
        <div className="base__information">
          {/* base */}
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

            {/* body */}
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
              <Link to={`/candidate/information_company/${jobDetail?.id}`}>
                <Button name="Xem thêm" bwidth="130px" bheight="40px"></Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
      {/* Nếu trang home thì bỏ tab còn trang information thì có tab */}
      {information ? (
        <div>
          {jobDetail && (
            <div
              className={`base__information`}
              style={{
                marginTop: mt ? `${mt}` : "",
                paddingLeft: pdLeft ? `${pdLeft}` : "",
                paddingRight: pdRight ? `${pdRight}` : "",
                paddingTop: pdTop ? `${pdTop}` : "",
                paddingBottom: pdBottom ? `${pdBottom}` : "",
              }}
            >
              <Box sx={{}}>
                <div className="base__information-card">
                  <div
                    style={{
                      marginRight: "16px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 135,
                        height: 135,
                        backgroundColor: "transparent",
                        // border: "0.5px solid #dedede",
                        borderRadius: "6px",
                        marginRight: "20px",
                      }}
                    >
                      <img
                        className="img-logo"
                        alt=""
                        src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
                      />
                    </Box>
                  </div>

                  <div className="base__information-card-detail">
                    <h3 className="company-name">
                      {jobDetail?.hr?.company.name}
                    </h3>

                    <div className="">
                      <PhoneInTalkIcon />
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
                        <EmailIcon />
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
                        <LanguageIcon />
                        <a
                          href={jobDetail?.hr?.company.website}
                          className="fix-fontSize "
                        >
                          {jobDetail?.hr?.company.website}
                        </a>
                      </h5>

                      <div className=" base__information-card-detail-location">
                        <LocationOnIcon />
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontSize: 16,
                            fontWeight: "400",
                            transform: "translate(5px,-5px)",
                          }}
                        >
                          {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>

              <Box>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mt: 1,
                    fontSize: 3,
                  }}
                >
                  <Tabs
                    value={valueTab}
                    aria-label="basic tabs example"
                    textColor="primary"
                    scrollButtons
                    onChange={handleChange}
                  >
                    <Tab
                      label="Công Việc"
                      {...a11yProps(0)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                    <Tab
                      label="Đánh giá"
                      {...a11yProps(1)}
                      textColor="inherit"
                      sx={{ fontSize: 12 }}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={valueTab} index={0}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                            paddingBottom: 2.5,
                          }}
                          elevation={0}
                        >
                          <div className="intro__company">
                            <h5
                              className="intro__company-title"
                              style={{ marginLeft: "25px" }}
                            >
                              Giới thiệu về công ty
                            </h5>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: jobDetail?.desciption,
                              }}
                              style={{
                                display: "flex",
                                alignItems: "start",
                                wordBreak: "break-word",
                                marginLeft: "25px",
                                textAlign: "justify",
                                paddingRight: "25px",
                              }}
                            ></div>
                          </div>
                        </Item>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                          elevation={0}
                        >
                          <ContentBaseInformation
                            jobDetail={jobDetail}
                            jobListCompany={jobListCompany}
                            pdLeft={"25px"}
                            pdRight="25px"
                            mgLeft="25px"
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                          elevation={0}
                        >
                          {information ? (
                            <div>
                              <Rating
                                precision={0.5}
                                readOnly
                                value={Number(rating)}
                                size="medium"
                                sx={{
                                  fontWeight: "800",
                                  fontSize: 32,
                                }}
                              />

                              <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                  fontWeight: "700",
                                  // transform: "translate(5px,5px)",
                                  fontSize: 13,
                                }}
                              >
                                {`${rating} trong ${appreciateList?.length} lượt đánh giá`}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignContent: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  className="button-card"
                                  name="Viết đánh giá"
                                  bwidth="150px"
                                  bheight="40px"
                                  onClick={handleChangeAvaluate}
                                ></Button>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </Item>
                        <Item
                          sx={{
                            paddingTop: 1,
                            paddingBottom: 2.3,
                          }}
                          elevation={0}
                        >
                          <h5
                            className="intro__company-title"
                            style={{
                              transform: "translate(-7px,0px)",
                            }}
                          >
                            Đánh giá mới nhất
                          </h5>
                          <div>
                            {topAppreciate?.map((appreciate, index) => (
                              <Appreciate appreciate={appreciate} key={index} />
                            ))}

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            ></div>
                          </div>
                          <div className="button-card">
                            <Link
                              to={`/candidate/information_company/${jobDetail?.id}`}
                              value={valueTab}
                              index={1}
                            >
                              <Button
                                name="Xem tất cả đánh giá"
                                bwidth="215px"
                                bheight="40px"
                                onClick={handleChangeLinkViewAvaluate}
                              ></Button>
                            </Link>
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value={valueTab} index={1}>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                          elevation={0}
                        >
                          {information ? (
                            <div>
                              <Rating
                                precision={0.5}
                                readOnly
                                value={Number(rating)}
                                size="large"
                                sx={{
                                  fontWeight: "800",
                                }}
                              />

                              <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                  fontWeight: "700",
                                  // transform: "translate(5px,5px)",
                                  fontSize: 15,
                                }}
                              >
                                {`${rating} trong ${appreciateList?.length} lượt đánh giá`}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignContent: "center",
                                  justifyContent: "center",
                                }}
                              ></div>
                            </div>
                          ) : (
                            ""
                          )}
                        </Item>
                        <Item
                          sx={{
                            paddingTop: 1,
                            paddingBottom: 2.3,
                            fontWeight: "600",
                          }}
                        >
                          <div
                            className="appreciate intro__company-title"
                            style={
                              {
                                // marginLeft: "12px",
                              }
                            }
                          >
                            <h4
                              style={{ marginTop: "0px", marginLeft: 0 }}
                              className=""
                            >
                              Đánh giá về công ty{" "}
                            </h4>
                            <Modal
                              modalTitle="Viết đánh giá"
                              open={open}
                              setOpen={setOpen}
                              iconClose={true}
                              children={
                                <div>
                                  <CustomInput
                                    label="Nhập tiêu đề"
                                    id="title"
                                    type="text"
                                    placeholder="Vd. Rất tuyệt"
                                    register={register}
                                    requirementField={false}
                                    setValue={setValue}
                                    height="45px"
                                  />
                                  <Textarea
                                    label="Viết đánh giá "
                                    id="comment"
                                    placeholder="Nhập vào đây"
                                    register={register}
                                    setValue={setValue}
                                    check={true}
                                    children="Bạn phải nhập trường này "
                                  >
                                    {errors.comment?.message}
                                  </Textarea>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Rating
                                      name="size-medium"
                                      value={valueRating}
                                      precision={0.5}
                                      // getLabelText={getLabelText}
                                      onChange={(event, newValue) => {
                                        setValueRating(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                      }}
                                      sx={{
                                        fontSize: "20px",
                                        color: "yellow",
                                      }}
                                      size="large"
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize="inherit"
                                        />
                                      }
                                    />
                                    {valueRating !== null && (
                                      <Box sx={{ ml: 2 }}>
                                        {/* {labels[hover !== -1 ? hover : valueRating]} */}
                                      </Box>
                                    )}
                                  </Box>
                                  <div onChange={handleCheck}>
                                    <CustomCheckbox label="Ẩn danh" />
                                  </div>
                                  <Button
                                    onClick={handleSubmit(onSubmit)}
                                    onChange={handleCheck}
                                    name="Đăng đánh giá"
                                  />
                                </div>
                              }
                              name="list-candidate"
                            />
                            <Button
                              name="Viết đánh giá"
                              bwidth="150px"
                              bheight="40px"
                              onClick={handleOpen}
                            ></Button>
                          </div>
                          <div>
                            {appreciateList?.map((appreciate, index) => (
                              <Appreciate
                                appreciate={appreciate}
                                key={appreciate.id}
                              />
                            ))}
                          </div>
                          <div
                            className="demand-detail__back"
                            onClick={handleBackClick}
                          >
                            <ArrowButton direction="left" text="Trở lại" />
                          </div>
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,
                          }}
                        >
                          <ContentBaseInformation
                            jobDetail={jobDetail}
                            jobListCompany={jobListCompany}
                            hideMark={true}
                          />
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </Box>
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
                  <h3 className="company-name">
                    {jobDetailById?.company.name}
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
              <div className="job-applying-container"></div>
              {pathUrl !== "/information_company" ? (
                <div className="button-card">
                  <Link to={`/candidate/information_company/${jobDetail?.id}`}>
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
      ) : (
        // trang home
        <div>
          <div>
            {jobDetail && (
              <div
                className={`base__information`}
                style={{
                  marginTop: mt ? `${mt}` : "",
                  // border: '1px solid black'
                  paddingLeft: pdLeft ? `${pdLeft}` : "",
                  paddingRight: pdRight ? `${pdRight}` : "",
                  paddingTop: pdTop ? `${pdTop}` : "",
                  paddingBottom: pdBottom ? `${pdBottom}` : "",
                }}
              >
                <Box sx={{}}>
                  <div className="base__information-card">
                    <div
                      style={{
                        marginRight: "16px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 135,
                          height: 135,
                          backgroundColor: "transparent",
                          // border: "0.5px solid #dedede",
                          borderRadius: "6px",
                          marginRight: "20px",
                        }}
                      >
                        <img
                          className="img-logo"
                          alt=""
                          src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
                        />
                      </Box>
                    </div>

                    <div className="base__information-card-detail">
                      <h3 className="company-name">
                        {jobDetail?.hr?.company.name}
                      </h3>

                      <div className="">
                        <PhoneInTalkIcon />
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
                          <EmailIcon />
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
                          <LanguageIcon />
                          <a
                            href={jobDetail?.hr?.company.website}
                            className="fix-fontSize "
                          >
                            {jobDetail?.hr?.company.website}
                          </a>
                        </h5>

                        <div className=" base__information-card-detail-location">
                          <LocationOnIcon />
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              fontSize: 16,
                              fontWeight: "400",
                              transform: "translate(5px,-5px)",
                            }}
                          >
                            {`${jobDetail?.locationjob?.address} ${jobDetail?.locationjob?.district.province.name}`}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>

                <Box>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      mt: 1,
                      fontSize: 3,
                    }}
                  ></Box>
                  <TabPanel value={valueTab} index={0}>
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Item
                            sx={{
                              marginTop: 3,
                              marginBottom: 3,
                              paddingBottom: 2.5,
                            }}
                            elevation={0}
                          >
                            <div className="intro__company">
                              <h5
                                className="intro__company-title"
                                style={{ marginLeft: "25px" }}
                              >
                                Giới thiệu về công ty
                              </h5>
                              {/* <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontSize: 17,
                            fontWeight: "400",
                            transform: "translate(5px,5px)",
                          }}
                        >
                          {jobDetail?.hr?.company.description}
                        </Typography> */}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: jobDetail?.desciption,
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "start",
                                  wordBreak: "break-word",
                                  marginLeft: "25px",
                                  textAlign: "justify",
                                  paddingRight: "25px",
                                }}
                              ></div>
                            </div>
                          </Item>
                          <Item
                            sx={{
                              marginTop: 3,
                              marginBottom: 3,
                            }}
                          >
                            <ContentBaseInformation
                              jobDetail={jobDetail}
                              jobListCompany={jobListCompany}
                              pdLeft={"25px"}
                              pdRight="25px"
                              hideMark={true}
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                </Box>
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
                    <h3 className="company-name">
                      {jobDetailById?.company.name}
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
                  <h5 className="intro__company-title">
                    Giới thiệu về công ty
                  </h5>
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

                {pathUrl !== "/information_company" ? (
                  <div className="button-card">
                    <Link
                      to={`/partner/information_school/${jobDetail?.universityDTO.id}`}
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
      )}
    </div>
  );
};

BaseInformationCompany.propTypes = {};

export default BaseInformationCompany;
