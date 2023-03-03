import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PaginationCustom from 'src/components/shared/Pagination';
import { pageFilterChange } from 'src/store/slices/main/home/filter/filterSlices';
import CardHome from '../../Card/CardHome';
import { Grid } from '@mui/material';

import './styles.scss';
const image_notFound = require('src/assets/img/notfound.png');
const ListCardJobHome = ({
  jobList,
  indexCardActive,
  positionValue,
  onChange,
  jobListHavePages,
  hiddent,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.filter);
  const handlePagination = (e, valuePage) => {
    dispatch(pageFilterChange(valuePage));
    onChange && onChange(valuePage);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
      <div className='filter-panel-home__wrapper'>
        {jobList && jobList?.length > 0 ? (
          jobList.map((job, index) => (
            <CardHome
              jobList={jobList}
              hiddent={hiddent}
              page={page}
              positionValue={positionValue}
              id={job?.jobApp?.id || job?.jobCare?.id || job?.id}
              active={indexCardActive}
              index={index}
              key={job.id || index}
              title={
                job?.name ? job.name : job.jobApp?.name || job.jobCare?.name
              }
              fontSize={10}
              nameCompany={
                job?.hr?.company?.name ||
                job?.partner?.universityDTO.name ||
                job?.jobApp?.company?.name ||
                job?.jobApp?.hr?.company?.name ||
                job?.jobCare?.hr?.company?.name ||
                job?.universityDTO?.name
              }
              idCompany={
                job?.hr?.company?.id ||
                job?.partner?.universityDTO.id ||
                job?.jobApp?.hr?.company?.id
              }
              tagName={[
                job?.jobposition || null,
                job?.position || null,
                job?.jobApp?.jobposition || null,
                job?.jobCare?.jobposition || null,
                job?.jobType || null,
                job?.jobApp?.jobType || null,
                job?.jobCare?.jobType || null,
                job?.jobTypes || null,
                job?.major || null,
              ]}
              location={
                job.locationjob?.district?.province?.name ||
                job?.universityDTO?.locations[0]?.district?.province?.name ||
                job?.jobApp?.locationjob?.district?.province?.name ||
                job?.jobCare?.locationjob?.district?.province?.name
              }
              amount={
                job.amount ||
                job.jobApp?.amount ||
                job.jobCare?.amount ||
                'Không có'
              }
              demandPartner={true}
              time={[
                moment(job.timeStartStr || job.createDate).format('DD/MM/YYYY'),
                moment(job.timeEndStr || job.end).format('DD/MM/YYYY'),
              ]}
              locationPath={location.pathname}
            />
          ))
        ) : (
          <div className='not_found' style={{ textAlignLast: 'center' }}>
            <img
              src={image_notFound}
              alt='notfound'
              width={'50%'}
              height={'50%'}
            />
            <p>Rất tiếc, hiện tại không có công việc phù hợp được tìm thấy</p>
          </div>
        )}
      </div>
      {jobListHavePages?.totalPages > 1 ? (
        <div className='home__pagination'>
          <PaginationCustom
            page={page}
            totalPages={jobListHavePages?.totalPages}
            handleOnChange={handlePagination}
          />
        </div>
      ) : (
        ''
      )}
    </Grid>
  );
};
export default ListCardJobHome;
