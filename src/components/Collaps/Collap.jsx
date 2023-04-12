import React from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';

export default function Collap({ children, title, open, handleClick }) {
  const titleParts = title.split(/(\?)/);
  const coloredPart = titleParts[2];
  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          center={true}
          primary={
            <span style={{ fontSize: 13 }}>
              <span>{titleParts[0]}</span>
              <span>{titleParts[1]}</span>
              <span style={{ color: '#00B074' }}>{coloredPart}</span>
            </span>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {children}
        </List>
      </Collapse>
    </List>
  );
}
