import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import CustomInput from "../CustomInput";
import "./styles.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validate";
import Button from "../Button";
import { updateUserPassword } from "src/store/slices/main/login/loginSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const Password = () => {
  const { profile } = useSelector((state) => state.authentication);
  const {
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    register,
  } = useForm({
    defaultValues: {
      passwordOld: "",
      passwordNew: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (profile.role !== undefined) {
      const body = {
        token: profile.token,
        dataChangePassword: {
          newPassword: data.passwordNew,
          oldPassword: data.passwordOld,
        },
      };
      try {
        const res = await dispatch(updateUserPassword(body)).then(unwrapResult);
        reset();
        if (res.status === 200) {
          toast.success("Đổi mật khẩu thành công", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          toast.success("Đổi mật khẩu thất bại vui lòng kiểm tra lại", {
            position: "top-center",
            autoClose: 3000,
          });
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
    }
  };

  return (
    <div className="container password">
      <h4>Đổi mật khẩu</h4>
      <Typography variant="subtitle2" component="div" sx={{ fontSize: 16 }}>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Mật Khẩu Cũ"
          id="passwordOld"
          type="password"
          placeholder="Mật Khẩu Cũ"
          register={register}
          visibility
        >
          {errors.passwordOld?.message}
          {/* {errorMessage?.Password} */}
        </CustomInput>
        <CustomInput
          label="Mật Khẩu Mới"
          id="passwordNew"
          type="password"
          placeholder="Mật Khẩu Mới"
          register={register}
          visibility
        >
          {errors.passwordNew?.message}
          {/* {errorMessage?.Password} */}
        </CustomInput>
        <CustomInput
          label="Nhập Lại Mật Khẩu
"
          id="confirmPasswordNew"
          type="password"
          placeholder="Nhập Lại Mật Khẩu
"
          register={register}
          visibility
        >
          {errors.confirmPasswordNew?.message}
        </CustomInput>
        <div className="">
          <Button name="Lưu" onClick={handleSubmit(onSubmit)}></Button>
        </div>
      </form>
    </div>
  );
};
export default Password;
