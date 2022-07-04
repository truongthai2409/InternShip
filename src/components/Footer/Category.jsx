import React from "react";

const Category = () => {
  return (
    <div className="category__container">
      <div className="elementor-column-populated">
        <div className="heading-primary-wrap">
          <h2 className="heading-primary elementor-heading-title">Danh mục</h2>
        </div>
        <div className="category__list">
          <div className="maxcoach-list">
            <div className="item">
              <a href="https://r2s.edu.vn/tin-tuc/" className="link">
                <div className="list-header">
                  <div className="text-wrap">
                    <div className="text">Tin tức</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="item">
              <a href="https://r2s.edu.vn/doi-ngu-dao-tao/" className="link">
                <div className="list-header">
                  <div className="text-wrap">
                    <div className="text">Đội ngũ đào tạo</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="item">
              <a href="https://it-fresher.edu.vn/" className="link">
                <div className="list-header">
                  <div className="text-wrap">
                    <div className="text">Đào tạo IT Fresher theo yêu cầu</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="item">
              <a
                href="https://r2s.edu.vn/danh-sach-cac-khoa-hoc/"
                className="link"
              >
                <div className="list-header">
                  <div className="text-wrap">
                    <div className="text">Danh sách các khóa học</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
