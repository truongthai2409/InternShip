import React, { useEffect } from "react";
import "./styles.scss";
import ListCollapse from "../ListCollapse";

import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "../../store/slices/Admin/major/majorSlice";

const listTypeJobs = ["Full time", "Part time", "Remote"];
const listPositions = [
  "Front end",
  "Back end",
  "Fullstack",
  "Mobile",
  "Embedded",
  "Tester",
  "DevOps",
];

function SideBarHomeList() {
  const dispatch = useDispatch();
  const { majorList } = useSelector((state) => state.major);
  useEffect(() => {
    dispatch(getMajorList());
  }, []);

  // console.log(majorList);

  return (
    <div className="slideBarHome__wrapper">
      <ListCollapse title="Loại việc" list={listTypeJobs} spacing={3} />
      <div className="css-1eyyxxn-MuiList-root-middle">
        <ListCollapse title="Vị trí" list={listPositions} spacing={3} />
      </div>
      <ListCollapse title="Chuyên ngành" list={majorList} spacing={3} />
    </div>
  );
}

export default SideBarHomeList;
