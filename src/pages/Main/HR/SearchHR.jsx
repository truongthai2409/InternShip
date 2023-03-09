import React, { useEffect, useState, useReducer } from 'react';
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
import Modal from 'src/components/shared/Modal';
import { Document, Page, pdfjs } from 'react-pdf';
import { TabTitle } from 'src/utils/GeneralFunctions';
import ButtonMark from 'src/components/shared/ButtonMark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagName from 'src/components/Home/TagName';
import { useDispatch, useSelector } from 'react-redux';
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import { getCandidateThunk } from 'src/store/action/hr/getCandidateAction';
import {
  changeFilterChange,
  majorFilterChange,
  nameFilterChange,
} from 'src/store/slices/main/candidate/user/userCandidateSlice';
import {
  indexFilterChange,
  jobFilters,
  pageFilterChange,
} from 'src/store/slices/main/home/filter/filterSlices';
import { useTranslation } from 'react-i18next';
import iconCV from 'src/assets/img/view-file.svg';
import './styles.scss';

const SearchHR = () => {
  const { t } = useTranslation('search');
  TabTitle(t('searchCandidate'));
  const { provinceList } = useSelector((state) => state.location);
  const { candidateList } = useSelector((state) => state.candidateList);

  const [searchValue, setSearchValue] = useState('');
  const [label, setlabel] = useState('');
  const query = useQuery();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [numberCV, setNumberCV] = useState([]);
  const viewProfileCV = (info) => {
    setOpen(!open);
    setNumberCV(info.cv);
  };
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const renderCV = () => {
    return (
      <Modal
        iconClose={true}
        modalTitle={'View CV'}
        open={open}
        setOpen={setOpen}
        children={
          <div>
            <Document file={numberCV} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        }
      />
    );
  };
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
  const handleCheck = (value) => {
    console.log('runnn');
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
    dispatch(getCandidateThunk([5, 0]));
  }, []);

  return (
    <div className='header__with-search onMobile onTablet'>
      <Grid
        className='wrapper'
        sx={{ padding: '1rem 2rem', position: 'relative' }}
        spacing={{ xs: 4 }}
        container
      >
        <Hidden lgDown>
          <Grid item xs={0} sm={0} md={0} lg={2.5} xl={2.5}>
            <SideBarHomeList
              onChange={handleCheck}
              slideBarHome__wrapper={true}
            />
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <div className='HomePageMenu'>
            <TemporaryDrawer
              children={
                <SideBarHomeList
                  onChange={handleCheck}
                  slideBarHome__wrapper={true}
                />
              }
              position='left'
              name={<AddCircleIcon />}
            />
          </div>
        </Hidden>
        <Grid item xs={12} sm={12} md={12} lg={9.5} xl={9.5}>
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
          {candidateList?.map((candidate, index) => {
            return (
              <Box className='card-container'>
                <div className='button__mark'>
                  <ButtonMark
                    height='32px'
                    width='32px'
                    fontSize='18px'
                    isMark={false}
                  />
                </div>
                <Card
                  variant='outlined'
                  sx={{
                    margin: '10px 0',
                  }}
                >
                  <CardContent>
                    <div className='card-container__item'>
                      <div className='card-container__image'>
                        <img
                          src={candidate.user.avatar}
                          style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                          alt='ảnh đại diện'
                        />
                        <div className='candidate-card'>
                          <p className='candidate-card__fullname item'>
                            {candidate.user.lastName} {candidate.user.firstName}
                          </p>
                          <p className='item' style={{ fontSize: '16px' }}>
                            {candidate.major.name}
                          </p>
                          <div className='candidate-card__location item'>
                            <LocationOnIcon
                              sx={{ color: '#04bf8a', fontSize: '16px' }}
                            />
                            {candidate.nameProvince}
                          </div>
                        </div>
                      </div>
                      <div
                        className='view-CV'
                        onClick={() => viewProfileCV(candidate)}
                      >
                        <img src={iconCV} alt='xem CV' />
                        <span>Xem CV</span>
                      </div>
                      <div className='card-container__content'>
                        <div className='card-container__tagname'>
                          <TagName title={candidate.major.name} />
                          <TagName title={candidate.skills} />
                        </div>
                        <div className='card-container__date'>
                          <AccessTimeIcon
                            sx={{ color: '#04bf8a', fontSize: '16px' }}
                          />
                          <span>Cập nhật hồ sơ: 02/03/2023</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
          {renderCV()}
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchHR;
