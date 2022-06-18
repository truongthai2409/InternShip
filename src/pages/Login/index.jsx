import React from 'react';
import './styles.scss'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomCheckbox from "../../components/CustomCheckbox";

import CustomInput from '../../components/CustomInput/index'
import Button from '../../components/Button/index'

import { schema } from "./data";

const Login = () => {

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="login-form__container">
            <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            >
                <CustomInput
                    label="Tài khoản"
                    id="username"
                    type="text"
                    placeholder="Tài khoản..."
                    register={register}
                >
                    {errors.username?.message}
                </CustomInput>
                <CustomInput
                    label="Mật khẩu"
                    id="password"
                    type="password"
                    placeholder="Mật khẩu"
                    register={register}
                >
                    {errors.password?.message}
                </CustomInput>
                <div className="login-form__save-pass">
                    <CustomCheckbox label="Lưu mật khẩu"/>
                </div>
                <div className="login-form__btn">
                    <Button name="ĐĂNG NHẬP" onClick={handleSubmit(onSubmit)}></Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
