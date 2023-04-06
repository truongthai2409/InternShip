import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Action from './Action';

const Name = ({ name, createdAt, updatedAt, location }) => {
  return (
    <div className='tableHr__post'>
      <h2>{name}</h2>
      <p>Tạo lúc: {createdAt}</p>
      <p>Cập nhật lúc: {updatedAt}</p>
      <p>Địa điểm làm việc: {location}</p>
      <p>Xem danh sách ứng tuyển</p>
    </div>
  );
};

const Quantity = ({ applyNumber, viewNumber }) => {
  return (
    <div className='tableHr__quantity'>
      <p className='tableHr__quantity-applyNumber'>{applyNumber}</p>
      <p style={{ height: '30px' }}>/</p>
      <p className='tableHr__quantity-viewNumber'>{viewNumber}</p>
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
      idHR: '1',
      status: 'Open',
      applyNumber: 1,
      viewNumber: 10,
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
      applyNumber: 1,
      viewNumber: 10,
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
      applyNumber: 1,
      viewNumber: 10,
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
      applyNumber: 1,
      viewNumber: 10,
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
      applyNumber: 1,
      viewNumber: 10,
    },
    // {
    //   id: '6',
    //   name: 'Thực tập sinh Reactjs6',
    //   createdAt: '01/03/2023',
    //   updatedAt: '01/03/2023',
    //   location: 'HCM',
    //   deadline: '01/03/2023',
    //   personName: 'John',
    //   status: 'Open',
    //   applyNumber: 1,
    //   viewNumber: 10,
    // },
    // {
    //   id: '7',
    //   name: 'Thực tập sinh Reactjs7',
    //   createdAt: '01/03/2023',
    //   updatedAt: '01/03/2023',
    //   location: 'HCM',
    //   deadline: '01/03/2023',
    //   personName: 'John',
    //   status: 'Open',
    //   applyNumber: 1,
    //   viewNumber: 10,
    // },
    // {
    //   id: '9',
    //   name: 'Thực tập sinh Reactjs8',
    //   createdAt: '01/03/2023',
    //   updatedAt: '01/03/2023',
    //   location: 'HCM',
    //   deadline: '01/03/2023',
    //   personName: 'John',
    //   status: 'Open',
    //   applyNumber: 1,
    //   viewNumber: 10,
    // },
    // {
    //   id: '10',
    //   name: 'Thực tập sinh Reactjs9',
    //   createdAt: '01/03/2023',
    //   updatedAt: '01/03/2023',
    //   location: 'HCM',
    //   deadline: '01/03/2023',
    //   personName: 'John',
    //   status: 'Open',
    //   applyNumber: 1,
    //   viewNumber: 10,
    // },
    // {
    //   id: '11',
    //   name: 'Thực tập sinh Reactjs10',
    //   createdAt: '01/03/2023',
    //   updatedAt: '01/03/2023',
    //   location: 'HCM',
    //   deadline: '01/03/2023',
    //   personName: 'John',
    //   status: 'Open',
    //   applyNumber: 1,
    //   viewNumber: 10,
    // },
  ];

  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      width: 70,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return row.stt;
      },
    },
    {
      field: 'name',
      headerName: 'Tên tin đăng',
      width: 360,
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
      align: 'center',
      sortable: false,
      headerAlign: 'center',
      height: 70,
    },
    {
      field: 'apply',
      headerName: 'Ứng tuyển/ Lượt xem',
      width: 190,
      sortable: false,
      height: 70,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const { row } = params;
        return (
          <Quantity applyNumber={row.applyNumber} viewNumber={row.viewNumber} />
        );
      },
    },
    {
      field: 'personName',
      headerName: 'Người phụ trách',
      width: 160,
      sortable: false,
      height: 70,
      headerAlign: 'center',
      height: 70,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      sortable: false,
      height: 70,
      headerAlign: 'center',
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
    // cal 720 = 130*height(row) + height header
    <Box sx={{ height: 720, width: '100%' }}>
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
