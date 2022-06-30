import React, { useEffect } from "react";
import "./styles.scss";
import CustomCheckbox from "../CustomCheckbox";
<<<<<<< HEAD
import ListCollapse from "../ListCollapse";

import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
=======
import { useDispatch, useSelector } from "react-redux";
import { getMajorList } from "../../store/slices/Admin/major/majorSlice";
>>>>>>> a0c8da9b671409fb8a96002fb62c9fe61884f12a

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

function SideBarHomeList(props) {
<<<<<<< HEAD
    return (
        <div className="slideBarHome__wrapper">
            <ListCollapse title="Loại việc" list = {listTypeJobs} spacing={3} />
            <ListCollapse title="Vị trí" list = {listPositions} spacing={3} />
            <ListCollapse title="Chuyên ngành" list = {listMajors} spacing={3} />
        </div>
    );
=======
  const { majorList } = useSelector((state) => state.major);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMajorList());
  }, []);
  return (
    <div className="slideBarHome__wrapper">
      {/* <Tabs
                style={{height:'100%'}}
                orientation="vertical"
                variant="scrollable"
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
            >
                
            </Tabs> */}
      <div className="slideBarHome__container">
        <h3 className="slideBarHome__title">Loại việc</h3>
        {listTypeJobs.map((typeJobs) => (
          <CustomCheckbox key={typeJobs} label={typeJobs} />
        ))}
      </div>
      <div className="slideBarHome__container">
        <h3 className="slideBarHome__title">Vị trí</h3>
        {listPositions.map((position) => (
          <CustomCheckbox key={position} label={position} />
        ))}
      </div>
      <div className="slideBarHome__container">
        <h3 className="slideBarHome__title">Chuyên ngành</h3>
        {majorList.map((major, i) => (
          <CustomCheckbox key={major.id} label={major.name} />
        ))}
      </div>
    </div>
  );
>>>>>>> a0c8da9b671409fb8a96002fb62c9fe61884f12a
}

export default SideBarHomeList;
