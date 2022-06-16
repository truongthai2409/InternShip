import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const companySlice = createSlice({
  name: "Company",
  initialState: {
    companyList: [],
    notification: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, { payload }) => {
      state.companyList = payload;
    });
    builder.addCase(addCompany.fulfilled, (state, { payload }) => {});
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
        return error;
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
        return error;
      });
  }
);
