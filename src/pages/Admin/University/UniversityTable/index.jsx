import React, { useEffect } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "../../../../components/Table";
import { getUniversityList } from "../../../../store/slices/Admin/university/unversitySlice";

const UniversityTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { universityList } = useSelector((state) => state.university);

  useEffect(() => {
    dispatch(getUniversityList());
  }, []);
  // console.log(universityList);
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
    { field: "shortName", headerName: "Tên viết tắt", width: 100 },
    // { field: "website", headerName: "Website", width: 170 },
    {
      field: "website",
      headerName: "Website",
      width: 200,
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
      width: 220,
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
    { field: "createDate", headerName: "Ngày tạo", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        const { row } = params;
        const handleChangeStatus = (e) => {
          console.log(e.target.value);
        };
        return (
          <select
            name={row.status}
            id={row.status}
            value={row.status || 0}
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
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleClick = () => {
          // console.log(row);
          navigate(`/admin/university/${row.id}`);
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleClick}>
              <VisibilityOutlinedIcon />
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
  for (let i = 0; i < universityList.length; i++) {
    rows.push({
      id: universityList[i].id,
      stt: i + 1,
      name: universityList[i].name,
      shortName: universityList[i].shortName,
      website: universityList[i].website,
      email: universityList[i].email,
      // majors: universityList[i].majors,
      createDate: universityList[i].createDate,
      status: universityList[i].status,
    });
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  );
};

export default UniversityTable;
