import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GppBadIcon from "@mui/icons-material/GppBad";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import {
  deleteUser,
  getUserList,
  updateUser,
  verifyUser,
} from "src/store/slices/Admin/user/userSlice";
import DataTable from "src/components/Table";
import IconEdit from "../../../../assets/img/icons8-write-24.png";

const UserTable = ({ openModal }) => {
  const dispatch = useDispatch();

  const { userList, totalPages, totalItems } = useSelector(
    (state) => state.user
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUserList([page, 10]));
  }, [page]);

  console.log(userList);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "username", headerName: "Tài khoản", width: 220 },
    { field: "role", headerName: "Vai trò", width: 150 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "status", headerName: "Trạng thái", width: 120 },
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;

        const handleDeleteUser = async () => {
          await dispatch(deleteUser(row.username));
          dispatch(getUserList([page, 20]));
        };

        const handleUpdateUser = async () => {
          await dispatch(updateUser(row.username));
        };

        const handleVerifyUser = async () => {
          await dispatch(verifyUser(row.username));
          dispatch(getUserList([page, 20]));
        };
        return (
          <>
            <IconButton onClick={openModal}>
              <img src={IconEdit} />
            </IconButton>
            <IconButton
              className="user-verify__button"
              onClick={handleVerifyUser}
            >
              <VerifiedUserIcon />
            </IconButton>
            <IconButton
              className="user-delete__button"
              onClick={handleDeleteUser}
            >
              <GppBadIcon sx={{ color: "red !important" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  /**
   * render gender
   * @param {*id}  (0, 1, 2 )
   * @returns (0: "Nam", 1: "Nữ", 2 :"Khác" )
   */
  const handleRenderGender = (id) => {
    switch (id) {
      case 0:
        return "Nam";
      case 1:
        return "Nữ";
      default:
        return "Khác";
    }
  };

  const convertRoleName = (roleName) => {
    const index = roleName.lastIndexOf("_");
    return roleName.substring(index + 1);
  };

  const rows = [];
  for (let i = 0; i < userList.length; i++) {
    rows.push({
      id: userList[i].id,
      stt: userList[i].id + 1,
      username: userList[i].username,
      role: convertRoleName(userList[i]?.role?.name),
      gender: handleRenderGender(userList[i].gender),
      phone: userList[i].phone,
      email: userList[i].email,
      status: userList[i].status.name,
    });
  }

  const handlePagination = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        totalPages={totalPages}
        totalItems={totalItems}
        handleOnChange={handlePagination}
      />
    </>
  );
};

export default UserTable;
