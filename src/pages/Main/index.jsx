import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { getMajorList } from "src/store/slices/Admin/major/majorSlice";
import { getMajorListThunk } from 'src/store/action/company/companyAction';
import Home from './Home';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMajorListThunk([1, 20]));
  }, [dispatch]);

  return (
    <Home
      demandPartner={false}
      linkFilter='/api/job/filter'
      nameSearch='công việc'
    ></Home>
  );
};

export default Main;
