import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import DataTable from "../../../../components/Table";
import { getUserList } from "../../../../store/actions/user.action";

const UserTable = () => {
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "username", headerName: "Tài khoản", width: 170 },
    { field: "role", headerName: "Quyền truy cập", width: 160 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    // { field: "phone", headerName: "Số điện thoại", width: 150 },
    { field: "email", headerName: "Email", width: 320 },
    { field: "status", headerName: "Trạng thái", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: () => {
        return (
          <>
            <IconButton className="user-edit__button">
              <EditOutlinedIcon />
            </IconButton>
            <IconButton className="user-delete__button">
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];
  for (let i = 0; i < userList.length; i++) {
    rows.push({
      stt: i + 1,
      username: userList[i].username,
      role: userList[i].role ? userList[i].role.name : null,
      gender: userList[i].gender,
      // phone: userList[i].phone,
      email: userList[i].email,
      status: userList[i].status,
    });
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default UserTable;
