import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const FOOTER = {
  CONTACT: {
    title: 'Địa chỉ',
    content: [
      {
        title: 'Trụ sở',
        description:
          'Lầu 8, Toà Nhà Pearl Plaza, 561A đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành Phố Hồ Chí Minh',
      },
      {
        title: 'Văn phòng',
        description:
          'A005 Tầng trệt Chung cư Linh Đông, 1164 đường Phạm Văn Đồng, P.Linh Đông, TP Thủ Đức, Thành Phố Hồ Chí Minh',
      },
      {
        title: 'Hotline',
        description: '0919 365 363',
      },
      {
        title: 'Email',
        description: 'tuyendung@r2s.com.vn',
      },
    ],
  },
  ABOUT: {
    title: 'Về IT JOBS',
    content: [
      {
        description: <Link to='/'>Trang chủ</Link>,
      },
      {
        description: <Link to='/about-us'>Về chúng tôi</Link>,
      },
      {
        description: <Link to='/help'>Câu hỏi thường gặp</Link>,
      },
    ],
  },
  POLICY: {
    title: 'Chính sách',
    content: [
      {
        description: <Link to='/privacy-policy'>Chính sách bảo mật</Link>,
      },
      {
        description: <Link to='/terms-of-services'>Điều khoản dịch vụ</Link>,
      },
      {
        description: <Link to='/regulation'>Quy chế</Link>,
      },
    ],
  },
  MOBILE: {
    title: 'Ứng dụng di động',
    content: [
      {
        description: (
          <Link to='/comming-soon'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png'
              alt=''
              style={{ width: '170px' }}
            />
          </Link>
        ),
      },
      {
        description: (
          <Link to='/comming-soon'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png'
              alt=''
              style={{ width: '170px' }}
            />
          </Link>
        ),
      },
    ],
  },
};
