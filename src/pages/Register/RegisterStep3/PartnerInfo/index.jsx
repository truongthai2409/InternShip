import React from 'react'
import './styles.scss'
import ArrowButton from '../../../../components/ArrowButton/index'
import Button from '../../../../components/Button'
import CustomInput from '../../../../components/CustomInput/index'
import Select from '../../../../components/Select'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { addUniversity } from 'src/store/slices/Admin/university/unversitySlice'
import { useDispatch, useSelector } from 'react-redux'
import { genderList, schema } from './data'
import { errorSelector } from 'src/store/selectors/main/registerSelectors'
import CustomTextarea from 'src/components/CustomTextarea'
import { TabTitle } from 'src/utils/GeneralFunctions'

const PartnerInfo = () => {
  TabTitle('Đăng ký - Cộng tác viên trường')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const errorMessage = useSelector(errorSelector)

  const handleBackClick = e => {
    e.preventDefault()
    navigate(-1)
  }

  const onSubmit = data => {
    // const data = JSON.parse(sessionStorage.getItem("account"));
    console.log(data)
    console.log('test')
    console.log(data.avatar[0])
    const partnerData = {
      university: JSON.stringify({
        name: data.schoolName,
        shortName: data.shortName,
        email: data.emailSchool,
        description: data.description,
        website: data.website,
        phone: data.phoneSchool,
        majors: [
          {
            id: 1
          }
        ],
        location: [
          {
            district: {
              id: 2
            },
            address: 'HCM',
            note: 'Truong Top 1 VN'
          }
        ]
      }),
      partner: JSON.stringify({
        position: data.position,
        userCreationDTO: {
          username: data.username,
          password: data.password,
          confirmPassword: data.passwordConfirmation,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          gender: parseInt(data.gender),
          email: data.email,
          role: {
            id: 4
          }
        }
      }),
      avatarUser: data.avatar[0],
      logo: data.logo[0],
    }
    console.log(partnerData);
    dispatch(addUniversity(partnerData))
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

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
        </div>

        <p className="reg-partner__title-infor">Cập nhật thông tin</p>
        <div className="reg-partner__form--name">
          <CustomInput
            label="Họ"
            id="lastName"
            type="text"
            placeholder="Họ..."
            register={register}
          >
            {errors.lastName?.message}
          </CustomInput>

          <CustomInput
            label="Tên"
            id="firstName"
            type="text"
            placeholder="Tên..."
            register={register}
          >
            {errors.firstName?.message}
          </CustomInput>
        </div>

        <div className="section-input__container">
          <CustomInput
            label="Số điện thoại"
            id="phone"
            type="phone"
            placeholder="Số điện thoại"
            register={register}
          >
            {errors.phone?.message}
          </CustomInput>

          <div className="gender-container-partner-page">
            <Select
              label="Giới tính"
              placeholder="Vui lòng chọn..."
              options={genderList}
              id="gender"
              register={register}
            />
          </div>
        </div>

        <CustomInput
          label="Ảnh đại diện"
          id="avatar"
          type="file"
          register={register}
          // check={true}
        >
          {errors.avatar?.message}
        </CustomInput>

        <CustomInput
          label="LOGO Trường"
          id="logo"
          type="file"
          register={register}
          // check={true}
        >
          {errors.logo?.message}
        </CustomInput>

        <div className="section-input__container">
          <CustomInput
            label="Tên trường"
            type="text"
            id="schoolName"
            register={register}
          >
            {errors.schoolName?.message}
          </CustomInput>
          <CustomInput
            label="Tên viết tắc của trường"
            type="text"
            id="shortName"
            register={register}
          >
            {errors.shortName?.message}
          </CustomInput>
        </div>

        <CustomInput
          label="Vai trò tại trường"
          id="position"
          type="text"
          placeholder="Vai trò tại trường"
          register={register}
        >
          {errors.position?.message}
        </CustomInput>
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
            placeholder="Phone"
            register={register}
          >
            {errors.phoneSchool?.message}
          </CustomInput>
        </div>
        <CustomTextarea
          label="Mô tả"
          id="description"
          type="textarea"
          placeholder="Mô tả Trường"
          children=""
          register={register}
        />
        <CustomInput
          label="Website"
          id="website"
          type="text"
          register={register}
        >
          {errors.website?.message}
        </CustomInput>

        <div className="reg-hr__btns">
          <div className="reg-hr__btns--item" onClick={handleBackClick}>
            <ArrowButton text="Trở lại" direction="left" />
          </div>
          <div className="reg-hr__btns--item">
            <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PartnerInfo
