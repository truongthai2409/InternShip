import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
// import PropTypes from 'prop-types'
import BaseInformationCompany from "src/components/BaseInformationCompany";
import Button from "src/components/Button";
import Appreciate from "src/components/Appreciate";
import { useSelector, useDispatch } from "react-redux";
import { getJobList } from "src/store/slices/main/home/job/jobSlice";
import "./styles.scss";
import { TabTitle } from "src/utils/GeneralFunctions";
import {
  addAppreciate,
  getAppreciateByCompany,
} from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import ArrowButton from "src/components/ArrowButton";
import { useNavigate } from "react-router-dom";
import CandidateList from "../../HR/CandidateList";
import Modal from "src/components/Modal";
import Textarea from "src/components/Textarea";
import { useForm } from "react-hook-form";
import CustomInput from "src/components/CustomInput";
import CustomCheckbox from "src/components/CustomCheckbox";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const CandidateInformationCompany = () => {
  TabTitle("Thông tin Công ty");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const [isCheck, setIsCheck] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();

  const { appreciateList } = useSelector((state) => state.appreciate);
  const { jobDetail } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const idCompany = jobDetail?.hr?.company.id;
  React.useEffect(() => {
    dispatch(getAppreciateByCompany(idCompany));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getJobList([1, 10]));
  }, [dispatch]);

  const handleBackClick = () => {
    navigate(-1);
  };
  const data = [];
  for (let i = 0; i < appreciateList.length; i++) {
    data.push(appreciateList[i].score);
  }

  const res = data?.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);
  const rating = res / data.length;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleCheck = (e) => {
    const check = e.target.checked;
    setIsCheck(check);
    console.log(isCheck);
  };
  const onSubmit = (data) => {
    const username = JSON.parse(localStorage.getItem("userPresent"))?.username;
    const avaluateData = {
      comment: data.title,
      score: valueRating,
      company: {
        id: idCompany,
      },
      user: {
        username: isCheck === true ? username : "Ẩn danh",
      },
      title: data.avaluate,
      hide: isCheck,
    };
    console.log(avaluateData);
    dispatch(addAppreciate(avaluateData));
    reset();
    setOpen(false);
    //   if (res.status === 200) {
    //     toast.success("Đổi mật khẩu thành công", {
    //       position: "top-center",
    //       autoClose: 3000,
    //     });
    //   } else {
    //     toast.success("Đổi mật khẩu thất bại vui lòng kiểm tra lại", {
    //       position: "top-center",
    //       autoClose: 3000,
    //     });
    //   }
    // } catch (error) {
    //   if (error.status === 400) {
    //     for (const key in error.data) {
    //       setError(key, {
    //         type: "server",
    //         message: error.data[key],
    //       });
    //     }
    //   }
    // }
  };
  return (
    <div className="information-company__container">
      <BaseInformationCompany
        jobDetail={jobDetail}
        information
        pl={0}
        pr={0}
        ml={0}
        rating={rating}
        appreciateList={appreciateList}
      />
      <div className="appreciate">
        <h5 style={{ marginTop: "0px" }} className="intro__company-title">
          Đánh giá về công ty*{" "}
        </h5>
        <Modal
          modalTitle="Viết đánh giá về công ty"
          open={open}
          setOpen={setOpen}
          children={
            <div>
              <CustomInput
                label="Nhập tiêu đề hoặc để trống"
                id="title"
                type="text"
                placeholder="Vd. Rất tuyệt"
                register={register}
                requirementField={false}
                setValue={setValue}
                height="50px"
              />
              <Textarea
                label="Viết đánh giá về công ty"
                id="avaluate"
                placeholder="Nhập vào đây"
                register={register}
                setValue={setValue}
                check={true}
              />
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
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  sx={{
                    fontSize: "20px",
                  }}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {valueRating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : valueRating]}
                  </Box>
                )}
              </Box>
              <div onChange={(e) => handleCheck(e)}>
                <CustomCheckbox label="Ẩn danh" />
              </div>
              <Button onClick={handleSubmit(onSubmit)} name="Đăng đánh giá" />
            </div>
          }
          name="list-candidate"
        />
        <Button
          name="Viết đánh giá"
          bwidth="130px"
          bheight="40px"
          onClick={handleOpen}
        ></Button>
      </div>
      <div>
        {appreciateList?.map((appreciate) => (
          <Appreciate appreciate={appreciate} key={appreciate.id} />
        ))}
      </div>
      <div className="demand-detail__back" onClick={handleBackClick}>
        <ArrowButton direction="left" text="Trở lại" />
      </div>
    </div>
  );
};
CandidateInformationCompany.propTypes = {};

export default CandidateInformationCompany;
