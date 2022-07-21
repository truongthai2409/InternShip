import React from 'react'
import './styles.scss'
import { Checkbox, FormControlLabel } from '@mui/material'

const CustomCheckbox = ({ label }) => {
  return (
    <FormControlLabel
      className="formControlLabel"
      control={
        <Checkbox
          className="checkBoxColor"
          sx={{
            color: 'dedede'
          }}
        />
      }
      label={label}
    />
  )
}

export default CustomCheckbox
