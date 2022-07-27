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
    builder.addCase(getDemandListByUniId.fulfilled, (state, { payload }) => {
      state.demandList = payload
    });
  }
})

export const getDemandListByUniId = createAsyncThunk(
  "university/getDemandListByUniId",
  async (uniId) => {
    return await axios
    .get(`${baseURL}/api/demand/filter-university/${uniId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    })
  }
)

export default demandSlice
