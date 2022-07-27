import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Grid, Switch } from '@mui/material'

import './styles.scss'
import CustomInput from '../../../components/CustomInput'
// import CustomTextarea from "../../../components/CustomTextarea";
import Button from '../../../components/Button'
import cameraLogo from '../../../assets/img/camera.png'
// import Select from "../../../components/Select";
import { schema, renderControlAction } from './script.js'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const UserForm = props => {
  const { isAdd } = props

  const [image, setImage] = useState(cameraLogo)
  const fileInput = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // show preview image
  const showPreviewImage = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0]
      const reader = new FileReader()
      reader.onload = x => {
        setImage(x.target.result)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const onSubmit = data => {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="user-form"
    >
      <div className="user-form__container">
        <Grid container>
          <Grid item md={3}>
            <div className="user-form__logo">
              <Avatar
                src={image}
                // variant="rounded"
                alt="user-logo"
                className="user-form__avatar"
                onClick={() => fileInput.current.click()}
              />
              {/* <h3>user Name</h3> */}
              <input
                id="logo"
                type="file"
                name="logo"
                // {...register("logo")}
                onChange={showPreviewImage}
                ref={fileInput}
              />
              <p className="user-form__error">{errors.logo?.message}</p>

              {!isAdd ? (
                <div className="user-form__control">
                  <ul>{renderControlAction()}</ul>
                  <div className="user-form__block">
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
                <div className="user-form__input">
                  <CustomInput
                    label="Tên đăng nhập"
                    id="tenDangNhap"
                    type="text"
                    placeholder="Tên đăng nhập..."
                    register={register}
                    // check={!isAdd}
                  >
                    {errors.tenDangNhap?.message}
                  </CustomInput>
                  <CustomInput
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="hoangvubg@gmail.com..."
                    register={register}
                  >
                    {errors.email?.message}
                  </CustomInput>
                  <CustomInput
                    label="Số điện thoại"
                    id="sDT"
                    type="tel"
                    placeholder="Số điện thoại..."
                    register={register}
                  >
                    {errors.sDT?.message}
                  </CustomInput>
                </div>
              </Grid>
              <Grid item md={6}>
                <div className="user-form__input">
                  <CustomInput
                    label="Mật khẩu"
                    id="matKhau"
                    type="password"
                    placeholder="Mật khẩu..."
                    register={register}
                  >
                    {errors.matKhau?.message}
                  </CustomInput>
                  <CustomInput
                    label="Họ tên"
                    id="ten"
                    type="text"
                    placeholder="Họ tên..."
                    register={register}
                  >
                    {errors.ten?.message}
                  </CustomInput>
                  <div className="user-form__checkbox">
                    <p className="user-form__checkbox-label">Type</p>
                    <select {...register('isAdmin')}>
                      <option value={true}>Admin</option>
                      <option value={false}>Khach hang</option>
                    </select>
                    <p className="user-form__error">{errors.type?.message}</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {isAdd ? (
        <div className="user-form__submit">
          <Button name="Thêm người dùng" onClick={handleSubmit(onSubmit)} />
        </div>
      ) : null}
    </form>
  )
}

export default UserForm
