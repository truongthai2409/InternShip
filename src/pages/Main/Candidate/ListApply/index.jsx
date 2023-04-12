import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ListCardJobHome from 'src/components/Home/ListCardJobHome';

import { TabTitle } from 'src/utils/GeneralFunctions';
import { useTranslation } from 'react-i18next';

const ListApply = () => {
  const { t } = useTranslation('title');
  TabTitle(t('appliedJobTL'));

  const { jobApplyList, jobApplyListHavePage } = useSelector(
    (state) => state.jobCandidateSlice
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className='apply__list--container'>
        <div className='header__apply'>
          <h2 className='header__apply-title'>Công việc đã ứng tuyển</h2>
          <p className='header__apply--des'>
            Xem lại danh sách những việc làm mà bạn đã ứng tuyển trước đó.
          </p>
        </div>
        <div className='section__apply'>
          <span>
            Bạn đã ứng tuyển{' '}
            <span>{jobApplyListHavePage?.totalItems || 0}</span> việc làm
          </span>
        </div>
        <Grid className='wrapper' spacing={{ xs: 2 }} container>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item xs={12}>
                <ListCardJobHome
                  hiddent={true}
                  jobList={jobApplyList?.map((item) => {
                    return item;
                  })}
                  cv={jobApplyList?.map((item) => {
                    return item.cv;
                  })}
                  jobListHavePages={jobApplyListHavePage}
                  reload={false}
                  viewCV={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ListApply;
