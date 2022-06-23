import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../../components/Table";
import { getUserList } from "../../../../store/slices/Admin/user/userSlice";

const UserTable = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  console.log(userList);

  const columns = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "username", headerName: "Tài khoản", flex: 1 },
    { field: "role", headerName: "Quyền truy cập", flex: 1 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    // { field: "phone", headerName: "Số điện thoại", width: 150 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "Trạng thái", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        // console.log(row)

        const handleOnClick = () => {
          navigate(`/admin/user/${row.username}`);
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleOnClick}>
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

  const rows = [];
  for (let i = 0; i < userList.length; i++) {
    rows.push({
      stt: i + 1,
      username: userList[i].username,
      role: userList[i].role ? userList[i].role.name : null,
      gender: handleRenderGender(userList[i].gender),
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
