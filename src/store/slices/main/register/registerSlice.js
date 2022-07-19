import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "src/config/api/apiConfig";

const baseURL = process.env.REACT_APP_API;

const registerSlice = createSlice({
  name: "register",
  initialState: {
    status: "idle",
    user: {},
    error: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.fulfilled, (state, action) => {
        if (action.payload?.username) {
          state.status = "success step 2";
          state.user = action.payload;
          state.error = {};
        } else {
          state.status = "fail";
          state.user = {};
          state.error = action.payload;
        }
      })
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload?.id) {
          state.user = action.payload;
          state.status = "success";
          state.error = {};
        } else {
          state.status = "fail";
          state.error = action.payload;
        }
      });
  },
});

export default registerSlice;

export const checkUser = createAsyncThunk(
  "register/checkUser",
  async (data) => {
    const res = await api
      .post(`${baseURL}/api/user`, data)
      .then((res) => {
        sessionStorage.setItem("account", JSON.stringify(data));
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    console.log(res);
    return res;
  }
);

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (data) => {
    const rolePath = {
<<<<<<< HEAD
      3: "candidate",
      1: "hr",
      4: "partner",
    };
    console.log("data", data);
    const { hrData, navigate } = data;
=======
      3: 'candidate',
      1: 'hr',
      4: 'partner'
    }
    const { hrData, navigate } = data
    console.log("HRdata tatata", hrData)
>>>>>>> e719ad28efb6e063abe043fa5cd4700d108629b3
    const res = await api
      .post(`${baseURL}/api/r2s/hr`, hrData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
    return res;
  }
);
