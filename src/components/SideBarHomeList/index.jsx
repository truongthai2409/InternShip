import React from "react";
import "./styles.scss";
import Tabs from "@mui/material/Tabs";
import CustomCheckbox from "../CustomCheckbox";

const listTypeJobs = ["Full time", "Part time", "Remote"];
const listPositions = ["Front end", "Back end", "Fullstack", "Mobile", "Embedded", "Tester", "DevOps"];
const listMajors = [
    "Khoa học máy tính",
    "Công nghệ phần mềm",
    "Kỹ thuật máy tính",
    "Trí tuệ nhân tạo",
    "Kỹ thuật mạng",
    "Hệ thống quản lý thông tin",
];

function SideBarHomeList(props) {
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
                {listMajors.map((major) => (
                    <CustomCheckbox key={major} label={major} />
                ))}
            </div>
        </div>
    );
}

export default SideBarHomeList;
