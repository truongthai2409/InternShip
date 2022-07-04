import React from "react";

const Policy = () => {
  return (
    <div className="policy__container">
      <div>
        <div className="elementor-column-populated">
          <div className="heading-primary-wrap">
            <h2 className="heading-primary elementor-heading-title">
              Chính sách
            </h2>
          </div>
          <div className="policy__list">
            <div className="maxcoach-list">
              <div className="item">
                <a
                  href="https://r2s.edu.vn/chinh-sach-bao-mat-thong-tin/"
                  className="link"
                >
                  <div className="text-wrap">
                    <div className="text">Chính sách bảo mật thông tin</div>
                  </div>
                </a>
              </div>

              <div className="item">
                <a
                  href="https://r2s.edu.vn/chinh-sach-thanh-toan/"
                  className="link"
                >
                  <div className="text-wrap">
                    <div className="text">Chính sách thanh toán</div>
                  </div>
                </a>
              </div>

              <div className="item">
                <a
                  href="https://r2s.edu.vn/chinh-sach-bao-luu-va-thay-doi-khoa-hoc/"
                  className="link"
                >
                  <div className="text-wrap">
                    <div className="text">
                      Chính sách bảo lưu và thay đổi khóa học
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
