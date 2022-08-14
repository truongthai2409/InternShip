import React, { useEffect, useState } from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import LoginContainer from "../../containers/LoginContainer";
import "./styles.scss";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateStatusRegister } from "src/store/slices/main/register/registerSlice";

const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-51.9%, -50%)",
  width: 480,
  bgcolor: "white",
  borderRadius: 3,
  boxShadow: 12,
  p: 2,
};

const LoginLayout = () => {
  const { status } = useSelector((state) => state.register);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
    }
  }, [status]);

  const handleClose = () => {
    setOpen(false);
    dispatch(updateStatusRegister("idle"));
  };

  return (
    <div className="login-layout">
      <Header />
      <div className="login-container-wrapper">
        <LoginContainer />

        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Xác nhận Email
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Bạn đã đăng ký tài khoản thành công, vui lòng chờ xác nhận !
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                style={{ float: "right" }}
                onClick={handleClose}
              >
                Xác nhận
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default LoginLayout;
