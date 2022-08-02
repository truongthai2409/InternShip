import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const appreciateSlice = createSlice({
  name: "appreciate",
  initialState: {
    appreciateList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addAppreciate.fulfilled, (state, action) => {
      state.status = "success";
      // state.careListCandidate = action.payload;
    });
    builder.addCase(getAppreciateByCompany.fulfilled, (state, { payload }) => {
      state.appreciateList = payload.contents;
    });
    // builder.addCase(deleteApply.fulfilled, (state, { payload }) => {
    //   if (!payload?.data) {
    //     state.error = payload;
    //   }
    // });
  },
});

export const getAppreciateByCompany = createAsyncThunk(
  "appreciate/getAppreciateByCompany",
  async (idCompany) => {
    return axios
      .get(`${baseURL}/api/r2s/rate/company/1/?no=0&limit=10`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const addAppreciate = createAsyncThunk(
  "appreciate/addAppreciate",
  async (data) => {
    console.log(data);
    const res = await axios
      .post(`${baseURL}/api/r2s/rate`, data)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

// export const deleteApply = createAsyncThunk(
//   "apply_candidate/deleteApply",
//   async (id) => {
//     const res = await api
//       .delete(`${baseURL}/api/applylist/${id}`)
//       .then((res) => {
//         return res;
//       })
//       .catch((error) => {
//         return error.response.data;
//       });
//     return res;
//   }
// );

// export const { addJob, removeJob } = markJobSlice.actions;
export default appreciateSlice;
