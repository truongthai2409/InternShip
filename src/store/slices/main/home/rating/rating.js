import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatingCompany.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
  },
});

export const getRatingCompany = createAsyncThunk(
  "rating/getRatingCompany",
  async (idCompany) => {
    return axios
      .get(`${baseURL}/api/r2s/rate/company/${idCompany}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export default ratingSlice;
