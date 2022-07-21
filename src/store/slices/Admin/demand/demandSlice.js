import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const demandSlice = createSlice({
  name: "demand",
  initialState: {
    demandList: [],
    jobListName: [],
    indexCardActive: 0,
    jobDetail: {},
    jobPosition: [],
    status: "fail",
    demand: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDemand.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.demand = payload;
      });
  },
});

export const addDemand = createAsyncThunk("demand/addDemand", async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/partner/demand`, data, axiosConfig)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
});

export const { updateIdJobActive, updateIndexCardActive } = demandSlice.actions;
export default demandSlice;
