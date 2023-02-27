import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/shared/Button";
import CustomInput from "src/components/shared/CustomInput";
import InputFile from "src/components/shared/InputFile";
import SelectCustom from "src/components/shared/Select";
import { updateUser } from "src/store/slices/main/user/userSlice";
import "./styles.scss";
import { genderList, schema } from "./validateForm";

const ProfileForm = ({ profile: user }) => {
  const { t } = useTranslation('client')
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { role } = useSelector((state) => state.profile);
  const userStorage =
    JSON.parse(sessionStorage.getItem("userPresent")) ||
    JSON.parse(localStorage.getItem("userPresent"));
  const dispatch = useDispatch();

  useEffect(() => {
    setValue("firstName", user?.user?.firstName || user?.userDTO?.firstName);
    setValue("lastName", user?.user?.lastName || user?.userDTO?.lastName);
    setValue("email", user?.user?.email || user?.userDTO?.email);
    setValue("phone", user?.user?.phone || user?.userDTO?.phone);
    setValue("gender", user?.user?.gender);
  }, [user, setValue]);

  const onSubmit = (data) => {
    const userPost = {
      userStorage,
      role,
    };
    switch (role) {
      case "Role_HR": {
        const profileData = {
          hr: JSON.stringify({
            user: {
              username: user?.user?.username,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
              firstName: data.firstName,
              lastName: data.lastName,
              role: user?.user?.role,
            },
            position: user?.position,
            company: { id: user?.company?.id },
          }),
          fileAvatar: data.avatar,
        };
        dispatch(updateUser([userPost, profileData, user.id]));
        break;
      }
      case "Role_Candidate": {
        const profileData = {
          candidate: JSON.stringify({
            createUser: {
              id: parseInt(user?.user.id),
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
            },
            major: {
              id: user?.major.id,
            },
          }),
          fileAvatar: data.avatar,
          fileCV: user?.cv,
        };
        dispatch(updateUser([userPost, profileData]));
        break;
      }
      case "Role_Partner": {
        const profileData = {
          avatar: data.avatar,
          partner: JSON.stringify({
            id: parseInt(user.id),
            position: user?.position,
            userCreationDTO: {
              // username: user?.user.username,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: parseInt(data.gender),
              phone: data.phone,
              email: user?.user?.email,
            },
          }),
        };
        dispatch(updateUser([userPost, profileData]));
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <form className="profile-form__wrapper" autoComplete="off">
        <Typography variant="button" style={{ fontSize: 22 }}>
          {t("editInformation")}
        </Typography>
        <div className="profile-form__content">
          <p className="title-requirement">
            (<span className="field-requirment"> * </span>){t("requiredFieldTL")}
          </p>
          <div className="profile-form__content-item">
            <InputFile
              label={t("avatarTL")}
              requirementField={false}
              id="avatar"
              format="image"
              radius="2px"
              setValue={setValue}
              register={register}
              imageCurrent={user?.user?.avatar}
            >
              {errors.avatar?.message}
            </InputFile>
          </div>
          <div className="profile-form__content-item">
            <CustomInput
              register={register}
              setValue={setValue}
              id="lastName"
              label={t("lastNameTL")}
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.lastName?.message}
            </CustomInput>
            <CustomInput
              register={register}
              setValue={setValue}
              id="firstName"
              label={t("firstNameTL")}
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.firstName?.message}
            </CustomInput>
          </div>
          <div className="profile-form__content-item">
            <SelectCustom
              setValue={setValue}
              id="gender"
              register={register}
              label={t("genderTL")}
              defaultValue={user?.user?.gender}
              options={genderList}
              placeholder={t("pleaseSelectTL")}
            >
              {errors.gender?.message}
            </SelectCustom>
            <CustomInput
              register={register}
              setValue={setValue}
              id="phone"
              type="text"
              label={t("phoneNumberTL")}
              className="profile-form__input"
              radius="2px"
              height="45px"
              border="1px solid #777777"
            >
              {errors.phone?.message}
            </CustomInput>
          </div>
        </div>
        <div className="profile-form__action">
          <Button
            name={t("saveTL")}
            bheight={44}
            onClick={handleSubmit(onSubmit)}
            fz="14px"
            outline="1.5px solid #DEDEDE"
            className="profile-form__action-btn"
          />
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
