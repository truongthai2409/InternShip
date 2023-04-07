import AddLocationIcon from '@mui/icons-material/AddLocation';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../shared/Button';
import SelectAreaHome from '../SelectAreaHome';
import './styles.scss';

function SearchResultHome({
  onChange,
  onClick,
  bwidth,
  bheight,
  bwidthInput,
  bheightInput,
  mb,
  candidate_infomation,
  candidate_home_width,
}) {
  const { t } = useTranslation('search');

  const [searchValue, setSearchValue] = useState('');

  const onChangeSearch = (event) => {
    console.log(event);
    setSearchValue(event.target.value);
  };
  const search = (event) => {
    event.preventDefault();
    onClick && onClick(searchValue);
  };
  return (
    <div
      className='header__with-search onMobile onTablet'
      style={{ width: candidate_home_width ? candidate_home_width : '' }}
    >
      <form
        className='header__with-search-search '
        style={{
          width: bwidth ? `${bwidth}` : '',
          height: bheight ? `${bheight}` : '',
          marginBottom: mb ? `${mb}` : '',
        }}
      >
        <div className='header__with-search-search-wrap'>
          <span className='search__icon'>
            <SearchOutlinedIcon sx={{ color: '#04bf8a' }} />
          </span>
          <input
            type='text'
            className='header__with-search-search-1'
            required
            id='none'
            placeholder={t('searchByNameTL')}
            value={searchValue}
            onChange={onChangeSearch}
            style={{
              width: bwidthInput ? `${bwidthInput}` : '',
              height: bheightInput ? `${bheightInput}` : '',
            }}
          />
        </div>
        <div className='header__with-search-search-select header__with-search-search-select-onMobile'>
          <AddLocationIcon sx={{ color: '#04bf8a' }} />
          <SelectAreaHome onChange={onChange} />
        </div>
        <div className='header__with-search-button-search' onClick={search}>
          {candidate_infomation ? (
            <Button
              name={t('searchTL')}
              bwidth='150px'
              bheight='38px'
              padding='20px 5px'
              background-color='gray'
            />
          ) : (
            <Button
              name={t('searchTL')}
              bwidth='150px'
              bheight='35px'
              padding='20px 5px'
              background-color='gray'
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
}

SearchResultHome.propTypes = {};

export default SearchResultHome;
