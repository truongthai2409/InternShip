import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import DataTable from "../../../components/Table";

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

export default function User() {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý tài khoản"
        placeholder="Tìm kiếm người dùng"
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName="Thêm User"
        BtnIcon={AddOutlinedIcon}
      />
      <DataTable />
    </>
  );
}
