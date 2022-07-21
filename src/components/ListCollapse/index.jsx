import React from 'react'
import './styles.scss'
import CustomCheckbox from '../CustomCheckbox'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

const ListCollapse = props => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  const spacing = props.spacing

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        borderRadius: '6px',
        border: '0.5px solid #DEDEDE',
        marginBottom: '20px'
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText className="listTitle" primary={`${props.title}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.list.length > 0
          ? props.list.map((item, index) => (
              <List key={item.id || index} component="div" disablePadding>
                <ListItemButton sx={{ pl: spacing }}>
                  <ListItemIcon>
                    <CustomCheckbox key={item.id || index} label={item.name} />
                  </ListItemIcon>
                </ListItemButton>
              </List>
            ))
          : ''}
      </Collapse>
    </List>
  )
}

export default ListCollapse
