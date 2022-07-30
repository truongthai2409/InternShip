import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const applySlice = createSlice({
  name: "apply_candidate",
  initialState: {
    applyList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addApply.fulfilled, (state, action) => {
      state.status = "success";
      // state.careListCandidate = action.payload;
    });
    builder.addCase(
      getApplyListByIdCandidate.fulfilled,
      (state, { payload }) => {
        state.applyList = payload.contents;
      }
    );
    // builder.addCase(deleteMark.fulfilled, (state, { payload }) => {
    //   if (!payload?.data) {
    //     state.error = payload;
    //   }
    // });
  },
});

export const getApplyListByIdCandidate = createAsyncThunk(
  "apply_candidate/getApplyListByIdCandidate",
  async (id) => {
    return axios
      .get(`${baseURL}/api/applylist/candidate/23`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const addApply = createAsyncThunk(
  "apply_candidate/addApply",
  async (data) => {
    const res = await axios
      .post(`${baseURL}/api/applylist/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    return res;
  }
);

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
export default applySlice;
