import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getJobApplyListByCandidate,
  getJobCareByCandidateThunk,
} from 'src/store/slices/main/home/job/jobCandidateSlice';
const Container = ({ children }) => {
  // Nếu nguời dừng có quyền Candidate . sau khi login sẽ đuợc components này xử lí. đem dispatch và lấy job quan tâm và job apply.
  // Các  component khác chỉ cần gọi và dùng. Không dípatch nữa. đây là component cha

  const { user, others } = useSelector((state) => state.profile);
  const { page: pageNo } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    const userStorage =
      JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent'));
    // set important information to dont mutiple call (follow for role)
    user &&
      user?.roleDTO?.name === 'Role_Candidate' &&
      userStorage &&
      // id candidate
      dispatch(getJobApplyListByCandidate(others.id)) &&
      dispatch(getJobCareByCandidateThunk(user.username));
  }, [pageNo, user]);
  return <>{children}</>;
};

export default Container;
