

import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Collap from "src/components/Collaps/Collap";
import InputFile from "src/components/InputFile";
import SearchAutoComplete from 'src/components/SearchAutoComplete';
import SelectCustom from "src/components/Select";
import { errorSelector } from "src/store/selectors/main/registerSelectors";
import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { addUniversity, getUniversityList } from "src/store/slices/Admin/university/unversitySlice";
import {
  getDistrictList, getProvinceList
} from "src/store/slices/location/locationSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import { genderList, schema } from "src/utils/yupValidate";
import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from "../../../../components/CustomInput/index";
import "./styles.scss";
const API = process.env.REACT_APP_API
const countryList = [
  {
    id: 84,
    name: "Việt Nam",
  },
];
const PartnerInfo = () => {
  TabTitle("Đăng ký - Cộng tác viên trường");
  const [open, setOpen] = useState(false)
  const [info, setInfo] = React.useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { districtList, provinceList } = useSelector((state) => state.location);
  const { status, universityList } = useSelector((state) => state.university);
  const errorMessage = useSelector(errorSelector);

  useEffect(() => {
    dispatch(getMajorList([1, 20]));
    dispatch(getProvinceList());
    dispatch(getUniversityList([1, 200]))
  }, []);

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const onSubmit = async (data) => {
    const partnerData = {
      avatar: data.avatar || info.logo,
      logo: data.logo,
      university: JSON.stringify({
        name: data.schoolName,
        shortName: data.shortName,
        email: data.emailSchool,
        description: "mô tả",
        website: data.website,
        phone: data.phoneSchool,
        location: [
          {
            district: {
              id: data.district,
            },
            address: data.address,
            note: "",
          },
        ],
        type: {
          id: 1,
        },
      }),
      partner: JSON.stringify({
        position: data.position,
        userCreationDTO: {
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          firstName: data.firstname,
          lastName: data.lastname,
          phone: data.phone,
          gender: parseInt(data.gender),
          email: data.email,
          role: {
            id: parseInt(data.typeSchool),
          },
        },
      }),
    };

    dispatch(addUniversity(partnerData));
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (status === "success") {
    navigate("/login");
  }
  const typeSchoolList = [
    {
      id: 1,
      name: "Đại học"
    },
    {
      id: 2,
      name: "Cao đẳng"
    },
    {
      id: 3,
      name: "Trung cấp"
    }
  ]
  const handleLabel = (number) => {
    setInfo(number)
  }
  const handerClicker = () => {
    setOpen(!open)
    setInfo()
  }
  const renderInput = (label, id, type, check, message, bool) => {
    return (
      <CustomInput
        label={label}
        id={id}
        type={type}
        placeholder={label + "..."}
        register={register}
        requirementField={bool}
      >
        {message}
        {check}
      </CustomInput>
    )
  }
  return (
    <div className="reg-partner">
      <p className="title-requirement">
        (<span className="field-requirment"> * </span>)Trường bắt buộc
      </p>
      <form
        className="reg-partner__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="section-input__container">
          {renderInput("Tài khoản", "username", "text", errorMessage?.Username, errors.username?.message, true)}
          {renderInput("Email", "email", "text", errors.email?.message, errorMessage?.Email, true)}
        </div>
        <div className="section-input__container">
          <CustomInput
            label="Mật khẩu"
            id="password"
            type="password"
            placeholder="Mật khẩu"
            register={register}
            visibility={true}
            requirementField={true}
          >
            {errors.password?.message}
            {errorMessage?.Password}
          </CustomInput>

          <CustomInput
            label="Xác nhận mật khẩu"
            id="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            register={register}
            visibility={true}
            requirementField={true}
          >
            {errors.confirmPassword?.message}
          </CustomInput>
        </div>

        <Divider style={{ marginTop: '2rem' }} />
        <div className="reg-partner__form--name">
          <CustomInput
            label="Họ"
            id="lastName"
            type="text"
            placeholder="Họ..."
            register={register}
            requirementField={true}
          >
            {errors.lastname?.message}
          </CustomInput>

          <CustomInput
            label="Tên"
            id="firstName"
            type="text"
            placeholder="Tên..."
            register={register}
          >
            {errors.firstname?.message}
          </CustomInput>
        </div>

        <div className="section-input__container">
          <CustomInput
            label="Số điện thoại"
            id="phone"
            type="phone"
            placeholder="Vd. 0123-456-789"
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
            {errors.gender?.message}
          </SelectCustom>
        </div>
        <div className="reg-partner__form--name">
          <InputFile
            label="Ảnh đại diện"
            id="avatar"
            type="file"
            format="image"
            register={register}
            setValue={setValue}
            check={true}
            requirementField={false}
          >
            {errors.avatar?.message}
          </InputFile>
        </div>
        {!open ?
          <div className="customfilter">
            <SearchAutoComplete
              data={universityList}
              avatarRender={option => `${API}${option?.avatar}`}
              nameRender={(option) => option.name}
              labelName="Chọn Trường"
              onChange={(event, value) => handleLabel(value)}
            />
          </div> : ""}
        <div className="collap" onClick={() => handerClicker()}>
          <Collap
            title="Chưa có trường của bạn? Đăng kí ngay"
            children={
              <>
                <InputFile
                  label="Logo Trường"
                  id="logo"
                  type="file"
                  format="image"
                  setValue={setValue}
                  register={register}
                  requirementField={true}
                  check={true}
                >
                  {errors.logo?.message}
                </InputFile>
                <div className="section-input__container">
                  <CustomInput
                    label="Tên trường"
                    type="text"
                    id="schoolName"
                    placeholder="Vd. Đại học Bách Khoa"
                    register={register}
                  >
                    {errors.schoolName?.message}
                  </CustomInput>
                  <CustomInput
                    label="Tên viết tắt của trường"
                    type="text"
                    id="shortName"
                    placeholder="Vd. hust"
                    register={register}
                  >
                    {errors.shortName?.message}
                  </CustomInput>
                </div>

                <div className="section-input__container">
                  <CustomInput
                    label="Vai trò tại trường"
                    id="position"
                    type="text"
                    placeholder="Vai trò tại trường"
                    register={register}
                  >
                    {errors.position?.message}
                  </CustomInput>

                  <CustomInput
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="Vd. hust.edu.vn"
                    register={register}
                  >
                    {errors.website?.message}
                  </CustomInput>
                </div>

                <div className="section-input__container">
                  <CustomInput
                    label="Email của Trường"
                    id="emailSchool"
                    type="email"
                    placeholder="Email"
                    register={register}
                  >
                    {errors.emailSchool?.message}
                  </CustomInput>
                  <CustomInput
                    label="Số điện thoại của Trường"
                    id="phoneSchool"
                    type="text"
                    placeholder="Vd. 999-999-9999"
                    register={register}
                  >
                    {errors.phoneSchool?.message}
                  </CustomInput>
                </div>

                <SelectCustom
                  id="typeSchool"
                  label="Loại hình"
                  placeholder="Vui lòng chọn"
                  options={typeSchoolList}
                  register={register}
                >
                  {errors.typeSchool?.message}
                </SelectCustom>
                <div className={"row-3-col"}>
                  <div className={"university-register__select-location"}>
                    <SelectCustom
                      id="country"
                      label="Quốc gia"
                      placeholder="Vui lòng chọn"
                      options={countryList}
                      register={register}
                    >
                      {errors.country?.message}
                    </SelectCustom>
                  </div>
                  <div className={"university-register__select-location"}>
                    <SelectCustom
                      id="province"
                      label="Tỉnh/Thành phố"
                      placeholder="Vui lòng chọn"
                      dispatch={dispatch}
                      action={getDistrictList}
                      options={provinceList}
                      register={register}
                    >
                      {errors.province?.message}
                    </SelectCustom>
                  </div>
                  <div className={"university-register__select-location"}>
                    <SelectCustom
                      id="district"
                      label="Quận/Huyện"
                      placeholder="Vui lòng chọn"
                      options={districtList}
                      register={register}
                    >
                      {errors.district?.message}
                    </SelectCustom>
                  </div>
                </div>
                <CustomInput
                  label="Địa chỉ"
                  id="address"
                  type="text"
                  placeholder="Vd. 254, Dương Đình Hội"
                  register={register}
                >
                  {errors.address?.message}
                </CustomInput>

              </>
            }
          />
        </div>


        <div className="reg-hr__btns">
          <div className="reg-hr__btns--item" onClick={handleBackClick}>
            <ArrowButton fontSize="16px" text="Trở lại" direction="left" />
          </div>
          <div className="reg-hr__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PartnerInfo;
