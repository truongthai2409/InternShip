import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import DataTable from "../../../../components/Table";
import { getCompany } from "../../../../store/actions/company.action";

const CompanyTable = () => {
  const dispatch = useDispatch();

  const { companyList } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompany());
  }, []);
  console.log(companyList);
  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "name", headerName: "Tên công ty", width: 170 },
    { field: "website", headerName: "Website", width: 170 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "tax", headerName: "Tax", width: 100 },
    { field: "phone", headerName: "Số điện thoại", width: 130 },
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
  for (let i = 0; i < companyList.length; i++) {
    rows.push({
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
