import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Drawer, Hidden } from '@mui/material';
import { useSelector } from 'react-redux';

import './styles.scss';
import Sidebar from '../../components/shared/Sidebar';
import AdminNav from '../../components/Admin/AdminNav';
import Notification from '../../components/shared/Notification';

const AdminLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const notification = useSelector((state) => state.notification);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div className='admin-layout'>
      <div className='admin-layout__sidebar'>
        <Hidden mdDown>
          <Drawer
            variant='persistent'
            className='admin-layout__sidebar-block'
            open
          >
            <Sidebar />
          </Drawer>
        </Hidden>
        <Drawer
          variant='temporary'
          anchor='left'
          open={openDrawer}
          onClose={handleCloseDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className='admin-layout__sidebar-hide'
        >
          <Sidebar />
        </Drawer>
      </div>
      <div className='admin-layout__content'>
        <header className='admin-layout__header'>
          <AdminNav openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </header>
        <main className='admin-layout__main'>
          <section>
            <Outlet />
          </section>
        </main>
      </div>
      <Notification notifyAlert={notification} />
    </div>
  );
};

export default AdminLayout;
