import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const companySlice = createSlice({
  name: "Company",
  initialState: {
    companyList: [],
    companyDetail: {},
    notification: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, { payload }) => {
      state.companyList = payload;
    });
    builder.addCase(addCompany.fulfilled, (state, { payload }) => {});
    builder.addCase(getCompanyDetail.fulfilled, (state, { payload }) => {
      state.companyDetail = payload;
    });
    builder.addCase(updateCompanyInfo.rejected, (state, { payload }) => {
      state.error = payload;
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
      .get("http://localhost:8085/api/company")
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
  async (data) => {
    return axios
      .post("http://localhost:8085/api/company", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
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
      .get(`http://localhost:8085/api/company/${comId}`)
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
  async (comId, updateData, setIsEdit) => {
    console.log(comId, updateData);
    return axios
      .put(`http://localhost:8085/api/company/${comId}`, updateData)
      .then((response) => {
        setIsEdit(false);
        console.log("cap nhat thanh cong");
      })
      .catch((error) => {
        console.log("cap nhat khong thanh cong");
        return error.response.data;
      });
  }
);
