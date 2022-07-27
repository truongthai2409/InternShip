import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";
const baseURL = process.env.REACT_APP_API;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    user: {},
    notification: {},
    page: 0,
    error: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload.users;
    });
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      notificationSlice.actions.successMess("Chỉnh sửa thành công");
    });
  },
});

export default userSlice;

export const getUserList = createAsyncThunk("user/getUserList", async () => {
  return await axios
    .get(`${baseURL}/api/user`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
});

export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
  return await axios
    .get(`${baseURL}/api/r2s/admin/user/get-id/${id}`)
    .then((response) => {
      return response.data;
    });
});

export const updateUser = createAsyncThunk("user/updateUser", async (args) => {
  return await axios
    .put(`${baseURL}/api/r2s/hr/${args[1]}`, args[0], {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});
