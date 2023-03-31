import PropTypes from 'prop-types';

import './responsive.scss';
import './styles.scss';
import { useState } from 'react';
import MenuDrop from './MenuDrop';

const HeaderWithHR = () => {
  const [manageMenu, setmanageMenu] = useState(null);
  const openManage = Boolean(manageMenu);
  const handleClickManageMenu = (event) => {
    setmanageMenu(event.currentTarget);
  };
  const handleCloseManageMenu = () => {
    setmanageMenu(null);
  };

  const [internMenu, setinternMenu] = useState(null);
  const openIntern = Boolean(internMenu);
  const handleClickInternMenu = (event) => {
    setinternMenu(event.currentTarget);
  };
  const handleCloseInternMenu = () => {
    setinternMenu(null);
  };

  const [candidateMenu, setcandidateMenu] = useState(null);
  const openCandidate = Boolean(candidateMenu);
  const handleClickCandidateMenu = (event) => {
    setcandidateMenu(event.currentTarget);
  };
  const handleCloseCandidateMenu = () => {
    setcandidateMenu(null);
  };

  return (
    <div className='header__hr'>
      <div className='header__hr-item'>
        <span
          onClick={handleClickManageMenu}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={openManage ? 'manage-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openManage ? 'true' : undefined}
          style={{ cursor: 'pointer' }}
        >
          Quản lý việc làm
        </span>
      </div>
      <div className='header__hr-item'>
        <span
          onClick={handleClickInternMenu}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={openIntern ? 'intern-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openIntern ? 'true' : undefined}
          style={{ cursor: 'pointer' }}
        >
          Tìm kiếm đợt thực tập
        </span>
      </div>
      <div className='header__hr-item'>
        <span
          onClick={handleClickCandidateMenu}
          size='small'
          sx={{ ml: 2 }}
          aria-controls={openCandidate ? 'manage-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openCandidate ? 'true' : undefined}
          style={{ cursor: 'pointer' }}
        >
          Tìm kiếm ứng viên
        </span>
      </div>

      <MenuDrop
        anchorEl={manageMenu}
        open={openManage}
        onClick={handleCloseManageMenu}
        id='manage-menu'
      />
      <MenuDrop
        anchorEl={internMenu}
        open={openIntern}
        onClick={handleCloseInternMenu}
        id='intern-menu'
      />
      <MenuDrop
        anchorEl={candidateMenu}
        open={openCandidate}
        onClick={handleCloseCandidateMenu}
        id='candidate-menu'
      />
    </div>
  );
};

HeaderWithHR.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithHR;
