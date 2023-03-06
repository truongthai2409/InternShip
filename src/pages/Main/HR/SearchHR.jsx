import React, { useEffect, useState } from 'react';
import Button from 'src/components/shared/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useQuery from 'src/hooks/useQuery';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SearchAutoComplete from 'src/components/shared/SearchAutoComplete';
import TemporaryDrawer from 'src/components/shared/Drawer';
import SideBarHomeList from '../../../components/Home/SideBarHomeList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CardContent, Grid, Hidden } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { TabTitle } from 'src/utils/GeneralFunctions';
import ButtonMark from 'src/components/shared/ButtonMark';

import { useDispatch, useSelector } from 'react-redux';
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import {
  changeFilterChange,
  majorFilterChange,
  nameFilterChange,
} from 'src/store/slices/main/candidate/user/userCandidateSlice';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const SearchHR = () => {
  const { t } = useTranslation('search');
  TabTitle(t('searchCandidate'));
  const { provinceList } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.profile.user);
  console.log('user: ' + user.id);

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
      <Grid
        className='wrapper'
        sx={{ position: 'relative' }}
        spacing={{ xs: 2 }}
        container
      >
        <Hidden lgDown>
          <Grid item xs={0} sm={0} md={0} lg={2.5} xl={2.5}>
            <SideBarHomeList
              onChange={handleLabel}
              slideBarHome__wrapper={true}
            />
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <div className='HomePageMenu'>
            <TemporaryDrawer
              children={
                <SideBarHomeList
                  onChange={handleLabel}
                  slideBarHome__wrapper={true}
                />
              }
              position='left'
              name={<AddCircleIcon />}
            />
          </div>
        </Hidden>
        <Grid item xs={9.5}>
          <form className='header__with-search-search '>
            <div
              className='header__with-search-search-wrap'
              style={{ flex: 1 }}
            >
              <span className='search__icon'>
                <SearchOutlinedIcon sx={{ color: '#04bf8a' }} />
              </span>
              <input
                type='text'
                className='header__with-search-search-1'
                required
                id='none'
                placeholder={t('searchByPosition')}
                value={searchValue}
                onChange={onChangeSearch}
              />
            </div>
            <div className='header__with-search-search-select header__with-search-search-select-onMobile'>
              <AddLocationIcon sx={{ color: '#04bf8a' }} />
              <SearchAutoComplete
                data={provinceList}
                avatarRender={null}
                nameRender={(option) => option.name}
                labelName={t('searchByLocationTL')}
                onChange={(event, value) => handleLabel(value)}
                register={(option) => option}
              />
            </div>
            <div className='header__with-search-button-search' onClick={search}>
              <Button
                name={t('searchTL')}
                bwidth='130px'
                bheight='38px'
                padding='20px 5px'
              ></Button>
            </div>
          </form>
          <Box className='card-container'>
            <Card
              variant='outlined'
              sx={{
                margin: '10px 0',
              }}
            >
              <CardContent>
                <img
                  src={user.avatar}
                  style={{ width: '80px' }}
                  alt='ảnh đại diện'
                />
                <div className='button__mark'>
                  <ButtonMark
                    height='32px'
                    width='32px'
                    fontSize='18px'
                    isMark={false}
                  />
                </div>
              </CardContent>
            </Card>
            <Card
              variant='outlined'
              sx={{
                margin: '10px 0',
              }}
            >
              <CardContent>
                <img
                  src={user.avatar}
                  style={{ width: '80px' }}
                  alt='ảnh đại diện'
                />
              </CardContent>
            </Card>
            <Card
              variant='outlined'
              sx={{
                margin: '10px 0',
              }}
            >
              <CardContent>
                <img
                  src={user.avatar}
                  style={{ width: '80px' }}
                  alt='ảnh đại diện'
                />
              </CardContent>
            </Card>
            <Card
              variant='outlined'
              sx={{
                margin: '10px 0',
              }}
            >
              <CardContent>
                <img
                  src={user.avatar}
                  style={{ width: '80px' }}
                  alt='ảnh đại diện'
                />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchHR;
