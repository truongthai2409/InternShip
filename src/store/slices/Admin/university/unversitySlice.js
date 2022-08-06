import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import api from "src/config/api/apiConfig";
import notificationSlice from "../../notifications/notificationSlice";
const baseURL = process.env.REACT_APP_API;

const universitySlice = createSlice({
  name: "university",
  initialState: {
    universityList: [],
    universityDetail: {},
    error: [],
    status: "idle",
    user: {},
    activeUser: {},
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getUniversityList.fulfilled, (state, { payload }) => {
      state.universityList = payload;
    });
    builder.addCase(addUniversity.pending, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(addUniversity.fulfilled, (state, { payload }) => {
      if (!payload?.id) {
        state.status = 'fail';
        state.error = payload;
        toast("Tạo tài khoản thất bại")
      } else {
        state.user = payload;
        state.status = "success";
        state.error = {};
        toast("Tạo tài khoản thành công")
      }
    });
    builder.addCase(getUniversityDetail.fulfilled, (state, { payload }) => {
      state.universityDetail = payload;
    });
    builder.addCase(updateUniversityInfo.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(getPartnerByUserID.fulfilled, (state, { payload }) => {
      state.activeUser = payload
    })
  },
});

export default universitySlice;

/**
 * get company list
 * @returns company list
 */
export const getUniversityList = createAsyncThunk(
  "university/getUniversityList",
  async () => {
    return await axios
      .get(`${baseURL}/api/university`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * Add company
 * @param data
 * @returns notification
 */

export const addUniversity = createAsyncThunk(
  "university/addUniversity",
  async (data) => {
    const res = await axios
      .post(`${baseURL}/api/r2s/partner/university/create`, data, {
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

/**
 * get company detail by comId
 * @params comId
 * @return company detail
 */
export const getUniversityDetail = createAsyncThunk(
  "university/getUniversityDetail",
  async (uniId) => {
    return await axios
      .get(`${baseURL}/api/university/${uniId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export const getPartnerByUserID = createAsyncThunk(
  "university/getPartnerByUserID",
  async (userId) => {
    return await axios
    .get(`${baseURL}/api/r2s/partner/user/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    })
  }
)



/**
 * @params comId updateData
 * @return
 * success => notification
 * error => error.response.data
 */
export const updateUniversityInfo = createAsyncThunk(
  "university/updateUniversityInfo",
  async (updateData, thunkAPI) => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const { universityData, uniId } = updateData;
    return await axios
      .put(`${baseURL}/api/university/${uniId}`, universityData, axiosConfig)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật Trường thành công")
        );
        // if (setIsEdit) {
        //   setIsEdit(false);
        // }
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);
