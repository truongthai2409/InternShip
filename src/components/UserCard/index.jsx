import React from "react";
import Button from "../Button";
import "./styles.scss";

const UserCard = () => {
  return (
    <div className="user-card__container">
      <div className="user-card__heading">
        <div className="user-card__heading-avatar">
          <div className="avatar"></div>
        </div>
        <div className="user-card__heading-name">
          <h3>Yasuo</h3>
        </div>
      </div>
      <div className="user-card__info">
        <span>Việc làm đã lưu</span>
        <span>
          {" "}
          Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
          ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
        </span>
      </div>
      <div className="user-card__btns">
        <div className="user-card__btns-auth-account">
          <Button name="Tài khoản đã xác thực" />
        </div>
        <div className="user-card__btns-update-profile">
          <Button name="Cập nhật thêm Profile" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
