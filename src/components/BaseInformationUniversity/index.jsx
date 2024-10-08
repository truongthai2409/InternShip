import React, { useEffect, useState } from 'react';
import './styles.scss';
import Grid from '@mui/material/Grid';
import Button from '../shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { getDemandListByUniId } from 'src/store/slices/main/home/demand/demandSlice';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardHome from '../Card/CardHome';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { dateTimeHelper } from 'src/helpers/dateTimeHelpers';

const currentPage = 1;
const limit = 5;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const BaseInformationUniversity = ({
  demandDetail,
  demandListUni,
  pl,
  pr,
  ml,
  mt,
  pdLeft,
  pdRight,
  pdTop,
  pdBottom,
  mgLeft,
  arrDemand,
}) => {
  const { changeDateLocale } = dateTimeHelper;
  const { t } = useTranslation('cardInformation');
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  let { demandListUniversity } = useSelector((state) => state.demand);
  const uniId = demandDetail?.universityDTO?.id;

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [dispatch, uniId]);

  return (
    <div className=''>
      <div>
        <div>
          {demandDetail && (
            <div className='base__information  scrollCardInforCompany'>
              <div className='base__information-card'>
                <img
                  className='img-logo'
                  alt=''
                  src='https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
                />
                <div className='base__information-card-detail'>
                  <h3 className='university-name'>
                    {demandDetail?.universityDTO?.name}
                  </h3>
                  <div className=''>
                    <h5>{t('phoneNumberTL')} </h5>
                    <Typography
                      variant='h6'
                      component='div'
                      sx={{
                        fontSize: 17,
                        fontWeight: '400',
                        transform: 'translate(5px,5px)',
                      }}
                    >
                      {demandDetail?.universityDTO?.phone}
                    </Typography>
                  </div>
                  <div className='detail-email'>
                    <h5>
                      Email:
                      <a
                        href={`mailto:${demandDetail?.universityDTO?.email}`}
                        className='fix-fontSize'
                      >
                        {demandDetail?.universityDTO?.email}
                      </a>
                    </h5>
                  </div>
                  <div className='detail-website'>
                    <div className=''>
                      <h5>Website: </h5>
                      <Typography
                        variant='h6'
                        component='div'
                        sx={{
                          fontSize: 17,
                          fontWeight: '400',
                          transform: 'translate(5px,5px)',
                        }}
                      >
                        <a
                          href={demandDetail?.universityDTO?.website}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {demandDetail?.universityDTO?.website}
                        </a>
                      </Typography>
                    </div>

                    <div className=' base__information-card-detail-location'>
                      <h5 className=''>{t('addressTL')} </h5>
                      <Typography
                        variant='h6'
                        component='div'
                        sx={{
                          fontSize: 17,
                          fontWeight: '400',
                          transform: 'translate(5px,5px)',
                        }}
                      >
                        {`${demandDetail?.universityDTO?.address}`}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className='intro__university'>
                <h5 className='intro__university-title'>
                  {t('introductionToTheUniversityTL')}
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: demandDetail?.universityDTO?.description,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    wordBreak: 'break-word',
                    marginLeft: '25px',
                    textAlign: 'justify',
                    paddingRight: '25px',
                    fontWeight: '450',
                    fontSize: '14px',
                    fontFamily: '$f-family',
                    fontStyle: 'normal',
                  }}
                ></div>
                <Item
                  sx={{
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                  elevation={0}
                >
                  <div className='job-applying-container _scroll'>
                    <h5
                      className='intro__company-title intro__company-title-appling'
                      style={{
                        marginLeft: `${mgLeft ? mgLeft : ''}`,
                      }}
                    >
                      {t('partnerIsPostTL')}
                    </h5>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        width: 'auto',
                      }}
                    >
                      {demandListUniversity?.contents?.length > 0 &&
                        demandListUniversity?.contents?.map((job, index) => (
                          <Grid
                            item
                            lg='12'
                            md='12'
                            sm='12'
                            key={job.id}
                            sx={{
                              paddingLeft: pdLeft ? `${pdLeft} !important` : '',
                              paddingRight: pdRight
                                ? `${pdRight} !important`
                                : '',
                              width: '200px',
                            }}
                          >
                            <Link
                              to={`/partner/detail_demand/${job.id}`}
                              className='link__job-detail'
                            >
                              <CardHome
                                id={job.id}
                                index={index}
                                title={job.name}
                                fontSize={10}
                                nameCompany={job.universityDTO?.name}
                                idCompany={job.universityDTO?.id}
                                job={job}
                                // key={job.id}
                                idJob={job.id}
                                tagName={[
                                  job?.jobposition || null,
                                  job?.position || null,
                                  job?.jobType || null,
                                  job?.major || null,
                                ]}
                                majors={[job?.majors]}
                                location={job.universityDTO?.name}
                                amount={job.amount || `${t('notFoundTL')}`}
                                demandPartner={true}
                                time={[
                                  // `${changeDateLocale(job.timeStartStr) || changeDateLocale(job.createDate)}`,
                                  // `${changeDateLocale(job.timeEndStr) || changeDateLocale(job.end)}`,
                                  // `${changeDateLocale(job.timeStartStr || job.createDate)}`
                                  //   `${changeDateLocale(job.timeEndStr || job.end)}`
                                  moment(
                                    job.timeStartStr || job.createDate
                                  ).format('DD/MM/YYYY'),
                                  moment(job.timeEndStr || job.end).format(
                                    'DD/MM/YYYY'
                                  ),
                                ]}
                                locationPath={location.pathname}
                                pdLeft='30px'
                                pdRight='30px'
                                active={0}
                              />
                            </Link>
                          </Grid>
                        ))}
                    </Grid>
                  </div>
                </Item>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{
                    fontSize: 17,
                    fontWeight: '400',
                    transform: 'translate(5px,5px)',
                  }}
                ></Typography>
              </div>

              {pathUrl !== '/information_company' ? (
                <div className='button-card'>
                  <Link
                    to={`/infomation_demand/${demandDetail?.universityDTO?.id}`}
                  >
                    <Button
                      name={t('viewMoreTL')}
                      bwidth='130px'
                      bheight='40px'
                    ></Button>
                  </Link>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BaseInformationUniversity.propTypes = {};

export default BaseInformationUniversity;
