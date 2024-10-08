import Grid from '@mui/material/Grid';
import { TabTitle } from 'src/utils/GeneralFunctions';
import ListCardJobHome from 'src/components/Home/ListCardJobHome';
import './styles.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

const CandidateViewList = () => {
  const { t } = useTranslation('title');
  TabTitle(`${t('savedJobsTL')}`);

  const { jobCare, jobCareHavePage } = useSelector(
    (state) => state.jobCandidateSlice
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className='apply__list--container'>
        <div className='header__apply'>
          <h2 className='header__apply-title'>Danh sách việc làm đã lưu</h2>
          <p className='header__apply--des'>
            Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển
            ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.
          </p>
        </div>
        <>
          <div className='section__apply'>
            <span>
              Bạn đã quan tâm <span>{jobCareHavePage?.totalItems}</span> việc
              làm
            </span>
          </div>
          <Grid className='wrapper' spacing={{ xs: 2 }} container>
            <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
              <Grid container spacing={{ xs: 1 }}>
                <Grid item xs={12}>
                  <ListCardJobHome
                    jobList={jobCare?.map((item) => {
                      return item.jobDTO;
                    })}
                    jobListHavePages={jobCareHavePage}
                    reload={false}
                    viewCV={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      </div>
    </>
  );
};

export default CandidateViewList;
