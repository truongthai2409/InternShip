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
  no,
  reload,
  viewCV,
  cv,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const page = no + 1;
  const handlePagination = (e, valuePage) => {
    dispatch(pageFilterChange(valuePage));
    onChange && onChange(valuePage);
  };
  const styleInline = reload
    ? {
        display: 'grid',
        padding: '10px 20px',
        border: '1px solid #F6F6F6',
        height: 'inherit',
        width: '100%',
        gridTemplateColumns: 'auto auto',
        gap: '20px',
        marginTop: '30px',
        backgroundColor: '#F6F6F6',
        boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
      }
    : {};
  return (
    <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
      <div className='filter-panel-home__wrapper' style={styleInline}>
        {jobList && jobList?.length > 0 ? (
          jobList.map((job, index) => (
            <CardHome
              cv={cv ? cv[index] : null}
              jobList={job}
              hiddent={hiddent}
              page={page}
              positionValue={positionValue}
              id={job?.jobDTO?.id || job?.id || job?.jobCare?.id || job?.id}
              active={indexCardActive}
              index={index}
              key={job?.id || index}
              title={
                job?.name
                  ? job?.name
                  : job?.jobApp?.name || job?.jobCare?.name || job?.jobDTO?.name
              }
              fontSize={13}
              nameCompany={
                job?.companyName || job?.jobDTO.companyName
                // job?.partner?.universityDTO.name ||
                // job?.jobApp?.company?.name ||
                // job?.jobApp?.hr?.company?.name ||
                // job?.jobCare?.hr?.company?.name ||
                // job?.universityDTO?.name
              }
              idCompany={
                job?.hrDTO?.companyDTO?.id ||
                job?.partner?.universityDTO?.id ||
                job?.jobApp?.hr?.company?.id
              }
              tagName={[
                job?.jobPositionDTO || null,
                job?.position || null,
                job?.jobApp?.jobPositionDTO || null,
                job?.jobCare?.jobPositionDTO || null,
                job?.jobTypeDTO || null,
                job?.jobApp?.jobTypeDTO || null,
                job?.jobCare?.jobTypeDTO || null,
                job?.jobTypes || null,
                job?.majorDTO || null,
              ]}
              location={
                job?.locationDTO?.districtDTO?.provinceDTO?.name ||
                job?.universityDTO?.locations[0]?.districtDTO?.provinceDTO
                  ?.name ||
                job?.jobApp?.locationDTO?.districtDTO?.provinceDTO?.name ||
                job?.jobCare?.locationDTO?.districtDTO?.provinceDTO?.name ||
                job?.jobDTO?.locationDTO?.districtDTO?.provinceDTO?.name
              }
              amount={
                job?.amount ||
                job?.jobApp?.amount ||
                job?.jobCare?.amount ||
                job?.jobDTO?.amount ||
                'Không có'
              }
              demandPartner={true}
              time={[
                moment(job?.startDate || job?.createDate).format('DD/MM/YYYY'),
                moment(job?.endDate || job?.end).format('DD/MM/YYYY'),
              ]}
              locationPath={location.pathname}
              reload={reload}
              viewCV={viewCV}
              appliedDate={job.appliedDate}
            />
          ))
        ) : (
          <div className='not_found' style={{ textAlignLast: 'center' }}>
            <img src={image_notFound} alt='notfound' width={'25%'} />
            <p>Rất tiếc, hiện tại không có công việc phù hợp được tìm thấy</p>
          </div>
        )}
      </div>
      {jobListHavePages?.totalPages > 1 && reload == false ? (
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
