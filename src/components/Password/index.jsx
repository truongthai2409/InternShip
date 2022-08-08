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
            autoClose: 3000,
          });
        } else {
          toast.error("Đổi mật khẩu thất bại vui lòng kiểm tra lại", {
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
  const handleClear = () => {
    reset();
  };
  return (
    <div className=" password">
      <h4>Đổi mật khẩu</h4>
      <Typography variant="subtitle2" component="div" sx={{ fontSize: 16 }}>
        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="password-form">
        <img
          src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7886.jpg?w=740&t=st=1659012076~exp=1659012676~hmac=0c16b61c2f92a4795b0868b298a5f7a6f00307787552adf106ae9d43752c9488"
          alt="change-password"
        />
        <div>
          <CustomInput
            label="Mật Khẩu Cũ"
            id="passwordOld"
            type="password"
            placeholder="Mật Khẩu Cũ"
            register={register}
            visibility
            height="20px"
            top="20%"
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
            height="20px"
            top="20%"
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
            height="20px"
            top="20%"
          >
            {errors.confirmPasswordNew?.message}
          </CustomInput>
          <div className="button__change-password">
            <Button
              bwidth="100px"
              bheight="40px"
              name="Lưu"
              onClick={handleSubmit(onSubmit)}
            ></Button>
            <Button
              bwidth="100px"
              bheight="40px"
              name="Hủy"
              onClick={handleClear}
            ></Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Password;
