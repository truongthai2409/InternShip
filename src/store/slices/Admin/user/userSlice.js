import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../config/api/apiConfig";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    notification: {},
    page: 0,
    error: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload;
    });
  },
});

export default userSlice;

export const getUserList = createAsyncThunk("user/getUserList", async () => {
  return await axios
    .get("http://localhost:8085/api/user")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
});
