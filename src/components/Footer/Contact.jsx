import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'

const Contact = () => {
  const tabContents = [
    'Trụ sở: Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, P.25, Quận Bình Thạnh, TP HCM',
    'Văn phòng: A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn Đồng, P.Linh Đông, TP Thủ Đức, TP HCM',
    'Hotline: 0919 365 363'
  ]
  return (
    <div className="contact__container">
      <div>
        <div className="elementor-column-populated">
          <div className="heading-primary-wrap">
            <h2 className="heading-primary elementor-heading-title">Địa chỉ</h2>
          </div>
          <div className="contact__list">
            <div className="maxcoach-list">
              {tabContents.map((content, i) => (
                <div key={i} className="item">
                  <div className="">
                    <div className="list-header">
                      <div className="text-wrap">
                        <div className="text">{content}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="item">
                <a href="mailto:tuyendung@r2s.com.vn" className="link">
                  <div className="list-header">
                    <div className="text-wrap">
                      <div className="text">Email: tuyendung@r2s.com.vn</div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="item">
                <a href="mailto:tuyendung@r2s.com.vn" className="link">
                  <div className="list-header">
                    <div className="text-wrap">
                      <div className="text">
                        Giờ làm việc: (8am - 22pm, Thứ 2 - Thứ 7)
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="social__media">
            <a
              href="https://www.facebook.com/r2s.tuyendung"
              className="link"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
