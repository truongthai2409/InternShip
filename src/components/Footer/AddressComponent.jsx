import React from "react";
import logo from "./logo.png";
import "./styles.scss";

const AddressComponent = () => {
  return (
    <div className="address__container-footer">
      <div className="logo">
        <img style={{ width: "160px" }} src={logo} alt="" />
      </div>
      <div className="address-footer-content">
        <div className="address-footer-headquarters">
          <div className="address-headquarters-content"></div>
          <div className="text-footer">
            <p>
              Trụ sở: Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, Phường 25, Quận
              Bình Thạnh, Thành Phố Hồ Chí Minh
            </p>
          </div>
        </div>
        <div className="address-footer-office">
          <div className="text-footer">
            <p>
              Văn phòng: A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn Đồng,
              P.Linh Đông, TP Thủ Đức, Thành Phố Hồ Chí Minh
            </p>
          </div>
        </div>
        <div className="address-footer-hotline">
          <div className="text-footer">
            <p>Hotline: 0919 365 363</p>{" "}
          </div>
        </div>
        <div className="address-footer-email">
          <div className="text-footer">
            <p>Email: tuyendung@r2s.com.vn</p>
          </div>
        </div>
        <div className="address-footer-worktime">
          <div className="text-footer">
            <p>Giờ làm: (8am - 22pm, Thứ 2 - Thứ 7)</p>{" "}
          </div>
        </div>
        <div className="address-footer-copyright">
          <div className="text-footer">
            <p>Copyright: © 2022 R2S. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
