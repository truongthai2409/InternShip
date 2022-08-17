import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
// import PropTypes from 'prop-types'
import BaseInformationCompany from "src/components/BaseInformationCompany";
import Button from "src/components/Button";
import Appreciate from "src/components/Appreciate";
import { useSelector, useDispatch } from "react-redux";
import { getJobById, getJobList } from "src/store/slices/main/home/job/jobSlice";
import "./styles.scss";
import { TabTitle } from "src/utils/GeneralFunctions";
import {
  addAppreciate,
  getAppreciateByCompany,
} from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import ArrowButton from "src/components/ArrowButton";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "src/components/Modal";
import Textarea from "src/components/Textarea";
import { useForm } from "react-hook-form";
import CustomInput from "src/components/CustomInput";
import CustomCheckbox from "src/components/CustomCheckbox";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate";

const labels = {
  0.5: "Vô dụng",
  1: "Vô dụng +",
  1.5: "Kém",
  2: "Kém +",
  2.5: "Được",
  3: "Ok +",
  3.5: "Tốt",
  4: "Tốt +",
  4.5: "Xuất sắc",
  5: "Xuất sắc +",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const CandidateInformationCompany = () => {
  TabTitle("Thông tin Công ty");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [valueRating, setValueRating] = useState(2);
  const [hover, setHover] = useState(-1);
  var checked = false;
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { appreciateList } = useSelector((state) => state.appreciate);
  const { profile } = useSelector((state) => state.authentication);
  const { jobDetailById } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  // console.log(keyword);
  const idCompany = jobDetailById?.hr?.company.id;
  // console.log(idCompany, jobDetailById);


  useEffect(() => {
    dispatch(getJobById(keyword));
  }, [keyword])
  useEffect(() => {
    dispatch(getAppreciateByCompany(idCompany));
  }, [idCompany]);

  useEffect(() => {
    dispatch(getJobList([1, 10]));
  }, []);

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
    const username = JSON.parse(sessionStorage.getItem("userPresent"))?.username;
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
        toast.success("Đã đăng đánh giá", {
          // position: "top-center",
          // autoClose: 3000,
        });
      } else {
        toast.error(
          "Có lỗi hoặc bạn đã từng đăng đánh giá, vui lòng kiểm tra lại",
          {
            // position: "top-center",
            // autoClose: 3000,
          }
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

  return (
    <div className="information-company__container">
      <BaseInformationCompany
        jobDetail={jobDetailById}
        information
        pl={0}
        pr={0}
        ml={0}
        rating={rating}
        appreciateList={appreciateList}
      />
    </div>
  );
};
CandidateInformationCompany.propTypes = {};

export default CandidateInformationCompany;
