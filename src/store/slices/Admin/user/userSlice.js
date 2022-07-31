import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_API;

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    profile: {},
    user: {},
    idRole: null,
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
    builder.addCase(getProfileByIdUser.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.profile = payload;
      toast.success("Chỉnh sửa thành công");
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

// function use for get basic information match to each role through idUser
export const getUserById = createAsyncThunk("user/getUserById", async (id) => {
  return await axios
    .get(`${baseURL}/api/r2s/admin/user/get-id/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

// function use for get all of information match to each role through idUser
export const getProfileByIdUser = createAsyncThunk(
  "user/getHrByIdUser",
  async (idUser) => {
    switch (JSON.parse(localStorage.getItem("userPresent")).role) {
      case "Role_HR":
        return await axios
          .get(`${baseURL}/api/r2s/hr/user/${idUser}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Partner":
        return await axios
          .get(`${baseURL}/api/r2s/partner/user/${idUser}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      case "Role_Candidate":
        return await axios
          .get(`${baseURL}/api/r2s/hr/user/${idUser}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            return error.response.data;
          });
      default:
        return null;
    }
  }
);


// function use for update profile of user
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
