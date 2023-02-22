import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { PropTypes } from 'prop-types';

function LanguageSetting({type}) {
    const [lang, setLang] = useState("vi");
    const { t, i18n } = useTranslation('constant');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleItemClick = (lang) => {
      setAnchorEl(null);
      i18n.changeLanguage(lang);
      localStorage.setItem('lang', lang);
    };

    const languageOnChange = (event) => {
      i18n.changeLanguage(event.target.value);
      setLang(event.target.value);
      localStorage.setItem('lang', event.target.value);
    };

    useEffect(() => {
      setLang(i18n.language)
    },[]);

    return (
        <div>
          {
            type === "popover" &&
            <div style={{position: 'absolute', top: '20px', right: '10px'}}>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <LanguageIcon style={{color: 'black', fontSize: '25px'}}/>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                <MenuItem onClick={() => handleItemClick('en')} selected={i18n.language === 'en'} value={'en'} key='lang-en'>
                  <div style={{display: "flex", alignItems: 'center', gap: "5px", height: 'auto'}}>
                    <img src="https://img.icons8.com/color/48/null/usa-circular.png" style={{ width: '23px', height: '23px', margin: 0, border: 0 }} alt="usa-flag" />
                    English
                  </div>
                </MenuItem>
                <MenuItem onClick={() => handleItemClick('vi')} selected={i18n.language === 'vi'} value={'vi'} key='lang-vi'>
                  <div style={{display: "flex", alignItems: 'center', gap: "5px"}}>
                    <img src="https://img.icons8.com/color/48/null/vietnam-circular.png" style={{ width: '23px', height: '23px', margin: 0, border: 0 }} alt="vn-flag" />
                    Tiếng Việt
                  </div>
                </MenuItem>
              </Menu>
            </div> 
          }
          {
            type === "select" &&
            <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              {/* <p style={{fontSize: '14px'}}>{t('languageConstant.language')}</p> */}
              <FormControl style={{width: '140px'}} size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lang}
                  onChange={languageOnChange}
                  style={{fontSize: '14px'}}
                >
                  <MenuItem value={'en'}>
                    <div style={{display: "flex", alignItems: 'center', gap: "5px", height: 'auto'}}>
                      <img src="https://img.icons8.com/color/48/null/usa-circular.png" style={{ width: '23px', height: '23px', margin: 0, border: 0 }} alt="usa-flag" />
                      English
                    </div>
                  </MenuItem>
                  <MenuItem value={'vi'}>
                    <div style={{display: "flex", alignItems: 'center', gap: "5px"}}>
                      <img src="https://img.icons8.com/color/48/null/vietnam-circular.png" style={{ width: '23px', height: '23px', margin: 0, border: 0 }} alt="vn-flag" />
                      Tiếng Việt
                    </div>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          }
          </div>
    )
}

LanguageSetting.propTypes = {
  type: PropTypes.string,
}

LanguageSetting.defaultProps = {
  type: 'select',
}

export default LanguageSetting;