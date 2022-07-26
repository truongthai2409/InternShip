import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../../config/api/apiConfig";

const baseURL = process.env.REACT_APP_API;

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
    user: {},
    error: {},
    profile: JSON.parse(localStorage.getItem("userPresent")) || {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.token) {
          state.status = "success";
          state.user = action.payload;
          localStorage.setItem("userPresent", JSON.stringify(action.payload));
        } else {
          state.status = "fail";
          state.error = action.payload;
        }
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "success";
        } else {
          state.status = "fail";
        }
      });
  },
});

export const loginUser = createAsyncThunk("login/loginUser", async (data) => {
  const res = await api
    .post(`${baseURL}/api/signin`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
});

export const updateUserPassword = createAsyncThunk(
  "login/updateUserPassword",
  async (data) => {
    console.log(data);
    const { token, dataChangePassword } = data;
    const res = await axios
      .put(`${baseURL}/api/user/changePassword`, dataChangePassword, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((error) => {
        console.log(error.response);

        return error.response.data;
      });
    return res;
  }
);

export default loginSlice;
