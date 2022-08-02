import React from "react";
import logo from "./logo.png";
import "./styles.scss";

const AddressComponent = () => {
  return (
    <div className="address__container-footer">
      <div className="logo">
        <h2 className="heading-primary elementor-heading-title">Địa chỉ</h2>
      </div>
      <div className="address-footer-content">
        <div className="address-footer-headquarters">
          <div className="address-headquarters-content"></div>
          <div className="text-footer">
            <p>
              Trụ sở: Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ,
              Phường 25, Quận Bình Thạnh, Thành Phố Hồ Chí Minh
            </p>
          </div>
        </div>
        <div className="address-footer-office">
          <div className="text-footer">
            <p>
              Văn phòng: A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn
              Đồng, P.Linh Đông, TP Thủ Đức, Thành Phố Hồ Chí Minh
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
      </div>
    </div>
  );
};

export default AddressComponent;
