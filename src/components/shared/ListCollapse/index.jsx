import React, { useEffect, useState } from 'react';
import './styles.scss';
import CustomCheckbox from '../CustomCheckbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ListCollapse = (props) => {
  const [open, setOpen] = useState(false);
  const spacing = props.spacing;
  const handleCheck = (valueName, valueCheck, valueId) => {
    props.onChange && props.onChange(valueName, valueCheck, valueId);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        borderRadius: '6px',
        border: '1px solid #DEDEDE',
        marginBottom: '20px',
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <ListItemButton className='listButton' onClick={handleClick}>
        <ListItemText
          className='listTitle'
          primary={`${props.title}`}
          sx={{
            '& span': {
              fontSize: '16px',
              color: '#04bf8a',
              fontWeight: '700',
            },
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        {props.list?.length > 0
          ? props.list?.map((item, index) => (
              <List key={index} component='div' disablePadding>
                <ListItemButton sx={{ pl: spacing }}>
                  <ListItemIcon className='ListCollapWraper'>
                    <CustomCheckbox
                      id={item.id}
                      key={item.id}
                      label={item.name}
                      onChange={handleCheck}
                      checked={props.checkedType
                        ?.map((items) => {
                          {
                            console.log(items, 'items');
                          }
                          if (item.name === items || item.id === items) {
                            return item.name;
                          }
                          // return items;
                        })
                        .includes(item.name)}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            ))
          : ''}
      </Collapse>
    </List>
  );
};

export default ListCollapse;
