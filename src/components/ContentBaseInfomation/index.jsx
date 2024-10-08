import React from 'react';
import Grid from '@mui/material/Grid';
import { Link, useLocation } from 'react-router-dom';
import Button from '../shared/Button';
import './styles.scss';
import CardHome from '../Card/CardHome';
import moment from 'moment';
import { useSelector } from 'react-redux';
import PaginationCustom from '../shared/Pagination';
import { flexbox } from '@mui/system';
import { useTranslation } from 'react-i18next';

const ContentBaseInformation = ({
  jobDetail,
  jobListCompany,
  pdLeft,
  pdRight,
  hideMark = false,
  mgLeft,
  none__time,
}) => {
  const { t } = useTranslation('cardInformation');
  const location = useLocation();
  const pathUrl = location.pathname;

  return (
    <div>
      <div className='job-applying-container _scroll'>
        <h5
          className='intro__company-title intro__company-title-appling'
          style={{
            marginLeft: `${mgLeft ? mgLeft : ''}`,
          }}
        >
          {t('jobVacanciesAvailableTL')}
        </h5>
        <Grid
          container
          spacing={1}
          sx={{
            width: 'auto',
          }}
        >
          {jobListCompany?.length > 0 ? (
            jobListCompany?.map((job, index) => (
              <Grid
                item
                lg='12'
                md='12'
                sm='12'
                key={job.id}
                sx={{
                  paddingLeft: pdLeft ? `${pdLeft} !important` : '',
                  paddingRight: pdRight ? `${pdRight} !important` : '',
                  width: '200px',
                }}
              >
                <Link to={`/detail_job/${job.id}`} className='link__job-detail'>
                  <CardHome
                    id={job.id}
                    index={index}
                    title={job.name}
                    fontSize={10}
                    nameCompany={job.hr?.company?.name}
                    idCompany={job.hr?.company?.id}
                    job={job}
                    // key={job.id}
                    idJob={job.id}
                    tagName={[
                      job?.jobposition || null,
                      job?.position || null,
                      job?.jobType || null,
                      job?.major || null,
                    ]}
                    location={job.locationjob?.district?.province?.name}
                    amount={job.amount || 'Không có'}
                    demandPartner={true}
                    time={[
                      moment(job.timeStartStr || job.createDate).format(
                        'DD/MM/YYYY'
                      ),
                      moment(job.timeEndStr || job.end).format('DD/MM/YYYY'),
                    ]}
                    locationPath={location.pathname}
                    pdLeft='30px'
                    pdRight='30px'
                    none__time={none__time}
                    // active={indexCardActive}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <div style={{ padding: 16, fontWeight: 'bold' }}>
              {t('noJobOpeningsAvailableTL')}
            </div>
          )}
        </Grid>
        {/* JobListCompany Chưa phân trang ( đang trả về tất cả) */}
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <PaginationCustom page={1} totalPages={10} />
        </div> */}
      </div>
      {pathUrl !== `/information_company/${jobDetail?.hr?.company?.id}` ? (
        <div className='button-card'>
          <Link to={`/information_company/${jobDetail?.hr?.company?.id}`}>
            <Button
              name={t('viewMoreTL')}
              bwidth='130px'
              bheight='40px'
            ></Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

ContentBaseInformation.propTypes = {};

export default ContentBaseInformation;
