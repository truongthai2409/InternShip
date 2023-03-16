import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  addJobCare,
  deleteJobCare,
  getAllJobCare,
  getJobCareByCandidateThunk,
} from 'src/store/slices/main/home/job/jobCandidateSlice';
import './styles.scss';

const ButtonMark = (props) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  const { user } = useSelector((state) => state.profile);

  const handleClickMarkJob = async (e) => {
    e.preventDefault();
    const userStorage =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    e.stopPropagation();

    const page = {
      user: user,
      token: userStorage?.token,
      page: {
        no: 0,
        limit: 5,
      },
    };
    if (props.isMark === false) {
      const dataCareList = {
        candidateDTO: {
          id: user?.id,
        },
        jobDTO: {
          id: props.jobId,
        },
      };

      dispatch(addJobCare([dataCareList, userStorage?.token])).then(() => {
        dispatch(getJobCareByCandidateThunk(page)).then(() => {
          setMark(!mark);
          toast.success('Đã lưu việc làm thành công');
        });
      });
    } else {
      if (user?.role?.name === 'Role_Candidate') {
        // const dataByUserAndJob = {
        //   userName: user?.user?.username,
        //   idJob: Number(props.jobId),
        //   page: {
        //     no: 0,
        //     limit: 5,
        //   },
        // };

        // await dispatch(getMarkByUserAndJob(dataByUserAndJob)).then((res) => {
        //   const delJobCare = {
        //     id: res.payload.id,
        //     token: userStorage?.token,
        //   };
        //   dispatch(deleteJobCare([delJobCare])).then(() => {
        //     const dispatchJobCare = {
        //       user: user,
        //       token: userStorage?.token,
        //       page: {
        //         no: 0,
        //         limit: 1000,
        //       },
        //     };
        //     const page = {
        //       user: user,
        //       token: userStorage?.token,
        //       page: {
        //         no: 0,
        //         limit: 5,
        //       },
        //     };
        //     setMark(false);
        //     toast.success('Đã hủy lưu việc làm ');
        //     user?.user?.role?.name === 'Role_Candidate' &&
        //       dispatch(getAllJobCare(dispatchJobCare)) &&
        //       dispatch(getJobCareByCandidateThunk(page));
        //   });
        // });
        const delJobCare = {
          id: props.idCare,
          token: userStorage?.token,
        };
        dispatch(deleteJobCare([delJobCare])).then(() => {
          const dispatchJobCare = {
            user: user,
            token: userStorage?.token,
            page: {
              no: 0,
              limit: 1000,
            },
          };
          const page = {
            user: user,
            token: userStorage?.token,
            page: {
              no: 0,
              limit: 5,
            },
          };
          setMark(false);
          toast.success('Đã hủy lưu việc làm ');
          user?.role?.name === 'Role_Candidate' &&
            dispatch(getAllJobCare(dispatchJobCare)).then(() => {
              dispatch(getJobCareByCandidateThunk(page)).then(() => {
                setMark(false);
                toast.success('Đã hủy lưu việc làm ');
              });
            });
        });
      }
    }
  };
  const handleLogin = async (e) => {
    e.stopPropagation();
    if (user?.role?.name !== 'Role_Candiate') {
      toast.error(
        'Bạn cần đăng nhập với vai trò ứng viên để đánh dấu công việc'
      );
    }
  };
  return (
    <Tooltip
      title={
        props.isMark === false && mark === false
          ? 'Lưu công việc'
          : 'Bỏ lưu công việc'
      }
    >
      <IconButton
        style={{
          border: props.border ? props.border : '1px solid #F1F1F1',
          borderRadius: '4px',
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        aria-label='mark'
        className='buttonMark__wrapper'
        onClick={handleClickMarkJob}
      >
        {pathUrl === '/candidate' ||
        pathUrl.includes('information_company') ||
        pathUrl === '/candidate/view-list-care' ? (
          props.isMark === false && mark === false ? (
            <BookmarkBorderIcon
              style={{ fontSize: `${props.fontSize}` }}
              sx={{ color: '#04bf8a' }}
            />
          ) : (
            <BookmarkIcon
              className='buttonMark__isChecking'
              style={{ fontSize: `${props.fontSize}` }}
              sx={{ color: '#04bf8a' }}
            />
          )
        ) : (
          <BookmarkBorderIcon
            style={{ fontSize: `${props.fontSize}` }}
            onClick={handleLogin}
            sx={{ color: '#04bf8a' }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonMark;
