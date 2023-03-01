import React, { useEffect, useState } from 'react';
import Button from 'src/components/shared/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useQuery from 'src/hooks/useQuery';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SearchAutoComplete from 'src/components/shared/SearchAutoComplete';
import { useDispatch, useSelector } from 'react-redux';
// import { getMajorList } from 'src/store/slices/Admin/major/majorSlice';
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import {
  changeFilterChange,
  majorFilterChange,
  nameFilterChange,
} from 'src/store/slices/main/candidate/user/userCandidateSlice';
import { useTranslation } from 'react-i18next';

const SearchHR = () => {
  const { t } = useTranslation('client');
  const { majorList } = useSelector((state) => state.major);
  const [searchValue, setSearchValue] = useState('');
  const [label, setlabel] = useState('');
  const query = useQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    const { name = '' } = query;
    setSearchValue(name);
  }, [query]);

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    dispatch(nameFilterChange(searchValue));
    dispatch(majorFilterChange(label));
    dispatch(changeFilterChange(true));
  };
  const handleLabel = (value) => {
    if (value === null) {
      setlabel('');
    } else {
      setlabel(value);
    }
  };
  useEffect(() => {
    dispatch(getMajorListThunk([1, 20]));
  }, [dispatch]);
  return (
    <div className='header__with-search onMobile onTablet'>
      <div style={{ backgroundColor: '#fff', height: 45 }}>
        <h4 style={{ color: '#000', padding: 12, textAlign: 'center' }}>
          Tìm kiếm ứng viên
        </h4>
      </div>
      <form className='header__with-search-search '>
        <div className='header__with-search-search-wrap' style={{ flex: 1 }}>
          <span className='search__icon'>
            <SearchOutlinedIcon sx={{ color: '#04bf8a' }} />
          </span>
          <input
            type='text'
            className='header__with-search-search-1'
            required
            id='none'
            placeholder='Theo tên...'
            value={searchValue}
            onChange={onChangeSearch}
          />
        </div>
        <div className='header__with-search-search-select header__with-search-search-select-onMobile'>
          <AddLocationIcon sx={{ color: '#04bf8a' }} />
          <SearchAutoComplete
            data={majorList}
            avatarRender={null}
            nameRender={(option) => option.name}
            labelName='Theo chuyên nghành...'
            onChange={(event, value) => handleLabel(value)}
            register={(option) => option}
          />
          {console.log(majorList)}
        </div>
        <div className='header__with-search-button-search' onClick={search}>
          <Button
            name={t('searchTL')}
            bwidth='125px'
            bheight='35px'
            padding='20px 5px'
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default SearchHR;
