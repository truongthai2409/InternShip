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
  getJobCareByCandidateThunk,
} from 'src/store/slices/main/home/job/jobCandidateSlice';
import './styles.scss';

const ButtonMark = (props) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const [mark, setMark] = useState(false);

  const { user, others } = useSelector((state) => state.profile);

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
        // need id candidate not id user
        candidateDTO: {
          id: others?.id,
        },
        jobDTO: {
          id: props.jobId,
        },
      };

      const res_ = await dispatch(
        addJobCare([dataCareList, userStorage?.token])
      );
      // phần này nên tối ưu lại k nhất thiết phải call vì chỉ cần add thêm jobcare vào trong state là đc rồi
      if (res_.payload.status === 200 || res_.payload.status === 201) {
        dispatch(getJobCareByCandidateThunk(page)).then(() => {
          setMark(!mark);
          toast.success('Đã lưu việc làm thành công', {
            position: 'top-right',
            autoClose: 3000,
            style: { color: '#00B074', backgroundColor: '#DEF2ED' },
          });
        });
      } else {
        toast.error('Lưu không thành công', {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        });
      }
    } else {
      if (user?.roleDTO?.name === 'Role_Candidate') {
        const delJobCare = {
          id: props.idCare,
          token: userStorage?.token,
        };
        dispatch(deleteJobCare([delJobCare])).then(() => {
          const page = {
            user: user,
            token: userStorage?.token,
            page: {
              no: 0,
              limit: 5,
            },
          };
          // riêng phần này thì lại nên giữ lại, vì nó sẽ ảnh hưởng đến việc phân trang. Tuỳ vào cách be và fe thảo luận thì
          // sẽ tối ưu code phần này (việc phân trang của list job và care job đang không tối ưu nếu dữ liệu đủ lớn)
          user?.roleDTO?.name === 'Role_Candidate' &&
            dispatch(getJobCareByCandidateThunk(page)).then(() => {
              setMark(!mark);
              toast.success('Đã hủy lưu việc làm ', {
                position: 'top-right',
                autoClose: 3000,
                style: { color: '#00B074', backgroundColor: '#DEF2ED' },
              });
            });
        });
      }
    }
  };
  const handleLogin = async (e) => {
    e.stopPropagation();
    if (user?.roleDTO?.name !== 'Role_Candiate') {
      toast.error(
        'Bạn cần đăng nhập với vai trò ứng viên để đánh dấu công việc',
        {
          position: 'top-right',
          autoClose: 3000,
          style: { color: '#00B074', backgroundColor: '#DEF2ED' },
        }
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
          borderRadius: '4px',
          width: `${props.width}`,
          height: `${props.height}`,
        }}
        sx={{
          border: `${props.isMark ? '1px solid #04bf8a' : '1px solid #7d7d7d'}`,
        }}
        aria-label='mark'
        className='buttonMark__wrapper'
        onClick={handleClickMarkJob}
      >
        {pathUrl === '/candidate' || pathUrl === '/candidate/view-list-care' ? (
          props.isMark === false ? (
            <BookmarkBorderIcon
              style={{ fontSize: `${props.fontSize}` }}
              sx={{ color: '#7D7D7D' }}
            />
          ) : (
            <BookmarkIcon
              className='buttonMark__isChecking'
              style={{
                fontSize: `${props.fontSize}`,
                color: `${props.isMark ? '#00B074' : '#04bf8a'}`,
              }}
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
