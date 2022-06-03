import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import StickyTable from "../../../components/StickyTable";

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

export default function Company() {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý công ty"
        placeholder="Tìm kiếm công ty"
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName="Thêm Com"
        BtnIcon={AddOutlinedIcon}
      />
      <StickyTable />
    </>
  );
}
