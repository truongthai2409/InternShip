import React, { useEffect } from "react";
import "./styles.scss";
import Tabs from "@mui/material/Tabs";
import CustomCheckbox from "../CustomCheckbox";
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

function SideBarHomeList(props) {
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
}

export default SideBarHomeList;
