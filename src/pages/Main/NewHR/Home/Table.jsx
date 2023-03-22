import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Action from './Action';

const Name = ({ name, createdAt, updatedAt, location }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Tạo lúc: {createdAt}</p>
      <p>Cập nhật lúc: {updatedAt}</p>
      <p>Địa điểm làm việc: {location}</p>
      <p>Xem danh sách ứng tuyển</p>
    </div>
  );
};

const Table = () => {
  const list = [
    {
      id: '1',
      name: 'Thực tập sinh Reactjs1',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '2',
      name: 'Thực tập sinh Reactjs2',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '3',
      name: 'Thực tập sinh Reactjs3',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '4',
      name: 'Thực tập sinh Reactjs4',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '5',
      name: 'Thực tập sinh Reactjs5',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '6',
      name: 'Thực tập sinh Reactjs6',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '7',
      name: 'Thực tập sinh Reactjs7',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '9',
      name: 'Thực tập sinh Reactjs8',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '10',
      name: 'Thực tập sinh Reactjs9',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
    {
      id: '11',
      name: 'Thực tập sinh Reactjs10',
      createdAt: '01/03/2023',
      updatedAt: '01/03/2023',
      location: 'HCM',
      deadline: '01/03/2023',
      personName: 'John',
      status: 'Open',
    },
  ];

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 70,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        // console.log(row.stt);
        return row.stt;
      },
    },
    {
      field: 'name',
      headerName: 'Tên tin đăng',
      width: 340,
      height: 70,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Name
            name={row.name}
            createdAt={row.createdAt}
            updatedAt={row.updatedAt}
            location={row.location}
          />
        );
      },
    },
    {
      field: 'deadline',
      headerName: 'Hạn nộp',
      width: 130,
      sortable: false,
      height: 70,
    },
    {
      field: 'apply',
      headerName: 'Ứng tuyển/ Lượt xem',
      width: 190,
      sortable: false,
      height: 70,
    },
    {
      field: 'personName',
      headerName: 'Người phụ trách',
      width: 160,
      sortable: false,
      height: 70,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      sortable: false,
      height: 70,
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 170,
      sortable: false,
      height: 70,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { row } = params;
        return <Action id={row.id} />;
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={list}
        columns={columns}
        hideFooter
        disableColumnMenu
        disableColumnFilter
        // checkboxSelection
        disableSelectionOnClick
        rowHeight={130}
      />
    </Box>
  );
};

export default Table;
