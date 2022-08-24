import React, { useState } from 'react'
import './CandidateManagement.scss'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';

export default function CandidateManagement() {
  const [open,setOpen] = useState(false)
  const [click,setClick] = useState(true)
  return (
    <div className='CandidateManagement_Container'>
      
      <div className='candidate'>
          <img src='https://cdn.tgdd.vn/Files/2020/12/29/1316941/cach-cai-hinh-nen-doi-theo-ngay-dem-tren-iphone-d-1.jpg' alt='1'></img>
          <div className='candidate_info'>
            <h3>Bùi Anh Thư</h3>
            <p>Chuyên Nghành: <span>Công Nghệ Phần Mềm</span></p>
            <p>Phương Thức Làm Việc: <span>PartTime</span></p>
            <p>Số Điện Thoại: <span>0123456789</span></p>
            <p>Email: <span>tuong@gmail.com</span></p>
          </div>
          <div className='candidate_choise'>
            <span>09/06/2022 09:43 AM</span>
            <div className='choise'>
              <Button
              name='Xem CV'
              onClick={()=>setOpen(!open)}
              />
              {click ? <BookmarkBorderIcon onClick={()=>setClick(!click)} className='favorite' /> : <BookmarkIcon onClick={()=>setClick(!click)} className='favorite' />}
            </div>
          </div>
      </div>
      <Modal 
      iconClose={true}
      modalTitle="Xem CV Ứng Viên"
      open={open}
      setOpen={setOpen}
      
      children={
      <div><img width={'100%'} height={'100%'} src='http://103.48.192.239:8085/images/2022/meomeo.jpg'></img></div>
      }
      />
    </div>
  )
}
