import React from 'react'
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { IconButton, Tooltip } from '@mui/material'
// import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

import DataTable from '../../../../components/Table'

const DemandTable = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate()

  const draftText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices feugiat tincidunt. Vestibulum rhoncus, leo sed fringilla aliquam, lectus enim ornare urna, ut iaculis lorem ex ac ipsum. Curabitur eget mauris varius, aliquet neque id, commodo arcu. Nam quis pharetra quam. Duis luctus sapien eu nisi interdum, sed semper erat porta.'

  //   const { DemandList } = useSelector((state) => state.Demand);
  const demandList = [
    {
      id: 1,
      name: 'Kỳ thực tập tháng 6/2022',
      description: draftText,
      requirement: draftText,
      otherInfo: draftText,
      status: 'Not verified',
      students: [],
      major: [],
      partner: 1,
      start: '',
      end: '',
      createDate: ''
    },
    {
      id: 2,
      name: 'Kỳ thực tập tháng 8/2022',
      description: draftText,
      requirement: draftText,
      otherInfo: draftText,
      status: 'Not verified',
      students: [],
      major: [],
      partner: 10,
      start: '',
      end: '',
      createDate: ''
    }
  ]
  const columns = [
    { field: 'stt', headerName: 'STT', width: 70 },
    {
      field: 'name',
      headerName: 'Tiêu đề bài đăng',
      flex: 1,
      renderCell: params => {
        const { row } = params
        return (
          <Tooltip title={row.name}>
            <p>{row.name}</p>
          </Tooltip>
        )
      }
    },
    { field: 'partner', headerName: 'Cộng tác viên', width: 150 },
    { field: 'major', headerName: 'Chuyên ngành', width: 100 },
    { field: 'createDate', headerName: 'Ngày tạo', width: 150 },
    { field: 'students', headerName: 'Danh sách sinh viên', width: 150 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 120,
      renderCell: params => {
        const { row } = params
        const handleChangeStatus = e => {
          console.log(e.target.value)
        }
        return (
          <select
            name={row.status}
            id={row.status}
            value={row.status || 0}
            onChange={e => handleChangeStatus(e)}
            className="company-table__select"
          >
            <option value={0}>Not verified</option>
            <option value={1}>Active</option>
            <option value={2}>Block</option>
            <option value={3}>Disable</option>
          </select>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      sortable: false,
      renderCell: params => {
        const { row } = params
        const handleClick = () => {
          // console.log(row);
          navigate(`/admin/Demand/${row.id}`)
        }
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleClick}>
              <VisibilityOutlinedIcon />
            </IconButton>
            <IconButton className="user-delete__button">
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </>
        )
      }
    }
  ]

  const rows = []
  for (let i = 0; i < demandList.length; i++) {
    rows.push({
      id: demandList[i].id,
      stt: i + 1,
      name: demandList[i].name,
      major: demandList[i].major,
      partner: demandList[i].partner,
      createDate: demandList[i].createDate,
      status: demandList[i].status,
      students: demandList[i].students
    })
  }
  return (
    <>
      <DataTable rows={rows} columns={columns} />
    </>
  )
}

export default DemandTable
