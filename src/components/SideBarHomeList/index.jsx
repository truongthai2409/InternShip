import React from "react";
import "./styles.scss";
import CustomCheckbox from "../CustomCheckbox";
import ListCollapse from "../ListCollapse";

import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

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
            <ListCollapse title="Loại việc" list = {listTypeJobs} spacing={3} />
            <ListCollapse title="Vị trí" list = {listPositions} spacing={3} />
            <ListCollapse title="Chuyên ngành" list = {listMajors} spacing={3} />
        </div>
    );
}

export default SideBarHomeList;
