import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import PeopleIcon from '@mui/icons-material/People';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { Tooltip } from '@mui/material';
import Rating from '@mui/material/Rating';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllJobCare } from 'src/store/slices/main/home/job/jobCandidateSlice';
import ButtonMark from '../../shared/ButtonMark';
import TagName from '../../Home/TagName';
import './styles.scss';

const CardHome = (props) => {
  // console.log(props)
  // const { changeDateLocale } = dateTimeHelper;
  const dispatch = useDispatch();
  const [isMarkLength, setIsMarkLength] = useState();
  const { jobCare } = useSelector((state) => state.jobCandidateSlice);
  const { user } = useSelector((state) => state.profile);
  const [idCareJob, setIdCareJob] = useState('');
  useEffect(() => {
    const userStorage =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    const dispatchJobCAre = {
      user: user,
      token: userStorage?.token,
      page: {
        no: 0,
        limit: 1000,
      },
    };
    user?.user?.role?.name === 'Role_Candidate' &&
      dispatch(getAllJobCare(dispatchJobCAre));
  }, [dispatch, user]);

  useEffect(
    () => {
      let isMark = jobCare.filter((job) => {
        return job?.jobDT?.id === props?.id;
      });
      setIdCareJob(isMark[0]?.id);
      setIsMarkLength(isMark.length > 0 ? true : false);
    },
    [jobCare, props?.id],
    dispatch
  );
  return (
    <div
      className={clsx(
        'cardHome__container',
        props.active === props.index ? 'active' : ''
      )}
      style={{
        paddingLeft: props.pdLeft ? props.pdLeft : '',
        paddingRight: props.pdRight ? props.pdRight : '',
      }}
    >
      <div className='cardHome__col1' dataset={props.id}>
        <Link to={`detail_job/${props.id}`}>
          <div className='cardHome__aboutCompany'>
            <img
              className='cardHome__img'
              src='https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png'
              alt=''
            />
            <div style={{ textAlign: 'left' }}>
              <Tooltip title={props.title} placement='top'>
                <h4 className='cardHome__title'>{props.title}</h4>
              </Tooltip>
              <p className='cardHome__nameCompany'>{props.nameCompany}</p>
            </div>
          </div>
          <div className='cardHome__tagName'>
            {props?.tagName?.map((tag, indexs) =>
              tag?.length > 0 ? (
                tag?.map((item, index) => {
                  return item?.length > 0 ? (
                    item?.map((ite, idx) => {
                      return <TagName key={idx} title={ite?.name || null} />;
                    })
                  ) : (
                    <TagName key={index} title={item?.name || null} />
                  );
                })
              ) : (
                <TagName key={indexs} title={tag?.name || null} />
              )
            )}
          </div>
          {props.demandPartner ? (
            <div className='cardHome__amount-hr-apply'>
              <AddLocationAltRoundedIcon
                style={{ fontSize: `13px` }}
                sx={{ color: '#04bf8a' }}
              />

              <p
                style={{
                  fontSize: `13px`,
                  width: 'max-content',
                  color: '#000',
                }}
              >
                {props.location}
              </p>
            </div>
          ) : (
            <Rating
              name='read-only'
              precision={0.5}
              readOnly
              value={props.star ?? ' '}
            />
          )}
        </Link>
      </div>

      <div className='cardHome__col2'>
        {props.hiddent ? (
          <div style={{ visibility: 'hidden' }}>
            <ButtonMark
              height='32px'
              width='32px'
              fontSize='18px'
              jobId={props.id}
              isMark={false}
            />
          </div>
        ) : (
          <>
            {user?.role?.name?.includes('Role_Candidate') ? (
              <ButtonMark
                height='32px'
                width='32px'
                fontSize='18px'
                jobId={props.id}
                isMark={isMarkLength}
                idCare={idCareJob}
              />
            ) : (
              <div style={{ visibility: 'hidden' }}>
                <ButtonMark
                  height='32px'
                  width='32px'
                  fontSize='18px'
                  jobId={props.id}
                  isMark={false}
                />
              </div>
            )}
          </>
        )}
        {props.none__time ? (
          <div className='cardHome__col2-End-1'>
            <div className='cardHome__amount-hr-apply'>
              <PeopleIcon sx={{ color: '#04bf8a !important' }} />
              <span className='amount'>Số lượng ứng viên: {props.amount}</span>
            </div>
          </div>
        ) : (
          <div className='cardHome__col2-End'>
            <div className='cardHome__col2-End-1'>
              <PeopleIcon style={{ fontSize: `${props.fontSize + 2}px` }} />
              <span
                className='amount'
                style={{
                  fontSize: `${props.fontSize}px`,
                  color: '#000',
                  marginLeft: '6px',
                }}
              >
                Số lượng ứng viên: {props.amount}
              </span>
            </div>
            <div className='cardHome__col2-End-2'>
              <WatchLaterOutlinedIcon
                style={{ fontSize: `${props.fontSize + 2}px` }}
              />
              <p style={{ fontSize: `${props.fontSize}px` }}>
                {`${props.time[0]} - ${props.time[1]}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHome;
