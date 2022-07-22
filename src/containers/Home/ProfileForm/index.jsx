import "./styles.scss";
import Button from "src/components/Button";
import ButtonOutline from "src/components/ButtonOutline";
import CustomInput from "src/components/CustomInput";
import { useForm } from "react-hook-form";
import { schema } from "./validateForm";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectCustom from "src/components/Select";
import { useEffect, useState } from "react";
import { genderList } from "./validateForm";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "src/store/slices/Admin/user/userSlice";

const ProfileForm = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setValue("firstName", user.user.firstName);
    setValue("lastName", user.user.lastName);
    setValue("phone", user.user.phone);
  }, []);

  const onSubmit = (data) => {
    const profileData = {
      hr: JSON.stringify({
        user: {
          username: user?.user.username,
          gender: parseInt(data.gender),
          phone: data.phone,
          email: user.user.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: user.user.role,
        },
        position: user.position,
        company: { id: user.company?.id },
      }),
    };
    dispatch(updateUser([profileData, user?.id]));
    onClick();
  };

  return (
    <>
      <form
        className="profile-form__wrapper"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="profile-form__content">
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="lastName"
              label="Họ"
              requirementField={false}
              className="profile-form__input"
            >
              {errors.lastName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="firstName"
              label="Tên"
              requirementField={false}
              className="profile-form__input"
            >
              {errors.firstName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <SelectCustom
              register={register}
              id="gender"
              label="Giới tính"
              defaultValue={user.user.gender}
              requirementField={false}
              options={genderList}
            >
              {errors.gender?.message}
            </SelectCustom>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              id="phone"
              type="number"
              label="Số điện thoại"
              requirementField={false}
              className="profile-form__input"
            >
              {errors.phone?.message}
            </CustomInput>
          </div>
        </div>
        <div className="profile-form__action">
          <Button
            name="Lưu"
            onClick={handleSubmit(onSubmit)}
            fz="14px"
            outline="1.5px solid #DEDEDE"
            className="profile-form__action-btn"
          />
          <span style={{ margin: "0 4px" }}></span>
          <ButtonOutline
            name="Hủy"
            onClick={onClick}
            bg="#F3F4F6"
            outline="1.5px solid #DEDEDE"
            color="#111111"
            fz="14px"
            className="profile-form__action-btn"
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
