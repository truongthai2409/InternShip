import React from "react";
import "./styles.scss";
import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput/index";
import Select from "../../../../components/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../store/slices/main/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { genderList, schoolList, schema } from "./data";
import { errorSelector } from "src/store/selectors/main/registerSelectors";
import SelectCustom from "../../../../components/Select";



const PartnerInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector(errorSelector);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const onSubmit = (data) => {
    const step2Data = JSON.parse(sessionStorage.getItem("account"));
    const userData = {
      school: data.school,
      position: data.position,
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
    dispatch(registerUser(userData, navigate));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="reg-partner">
      <form
        className="reg-partner__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
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

        <p className="reg-partner__title-infor">Cập nhật thông tin</p>
        <div className="reg-partner__form--name">
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
          label="Giới tính"
          placeholder="Vui lòng chọn..."
          options={genderList}
          id="gender"
          register={register}
        />

        <CustomInput
          label="Ảnh đại diện"
          id="avatar"
          type="file"
          register={register}
          check={true}
        >
          {errors.avatar?.message}
        </CustomInput>

        <SelectCustom
          label="Trường"
          selectOptions={schoolList}
          id="school"
          register={register}
        />

        <SelectCustom
          label="Vai trò tại trường"
          id="position"
          type="text"
          placeholder="Vị trí"
          register={register}
        >
          {errors.position?.message}
        </SelectCustom>

        <div className="reg-partner__btns">
          <div className="reg-partner__btns--item" onClick={handleBackClick}>
            <ArrowButton text="Trở lại" direction="left" />
          </div>
          <div className="reg-partner__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PartnerInfo;
