import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Grid, Switch } from "@mui/material";

import "./styles.scss";
import CustomInput from "../../../components/CustomInput";
import CustomTextarea from "../../../components/CustomTextarea";
import Button from "../../../components/Button";
import cameraLogo from "../../../assets/img/camera.png";
import { schema, renderControlAction } from "./script.js";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function CompanyForm(props) {
  const { isAdd } = props;

  const [image, setImage] = useState(cameraLogo);
  const fileInput = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // show preview image
  const showPreviewImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImage(x.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="company-form"
    >
      <div className="company-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="company-form__logo">
              <Avatar
                src={image}
                // variant="rounded"
                alt="company-logo"
                className="company-form__avatar"
                // onClick={() => fileInput.current.click()}
              />
              {/* <h3>Company Name</h3> */}
              <input
                id="logo"
                type="file"
                name="logo"
                {...register("logo")}
                onChange={showPreviewImage}
                // ref={fileInput}
              />
              <p className="company-form__error">{errors.logo?.message}</p>

              {!isAdd ? (
                <div className="company-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="company-form__block">
                    <p>Khóa tài khoản</p>
                    <Switch {...label} defaultChecked />
                  </div>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item md={9}>
            <Grid container>
              <Grid item md={6}>
                <div className="company-form__input">
                  <CustomInput
                    label="Tên công ty"
                    id="name"
                    type="text"
                    placeholder="Tên công ty..."
                    register={register}
                  >
                    {errors.name?.message}
                  </CustomInput>
                  <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="email..."
                    register={register}
                  >
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label="Số điện thoại"
                    id="phone"
                    type="tel"
                    placeholder="Số điện thoại..."
                    register={register}
                  >
                    {errors.phone?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="company-form__input">
                  <CustomInput
                    label="Website"
                    id="website"
                    type="text"
                    placeholder="Website..."
                    register={register}
                  >
                    {errors.website?.message}
                  </CustomInput>
                  <CustomInput
                    label="Mã số thuế"
                    id="tax"
                    type="text"
                    placeholder="Mã số thuế..."
                    register={register}
                  >
                    {errors.tax?.message}
                  </CustomInput>
                  <div className="company-form__checkbox">
                    <p className="company-form__checkbox-label">Type</p>
                    <input
                      type="checkbox"
                      name="type"
                      id="type"
                      value="OutSource"
                      {...register("type")}
                    />
                    <label htmlFor="type">OutSource</label>

                    <input
                      type="checkbox"
                      name="type"
                      id="type"
                      value="Product"
                      {...register("type")}
                    />
                    <label htmlFor="type">Product</label>
                    <p className="company-form__error">
                      {errors.type?.message}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item md={12}>
                <div className="company-form__input">
                  <CustomTextarea
                    label="Mô tả công ty"
                    id="description"
                    type="description"
                    placeholder="Mô tả công ty..."
                    register={register}
                  >
                    {errors.description?.message}
                  </CustomTextarea>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {isAdd ? (
        <div className="company-form__submit">
          <Button name="Thêm công ty" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  );
}
