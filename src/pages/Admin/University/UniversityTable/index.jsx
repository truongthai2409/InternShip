import React, { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import DataTable from "../../../../components/Table";
import { getCompanyList } from "../../../../store/slices/Admin/company/companySlice";

const UniversityTable = () => {
  const dispatch = useDispatch();

  const { companyList } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanyList());
  }, []);
  console.log(companyList);
  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    { field: "name", headerName: "Tên công ty", width: 170 },
    { field: "shortName", headerName: "Tên viết tắt", width: 100 },
    // { field: "website", headerName: "Website", width: 170 },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <a href={row.website} className="company-table__hyperlink">
            {row.website}
          </a>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        // console.log(row.email);
        return (
          <a href={`mailto:${row.email}`} className="company-table__hyperlink">
            {row.email}
          </a>
        );
      },
    },
    // { field: "majors", headerName: "Chuyên ngành", width: 130 },
    // { field: "phone", headerName: "Số điện thoại", width: 130 },
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
      id: companyList[i].id,
      stt: i + 1,
      name: companyList[i].name,
      shortName: companyList[i].shortName,
      website: companyList[i].website,
      email: companyList[i].email,
      majors: companyList[i].majors,
      // phone: companyList[i].phone,
    });
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default UniversityTable;
