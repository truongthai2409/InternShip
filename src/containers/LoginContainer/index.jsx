import React from 'react';
import './styles.scss'
import { Link } from 'react-router-dom'


import Logo from "../../components/Logo";
import Login from "../../pages/Login";

const LoginContainer = () => {
    return (
        <div className="login-container">
            <Logo/>
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
