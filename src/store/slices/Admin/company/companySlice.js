import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";
// import { useDispatch } from "react-redux";

const companySlice = createSlice({
  name: "Company",
  initialState: {
    companyList: [],
    companyDetail: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, { payload }) => {
      state.companyList = payload;
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
  async (data, thunkAPI) => {
    const { companyData, reset } = data;
    return axios
      .post("http://localhost:8085/api/company", companyData)
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
  async (updateData, thunkAPI) => {
    const { companyData, setIsEdit } = updateData;
    console.log(companyData);
    return axios
      .put(`http://localhost:8085/api/company/${companyData.id}`, companyData)
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật công ty thành công")
        );
        if (setIsEdit) {
          setIsEdit(false);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        return error.response.data;
      });
  }
);
