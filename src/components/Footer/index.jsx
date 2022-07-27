import React from "react";
import ComponentFooter from "./ComponentFooter";
import "./styles.scss";
import img from './mobile-app.png';
import AddressComponent from './AddressComponent';

const aboutUs = [
  {
    link: "/",
    content: "Trang chủ",
  },
  {
    link: "/",
    content: "Về chúng tôi",
  },
  {
    link: "/",
    content: "Liên hệ",
  },
  {
    link: "/",
    content: "Câu hỏi thường gặp",
  },
];

const policy = [
  {
    link: "/",
    content: "Chính sách bảo mật",
  },
  {
    link: "/",
    content: "Điều khoản dịch vụ",
  },
  {
    link: "/",
    content: "Quy chế",
  },
  {
    link: "/",
    content: "Câu hỏi thường gặp",
  },
];

const Footer = () => {
  return (
    <div id="page-footer-wrapper" className="page-footer-wrap">
      <section className="elementor-section">
        <div className="footer-container">
          <div className="footer-wrapper">
            <section className="footer__first-section">
              <div id="first-section" className="elementor-row">
                <div className="elementor-row-first-element">
                  <ComponentFooter
                    header="Về IT JOBS"
                    tabContent={aboutUs}
                  />
                </div>
                <div className="elementor-row-two-element">
                  <ComponentFooter 
                    header="Chính sách"
                    tabContent={policy}
                  />
                  <div className="">
                    <img style={{width: "300px"}} src={img} alt="" />
                  </div>
                </div>
              </div>
            </section>
            <section className="footer__second-section">
              <div id="second-section" className="elementor-container">
                <div className="elementor-row">
                  <div className="elementor-column-footer">
                    <AddressComponent />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
