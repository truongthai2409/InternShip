import React from "react";

import "./styles.scss";

import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput/index";
import Select from "../../../../components/Select";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../../../store/slices/main/register/registerSlice";
import notificationSlice from "../../../../store/slices/notifications/notificationSlice";
import { statusSelector } from "../../../../store/selectors/main/registerSelectors";

import { majorList, genderList, schema } from "./data";

const CandidateInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const status = useSelector(statusSelector);

  if (status === "success") {
    dispatch(notificationSlice.actions.successMess("Đăng ký thành công"));
  } else if (status === "fail") {
    dispatch(notificationSlice.actions.errorMess("Có lỗi xảy ra"));
  }

  const onSubmit = (data) => {
    const step2Data = JSON.parse(sessionStorage.getItem("account"));
    const userData = {
      major: {
        id: parseInt(data.major),
      },
      CV: data.cv,
      createUser: {
        username: step2Data.username,
        password: step2Data.password,
        confirmPassword: step2Data.confirmPassword,
        gender: parseInt(data.gender),
        lastName: data.lastname,
        firstName: data.firstname,
        phone: data.phone,
        email: step2Data.email,
        role: {
          id: parseInt(step2Data.role.id),
        },
      },
    };

    console.log(userData);

    dispatch(registerUser(userData));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="reg-candidate">
      <form
        className="reg-candidate__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="reg-candidate__form--name">
          <CustomInput
            label="Họ"
            id="lastname"
            type="text"
            placeholder="Họ..."
            register={register}
          >
            {errors.lastname?.message}
          </CustomInput>

          <CustomInput
            label="Tên"
            id="firstname"
            type="text"
            placeholder="Tên..."
            register={register}
          >
            {errors.firstname?.message}
          </CustomInput>
        </div>

        <CustomInput
          label="Số điện thoại"
          id="phone"
          type="phone"
          placeholder="Số điện thoại"
          register={register}
        >
          {errors.phone?.message}
        </CustomInput>

        <Select
          selectName="Chuyên ngành"
          selectOptions={majorList}
          id="major"
          register={register}
        />
        <Select
          selectName="Giới tính"
          selectOptions={genderList}
          id="gender"
          register={register}
        />

        {/* <label className="reg-candidate__form--label" htmlFor="gender">Chuyên ngành</label>
                <select {...register("major")} id="major" className="reg-candidate__form--select">
                    {
                        majorList.map((major) => <option value={major.id} key={major.id}>{major.name}</option>)
                    }
                </select> */}

        <CustomInput
          label="Avatar"
          id="avatar"
          type="file"
          register={register}
          check={true}
        >
          {errors.avatar?.message}
        </CustomInput>

        <CustomInput
          label="CV"
          id="cv"
          type="file"
          register={register}
          check={true}
        >
          {errors.cv?.message}
        </CustomInput>

        <div className="reg-candidate__btns">
          <div className="reg-candidate__btns--item" onClick={handleBackClick}>
            <ArrowButton text="Trở lại" direction="left" />
          </div>
          <div className="reg-candidate__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CandidateInfo;
