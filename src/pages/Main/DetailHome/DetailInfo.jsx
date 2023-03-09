import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from 'src/components/shared/Button';
import PictureInPictureAltOutlinedIcon from '@mui/icons-material/PictureInPictureAltOutlined';

const DetailInfo = () => {
  return (
    <div className='detailInfoHome'>
      <div className='detailInfoHome__left'>
        <div className='detailInfoHome__left__info'>
          <h2>Mô tả công việc</h2>
          <ul>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
          </ul>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Yêu cầu công việc</h2>
          <ul>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
          </ul>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Chế độ phúc lợi</h2>
          <ul>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
            <li>
              Tham gia các dự án thiết kế, phát triển sản phẩm theo yêu cầu của
              khách hàng hoặc từ Leader
            </li>
          </ul>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Địa điểm làm việc</h2>
          <p className='location'>
            <LocationOnIcon />
            <p>1164 đường Phạm Văn Đồng, P.Linh Đông, TP Thủ Đức, TPHCM</p>
          </p>
        </div>
        <div className='detailInfoHome__left__info'>
          <h2>Cách thức ứng tuyển</h2>
          <p>
            Ứng viên nộp hồ sơ trực tuyến bằng cách bấm nút{' '}
            <span>ỨNG TUYỂN NGAY</span> dưới đây
          </p>
          <div className='detailInfoHome__left__info__btn'>
            <Button
              name={'Ứng tuyển ngay'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='#00B074'
              fz='17px'
            ></Button>
            <Button
              name={'Lưu tin'}
              bwidth='211px'
              bheight='46px'
              padding='12px 32px'
              bg='white'
              color='#7D7D7D'
              fz='17px'
            ></Button>
          </div>
        </div>
      </div>
      <div className='detailInfoHome__right'>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
        <div className='detailInfoHome__right__item'>
          <PictureInPictureAltOutlinedIcon />
          <div>
            <p>Vị trí làm việc</p>
            <p>Front end</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
