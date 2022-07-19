import React, { useEffect } from "react";
import "./styles.scss";
import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import notificationSlice from "../../../../store/slices/notifications/notificationSlice";
import {
  errorSelector,
  statusSelector,
} from "../../../../store/selectors/main/registerSelectors";
import { genderList, schema } from "./data";
import { getMajorList } from "../../../../store/slices/Admin/major/majorSlice";
import SelectCustom from "../../../../components/Select";

const CandidateInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const errorMessage = useSelector(errorSelector);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getMajorList());
  }, [dispatch]);

  const status = useSelector(statusSelector);

  if (status === "success") {
    dispatch(notificationSlice.actions.successMess("Đăng ký thành công"));
  } else if (status === "fail") {
    dispatch(notificationSlice.actions.errorMess("Có lỗi xảy ra"));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const step2Data = JSON.parse(sessionStorage.getItem("account"));
    const userData = {
      fileCV: data.cv[0],
      fileAvatar: data.avatar[0],
      candidate: JSON.stringify({
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
        major: {
          id: parseInt(data.major),
        },
      }),
    };
    // dispatch(registerUser(userData));
  };
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <div className="reg-candidate">
      <form
        className="reg-candidate__form"
        autoComplete="off"
        encType="multipart/form-data"
      >
        <CustomInput
          label="Tài khoản"
          id="username"
          type="text"
          placeholder="Tài khoản..."
          register={register}
        >
          {errors.username?.message}
          {errorMessage?.Username}
        </CustomInput>
        <CustomInput
          label="Email"
          id="email"
          type="email"
          placeholder="Email..."
          register={register}
        >
          {errors.email?.message}
          {errorMessage?.Email}
        </CustomInput>
        <CustomInput
          label="Mật khẩu"
          id="password"
          type="password"
          placeholder="Mật khẩu"
          register={register}
        >
          {errors.password?.message}
          {errorMessage?.Password}
        </CustomInput>

        <CustomInput
          label="Xác nhận mật khẩu"
          id="passwordConfirmation"
          type="password"
          placeholder="Xác nhận mật khẩu"
          register={register}
        >
          {errors.passwordConfirmation?.message}
        </CustomInput>

        <p className="reg-candidate__title-infor">Cập nhật thông tin</p>
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
            {errors?.firstname?.message}
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
        <SelectCustom
          label="Giới tính"
          placeholder="Vui lòng chọn..."
          options={genderList}
          id="gender"
          register={register}
        >
          {errors.phone?.message}
        </SelectCustom>
        <SelectCustom
          label="Chuyên ngành"
          placeholder="Vui lòng chọn..."
          options={majorList}
          id="major"
          register={register}
        >
          {errors.major?.message}
        </SelectCustom>
        <CustomInput
          label="Ảnh đại diện"
          id="avatar"
          type="file"
          register={register}
        >
          {errors.avatar?.message}
        </CustomInput>

        <CustomInput label="CV" id="cv" type="file" register={register}>
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
