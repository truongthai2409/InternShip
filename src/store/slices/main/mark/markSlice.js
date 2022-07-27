import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = process.env.REACT_APP_API

const markJobSlice = createSlice({
  name: 'mark',
  initialState: {
    status: '',
    careListCandidate: [],
    careListOfPrivate: [],
    careJob: {}
  },
  extraReducers: builder => {
    builder.addCase(createMark.fulfilled, (state, action) => {
      state.status = 'success'
      // state.careListCandidate = action.payload;
    })
    builder.addCase(getMark.fulfilled, (state, { payload }) => {
      state.careListCandidate = payload
    })
    builder.addCase(getMarkByUser.fulfilled, (state, { payload }) => {
      state.careListOfPrivate = payload
    })
    builder.addCase(getMarkByUserAndJob.fulfilled, (state, { payload }) => {
      state.careJob = payload
    })
    builder.addCase(deleteMark.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload
      }
    })
  }
})

export const getMark = createAsyncThunk('mark/getMark', async () => {
  return axios
    .get(`${baseURL}/api/r2s/care-list`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error.response.data
    })
})

export const getMarkByUser = createAsyncThunk(
  'mark/getMarkByUser',
  async userName => {
    return axios
      .get(`${baseURL}/api/r2s/care-list/user/${userName}/`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

export const getMarkByUserAndJob = createAsyncThunk(
  'mark/getMarkByUserAndJob',
  async data => {
    const { userName, idJob } = data
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type'
      }
    }
    return axios
      .get(
        `${baseURL}/api/r2s/care-list/user/${userName}/job/${idJob}`,
        axiosConfig
      )
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

export const createMark = createAsyncThunk('mark/createMark', async data => {
  const res = await axios
    .post(`${baseURL}/api/r2s/care-list`, data)
    .then(res => {
      return res
    })
    .catch(error => {
      return error.response.data
    })
  return res
})

export const deleteMark = createAsyncThunk('mark/deleteMark', async data => {
  const res = await axios
    .delete(`${baseURL}/api/r2s/care-list/${data}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error.response.data
    })
  return res
})

// export const { addJob, removeJob } = markJobSlice.actions;
export default markJobSlice
