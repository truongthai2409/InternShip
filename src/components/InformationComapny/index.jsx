import AddLocationIcon from '@mui/icons-material/AddLocation';
import WorkIcon from '@mui/icons-material/Work';
import { Icon, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addApply } from 'src/store/slices/main/candidate/apply/applySlice';
import { getJobApplyListByCandidate } from 'src/store/slices/main/home/job/jobCandidateSlice';
import Button from '../shared/Button';
import './styles.scss';

const InformationCompany = ({
  jobDetail,
  jobDetailById,
  demandPartner = false,
}) => {
  const { t } = useTranslation('cardInformation');
  const [check, setCheck] = useState(false);
  const { user, others } = useSelector((state) => state.profile);
  const { allJobApply } = useSelector((state) => state.jobCandidateSlice);

  const dispatch = useDispatch();
  const handleAddJob = async (e) => {
    e.stopPropagation();
    if (user) {
      if (!user?.cv) {
        toast.error(t('youDoNotHaveACVYetPleaseUpdateItTL'), {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        });
      } else {
        const applyData = {
          apply: JSON.stringify({
            jobApp: {
              id: jobDetail.id,
            },
            candidate: {
              id: user.id,
            },
            referenceLetter: `${t('jobApplicationTL')} ${user?.user?.username}`,
          }),
          fileCV: user.cv,
        };
        const resApply = await dispatch(addApply(applyData));
        if (
          resApply.payload.status === 200 ||
          resApply.payload.status === 201
        ) {
          toast.success(t('yourCVHasBeenSubmittedSuccessfullyTL'), {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#00B074', backgroundColor: '#DEF2ED' },
          });
          setCheck(true);
          dispatch(getJobApplyListByCandidate(others.id));
        }
      }
    } else {
      toast.error(t('youNeedToLogInAsaCandidateToApplyForThisPositionTL'), {
        position: 'top-right',
        autoClose: 3000,
        style: { color: '#00B074', backgroundColor: '#DEF2ED' },
      });
    }
  };
  useEffect(() => {
    setCheck(
      allJobApply
        ?.map((item) => {
          return item.jobApp?.id;
        })
        .includes(jobDetail?.id)
    );
  }, [jobDetail, allJobApply]);

  return (
    <div>
      {jobDetail && (
        <>
          <div className='detail__card-3 scrollCardInforCompany2'>
            <Typography variant='span'>
              <Typography
                variant='span'
                sx={{ fontSize: 16, color: 'black', fontWeight: '700' }}
              >
                {t('jobDescriptionTL')}
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                sx={{ fontSize: 16, fontWeight: '400' }}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: jobDetail.description }}
                ></span>
              </Typography>
            </Typography>
            <Typography variant='span'>
              <Typography
                variant='span'
                sx={{ fontSize: 16, color: 'black', fontWeight: '700' }}
              >
                {t('jobRequirementsTL')}
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                sx={{ fontSize: 14, fontWeight: '400' }}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: jobDetail.requirement }}
                ></span>
              </Typography>
            </Typography>
            <div className='detail__card-3-item'>
              <Typography variant='span'>
                <Typography
                  variant='span'
                  sx={{ fontSize: 16, fontWeight: '700' }}
                >
                  {t('benefitsTL')}
                </Typography>
                <Typography
                  variant='body2'
                  gutterBottom
                  sx={{ fontWeight: '400', fontSize: '14px !important' }}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: jobDetail.otherInfo }}
                  ></span>
                </Typography>
              </Typography>
            </div>
            <div className='detail__card-3-item'>
              <Typography variant='span'>
                <Typography
                  variant='span'
                  sx={{ fontSize: 16, fontWeight: '700' }}
                >
                  {t('applicationDeadlineTL')}
                </Typography>
                <Typography
                  variant='body2'
                  gutterBottom
                  className='time-line'
                  sx={{ fontSize: '14px !important', fontWeight: '400' }}
                >
                  {moment(jobDetail.timeStartStr).format('DD/MM/YYYY')} -{' '}
                  {moment(jobDetail.timeEndStr).format('DD/MM/YYYY')}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className='line'></div>
          <div className='detail__card-4'>
            <div className='detail__card-4-item' sx={{ display: 'flex' }}>
              <Icon className='detail__card-4-item-icon'>
                <WorkIcon />
              </Icon>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  fontSize: 14,
                  fontWeight: '400',
                  transform: 'translate(3px,3px)',
                  flex: 1,
                  // overflow: "hidden",
                  textOverflow: 'ellipsis',
                }}
              >
                {jobDetail.jobType?.name}
              </Typography>
            </div>
            <div className='detail__card-4-item'>
              <AddLocationIcon className='detail__card-4-item-icon'>
                <WorkIcon />
              </AddLocationIcon>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  fontSize: 14,
                  fontWeight: '400',
                  transform: 'translate(3px,3px)',
                  flex: 1,
                  // overflow: "hidden",
                  textOverflow: 'ellipsis',
                }}
              >
                {`${jobDetail.locationjob?.address}, ${jobDetail.locationjob?.district?.name}, ${jobDetail.locationjob?.district?.province?.name}`}
              </Typography>
            </div>
          </div>
          {user?.user?.role?.name === 'Role_Candidate' ? (
            <div className='detail__card-5'>
              <Button
                name={
                  check ? `${t('applicationSubmittedTL')}` : `${t('applyTL')}`
                }
                onClick={handleAddJob}
                disabled={check ? true : false}
                bheight='35px'
              ></Button>
            </div>
          ) : (
            ''
          )}
        </>
      )}
      {jobDetailById && (
        <>
          <div className='detail__card-3 scrollCardInforCompany2'>
            <Typography variant='span'>
              <Typography
                variant='span'
                sx={{ fontSize: 18, color: 'black', fontWeight: '700' }}
              >
                {demandPartner
                  ? `${t('listOfStudentsTL')}`
                  : `${t('jobDescriptionTL')}`}
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                sx={{ fontSize: 16, fontWeight: '400' }}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: jobDetailById.description,
                  }}
                ></span>
              </Typography>
            </Typography>
            <div className='detail__card-3-item'>
              {demandPartner ? (
                <></>
              ) : (
                <Typography variant='span'>
                  <Typography
                    variant='span'
                    sx={{ fontSize: 18, fontWeight: '700' }}
                  >
                    {t('jobRequirementsTL')}
                  </Typography>
                  <Typography
                    variant='body2'
                    gutterBottom
                    sx={{ fontSize: 16, fontWeight: '400' }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: jobDetailById.requirement,
                      }}
                    ></span>
                  </Typography>
                </Typography>
              )}
            </div>
            <div className='detail__card-3-item'>
              <Typography variant='span'>
                <Typography
                  variant='span'
                  sx={{ fontSize: 18, fontWeight: '700' }}
                >
                  <span>{t('applicationDeadlineTL')}</span>
                  <br />
                </Typography>
                <Typography
                  variant='span'
                  gutterBottom
                  sx={{ fontSize: 17, fontWeight: '400' }}
                >
                  {moment(jobDetailById.timeStartStr).format('DD/MM/YYYY')} -{' '}
                  {moment(jobDetailById.timeEndStr).format('DD/MM/YYYY')}
                </Typography>
              </Typography>
            </div>
          </div>
          <div className='line'></div>
          <div className='detail__card-4'>
            <div className='detail__card-4-item' sx={{ display: 'flex' }}>
              <Icon className='detail__card-4-item-icon'>
                <WorkIcon />
              </Icon>
              <Typography
                variant='span'
                component='div'
                sx={{
                  fontSize: 17,
                  fontWeight: '400',
                  transform: 'translate(5px,5px)',
                }}
              >
                {jobDetailById.jobType?.name}
              </Typography>
            </div>
            <div className='detail__card-4-item'>
              <AddLocationIcon className='detail__card-4-item-icon'>
                <WorkIcon />
              </AddLocationIcon>
              <Typography
                variant='span'
                component='div'
                sx={{
                  fontSize: 14,
                  fontWeight: '400',
                  transform: 'translate(5px,5px)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {`${jobDetailById.locationjob?.address} ${jobDetailById.locationjob?.district?.name}`}
              </Typography>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

InformationCompany.propTypes = {
  star: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  detailJob: PropTypes.string,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InformationCompany;
