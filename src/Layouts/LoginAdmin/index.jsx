import React, { useEffect, useState} from 'react'
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import LoginAdminContainer from "../../containers/LoginAdminContainer";
import "./styles.scss";
// import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateStatusRegister } from "src/store/slices/main/register/registerSlice";
import Modal from "./../../components/Modal/index";
import "./styles.scss";

const LoginAdminLayout = () => {
  const { status } = useSelector((state) => state.register);
  console.log(status)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
    }
  }, [status]);

  return (
    <div className="login-admin-layout">

      <div className="login-admin-container-wrapper">
        <LoginAdminContainer />
        <div className="login-container__modal">
          <Modal
            modalTitle="Thông báo"
            open={open}
            setOpen={setOpen}

          />
        </div>
      </div>

    </div>
  );
}

export default LoginAdminLayout