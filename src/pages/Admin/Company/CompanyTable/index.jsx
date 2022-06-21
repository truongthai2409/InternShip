import React, { useEffect, useState } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import DataTable from "../../../../components/Table";
import {
  getCompanyList,
  updateCompanyInfo,
} from "../../../../store/slices/Admin/company/companySlice";

const CompanyTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companyList } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanyList());
  }, []);

  // console.log(companyList);

  const columns = [
    { field: "stt", headerName: "STT", width: 70 },
    {
      field: "name",
      headerName: "Tên công ty",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Tooltip title={row.name}>
            <p>{row.name}</p>
          </Tooltip>
        );
      },
    },
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
    {
      field: "tax",
      headerName: "Mã số thuế",
      width: 110,
      renderCell: (params) => {
        const { row } = params;
        // console.log(row.email);
        return (
          <a
            href={`https://www.google.com/search?q=ma+so+thue+${row.tax}`}
            className="company-table__hyperlink"
          >
            {row.tax}
          </a>
        );
      },
    },
    { field: "date", headerName: "Ngày tạo", width: 110 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        const { row } = params;
        const handleChangeStatus = (e) => {
          const updateData = {
            companyData: {
              ...row,
              status: parseInt(e.target.value),
            },
          };
          dispatch(updateCompanyInfo(updateData));
        };
        return (
          <select
            name={row.status}
            id={row.status}
            value={row.status}
            onChange={(e) => handleChangeStatus(e)}
            className="company-table__select"
          >
            <option value={0}>Not verified</option>
            <option value={1}>Active</option>
            <option value={2}>Block</option>
            <option value={3}>Disable</option>
          </select>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleClick = () => {
          // console.log(row);
          navigate(`/admin/company/${row.id}`);
        };
        return (
          <>
            <Tooltip title="Chi tiết">
              <IconButton className="user-edit__button" onClick={handleClick}>
                <VisibilityOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton className="user-delete__button">
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
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
      date: companyList[i].date,
      status: companyList[i].status,
      description: companyList[i].description,
    });
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default CompanyTable;
