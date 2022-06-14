import React from 'react';
import './styles.scss'

import ArrowButton from "../../../../components/ArrowButton/index";
import Button from "../../../../components/Button";
import CustomInput from '../../../../components/CustomInput/index'
import Select from "../../../../components/Select";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from 'react-router-dom'
import { registerUser } from "../../../../store/actions/user.action";
import { useDispatch } from "react-redux";

import { genderList, schoolList, schema } from "./data";

const PartnerInfo = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBackClick = (e) => {
        e.preventDefault();
        navigate(-1)
    }
    const onSubmit = (data) => {
        const step2Data = JSON.parse(sessionStorage.getItem("account"))
        const userData= {
            school: data.school,
            position: data.position,
            createUser: {
                username: step2Data.username,
                password: step2Data.password,
                confirmPassword: step2Data.confirmPassword,
                gender: parseInt(data.gender),
                lastName: data.lastname,
                firstName: data.firstname,
                phone: data.phone,
                email: step2Data.email,
                role: {
                    id: parseInt(step2Data.role.id)
                }
            }
        }
        
        console.log(userData)
        dispatch(registerUser(userData, navigate))
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    return (
        <div className="reg-partner">
            <form className="reg-partner__form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="reg-partner__form--name">
                    <CustomInput
                        label="Họ"
                        id="lastname"
                        type="text"
                        placeholder="Họ..."
                        register={register}
                    >
                        {errors.lastname?.message}
                    </CustomInput>
                    
                    <CustomInput
                        label="Tên"
                        id="firstname"
                        type="text"
                        placeholder="Tên..."
                        register={register}
                    >
                        {errors.firstname?.message}
                    </CustomInput>
                </div>

                <CustomInput
                        label="Số điện thoại"
                        id="phone"
                        type="phone"
                        placeholder="Số điện thoại"
                        register={register}
                    >
                        {errors.phone?.message}
                </CustomInput>

                <Select selectName="Giới tính" selectOptions={genderList} id="gender" register={register}/>                

                <CustomInput
                    label="Avatar"
                    id="avatar"
                    type="file"
                    register={register}
                    check={true}
                >
                        {errors.avatar?.message}
                </CustomInput>

                <Select selectName="Trường" selectOptions={schoolList} id="school" register={register}/>                

                <CustomInput
                        label="Vị trí"
                        id="position"
                        type="text"
                        placeholder="Vị trí"
                        register={register}
                    >
                        {errors.position?.message}
                </CustomInput>

                <div className="reg-partner__btns">
                    <div className="reg-partner__btns--item" onClick={handleBackClick}>
                        <ArrowButton text="Trở lại" direction="left" />
                    </div>
                    <div className="reg-partner__btns--item">
                        <Button name="ĐĂNG KÝ" onClick={handleSubmit(onSubmit)}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PartnerInfo;
