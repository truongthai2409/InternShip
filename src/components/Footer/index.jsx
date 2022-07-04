import React from "react";
import Contact from "./Contact";
import Policy from "./Policy";
import Category from "./Category";
import CopyRight from "./CopyRight";

import "./styles.scss";

const Footer = () => {
  return (
    <div id="page-footer-wrapper" className="page-footer-wrap">
      <section className="elementor-section">
        <div className="footer-container">
          <div className="footer-wrapper">
            <section className="footer__first-section">
              <div id="first-section" className="elementor-row">
                <Contact />
                <Policy />
                <Category />
              </div>
            </section>
            <section className="footer__second-section">
              <div id="second-section" className="elementor-container">
                <div className="elementor-row">
                  <div className="elementor-column">
                    <CopyRight />
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
