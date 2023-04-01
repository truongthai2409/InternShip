import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddCardIcon from '@mui/icons-material/AddCard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from 'react-router-dom';

const MenuItemCustomize = ({ id, onClick }) => {
  if (id == 'manage-menu') {
    return (
      <>
        <Link to='/hr/addPost'>
          <MenuItem onClick={onClick} className='menu_item_customize'>
            <AddCardIcon sx={{ color: '#00B074' }} />
            <p>Đăng tin tuyển dụng</p>
          </MenuItem>
        </Link>
        <Link to='/hr/managePost'>
          <MenuItem onClick={onClick} className='menu_item_customize'>
            <ListAltIcon sx={{ color: '#00B074' }} />
            <p>Quản lý bài đăng</p>
          </MenuItem>
        </Link>
      </>
    );
  } else if (id == 'intern-menu') {
    return (
      <>
        <Link to='/hr/searchInternship'>
          <MenuItem onClick={onClick} className='menu_item_customize'>
            <AddCardIcon sx={{ color: '#00B074' }} />
            <p>Tìm các đợt thực tập</p>
          </MenuItem>
        </Link>
        <Link to='/hr/saveInternship'>
          <MenuItem onClick={onClick} className='menu_item_customize'>
            <CardGiftcardIcon sx={{ color: '#00B074' }} />
            <p>Đợt thực tập đã lưu</p>
          </MenuItem>
        </Link>
      </>
    );
  } else if (id == 'candidate-menu') {
    return (
      <>
        <Link to='/hr/searchCandidate'>
          <MenuItem onClick={onClick} className='menu_item_customize'>
            <PersonSearchIcon sx={{ color: '#00B074' }} />
            <p>Tìm kiếm ứng viên</p>
          </MenuItem>
        </Link>
        <Link to='/hr/saveCandidate'>
          <MenuItem onClick={onClick} className='menu_item_customize'>
            <SupervisedUserCircleIcon sx={{ color: '#00B074' }} />
            <p>Hồ sơ ứng viên đã lưu</p>
          </MenuItem>
        </Link>
      </>
    );
  }
};

const MenuDrop = ({ anchorEl, open, onClick, id }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id={id}
      open={open}
      onClose={onClick}
      onClick={onClick}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItemCustomize id={id} onClick={onClick} />
    </Menu>
  );
};

export default MenuDrop;
