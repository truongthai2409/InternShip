import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './styles.scss';

export const MenuDropDown = () => {
  const { t } = useTranslation('login');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <>
      <div className='menu-drop-down__wrapper'>
        <Button
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
        >
          <span>{t('registerTL')}</span>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to='/register/candidate'>
                      <MenuItem
                        sx={{ fontSize: '14px', color: '#212121' }}
                        onClick={handleClose}
                      >
                        {t('candidateTL')}
                      </MenuItem>
                    </Link>
                    <Link to='/register/hr'>
                      <MenuItem
                        sx={{ fontSize: '14px', color: '#212121' }}
                        onClick={handleClose}
                      >
                        {t('recruiterTL')}
                      </MenuItem>
                    </Link>
                    <Link to='/register/partner'>
                      <MenuItem
                        sx={{ fontSize: '14px', color: '#212121' }}
                        onClick={handleClose}
                      >
                        {t('partnerTL')}
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </>
  );
};
