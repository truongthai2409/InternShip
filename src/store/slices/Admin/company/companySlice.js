import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";

const baseURL = process.env.REACT_APP_API;

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyList: [],
    companyDetail: {},
    companyDetail1: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, { payload }) => {
      state.companyList = payload;
      if (payload.length > 0) {
        state.companyDetail1 = payload[0];
      } else {
      }
    });
    builder.addCase(addCompany.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(getCompanyDetail.fulfilled, (state, { payload }) => {
      state.companyDetail = payload;
    });
    builder.addCase(updateCompanyInfo.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
  },
});

export default companySlice;

/**
 * get company list
 * @returns company list
 */
export const getCompanyList = createAsyncThunk(
  "company/getCompanyList",
  async () => {
    return await axios
      .get(`${baseURL}/api/company`)
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

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (data, thunkAPI) => {
    const { companyData, reset } = data;
    return axios
      .post(`${baseURL}/api/company`, companyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Thêm công ty thành công")
        );
        reset({
          description: "",
          email: "",
          // logo: image,
          name: "",
          phone: "",
          tax: "",
          website: "",
        });
        // return response.data;
      })
      .catch((error) => {
        thunkAPI.dispatch(
          notificationSlice.actions.errorMess("Thêm công ty khoong thành công")
        );
        return error.response.data;
      });
  }
);

/**
 * get company detail by comId
 * @params comId
 * @return company detail
 */
export const getCompanyDetail = createAsyncThunk(
  "company/getCompanyDetail",
  async (comId) => {
    return await axios
      .get(`${baseURL}/api/company/${comId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

/**
 * @params comId updateData
 * @return
 * success => notification
 * error => error.response.data
 */
export const updateCompanyInfo = createAsyncThunk(
  "company/updateCompanyInfo",
  async (updateData, thunkAPI) => {
    const { companyData, setIsEdit, comid } = updateData;
    console.log(companyData);
    return axios
      .put(`${baseURL}/api/company/${comid}`, companyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật công ty thành công")
        );
        if (setIsEdit) {
          setIsEdit(false);
        }
      })
      .catch((error) => {
        thunkAPI.dispatch(
          notificationSlice.actions.errorMess(
            "Cập nhật công ty Không thành công"
          )
        );
        console.log(error.response);
        return error.response.data;
      });
  }
);

export const deleteCompany = createAsyncThunk(
  "university/deleteCompany",
  async (id, thunkAPI) => {
    return await axios
      .delete(`${baseURL}/api/company/${id}`)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Xóa công ty thành công.")
        );
        return response.data;
      })
      .catch((error) => {
        thunkAPI.dispatch(
          notificationSlice.actions.errorMess("Xóa công ty không thành công.")
        );
        console.log(error.response);
        return error.response.data;
      });
  }
);
