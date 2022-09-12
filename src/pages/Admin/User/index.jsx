import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import "./styles.scss";
import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import Modal from "../../../components/Modal";
import UserTable from "./UserTable";
import UserForm from "../../../containers/Admin/UserForm";

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

const User = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idRow, setIdRow] = useState("");
  const handleSearch = (e) => {};
  
  const handleOpenAddModal = () => {
    setOpen(true);
    setIsUpdate(false);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý tài khoản"
        placeholder="Tìm kiếm người dùng..."
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName="Thêm User"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenAddModal}
      />
      <UserTable
        setIdRow={setIdRow}
        setIsUpdate={setIsUpdate}
        setOpen={setOpen}
      />
      <Modal
        modalTitle={isUpdate ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
        open={open}
        setOpen={setOpen}
        iconClose={true}
      >
        <UserForm isUpdate={isUpdate} idRow={idRow}/>
      </Modal>
    </>
  );
};
export default User;
