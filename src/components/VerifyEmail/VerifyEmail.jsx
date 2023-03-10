import React from 'react';
import './styles.scss';

const VerifyEmail = () => {
  return (
    <div className='verifyEmail'>
      <h2>Xác thực tài khoản</h2>
      <p>Đăng nhập vào email của bạn để xác thực tài khoản</p>
      <p>Trong quá trình tạo tài khoản bạn sẽ nhận được email từ jobsit.vn</p>
      <p>
        Nếu bạn đã nhận được email thông báo tạo tài khoản thành công, vui lòng
        nhấp vào liên kết xác thực có gửi trong nội dung email.
      </p>
      <p>
        Nếu bạn không nhận được email thông báo thành công, vui lòng nhấp vào
        link
      </p>
      <span>Gửi lại email xác thực tài khoản</span> hệ thống sẽ gửi email chứa
      liên kết xác thực vào tài khoản của bạn.
      <p>
        Nếu không tìm thấy email của jobsit.vn trong hòm thư đến, bạn vui lòng
        kiểm tra email trong hòm thư Spam
      </p>
    </div>
  );
};

export default VerifyEmail;
