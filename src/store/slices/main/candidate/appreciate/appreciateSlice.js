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
      state.appreciateList = [...state.appreciateList, action.payload];
    });
    builder
      .addCase(getAppreciateByCompany.fulfilled, (state, { payload }) => {
        state.appreciateList = payload.contents;
      })
      .addCase(updateAppreciate.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
        } else {
          state.status = "fail";
        }
      });
  },
});

export const getAppreciateByCompany = createAsyncThunk(
  "appreciate/getAppreciateByCompany",
  async (idCompany) => {
    return axios
      .get(`${baseURL}/api/r2s/rate/company/${idCompany}/?no=0&limit=10`)
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

export const updateAppreciate = createAsyncThunk(
  "appreciate/updateAppreciate",
  async (data, id) => {
    const { dataUpdateAppreciate } = data;
    const res = await axios
      .put(`${baseURL}/api/rate/${id}`, dataUpdateAppreciate)

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
