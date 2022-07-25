import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = process.env.REACT_APP_API

const demandSlice = createSlice({
  name: 'demand',
  initialState: {
    demandList: [],
    status: 'fail'
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDemandList.fulfilled, (state, { payload }) => {
      state.demandList = payload
    })
  }
})

export const getDemandList = createAsyncThunk('job/getDemandList', async () => {
  return axios
    .get(`${baseURL}/api/demand`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
})

export default demandSlice
