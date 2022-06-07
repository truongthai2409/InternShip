import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import DataTable from "../../../../components/Table";
import { getUserList } from "../../../../store/actions/user.action";

const CompanyTable = () => {
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "hoTen", headerName: "Họ tên", width: 170 },
    { field: "taiKhoan", headerName: "Tài khoản", width: 170 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "maLoaiNguoiDung", headerName: "Role", width: 100 },
    { field: "soDt", headerName: "Số điện thoại", width: 130 },
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
      hoTen: userList[i].hoTen,
      taiKhoan: userList[i].taiKhoan,
      email: userList[i].email,
      maLoaiNguoiDung: userList[i].maLoaiNguoiDung,
      soDt: userList[i].soDt,
    });
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default CompanyTable;
