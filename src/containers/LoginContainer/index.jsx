import React from 'react';
import './styles.scss'
import { Link } from 'react-router-dom'


import Logo from "../../components/Logo";
import Login from "../../pages/Login";
import Button from "../../components/Button/index";

const LoginContainer = () => {
    return (
        <div className="login-container">
            <Logo/>
            <div className="login-container__google">
                <Button>ĐĂNG NHẬP VỚI GOOGLE <i className="fa-brands fa-google"></i></Button>
            </div>

            <span className="login-container__or">
                <div className="login-container__or--line"></div>
                <h6>HOẶC</h6>
                <div className="login-container__or--line"></div>
            </span>
            <h1 className="login-container__title">Đăng nhập</h1>
            <Login/>
            <div className="login-container__footer">
                <Link to="/">Quên mật khẩu?</Link>
                <p>
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginContainer;
