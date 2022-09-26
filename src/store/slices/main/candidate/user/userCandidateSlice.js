import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.REACT_APP_API;

const userCandidateSlice = createSlice({
  name: "userFilter",
  initialState: {
    allUser: [],
    major: "",
    name: ""
  },
  reducers: {
    nameFilterChange: (state, action) => {
      state.name = action.payload
    },
    majorFilterChange: (state, action) => {
      state.major = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUserCandidate.fulfilled, (state, action) => {
      state.allUser = action.payload.contents;
    });
  },
});

export const getAllUserCandidate = createAsyncThunk(
  "user/getAllUserCandidate",
  async () => {
    return axios
      .get(`${baseURL}/api/r2s/admin/candidate?no=0&limit=1000`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
export const {
  nameFilterChange,
  majorFilterChange
} = userCandidateSlice.actions;
export default userCandidateSlice;
