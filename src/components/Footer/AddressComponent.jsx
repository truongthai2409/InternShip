import React from "react";
import logo from "./logo-footer.png";
import "./styles.scss";

const AddressComponent = () => {
  return (
    <div className="address__container-footer">
      <div className="logo">
        <img style={{ width: "450px" }} src={logo} alt="" />
      </div>
      <div className="address-footer-content">
        <div className="address-footer-headquarters">
          <div className="address-headquarters-content"></div>
          <div className="text-footer">
            Trụ sở: Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, P.25,
            Quận Bình Thạnh, TP HCM
          </div>
        </div>
        <div className="address-footer-office">
          <div className="text-footer">
            Văn phòng: A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn
            Đồng, P.Linh Đông, TP Thủ Đức, TP HCM
          </div>
        </div>
        <div className="address-footer-hotline">
          <div className="text-footer">Hotline: 0919 365 363 </div>
        </div>
        <div className="address-footer-email">
          <div className="text-footer">Email: tuyendung@r2s.com.vn</div>
        </div>
        <div className="address-footer-worktime">
          <div className="text-footer">
            Giờ làm việc: (8am - 22pm, Thứ 2 - Thứ 7){" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressComponent;
