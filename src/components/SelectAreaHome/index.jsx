import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

import './styles.scss'
import { Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getProvinceList } from '../../store/slices/location/locationSlice'
const ITEM_HEIGHT = 30
const ITEM_PADDING_TOP = 0
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 70
    }
  }
}

export default function SelectAreaHome() {
  const [personName, setPersonName] = React.useState([])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const dispatch = useDispatch()
  const { provinceList } = useSelector(state => state.location)

  React.useEffect(() => {
    dispatch(getProvinceList())
  }, [])

  // console.log(provinceList)

  return (
    <div>
      <FormControl sx={{ m: 1, width: 170, pl: 1 }}>
        {/* <h6>Khu vực</h6> */}
        <InputLabel id="demo-multiple-name-label">Khu Vực </InputLabel>
        <div className="config-select">
          <Select
            labelId="demo-multiple-name-label"
            // id="demo-multiple-name"
            value={personName}
            defaultValue="TPHCM"
            onChange={handleChange}
            input={<OutlinedInput label="Khu vực" />}
            MenuProps={MenuProps}
            sx={{
              mr: 0
            }}
            // className={hideIconPadding}
            multiple={false}
            // disabled
          >
            {provinceList.map(province => (
              <MenuItem
                key={province.id}
                value={province.id}
                // style={getStyles(province.id, personName, theme)}
              >
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>
    </div>
  )
}
