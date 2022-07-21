import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const baseURL = process.env.REACT_APP_API

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList: [],
    user: {},
    notification: {},
    page: 0,
    error: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload.users
    })
    builder.addCase(getUserByUserName.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  }
})

export default userSlice

export const getUserList = createAsyncThunk('user/getUserList', async () => {
  return await axios
    .get(`${baseURL}/api/user`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    })
})

export const getUserByUserName = createAsyncThunk(
  'user/getUserByUserName',
  async username => {
    return await axios
      .get(`${baseURL}/api/r2s/admin/user/${username}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })
  }
)
