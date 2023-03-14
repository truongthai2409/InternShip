import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { verifyEmailThunk } from 'src/store/action/authenticate/authenticateAction';
import './styles.scss';

const VerifyEmail = () => {
  const { user } = useSelector((state) => state.profile);
  const email = user.userDetailsDTO.email;
  const dispatch = useDispatch();
  const handleSendEmail = () => {
    const formData = {
      email: email,
    };
    dispatch(verifyEmailThunk(formData)).then((res)=>{
      toast.success("Email sent successfully");
    });
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='verifyEmail'>
        <h2>Xác thực tài khoản</h2>
        <p className='verifyEmail__title'>
          Đăng nhập vào email của bạn để xác thực tài khoản
        </p>
        <p>Trong quá trình tạo tài khoản bạn sẽ nhận được email từ jobsit.vn</p>
        <p>
          Nếu bạn đã nhận được email thông báo tạo tài khoản thành công, vui
          lòng nhấp vào liên kết xác thực có gửi trong nội dung email.
        </p>
        <p>
          Nếu bạn không nhận được email thông báo thành công, vui lòng nhấp vào
          link
          <span onClick={() => handleSendEmail()}>
            {' '}
            Gửi lại email xác thực tài khoản
          </span>{' '}
          hệ thống sẽ gửi email chứa liên kết xác thực vào tài khoản của bạn.
        </p>
        <p>
          Nếu không tìm thấy email của jobsit.vn trong hòm thư đến, bạn vui lòng
          kiểm tra email trong hòm thư Spam
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
