import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDemandListByUniId,
  getDemandListByUniId,
} from 'src/store/slices/main/home/demand/demandSlice';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { ListDemand } from './ListDemand';
import './styles.scss';

import PaginationCustom from 'src/components/shared/Pagination';
import StatisticUser from 'src/components/User/StatisticUser';
import { useTranslation } from 'react-i18next';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const limit = 5;
const PartnerPostList = (props) => {
  const { t } = useTranslation('title');
  TabTitle(`${t('ListOfPostsITInternshipJobsTL')}`);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const handleChange = (event, newValue) => setValue(newValue);
  const {
    demandListUniversity,
    demandListUniversityActive,
    AllDemandListUniversity,
  } = useSelector((state) => state.demand);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginate = (e, valuePage) => {
    setCurrentPage(parseInt(valuePage));
    window.scroll(0, 0);
  };
  let uniId = user?.universityDTO?.id;
  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
    dispatch(getAllDemandListByUniId({ uniId, currentPages: 0, limits: 1000 }));
  }, [user?.universityDTO?.id, currentPage, dispatch, uniId]);
  return (
    <div className='hr-post__wrapper'>
      <div className='hr-post-list__content'>
        <div className='hr-post-list__statistic'>
          <StatisticUser
            title='Điểm khả dụng'
            firstObject={{
              score: demandListUniversity?.totalItems,
              description: 'Lượt đăng tuyển',
            }}
            secondObject={{
              score: 0,
              description: 'Lượt xem hồ sơ',
            }}
          />
          <StatisticUser
            title='Trạng thái tin đăng'
            firstObject={{
              score: AllDemandListUniversity?.reduce((total, item) => {
                return (total +=
                  item?.status === null ||
                  item?.status?.name?.includes('Active'));
              }, 0),
              description: 'Đang đăng tuyển',
            }}
            secondObject={{
              score: AllDemandListUniversity?.reduce((total, item) => {
                return (total +=
                  item.status && item?.status?.name?.includes('Disable'));
              }, 0),
              description: 'Đã đóng',
            }}
          />
        </div>
        <Box className='filter-panel-home__wrapper' sx={{}}>
          <Box className='filter-panel-home__filterPanel' sx={{}}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                '& button': {
                  fontSize: '14px !important',
                  textTransform: 'uppercase',
                  color: 'black !important',
                  fontWeight: '700 !important',
                  flexBasis: '50%',
                },
                '& button.Mui-selected': {
                  color: '#fff !important',
                  background: '#04bf8a',
                  borderRadius: '4px',
                  '&#simple-tab-1': {
                    backgroundColor: '#666 !important',
                  },
                },
                '& span.MuiTabs-indicator': {
                  backgroundColor: 'unset !important',
                },
              }}
            >
              <Tab label='Đang đăng tuyển' {...a11yProps(0)} />
              <Tab label='Đã đóng' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel className='tabPanel' value={value} index={0}>
            <ListDemand
              demandList={demandListUniversityActive?.filter(
                (item) =>
                  item?.status?.name?.includes('Active') || item.status === null
              )}
              message='Không có đợt thực tập đăng tuyển.'
            />
          </TabPanel>
          <TabPanel className='tabPanel' value={value} index={1}>
            <ListDemand
              demandList={AllDemandListUniversity?.filter((item) =>
                item?.status?.name?.includes('Disable')
              )}
              message='Không có đợt thực tập đã đóng.'
            />
          </TabPanel>

          {/* nếu số trang lớn hơn 1 thì hiển thị UI pagination  */}
          {demandListUniversity?.totalPages > 1 ? (
            <div className='partner-postList__pagination'>
              <PaginationCustom
                page={currentPage}
                totalPages={demandListUniversity?.totalPages}
                handleOnChange={handlePaginate}
              />
            </div>
          ) : (
            ''
          )}
        </Box>
      </div>
    </div>
  );
};

export default PartnerPostList;
