import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Avatar } from "@mui/material";

import "./styles.scss";
import CustomInput from "../../../../components/CustomInput";
import CustomTextarea from "../../../../components/CustomTextarea";
import Button from "../../../../components/Button";
import cameraLogo from "../../../../assets/img/camera.png";

const schema = yup
  .object({
    logo: yup.mixed().nullable().required("Bạn phải chọn ảnh cho công ty"),
    // .test(
    //   "FILE_SIZE",
    //   "Uploaded file is too bid!",
    //   (value) => !value || (value && value.size <= 1024 * 1024)
    // ),
    name: yup.string().required(" * Bạn phải nhập tên công ty."),
    website: yup.string().required(" * Bạn phải nhập tên website công ty."),
    email: yup
      .string(" * email không hợp lệ.")
      .required(" * Bạn phải nhập email công ty."),
    phone: yup
      .string()
      .required(" * Bạn phải nhập tên số điện thoại.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Số điện thoại không đúng."
      ),
    type: yup
      .array()
      .nullable()
      .min(1, " * Bạn phải chọn Type của công ty")
      .required(" * Bạn phải chọn Type của công ty"),
    tax: yup
      .string()
      .required(" * Bạn phải nhập mã số thuế.")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        " * Mã số thuế không đúng."
      ),
    // description: yup.string().required(" * Bạn phải nhập mô tả công ty."),
  })
  .required();

export default function CompanyForm() {
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
        <div className="company-form__logo">
          <Avatar
            src={image}
            variant="rounded"
            alt="company-logo"
            className="company-form__avatar"
            // onClick={() => fileInput.current.click()}
          />
          <input
            id="logo"
            type="file"
            name="logo"
            {...register("logo")}
            onChange={showPreviewImage}
            // ref={fileInput}
          />
          <p className="company-form__error">{errors.logo?.message}</p>
        </div>
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
            <p className="company-form__error">{errors.type?.message}</p>
          </div>
        </div>
        {/* <div className="company-form__input">
          <CustomTextarea
            label="Mô tả công ty"
            id="description"
            type="description"
            placeholder="Mô tả công ty..."
            register={register}
          >
            {errors.description?.message}
          </CustomTextarea>
        </div> */}
      </div>

      {/* <input type="submit" /> */}
      <div className="company-form__submit">
        <Button name="Thêm công ty" onClick={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
}
