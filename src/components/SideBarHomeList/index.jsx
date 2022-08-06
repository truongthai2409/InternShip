import React, { useEffect } from "react";
import "./styles.scss";
import ListCollapse from "../ListCollapse";

import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "../../store/slices/Admin/major/majorSlice";
import { getJobPositionList } from "../../store/slices/main/home/job/jobSlice";

const listWorkingFormat = [
  { name: "Full time", id: 1 },
  { name: "Part time", id: 2 },
  { name: "Remote", id: 3 },
];

function SideBarHomeList({ onChange }) {
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  const { jobPosition } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getMajorList());
    dispatch(getJobPositionList());
  }, [dispatch]);
  const handleCheck = (value) => {
    onChange && onChange(value);
  };
  return (
    <div className="slideBarHome__wrapper">
      <ListCollapse
        title="Hình thức làm việc"
        list={listWorkingFormat}
        spacing={3}
        onChange={handleCheck}
      />
      <ListCollapse title="Vị trí làm việc" list={jobPosition} spacing={3} />
      <ListCollapse title="Chuyên ngành" list={majorList} spacing={3} />
    </div>
  );
}

export default SideBarHomeList;
