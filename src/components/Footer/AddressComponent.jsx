import React from "react";
import logo from "./logo-footer.png";

const AddressComponent = () => {
  return (
    <div className="address__container">
      <div className="logo">
        <img style={{ width: "450px" }} src={logo} alt="" />
      </div>
      <div className="address-footer-content">
        <div className="address-footer-headquarters">
          <h4 className="heading">Trụ sở:</h4>
          <span className="text-footer">
            Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, P.25, Quận
            Bình Thạnh, TP HCM
          </span>
        </div>
        <div className="address-footer-office">
          <h4 className="heading">Văn phòng:</h4>
          <span className="text-footer">
            A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn Đồng, P.Linh
            Đông, TP Thủ Đức, TP HCM
          </span>
        </div>
        <div className="address-footer-hotline">
          <h4 className="heading">Hotline:</h4>
          <span className="text-footer">0919 365 363 </span>
        </div>
        <div className="address-footer-email">
          <h4 className="heading">Email:</h4>
          <span className="text-footer"> tuyendung@r2s.com.vn</span>
        </div>
        <div className="address-footer-worktime">
          <h4 className="heading">Giờ làm việc:</h4>
          <span className="text-footer"> (8am - 22pm, Thứ 2 - Thứ 7) </span>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
