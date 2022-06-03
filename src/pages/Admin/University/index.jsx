import React from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";

const selectOptions = [
  {
    value: "All",
    name: "All",
  },
  {
    value: "HR",
    name: "HR",
  },
  {
    value: "Candidate",
    name: "Candidate",
  },
  {
    value: "Partner",
    name: "Partner",
  },
];

export default function University() {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý trường học"
        placeholder="Tìm kiếm trường"
        onchange={handleSearch}
        selectName="position"
        selectOptions={selectOptions}
        btnName="Thêm Uni"
        BtnIcon={AddOutlinedIcon}
      />
    </>
  );
}
