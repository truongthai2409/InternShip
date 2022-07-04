import React, { useEffect } from "react";
import "./styles.scss";
import ListCollapse from "../ListCollapse";

import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "../../store/slices/Admin/major/majorSlice";
import { getJobPositionList } from "../../store/slices/main/home/job/jobSlice";

const listTypeJobs = ["Full time", "Part time", "Remote"];

function SideBarHomeList() {
  const dispatch = useDispatch();
  const { majorList,  } = useSelector((state) => state.major);
  const { jobPosition  } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getMajorList());
    dispatch(getJobPositionList())
  }, []);

//     console.log("major list",majorList);
//   console.log("job position",jobPosition);

  return (
    <div className="slideBarHome__wrapper">
      <ListCollapse title="Loại việc" list={listTypeJobs} spacing={3} />
      <div className="css-1eyyxxn-MuiList-root-middle">
        <ListCollapse title="Vị trí" list={jobPosition} spacing={3} />
      </div>
      <ListCollapse title="Chuyên ngành" list={majorList} spacing={3} />
    </div>
  );
}

export default SideBarHomeList;
