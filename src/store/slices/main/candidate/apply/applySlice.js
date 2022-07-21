import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import api from 'src/config/api/apiConfig'

const baseURL = process.env.REACT_APP_API

const applySlice = createSlice({
  name: 'apply_candidate',
  initialState: {
    status: '',
    applyList: []
  },
  extraReducers: builder => {
    // builder.addCase(createMark.fulfilled, (state, action) => {
    //   state.status = "success";
    //   // state.careListCandidate = action.payload;
    // });
    builder.addCase(getApplyList.fulfilled, (state, { payload }) => {
      state.applyList = payload
    })
    // builder.addCase(deleteMark.fulfilled, (state, { payload }) => {
    //   if (!payload?.data) {
    //     state.error = payload;
    //   }
    // });
  }
})

export const getApplyList = createAsyncThunk(
  'apply_candidate/getApply',
  async () => {
    return axios
      .get(`${baseURL}/api/r2s/applylist`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }
)

// export const createMark = createAsyncThunk("mark/createMark", async (data) => {
//   const res = await api
//     .post(`${baseURL}/api/r2s/care-list`, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       return error.response.data;
//     });
//   return res;
// });

// export const deleteMark = createAsyncThunk("mark/deleteMark", async (id) => {
//   const res = await api
//     .delete(`${baseURL}/api/r2s/care-list/${id}`)
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       return error.response.data;
//     });
//   return res;
// });

// export const { addJob, removeJob } = markJobSlice.actions;
export default applySlice
