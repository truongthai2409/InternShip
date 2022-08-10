import React, { Fragment, useEffect, useState } from "react";
import "./styles.scss";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import CustomInput from "src/components/CustomInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema } from "./validateForm.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserList,
  userForgotPassword,
} from "src/store/slices/Admin/user/userSlice";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");

  const { userList, forgotPassword } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => {
    handleFormSubmit(values);
  };
  const handleFormSubmit = (data) => {
    const getEmailUser = userList.find(
      (findEmail) => findEmail.email === data.email
    );

    if (getEmailUser) {
      dispatch(userForgotPassword(getEmailUser.email));
      alert(forgotPassword);
      // setMessage(forgotPassword);
    } else {
      alert("Email ko đúng");
      // setMessage("Email ko đúng");
    }
  };

  useEffect(() => {
    dispatch(getUserList([1, 200]));
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="forgotpassword__wrapper">
        <div className="forgotpassword__modal">
          <h2>
            <strong>Quên mật khẩu</strong>
          </h2>
          <p>Xin vui lòng nhập địa chỉ email để lấy lại mật khẩu.</p>
          <form action="">
            <CustomInput
              label="Nhập email"
              id="email"
              name="email"
              type="email"
              placeholder="Vui lòng nhập email..."
              register={register}
              requirementField={true}
            >
              {errors.email?.message}
            </CustomInput>
            {/* {message.length ? (
              <div style={{ marginBottom: "12px", color: "red" }}>
                {message}
              </div>
            ) : (
              ""
            )} */}
            <button
              onClick={handleSubmit(onSubmit)}
              className="forgotpassword__modal-btn"
            >
              Lấy lại mật khẩu
            </button>
          </form>
          <Link to="/" className="forgotpassword__modal-link">
            Quay về trang đăng nhập
          </Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ForgotPassword;
