import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../../components/Table";
import { getCompanyList } from "../../../../store/slices/Admin/company/companySlice";

const CompanyTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companyList } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanyList());
  }, []);

  // console.log(companyList);

  const columns = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "name", headerName: "Tên công ty", flex: 1 },
    { field: "website", headerName: "Website", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "tax", headerName: "Tax", flex: 1 },
    { field: "phone", headerName: "Số điện thoại", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleClick = () => {
          // console.log(row);
          navigate(`/admin/company/${row.id}`);
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleClick}>
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
  for (let i = 0; i < companyList.length; i++) {
    rows.push({
      id: companyList[i].id,
      stt: i + 1,
      name: companyList[i].name,
      website: companyList[i].website,
      email: companyList[i].email,
      tax: companyList[i].tax,
      phone: companyList[i].phone,
    });
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default CompanyTable;
