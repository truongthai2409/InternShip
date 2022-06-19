import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import notificationSlice from "../../notifications/notificationSlice";
// import { useDispatch } from "react-redux";

const companySlice = createSlice({
  name: "Company",
  initialState: {
    universityList: [],
    universityDetail: {},
    error: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getUniversityList.fulfilled, (state, { payload }) => {
      state.companyList = payload;
    });
    builder.addCase(addUniversity.fulfilled, (state, { payload }) => {
      if (!payload?.data) {
        state.error = payload;
      }
    });
    builder.addCase(getUniversityDetail.fulfilled, (state, { payload }) => {
      state.companyDetail = payload;
    });
    builder.addCase(updateUniversityInfo.fulfilled, (state, { payload }) => {
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
export const getUniversityList = createAsyncThunk(
  "company/getUniversityList",
  async () => {
    return await axios
      .get("http://localhost:8085/api/university")
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
          shortName: "",
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
export const getUniversityDetail = createAsyncThunk(
  "company/getUniversityDetail",
  async (comId) => {
    return await axios
      .get(`http://localhost:8085/api/university/${comId}`)
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
export const updateUniversityInfo = createAsyncThunk(
  "company/updateUniversityInfo",
  async (updateData, thunkAPI) => {
    const { universityData, setIsEdit } = updateData;
    // console.log(companyData);
    return axios
      .put(
        `http://localhost:8085/api/university/${universityData.id}`,
        universityData
      )
      .then((response) => {
        thunkAPI.dispatch(
          notificationSlice.actions.successMess("Cập nhật Trường thành công")
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
