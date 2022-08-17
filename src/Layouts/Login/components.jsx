import React from "react";
import Button from "./../../components/Button/index";

export const ModalContent = ({ onClick, nameButton }) => {
  return (
    <>
      <p>Bạn đã đăng ký tài khoản thành công, vui lòng chờ xác nhận !</p>
      <div style={{ float: "right", marginTop: 16 }}>
        <Button name={nameButton} onClick={onClick} />
      </div>
    </>
  );
};
