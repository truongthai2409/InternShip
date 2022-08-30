import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate";
import { useNavigate } from "react-router-dom";
import CustomInput from "src/components/CustomInput";
import Button from "src/components/Button";

const Password = () => {
  const { profile } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("data", data);
  };
  const handleClear = () => {
    reset();
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="change-password__wrapper">
        <form action="" className="change-password__container">
          <h1 className="change-password__title">Đổi mật khẩu</h1>
          <CustomInput
            id="oldPassword"
            type="password"
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu"
            visibility={true}
            register={register}
          >
            {errors.oldPassword?.message}
          </CustomInput>
          <CustomInput
            id="newPassword"
            type="password"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu"
            visibility={true}
            register={register}
          >
            {errors.newPassword?.message}
          </CustomInput>
          <CustomInput
            id="confirmNewPassword"
            type="password"
            label="Nhập lại mật khẩu"
            placeholder="Nhập mật khẩu"
            visibility={true}
            register={register}
          >
            {errors.confirmNewPassword?.message}
          </CustomInput>
          <div className="change-password__actions">
            <Button onClick={handleSubmit(onSubmit)} bwidth="60%">
              Lưu
            </Button>
            <Button bg="#f3f4f6" color="#111" bwidth="40%" border="none">
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Password;
