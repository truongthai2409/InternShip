import { Hidden } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from 'src/components/Card/DetailCard';
import ListCardJobHome from 'src/components/Home/ListCardJobHome';
import { getJobApplyListByCandidate } from 'src/store/slices/main/home/job/jobCandidateSlice';
import { getJobByCompanyThunk } from 'src/store/action/company/companyAction';
import { TabTitle } from 'src/utils/GeneralFunctions';
import { useTranslation } from 'react-i18next';

const ListApply = () => {
  const { t } = useTranslation('title');
  TabTitle(t('appliedJobTL'));

  const { user } = useSelector((state) => state.profile);
  const { jobApplyList, jobApplyListHavePage } = useSelector(
    (state) => state.jobCandidateSlice
  );
  const { index, id } = useSelector((state) => state.filter);
  const { jobListCompany } = useSelector((state) => state.job);

  const [jobs, setJobs] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (value) => {
    const token =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    const page = {
      user: user,
      token: token.token,
      page: {
        no: value - 1,
        limit: 5,
      },
    };
    dispatch(getJobApplyListByCandidate(page));
  };

  useEffect(() => {
    dispatch(getJobByCompanyThunk(id));
  }, [dispatch, id]);
  useEffect(() => {
    setJobs(jobApplyList);
    setJobDetail((jobApplyList && jobApplyList[index]?.jobApp) || []);
  }, [index, jobApplyList]);
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
                  jobList={jobs}
                  indexCardActive={index}
                  jobListHavePages={jobApplyListHavePage}
                  onChange={handleChange}
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
