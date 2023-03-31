import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuItemCustomize = ({ id, onClick }) => {
  if (id == 'manage-menu') {
    return (
      <>
        <MenuItem onClick={onClick}>
          <Avatar /> Đăng tin tuyển dụng
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Avatar /> Quản lý bài đăng
        </MenuItem>
      </>
    );
  } else if (id == 'intern-menu') {
    return (
      <>
        <MenuItem onClick={onClick}>
          <Avatar /> Tìm các đợt thực tập
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Avatar /> Đợt thực tập đã lưu
        </MenuItem>
      </>
    );
  }
  else if (id == 'candidate-menu'){
    return (
      <>
        <MenuItem onClick={onClick}>
          <Avatar /> Tìm kiếm ứng viên
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Avatar /> Hồ sơ ứng viên đã lưu
        </MenuItem>
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
