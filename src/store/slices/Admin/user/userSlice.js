import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const baseURL = process.env.REACT_APP_API

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userList: [],
    notification: {},
    page: 0,
    error: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload.users
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
