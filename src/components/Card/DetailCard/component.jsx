import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobList } from '../../../store/slices/main/home/job/jobSlice';
import BaseInformationCompany from '../../BaseInformationCompany';
import BaseInformationUniversity from '../../BaseInformationUniversity';
import InformationCompany from '../../InformationComapny';
import InformationUniversity from '../../InformationUniversity';
import TagName from '../../Home/TagName';
import { useTranslation } from 'react-i18next';
const API = process.env.REACT_APP_API;
export function TabPanel(props) {
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
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
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

const Detail = ({
  logo,
  jobDetail,
  jobListName,
  candidate,
  jobPostHR,
  jobDetailById,
  demandPartner = false,
  rating,
  jobListCompany,
}) => {
  const { t } = useTranslation('cardInformation');
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getJobList([1, 20]));
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {jobDetail && (
        <div className='detail__card detail__card-ontablet containerDetailCard-home'>
          <div className='detail__card-1'>
            <div className='detail__card-intro'>
              <img
                className='detail__card__logo'
                alt='detail-card-logo'
                src={
                  role?.includes('Role_HR')
                    ? `${API}${jobDetail?.universityDTO?.avatar}`
                    : `${API}${jobDetail?.hr?.company?.logo}`
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.onerror = undefined;
                  currentTarget.src =
                    'https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg';
                }}
              />
              <div>
                <h2>{jobDetail?.name}</h2>
                <p className='name-company'>
                  {jobDetail.hr?.company?.name ||
                    jobDetail?.universityDTO?.name}
                </p>
              </div>
            </div>
            <div className='detail__card-2'>
              <div className='tag-name'>
                <div className='tag-name__name'>
                  {jobDetail?.jobType?.length > 0 ? (
                    jobDetail?.jobType?.map((item) => {
                      return <TagName key={item.name} title={item.name} />;
                    })
                  ) : (
                    <TagName
                      title={
                        jobDetail?.jobType?.name ||
                        jobDetail?.jobType.name ||
                        null
                      }
                    />
                  )}
                  {jobDetail?.position?.length > 0 ? (
                    jobDetail?.position?.map((item) => {
                      return <TagName key={item.name} title={item.name} />;
                    })
                  ) : (
                    <TagName
                      title={
                        jobDetail?.position?.name ||
                        jobDetail?.jobposition?.name ||
                        null
                      }
                    />
                  )}
                  <TagName title={jobDetail?.jobTypes || null} />
                  {jobDetail?.major?.length > 0 ? (
                    jobDetail?.major?.map((item) => {
                      return <TagName key={item.name} title={item.name} />;
                    })
                  ) : (
                    <TagName title={jobDetail?.major?.name || null} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {!demandPartner ? (
              <Box sx={{ width: '100%' }} className='boxOpenSans  '>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mt: 0,
                    fontSize: 3,
                  }}
                  className='boxOpenSans'
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    textColor='primary'
                    scrollButtons
                    sx={{}}
                    className='boxOpenSans overwriteBox'
                  >
                    <Tab
                      label={t('DetailsTL')}
                      {...a11yProps(0)}
                      textColor='inherit'
                      sx={{ fontSize: 12 }}
                      className='boxOpenSans'
                    />
                    <Tab
                      label={t('companyOverviewTL')}
                      {...a11yProps(1)}
                      textColor='inherit'
                      sx={{ fontSize: 12 }}
                      className='boxOpenSans'
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <InformationCompany
                    jobDetail={jobDetail}
                    rating={rating}
                  ></InformationCompany>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BaseInformationCompany
                    jobDetail={jobDetail}
                    jobListCompany={jobListCompany}
                  />
                </TabPanel>
              </Box>
            ) : (
              <Box sx={{ width: '100%' }} className='boxOpenSans'>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    mt: 1,
                    fontSize: 3,
                  }}
                  className='boxOpenSans'
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                    textColor='primary'
                    scrollButtons
                    className='boxOpenSans'
                  >
                    <Tab
                      label={t('DetailsTL')}
                      {...a11yProps(0)}
                      textColor='inherit'
                      sx={{ fontSize: 12 }}
                      className='boxOpenSans'
                    />
                    <Tab
                      label={t('informationAboutTheUniversityTL')}
                      {...a11yProps(1)}
                      textColor='inherit'
                      sx={{ fontSize: 12 }}
                      className='boxOpenSans'
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <InformationUniversity
                    jobDetail={jobDetail}
                    rating={rating}
                  ></InformationUniversity>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <BaseInformationUniversity
                    demandDetail={jobDetail}
                    demandListUni={jobListName}
                  />
                </TabPanel>
              </Box>
            )}
          </div>
        </div>
      )}

      {jobDetailById && jobDetailById !== {} && (
        <div className='detail__card detail__card-ontablet containerDetailCard-home'>
          <div className='detail__card-1'>
            <div className='detail__card-intro'>
              <img
                className='detail__card__logo'
                alt='detail-card-logo'
                src={
                  role?.includes('Role_Partner')
                    ? `${API}${jobDetailById?.universityDTO?.avatar}`
                    : `${API}${jobDetailById?.hr?.company?.logo}`
                }
              />
              <div>
                <h2>{jobDetailById?.name || jobDetailById?.name}</h2>
                <p className='name-company'>
                  {jobDetailById?.hr?.company?.name ||
                    jobDetailById?.universityDTO?.name}
                </p>
              </div>
            </div>
            <div className='detail__card-2'>
              <div className='tag-name'>
                <div className='tag-name__name'>
                  {jobDetailById?.jobType?.length > 0 ? (
                    jobDetailById?.jobType?.map((item) => {
                      return <TagName title={item.name} />;
                    })
                  ) : (
                    <TagName
                      title={
                        jobDetailById?.jobType?.name ||
                        jobDetailById?.jobTypes?.name ||
                        null
                      }
                    />
                  )}
                  {jobDetailById?.position?.length > 0 ? (
                    jobDetailById?.position?.map((item) => {
                      return <TagName title={item.name} />;
                    })
                  ) : (
                    <TagName
                      title={
                        jobDetailById?.position?.name ||
                        jobDetailById?.jobposition?.name ||
                        null
                      }
                    />
                  )}
                  {jobDetailById?.major?.length > 0 ? (
                    jobDetailById?.major?.map((item) => {
                      return <TagName keu={item.named} title={item.name} />;
                    })
                  ) : (
                    <TagName title={jobDetailById?.major?.name || null} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='scrollCardInforCompany2'>
            <Box sx={{ width: '100%' }}>
              {demandPartner ? (
                <InformationUniversity
                  jobDetail={jobDetailById}
                  demandPartner={demandPartner}
                  detailJob={true}
                ></InformationUniversity>
              ) : (
                <InformationCompany jobDetailById={jobDetailById} />
              )}
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
