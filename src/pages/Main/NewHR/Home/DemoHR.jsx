import React from 'react';
import Button from 'src/components/shared/Button';
import Statistical from './Statistical_component';
import './styles.scss';
import Table from './Table';
import AddCardIcon from '@mui/icons-material/AddCard';

const TitleButton = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <AddCardIcon /> Đăng tin tuyển dụng mới
    </div>
  );
};

const DemoHR = () => {
  return (
    <div className='statistic_total'>
      <h2 className='statistic_total-h2'>Thống kê tin</h2>
      <div className='statistic_multiple'>
        <div className='statistic_multiple__left'>
          <Statistical number={30} title={'Tổng số bài đăng'} />
          <Statistical number={30} title={'Tổng số bài đăng'} />
          <Statistical number={30} title={'Tổng số bài đăng'} />
        </div>
        <Button
          name={<TitleButton />}
          bwidth='270px'
          bheight='46px'
          padding='0px 0px'
          bg={'#00B074'}
          fz='17px'
          className={'statistic_multiple__button'}
        ></Button>
      </div>
      <h2 className='statistic_total-h2'>Danh sách tuyển dụng</h2>
      <Table />
    </div>
  );
};

export default DemoHR;
